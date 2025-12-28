import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CheckoutCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card max-w-md w-full p-8 text-center"
      >
        <XCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Payment Cancelled</h1>
        <p className="text-muted-foreground mb-6">
          Your payment was cancelled. No charges were made to your account.
        </p>
        <div className="space-y-3">
          <Button onClick={() => navigate("/#pricing")} className="w-full">
            Return to Pricing
          </Button>
          <Button variant="outline" onClick={() => navigate("/")} className="w-full">
            Go to Homepage
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutCancel;
