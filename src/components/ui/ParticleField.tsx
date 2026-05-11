import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  parallaxFactor: number;
}

export const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };
    let scrollY = window.scrollY;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000);
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          // Depth layers: 0.1 (far/slow) to 0.9 (near/fast)
          parallaxFactor: Math.random() * 0.8 + 0.1,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    let time = 0;
    const REPEL_RADIUS = 120;
    const REPEL_STRENGTH = 40;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        // Drift base position
        particle.baseX += particle.speedX;
        particle.baseY += particle.speedY;

        // Wrap base position
        if (particle.baseX < 0) particle.baseX = width;
        if (particle.baseX > width) particle.baseX = 0;
        if (particle.baseY < 0) particle.baseY = height;
        if (particle.baseY > height) particle.baseY = 0;

        // Parallax offset based on scroll (deeper layers move less)
        const parallaxOffsetY = -scrollY * particle.parallaxFactor * 0.3;

        // Target position with parallax
        let targetX = particle.baseX;
        let targetY = particle.baseY + parallaxOffsetY;

        // Wrap target Y so particles stay visible
        targetY = ((targetY % height) + height) % height;

        // Mouse repulsion
        const dx = targetX - mouse.x;
        const dy = targetY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          targetX += (dx / dist) * force;
          targetY += (dy / dist) * force;
        }

        // Smooth ease toward target
        particle.x += (targetX - particle.x) * 0.15;
        particle.y += (targetY - particle.y) * 0.15;

        // Twinkle effect
        const twinkle = Math.sin(time * particle.twinkleSpeed + particle.twinklePhase);
        const currentOpacity = particle.opacity * (0.5 + twinkle * 0.5) * (0.5 + particle.parallaxFactor * 0.5);
        const renderSize = particle.size * (0.5 + particle.parallaxFactor);

        // Glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, renderSize * 3
        );

        const isTeal = particle.twinklePhase > Math.PI;
        const color = isTeal ? "20, 184, 166" : "255, 255, 255";

        gradient.addColorStop(0, `rgba(${color}, ${currentOpacity})`);
        gradient.addColorStop(0.4, `rgba(${color}, ${currentOpacity * 0.4})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, renderSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, renderSize * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Occasional shooting stars
      if (Math.random() < 0.002) {
        const sx = Math.random() * width;
        const sy = Math.random() * height * 0.5;
        const length = Math.random() * 80 + 40;
        const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
        const endX = sx + Math.cos(angle) * length;
        const endY = sy + Math.sin(angle) * length;

        const gradient = ctx.createLinearGradient(sx, sy, endX, endY);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(0.3, "rgba(20, 184, 166, 0.5)");
        gradient.addColorStop(1, "rgba(20, 184, 166, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      time += 1;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -5 }}
    />
  );
};
