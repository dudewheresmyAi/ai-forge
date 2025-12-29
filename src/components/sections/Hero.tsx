import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShaderBackground } from "@/components/ui/ShaderBackground";
import { Typewriter } from "@/components/ui/Typewriter";

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

  return (
    <section className="relative min-h-screen pt-20 lg:pt-24 overflow-hidden">
      {/* Shader Background */}
      <ShaderBackground />
      
      {/* Overlay gradient for content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      
      {/* Coral glow on right side */}
      <div className="coral-glow" />

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

            {/* Enhanced Typewriter */}
            <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
              <span>Deploy</span>
              <Typewriter
                words={typewriterWords}
                typingSpeed={70}
                deletingSpeed={40}
                pauseDuration={2500}
                className="min-w-[200px]"
              />
            </div>
          </motion.div>

          {/* Right Column - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Header Badge - Teal checkmark like reference */}
            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-sm">Guardrailed autonomy with audit trails</span>
            </div>

            {/* Feature Cards */}
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="glass-card p-5 hover-lift group relative overflow-hidden"
              >
                {/* Coral accent glow on card */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    {/* Coral sparkles icon like reference */}
                    <Sparkles className="w-5 h-5 text-accent/70 group-hover:text-accent transition-colors" />
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
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
