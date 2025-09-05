import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function Magnetic({
  children,
  className,
  radius = 120,
  strength = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  radius?: number; // px radius to attract within
  strength?: number; // 0..1 multiplier
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(my, { stiffness: 180, damping: 14, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < radius) {
      mx.set(dx * strength);
      my.set(dy * strength);
    }
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={cn("relative inline-block", className)}>
      <motion.div style={{ x, y }}>{children}</motion.div>
    </div>
  );
}
