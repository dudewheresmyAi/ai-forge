import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Crown, Building2, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { usePayPal } from "@/hooks/usePayPal";
import { toast } from "sonner";

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    description: "Perfect for small businesses starting their AI journey",
    monthlyPrice: 497,
    yearlyPrice: 4970,
    features: [
      "1 AI Automation Workflow",
      "Basic Analytics Dashboard",
      "Email Support",
      "5 Team Members",
      "1,000 AI Actions/month",
      "Standard Integrations",
      "Monthly Strategy Call",
    ],
    highlight: false,
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    icon: Crown,
    description: "For growing companies ready to scale with AI",
    monthlyPrice: 1497,
    yearlyPrice: 14970,
    features: [
      "Unlimited AI Workflows",
      "Advanced Analytics & Insights",
      "Priority 24/7 Support",
      "25 Team Members",
      "50,000 AI Actions/month",
      "Custom Integrations",
      "Weekly Strategy Calls",
      "Dedicated Account Manager",
      "AI-Powered Social Media",
    ],
    highlight: true,
    cta: "Start Free Trial",
    badge: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    description: "Custom solutions for large-scale operations",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      "Everything in Pro",
      "Custom AI Model Training",
      "Unlimited Team Members",
      "Unlimited AI Actions",
      "White-label Solutions",
      "On-premise Deployment",
      "SLA Guarantees",
      "24/7 Dedicated Support",
      "Custom Development",
    ],
    highlight: false,
    cta: "Contact Sales",
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { createOrder } = usePayPal();

  const handleSubscribe = async (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === null) {
      // Enterprise - scroll to contact
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const amount = isYearly ? plan.yearlyPrice! : plan.monthlyPrice;
    
    setLoadingPlan(plan.id);
    try {
      await createOrder({
        planId: plan.id,
        planName: plan.name,
        amount,
        isYearly,
      });
    } catch (error) {
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Choose the plan that fits your business needs. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-sm font-medium ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly
              <span className="ml-2 text-xs text-primary font-semibold bg-primary/10 px-2 py-1 rounded-full">
                Save 17%
              </span>
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.highlight
                  ? "glass-card border-primary/50 shadow-lg shadow-primary/20"
                  : "glass-card"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${plan.highlight ? "bg-primary/20" : "bg-muted"}`}>
                  <plan.icon className={`w-6 h-6 ${plan.highlight ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              </div>

              <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

              <div className="mb-8">
                {plan.monthlyPrice !== null ? (
                  <>
                    <span className="text-4xl font-bold text-foreground">
                      ${isYearly ? Math.round(plan.yearlyPrice! / 12) : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                    {isYearly && (
                      <p className="text-sm text-primary mt-1">
                        Billed ${plan.yearlyPrice}/year
                      </p>
                    )}
                  </>
                ) : (
                  <span className="text-3xl font-bold text-foreground">Custom</span>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${plan.highlight ? "" : "variant-outline"}`}
                variant={plan.highlight ? "default" : "outline"}
                onClick={() => handleSubscribe(plan)}
                disabled={loadingPlan === plan.id}
              >
                {loadingPlan === plan.id ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Need help choosing? Compare all features or talk to our team.
          </p>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            View Full Feature Comparison
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
