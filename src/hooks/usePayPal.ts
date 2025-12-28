import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CreateOrderParams {
  planId: string;
  planName: string;
  amount: number;
  isYearly: boolean;
}

export const usePayPal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createOrder = async ({ planId, planName, amount, isYearly }: CreateOrderParams) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-paypal-order", {
        body: { planId, planName, amount, isYearly },
      });

      if (error) throw error;

      if (data.approvalUrl) {
        // Redirect to PayPal for approval
        window.location.href = data.approvalUrl;
      } else {
        throw new Error("No approval URL received");
      }

      return data;
    } catch (error: unknown) {
      console.error("PayPal error:", error);
      const message = error instanceof Error ? error.message : "Payment failed";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const captureOrder = async (orderId: string, userEmail?: string, userName?: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("capture-paypal-order", {
        body: { orderId, userEmail, userName },
      });

      if (error) throw error;

      return data;
    } catch (error: unknown) {
      console.error("PayPal capture error:", error);
      const message = error instanceof Error ? error.message : "Payment capture failed";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrder, captureOrder, isLoading };
};
