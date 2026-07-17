import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--color-emerald), var(--color-accent), var(--color-accent-soft))"
      }}
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left"
    />
  );
}
