import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/utils/cn";

export default function MagneticButton({ children, href, onClick, variant = "solid", className, ariaLabel }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const base = "m-cta relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none";

  const styles = variant === "solid"
    ? "text-[#04140a]"
    : "border border-line text-paper hover:text-accent";

  const solidStyle = variant === "solid"
    ? {
        backgroundColor: "var(--color-accent)",
        boxShadow: "0 0 0 1px rgba(142,224,2,0.4), 0 20px 45px -18px rgba(142,224,2,0.65)",
      }
    : {};

  const content = (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, ...solidStyle }}
      whileTap={{ scale: 0.96 }}
      className={cn(base, styles, className)}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} aria-label={ariaLabel} onClick={onClick} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button type="button" aria-label={ariaLabel} onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
