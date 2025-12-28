import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePayPal } from "@/hooks/usePayPal";

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { captureOrder, isLoading } = usePayPal();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [orderDetails, setOrderDetails] = useState<{ planId?: string } | null>(null);

  useEffect(() => {
    const token = searchParams.get("token"); // PayPal order ID
    
    if (token) {
      captureOrder(token)
        .then((data) => {
          setStatus("success");
          setOrderDetails({ planId: data.planId });
        })
        .catch(() => {
          setStatus("error");
        });
    } else {
      setStatus("error");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card max-w-md w-full p-8 text-center"
      >
        {status === "loading" && (
          <>
            <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Processing Payment...</h1>
            <p className="text-muted-foreground">Please wait while we confirm your payment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for subscribing to AgenticForce {orderDetails?.planId && `(${orderDetails.planId} plan)`}. 
              You'll receive a confirmation email shortly.
            </p>
            <div className="space-y-3">
              <Button onClick={() => navigate("/")} className="w-full">
                Go to Homepage
              </Button>
              <Button variant="outline" onClick={() => navigate("/dashboard")} className="w-full">
                View Dashboard
              </Button>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Payment Failed</h1>
            <p className="text-muted-foreground mb-6">
              There was an issue processing your payment. Please try again or contact support.
            </p>
            <div className="space-y-3">
              <Button onClick={() => navigate("/#pricing")} className="w-full">
                Try Again
              </Button>
              <Button variant="outline" onClick={() => navigate("/")} className="w-full">
                Go to Homepage
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default CheckoutSuccess;
