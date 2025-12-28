import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CreateOrderRequest {
  planId: string;
  planName: string;
  amount: number;
  isYearly: boolean;
}

const getPayPalAccessToken = async (): Promise<string> => {
  const clientId = Deno.env.get("PAYPAL_CLIENT_ID");
  const clientSecret = Deno.env.get("PAYPAL_CLIENT_SECRET");
  const mode = Deno.env.get("PAYPAL_MODE") || "sandbox";
  
  const baseUrl = mode === "live" 
    ? "https://api-m.paypal.com" 
    : "https://api-m.sandbox.paypal.com";

  const auth = btoa(`${clientId}:${clientSecret}`);
  
  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("PayPal auth error:", error);
    throw new Error("Failed to authenticate with PayPal");
  }

  const data = await response.json();
  return data.access_token;
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { planId, planName, amount, isYearly }: CreateOrderRequest = await req.json();
    
    console.log("Creating PayPal order:", { planId, planName, amount, isYearly });
    
    const accessToken = await getPayPalAccessToken();
    const mode = Deno.env.get("PAYPAL_MODE") || "sandbox";
    const baseUrl = mode === "live" 
      ? "https://api-m.paypal.com" 
      : "https://api-m.sandbox.paypal.com";

    const billingPeriod = isYearly ? "year" : "month";
    const description = `${planName} Plan - ${billingPeriod}ly subscription`;

    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: `${planId}_${isYearly ? "yearly" : "monthly"}`,
          description: description,
          amount: {
            currency_code: "USD",
            value: amount.toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: "AgenticForce",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${req.headers.get("origin")}/checkout/success`,
        cancel_url: `${req.headers.get("origin")}/checkout/cancel`,
      },
    };

    console.log("PayPal order payload:", JSON.stringify(orderPayload));

    const response = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("PayPal create order error:", error);
      throw new Error("Failed to create PayPal order");
    }

    const order = await response.json();
    console.log("PayPal order created:", order.id);

    return new Response(JSON.stringify({ 
      orderId: order.id,
      approvalUrl: order.links.find((l: any) => l.rel === "approve")?.href 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error creating PayPal order:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
