import { motion } from "framer-motion";
import { Star, Quote, TrendingUp } from "lucide-react";
import { LogoCarousel } from "@/components/ui/LogoCarousel";

const testimonials = [
  {
    quote: "AgenticForce reduced our CAC by 42% in just 3 months. The autonomous agents handle what used to take our entire marketing ops team.",
    name: "Sarah Chen",
    title: "VP of Growth",
    company: "TechScale Inc.",
    rating: 5,
    metric: { label: "CAC Reduction", value: "42%" },
    avatar: "SC",
  },
  {
    quote: "The self-optimizing workflows have completely transformed our sales pipeline. We're seeing 3x more qualified leads with less manual intervention.",
    name: "Marcus Johnson",
    title: "Chief Revenue Officer",
    company: "CloudFirst Solutions",
    rating: 5,
    metric: { label: "Lead Quality", value: "3x" },
    avatar: "MJ",
  },
  {
    quote: "Finally, an AI platform that actually delivers on autonomous marketing. Our team focuses on strategy while AgenticForce handles execution.",
    name: "Emily Rodriguez",
    title: "Director of Marketing",
    company: "Nexus Ventures",
    rating: 5,
    metric: { label: "Time Saved", value: "65%" },
    avatar: "ER",
  },
  {
    quote: "The unified data fabric eliminated our integration nightmares. Everything just works together seamlessly now.",
    name: "David Park",
    title: "Head of Data",
    company: "DataFlow Analytics",
    rating: 5,
    metric: { label: "Integration Time", value: "-80%" },
    avatar: "DP",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export const Testimonials = () => {
  return (
    <section id="testimonials" className="relative section-padding overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Customer Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how forward-thinking companies are transforming their revenue operations with autonomous AI agents.
          </p>
        </motion.div>

        {/* Partner / Client Logo Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-6">
            Trusted by teams at
          </p>
          <LogoCarousel />
        </motion.div>

        {/* Testimonial Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="glass-card p-6 lg:p-8 relative group overflow-hidden"
            >
              {/* Hover glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                {/* Quote icon */}
                <Quote className="w-10 h-10 text-primary/20 mb-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote className="text-foreground text-lg leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.title}, {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Metric badge */}
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-2xl font-bold gradient-text">
                      {testimonial.metric.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {testimonial.metric.label}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Join <span className="text-foreground font-semibold">500+</span> companies already using AgenticForce
          </p>
        </motion.div>
      </div>
    </section>
  );
};
