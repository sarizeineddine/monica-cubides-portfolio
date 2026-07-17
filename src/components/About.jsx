import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, slideInLeft, slideInRight, staggerContainer, viewportOnce } from "@/animations/motionPresets";
import SectionHeader from "./SectionHeader";

const highlightIcons = {
  "Optimizacion Tributaria": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M4 20L20 4" strokeLinecap="round" />
    </svg>
  ),
  "Portafolios Globales": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
    </svg>
  ),
  "Seguridad Institucional": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
      <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="sobre-mi" className="about-section relative">
      {/* MOBILE LAYOUT (< 768px) — always in DOM, CSS controls visibility */}
      <div className="about-mobile mx-auto max-w-2xl px-5">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            {about.eyebrow}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="about-mobile-title mt-3 font-display font-semibold leading-[1.2] text-paper"
          >
            {about.headline}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="about-mobile-p mt-5 leading-[1.65] text-muted"
          >
            {about.paragraphOne}
          </motion.p>

          <motion.div variants={fadeUp} className="my-4 flex justify-center">
            <div className="h-px w-20" style={{ background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }} />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="about-mobile-p leading-[1.65] text-muted"
          >
            {about.paragraphTwo}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-2">
            {about.highlights.map((item) => (
              <span key={item} className="about-mobile-pill">
                {highlightIcons[item]}
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* DESKTOP LAYOUT (>= 768px) — always in DOM, CSS controls visibility */}
      <div className="about-desktop section-pad">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
          <motion.div variants={slideInLeft} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <SectionHeader eyebrow={about.eyebrow} title={about.headline} />
          </motion.div>

          <motion.div variants={staggerContainer(0.15)} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <motion.p variants={fadeUp} className="text-balance text-base leading-relaxed text-muted sm:text-lg">
              {about.paragraphOne}
            </motion.p>
            <motion.p variants={fadeUp} className="mt-5 text-balance text-base leading-relaxed text-muted sm:text-lg">
              {about.paragraphTwo}
            </motion.p>

            <motion.div variants={slideInRight} className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {about.highlights.map((item) => (
                <div key={item} className="glass-panel rounded-2xl px-5 py-5">
                  <p className="text-sm font-medium leading-snug text-paper">{item}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
