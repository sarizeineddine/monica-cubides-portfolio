import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, staggerContainer, scaleIn } from "@/animations/motionPresets";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const { hero, identity } = portfolioData;

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="inicio"
      className="relative flex items-center overflow-hidden pt-24 pb-2 sm:min-h-[100svh] sm:pt-32 sm:pb-0"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 sm:gap-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-10">
        <motion.div variants={staggerContainer(0.14)} initial="hidden" animate="show">
          <motion.span
            variants={fadeUp}
            className="m-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: "var(--color-accent)",
                boxShadow: "0 0 10px 2px rgba(142,224,2,0.7)"
              }}
            />
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="m-hero-headline font-display text-balance text-[2.5rem] font-semibold leading-[1.08] text-paper sm:text-6xl lg:text-[3.75rem]"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="m-hero-subtext mt-5 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
            <MagneticButton onClick={() => scrollTo("#proyecciones")}>
              {hero.primaryCTA}
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => scrollTo("#respaldo")}>
              {hero.secondaryCTA}
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-6 border-t border-line pt-4 sm:mt-10 sm:pt-6"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-start sm:gap-x-8 sm:gap-y-3">
              {hero.trustBadges.map((badge, i) => (
                <div key={badge} className="flex items-center gap-1.5">
                  <svg
                    className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 text-accent"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                  >
                    <path d="M12 2l3 6.5 7 1-5 5 1.5 7L12 18l-6.5 3.5L7 14.5l-5-5 7-1z" />
                  </svg>
                  <span className="m-label text-[9px] sm:text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-wide text-muted whitespace-nowrap">
                    {badge}
                  </span>
                  {i < hero.trustBadges.length - 1 && (
                    <span className="hidden sm:inline text-muted opacity-30">·</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="show"
          className="relative mx-auto w-full max-w-[280px] sm:max-w-sm lg:max-w-none"
        >
          <div className="m-portrait-frame relative aspect-[4/5] w-full overflow-hidden rounded-[20px] sm:rounded-[28px] border border-line glass-panel">
            <img
              src={hero.portrait}
              alt={`${identity.name}, ${identity.role}`}
              className="h-full w-full object-cover"
              loading="eager"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML += '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--color-muted);font-size:0.75rem;text-align:center;padding:1.5rem;">Foto de Monica<br/>(reemplaza pronto)</div>';
              }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--color-ink), rgba(5,5,5,0.1), transparent)" }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="m-hero-badge-left glass-panel absolute -left-4 top-8 rounded-2xl px-5 py-4 lg:-left-8"
          >
            <p className="m-hero-badge-value font-display text-2xl font-semibold text-accent currency-display">
              {hero.floatingBadgeOne.value}
            </p>
            <p className="m-hero-badge-label max-w-[9rem] text-[11px] uppercase tracking-wide text-muted">
              {hero.floatingBadgeOne.label}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="m-hero-badge-right glass-panel absolute -right-4 bottom-8 rounded-2xl px-5 py-4 lg:-right-8"
          >
            <p className="m-hero-badge-value font-display text-2xl font-semibold text-paper currency-display">
              {hero.floatingBadgeTwo.value}
            </p>
            <p className="m-hero-badge-label max-w-[9rem] text-[11px] uppercase tracking-wide text-muted">
              {hero.floatingBadgeTwo.label}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
