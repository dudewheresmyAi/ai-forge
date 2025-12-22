import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const typewriterWords = [
  "self-optimizing agents",
  "autonomous workflows",
  "intelligent automation",
  "revenue acceleration",
];

const features = [
  {
    title: "Autonomous Playbooks",
    description: "Agents that learn, adapt, and coordinate across your revenue stack.",
    tags: ["Multi-agent orchestration", "Self-optimizing loops", "Outcome-driven goals"],
  },
  {
    title: "Unified Data Fabric",
    description: "Real-time connectors across CRM, ads, and analytics without brittle glue.",
    tags: ["No-code integrations", "Schema harmonization", "Privacy-safe pipelines"],
  },
  {
    title: "Evolving Intelligence",
    description: "Models that refine tactics via reward signals and offline evals.",
    tags: ["Policy gradients on KPI rewards", "Offline/online A/B harness", "Guardrailed execution"],
  },
];

export const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % typewriterWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen pt-20 lg:pt-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto container-padding section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-[1.1] text-balance">
              AgenticForce — Re-engineering Revenue with{" "}
              <span className="gradient-text">AI-Forged</span> Autonomous Workflows
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl">
              Deploy self-optimizing agents that learn, adapt, and scale every stage of your sales and marketing stack.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl">
                Get a Live Demo
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="heroOutline" size="xl">
                Explore Product
              </Button>
            </div>

            {/* Typewriter */}
            <div className="flex items-center gap-2 text-primary font-heading font-semibold">
              <span>Deploy</span>
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="inline-block"
              >
                {typewriterWords[currentWord]}
              </motion.span>
              <span className="w-0.5 h-5 bg-primary animate-pulse" />
            </div>
          </motion.div>

          {/* Right Column - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Header Badge */}
            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm">Guardrailed autonomy with audit trails</span>
            </div>

            {/* Feature Cards */}
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="glass-card p-5 hover-lift group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <Sparkles className="w-5 h-5 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <span key={tag} className="feature-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
