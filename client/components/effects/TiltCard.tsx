import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function TiltCard({ children, className, max = 8, glare = false }: { children: React.ReactNode; className?: string; max?: number; glare?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    function onMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rx = (+py * max).toFixed(2);
      const ry = (-px * max).toFixed(2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        if (glare) {
          const gx = (px + 0.5) * 100;
          const gy = (py + 0.5) * 100;
          el.style.setProperty("--glare-x", `${gx}%`);
          el.style.setProperty("--glare-y", `${gy}%`);
        }
      });
    }
    function onLeave() {
      cancelAnimationFrame(raf);
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [max, glare]);

  return (
    <div
      ref={ref}
      className={cn("will-change-transform transition-transform [transform-style:preserve-3d]", className)}
      style={glare ? { position: "relative" } : undefined}
    >
      {children}
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity group-hover:opacity-40"
          style={{ background: "radial-gradient(circle at var(--glare-x,50%) var(--glare-y,50%), rgba(255,255,255,0.6), transparent 60%)" }}
        />
      )}
    </div>
  );
}
