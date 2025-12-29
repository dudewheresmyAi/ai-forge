import { useEffect, useRef } from "react";

export const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Color palette matching design system
    const colors = {
      teal: { r: 20, g: 184, b: 166 },      // hsl(168 76% 42%)
      coral: { r: 229, g: 83, b: 61 },       // hsl(6 78% 57%)
      darkBlue: { r: 12, g: 14, b: 20 },     // background
      midBlue: { r: 20, g: 23, b: 32 },      // secondary
    };

    const blobs = [
      { x: 0.7, y: 0.3, radius: 0.4, color: colors.coral, speed: 0.0003, phase: 0 },
      { x: 0.2, y: 0.7, radius: 0.35, color: colors.teal, speed: 0.0004, phase: 2 },
      { x: 0.8, y: 0.8, radius: 0.3, color: colors.coral, speed: 0.0002, phase: 4 },
      { x: 0.15, y: 0.25, radius: 0.25, color: colors.teal, speed: 0.00035, phase: 1 },
    ];

    const draw = () => {
      const { width, height } = canvas;
      
      // Create gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, `rgb(${colors.darkBlue.r}, ${colors.darkBlue.g}, ${colors.darkBlue.b})`);
      bgGradient.addColorStop(1, `rgb(${colors.midBlue.r}, ${colors.midBlue.g}, ${colors.midBlue.b})`);
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw animated blobs
      blobs.forEach((blob) => {
        const offsetX = Math.sin(time * blob.speed + blob.phase) * 0.1;
        const offsetY = Math.cos(time * blob.speed * 1.3 + blob.phase) * 0.08;
        
        const x = (blob.x + offsetX) * width;
        const y = (blob.y + offsetY) * height;
        const radius = blob.radius * Math.min(width, height);

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0.35)`);
        gradient.addColorStop(0.5, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0.15)`);
        gradient.addColorStop(1, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Add subtle noise texture overlay
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 8;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
      }
      ctx.putImageData(imageData, 0, 0);

      time += 16;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ filter: "blur(60px)" }}
    />
  );
};
