import { motion } from "framer-motion";
import { Shield, Cpu, TrendingUp, Lock, Layers, Gauge } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Multi-Agent Orchestration",
    description: "Coordinate multiple AI agents working in parallel, each specialized for different tasks but unified in purpose.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "SOC 2 compliant infrastructure with end-to-end encryption and role-based access controls.",
  },
  {
    icon: TrendingUp,
    title: "Self-Optimizing Systems",
    description: "Continuous learning loops that improve performance based on real outcomes and KPI feedback.",
  },
  {
    icon: Lock,
    title: "Privacy-First Architecture",
    description: "Your data stays yours. On-premise options and strict data isolation by default.",
  },
  {
    icon: Layers,
    title: "No-Code Integrations",
    description: "Connect to 500+ tools and platforms without writing a single line of code.",
  },
  {
    icon: Gauge,
    title: "Real-Time Analytics",
    description: "Live dashboards and instant insights across all your AI-powered operations.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            Platform Features
          </span>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Built for <span className="gradient-text">Scale & Security</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-ready infrastructure that grows with your business without compromising on security or performance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative group"
            >
              <div className="glass-card p-8 h-full hover-lift gradient-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
