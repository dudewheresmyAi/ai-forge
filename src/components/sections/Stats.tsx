import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const stats = [
  { value: -37, suffix: "%", label: "Average CAC Reduction" },
  { value: 62, prefix: "+", suffix: "%", label: "Pipeline Velocity" },
  { value: 2, prefix: "<", suffix: "s", label: "Lead Response Time" },
  { value: 3.1, prefix: "+", suffix: "x", label: "Campaign Lift" },
];

const AnimatedCounter = ({ 
  value, 
  prefix = "", 
  suffix = "", 
  isVisible 
}: { 
  value: number; 
  prefix?: string; 
  suffix?: string; 
  isVisible: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setCount(Math.min(current * stepValue, value));
      if (current >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  const displayValue = Number.isInteger(value) 
    ? Math.round(count) 
    : count.toFixed(1);

  return (
    <span className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  );
};

export const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-16 border-t border-b border-border/50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="stat-card text-center"
            >
              <div className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-foreground mb-2">
                <AnimatedCounter 
                  value={stat.value} 
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
