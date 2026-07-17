import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/motionPresets";
import MagneticButton from "./MagneticButton";

export default function Contact() {
  const { contact, identity } = portfolioData;

  return (
    <section id="contacto" className="section-pad relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
        style={{ backgroundColor: "rgba(142,224,2,0.1)" }}
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-10">
        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="m-contact-panel glass-panel rounded-[24px] px-6 py-10 sm:rounded-[32px] sm:px-14 sm:py-16"
        >
          <motion.span
            variants={fadeUp}
            className="m-eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent"
            style={{ backgroundColor: "var(--color-ink)" }}
          >
            {contact.eyebrow}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="m-contact-headline font-display text-balance text-2xl font-semibold leading-tight text-paper sm:text-5xl"
          >
            {contact.headline}
          </motion.h2>

          <motion.p variants={fadeUp} className="m-body-text mx-auto mt-4 max-w-xl text-balance text-sm leading-relaxed text-muted sm:mt-5 sm:text-lg">
            {contact.text}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex items-center justify-center sm:mt-9"
          >
            <MagneticButton href={contact.whatsapp}>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.33 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2z" />
              </svg>
              {contact.whatsappLabel}
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-line pt-5 text-xs text-muted sm:mt-10 sm:gap-x-8 sm:gap-y-3 sm:pt-7 sm:text-sm"
          >
            <a href={`mailto:${contact.email}`} className="transition-colors hover:text-accent break-all">
              {contact.email}
            </a>
            <span className="hidden h-1 w-1 rounded-full sm:block" style={{ backgroundColor: "var(--color-line)" }} />
            <span>{identity.location}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
