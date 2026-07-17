import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/motionPresets";
import SectionHeader from "./SectionHeader";

export default function Testimonials() {
  const { testimonials } = portfolioData;

  return (
    <section id="testimonios" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="Confianza Comprobada"
          title="Lo que dicen quienes ya estructuraron su plan."
          align="center"
          className="mx-auto"
        />

        <motion.div
          variants={staggerContainer(0.18)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="m-card-padding-lg glass-panel flex flex-col rounded-3xl p-5 sm:p-8"
            >
              <svg className="h-6 w-6 sm:h-8 sm:w-8 text-accent" style={{ opacity: 0.5 }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.17 6C4.87 6 3 7.87 3 10.17c0 2.3 1.87 4.17 4.17 4.17.4 0 .78-.06 1.14-.17-.3 1.9-1.9 3.33-3.81 3.33v2.33c3.4 0 6.17-2.76 6.17-6.17V10.17C10.67 7.87 8.8 6 7.17 6zm10 0C14.87 6 13 7.87 13 10.17c0 2.3 1.87 4.17 4.17 4.17.4 0 .78-.06 1.14-.17-.3 1.9-1.9 3.33-3.81 3.33v2.33c3.4 0 6.17-2.76 6.17-6.17V10.17C20.67 7.87 18.8 6 17.17 6z" />
              </svg>
              <blockquote className="m-body-text mt-4 flex-1 text-balance text-sm leading-relaxed text-paper sm:mt-5 sm:text-lg" style={{ opacity: 0.9 }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-4 sm:mt-6 sm:pt-5">
                <p className="text-sm font-semibold text-paper">{t.name}</p>
                <p className="m-label text-[10px] sm:text-xs uppercase tracking-wide text-muted">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
