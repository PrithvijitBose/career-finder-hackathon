import { motion, useMotionValue, useSpring } from "framer-motion";

export function MouseGradient({
  size = 360,
  color = "radial-gradient(600px circle at var(--x) var(--y), rgba(99,102,241,0.25), transparent 60%)",
  blur = "blur-3xl",
}: {
  size?: number;
  color?: string;
  blur?: string;
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
    <div onMouseMove={onMove} className="relative">
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
