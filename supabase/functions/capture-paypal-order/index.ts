import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
    throw new Error("Failed to authenticate with PayPal");
  }

  const data = await response.json();
  return data.access_token;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, userEmail, userName } = await req.json();
    
    console.log("Capturing PayPal order:", orderId);
    
    const accessToken = await getPayPalAccessToken();
    const mode = Deno.env.get("PAYPAL_MODE") || "sandbox";
    const baseUrl = mode === "live" 
      ? "https://api-m.paypal.com" 
      : "https://api-m.sandbox.paypal.com";

    // Capture the order
    const captureResponse = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!captureResponse.ok) {
      const error = await captureResponse.text();
      console.error("PayPal capture error:", error);
      throw new Error("Failed to capture PayPal order");
    }

    const captureData = await captureResponse.json();
    console.log("PayPal order captured:", captureData);

    // Extract payment details
    const capture = captureData.purchase_units[0]?.payments?.captures?.[0];
    const payerEmail = captureData.payer?.email_address;
    const payerId = captureData.payer?.payer_id;
    const referenceId = captureData.purchase_units[0]?.reference_id;
    const amount = capture?.amount?.value;

    // Parse plan info from reference_id (e.g., "starter_monthly")
    const [planId, billingPeriod] = referenceId?.split("_") || [];

    // Save to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: dbError } = await supabase.from("subscriptions").insert({
      paypal_order_id: orderId,
      paypal_payer_id: payerId,
      payer_email: payerEmail || userEmail,
      payer_name: userName,
      plan_id: planId,
      billing_period: billingPeriod,
      amount: parseFloat(amount),
      status: captureData.status,
      payment_source: "paypal",
    });

    if (dbError) {
      console.error("Database error:", dbError);
      // Don't fail the request, payment was successful
    }

    return new Response(JSON.stringify({ 
      success: true,
      status: captureData.status,
      orderId: orderId,
      planId: planId,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error capturing PayPal order:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
