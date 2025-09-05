import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Direction = "up" | "down" | "left" | "right" | "none";

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  direction?: Direction;
}) {
  const offset = 24;
  const variants: Record<Direction, any> = {
    up: { hidden: { opacity: 0, y: offset }, show: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -offset }, show: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: offset }, show: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: -offset }, show: { opacity: 1, x: 0 } },
    none: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  };
  return (
    <motion.div
      className={cn(className)}
      variants={variants[direction]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
