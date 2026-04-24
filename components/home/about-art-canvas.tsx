"use client";

import { useEffect, useRef } from "react";

type AboutArtCanvasProps = {
  className?: string;
  variant?: "blob" | "scribble";
};

export function AboutArtCanvas({
  className,
  variant = "scribble"
}: AboutArtCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      if (variant === "blob") {
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = "#9FEAE4";
        ctx.beginPath();
        ctx.ellipse(width * 0.5, height * 0.56, width * 0.43, height * 0.37, 0.45, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.22;
        ctx.fillStyle = "#6FD4CF";
        ctx.beginPath();
        ctx.ellipse(width * 0.62, height * 0.42, width * 0.35, height * 0.28, -0.35, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
        return;
      }

      const color = "#12B7B1";
      ctx.strokeStyle = color;
      ctx.lineCap = "round";
      ctx.lineWidth = 4;
      ctx.globalAlpha = 0.95;
      ctx.beginPath();
      ctx.moveTo(8, height * 0.7);
      ctx.bezierCurveTo(width * 0.23, height * 0.33, width * 0.62, height * 0.96, width - 8, height * 0.25);
      ctx.stroke();

      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.78;
      ctx.beginPath();
      ctx.moveTo(14, height * 0.9);
      ctx.bezierCurveTo(width * 0.3, height * 0.5, width * 0.7, height * 1.05, width - 12, height * 0.48);
      ctx.stroke();

      ctx.setLineDash([14, 10]);
      ctx.lineWidth = 2.4;
      ctx.globalAlpha = 0.58;
      ctx.beginPath();
      ctx.moveTo(18, height * 0.55);
      ctx.bezierCurveTo(width * 0.28, height * 0.12, width * 0.72, height * 0.78, width - 20, height * 0.08);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    };

    draw();
    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(parent);
    return () => resizeObserver.disconnect();
  }, [variant]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
