"use client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={
        reduce ? {} : { transform: ["translateY(16px)", "translateY(0px)"] }
      }
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function ReferencePhoto({
  index,
  label,
}: {
  index: number;
  label: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className="reference-photo"
      style={{ backgroundPosition: `${index * 25}% 50%` }}
    />
  );
}
export function Parallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    ["translateY(-7px)", "translateY(7px)"],
  );
  return (
    <motion.div ref={ref} style={reduce ? {} : { transform }}>
      {children}
    </motion.div>
  );
}
