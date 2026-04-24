"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type FloatingScribbleProps = {
  className?: string;
  children: ReactNode;
};

export function FloatingScribble({ className, children }: FloatingScribbleProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      animate={reducedMotion ? { x: 0, y: 0 } : { x: [0, 10, 0], y: [0, -6, 0] }}
      transition={{
        duration: 3.2,
        ease: "easeInOut",
        repeat: reducedMotion ? 0 : Infinity
      }}
    >
      {children}
    </motion.div>
  );
}
