import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function MouseGradient({
  children,
  size = 420,
  color = "radial-gradient(700px circle at var(--x) var(--y), rgba(99,102,241,0.20), transparent 60%)",
  blur = "blur-3xl",
  className,
}: {
  children: React.ReactNode;
  size?: number;
  color?: string;
  blur?: string;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.3 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <div onMouseMove={onMove} className={cn("relative", className)}>
      {children}
      <motion.div
        style={{ left: sx, top: sy, width: size, height: size }}
        className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 ${blur}`}
      >
        <div
          aria-hidden
          style={{
            width: "100%",
            height: "100%",
            background: color,
            WebkitMaskImage: "radial-gradient(circle, black 60%, transparent 70%)",
            maskImage: "radial-gradient(circle, black 60%, transparent 70%)",
          }}
        />
      </motion.div>
    </div>
  );
}
