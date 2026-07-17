import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/animations/motionPresets";
import { cn } from "@/utils/cn";

export default function SectionHeader({ eyebrow, title, subtitle, align = "left", className }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow && (
        <span
          className="m-eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="m-section-title font-display text-balance text-3xl font-semibold leading-[1.15] text-paper sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="m-section-subtitle mt-5 text-balance text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
