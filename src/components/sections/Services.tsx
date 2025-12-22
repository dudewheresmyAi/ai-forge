import { motion } from "framer-motion";
import { 
  Bot, 
  Zap, 
  Share2, 
  Target, 
  BarChart3, 
  Megaphone, 
  Palette, 
  Rocket 
} from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "Agentic AI Solutions",
    description: "Deploy autonomous AI agents that handle complex workflows, make decisions, and continuously improve their performance.",
  },
  {
    icon: Zap,
    title: "AI Automations",
    description: "Eliminate repetitive tasks with intelligent automation that adapts to your processes and scales with your growth.",
  },
  {
    icon: Share2,
    title: "AI Social Media",
    description: "AI-powered content creation, scheduling, and engagement optimization across all major platforms.",
  },
  {
    icon: Target,
    title: "Strategy Dominance",
    description: "Data-driven strategic planning powered by predictive AI models and competitive intelligence.",
  },
  {
    icon: BarChart3,
    title: "Market Intelligence",
    description: "Real-time market analysis, trend detection, and actionable insights from AI-processed data streams.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Full-stack digital marketing with AI optimization for maximum ROI across all channels.",
  },
  {
    icon: Palette,
    title: "Brand & Web Generation",
    description: "AI-assisted brand identity creation and website generation that converts visitors into customers.",
  },
  {
    icon: Rocket,
    title: "Start-up Support",
    description: "Comprehensive support for startups including AI strategy, implementation, and growth acceleration.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      
      <div className="relative max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            Our Services
          </span>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            AI-First Solutions for{" "}
            <span className="gradient-text">Modern Business</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform every aspect of your business with purpose-built AI solutions that drive measurable results.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-card p-6 hover-lift group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
