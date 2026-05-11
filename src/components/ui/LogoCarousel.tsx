import { motion } from "framer-motion";

const logos = [
  "TechScale",
  "CloudFirst",
  "Nexus",
  "DataFlow",
  "Quantum",
  "Apex Labs",
  "Vertex",
  "Lumina",
  "Stratos",
  "Orbital",
];

export const LogoCarousel = () => {
  // Duplicate for seamless loop
  const loop = [...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-12 items-center w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {loop.map((name, i) => (
          <div
            key={i}
            className="flex items-center justify-center px-8 py-4 rounded-xl border border-border/30 bg-card/20 backdrop-blur-sm min-w-[180px] hover:border-primary/50 transition-colors duration-300"
          >
            <span className="text-xl font-heading font-bold text-muted-foreground/70 hover:text-foreground transition-colors whitespace-nowrap tracking-wider">
              {name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
