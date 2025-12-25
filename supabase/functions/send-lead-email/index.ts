import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadEmailRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-lead-email function invoked");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company }: LeadEmailRequest = await req.json();
    
    console.log(`Processing lead email for: ${email}`);

    // Send confirmation email using Resend REST API
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "AgenticForce <onboarding@resend.dev>",
        to: [email],
        subject: "Thanks for reaching out to AgenticForce!",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .logo { font-size: 28px; font-weight: bold; color: #0d9488; }
              .content { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px; border-radius: 16px; color: #fff; }
              .highlight { color: #2dd4bf; }
              .cta { display: inline-block; margin-top: 20px; padding: 12px 24px; background: linear-gradient(135deg, #0d9488, #14b8a6); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
              .footer { margin-top: 30px; text-align: center; color: #64748b; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">AgenticForce</div>
              </div>
              <div class="content">
                <h2>Hi ${name}! 👋</h2>
                <p>Thank you for reaching out to <span class="highlight">AgenticForce</span>. We've received your message and our team is excited to connect with you.</p>
                ${company ? `<p>We look forward to exploring how we can help <span class="highlight">${company}</span> leverage AI-powered solutions.</p>` : ''}
                <p>One of our specialists will be in touch within <span class="highlight">24 hours</span> to discuss your needs and how we can help transform your business with intelligent automation.</p>
                <p>In the meantime, feel free to explore our case studies and success stories.</p>
                <a href="https://agenticforce.com" class="cta">Explore Our Solutions →</a>
              </div>
              <div class="footer">
                <p>© 2024 AgenticForce. All rights reserved.</p>
                <p>Powering the future with AI agents</p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Resend API error:", errorText);
      throw new Error(`Resend API error: ${errorText}`);
    }

    const emailResponse = await res.json();
    console.log("Confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-lead-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
