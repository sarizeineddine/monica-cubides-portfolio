import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/motionPresets";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import SectionHeader from "./SectionHeader";
import WealthCurveChart from "./WealthCurveChart";

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency", currency: "COP", maximumFractionDigits: 0,
});

const currencyCompact = new Intl.NumberFormat("es-CO", {
  notation: "compact", compactDisplay: "short", maximumFractionDigits: 1,
});

function futureValue(monthly, monthlyRate, months) {
  if (monthlyRate === 0) return monthly * months;
  return monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
}

/* Desktop-only projection card (unchanged) */
function ProjectionCard({ label, value, featured }) {
  const animated = useAnimatedNumber(value);
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel relative overflow-hidden rounded-2xl px-6 py-6"
      style={featured ? { border: "1px solid rgba(142, 224, 2, 0.4)" } : {}}
    >
      {featured && (
        <span
          className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-accent"
          style={{ backgroundColor: "rgba(142, 224, 2, 0.15)" }}
        >
          Meta
        </span>
      )}
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold text-paper sm:text-3xl currency-display">
        {currency.format(Math.round(animated))}
      </p>
    </motion.div>
  );
}

/* Mobile-only column — no "Meta" label, uses glow instead */
function MobileResultCol({ periodLabel, value, featured }) {
  const animated = useAnimatedNumber(value);
  return (
    <div className={`m-result-col ${featured ? "m-result-col-featured" : ""}`}>
      <p className="m-result-label">{periodLabel}</p>
      <p className={`m-result-value ${featured ? "m-result-value-featured" : "m-result-value-normal"}`}>
        {currencyCompact.format(Math.round(animated))}
      </p>
    </div>
  );
}

export default function WealthEngine() {
  const { wealthEngine: config } = portfolioData;
  const [daily, setDaily] = useState(config.sliderDefault);

  const monthlyRate = useMemo(
    () => Math.pow(1 + config.annualRate, 1 / 12) - 1,
    [config.annualRate]
  );

  const monthly = daily * 30;

  const projections = useMemo(
    () => config.periods.map((period) => ({
      ...period,
      value: futureValue(monthly, monthlyRate, period.months),
    })),
    [monthly, monthlyRate, config.periods]
  );

  const maxReference = useMemo(
    () => futureValue(config.sliderMax * 30, monthlyRate, 120),
    [config.sliderMax, monthlyRate]
  );

  const progressPercent =
    ((daily - config.sliderMin) / (config.sliderMax - config.sliderMin)) * 100;

  return (
    <section id="proyecciones" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="Simulador"
          title={config.title}
          subtitle={config.subtitle}
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 sm:mt-12"
        >
          {/* SLIDER + VALUE CARD */}
          <motion.div variants={fadeUp} className="m-card-padding glass-panel rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="m-label text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Aporte diario
                </p>
                <p className="m-wealth-daily-value mt-2 font-display text-4xl font-semibold text-accent sm:text-5xl currency-display">
                  {currency.format(daily)}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="m-label text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                  Mensual
                </p>
                <p className="mt-1 text-sm font-semibold text-paper currency-display">
                  {currency.format(monthly)}
                </p>
              </div>
            </div>

            <div className="mt-6 sm:mt-7">
              <input
                type="range"
                className="range-accent"
                min={config.sliderMin}
                max={config.sliderMax}
                step={config.sliderStep}
                value={daily}
                onChange={(e) => setDaily(Number(e.target.value))}
                aria-label="Selecciona tu aporte diario"
                style={{ "--range-progress": `${progressPercent}%` }}
              />
              <div className="mt-2 flex justify-between text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-muted currency-display">
                <span>{currencyCompact.format(config.sliderMin)}</span>
                <span>{currencyCompact.format(config.sliderMax)}</span>
              </div>
            </div>
          </motion.div>

          {/* MOBILE-ONLY: Live Result Panel — unified premium 3-column */}
          <motion.div variants={fadeUp} className="mt-4 sm:hidden">
            <div className="m-result-panel">
              {projections.map((p, i) => (
                <MobileResultCol
                  key={p.label}
                  periodLabel={p.label}
                  value={p.value}
                  featured={i === projections.length - 1}
                />
              ))}
            </div>
          </motion.div>

          {/* CHART */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <motion.div variants={fadeUp} className="m-wealth-chart-container glass-panel rounded-3xl p-4 sm:p-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="m-label text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                  Proyeccion Patrimonial
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                  8% E.A.
                </p>
              </div>
              <WealthCurveChart
                monthly={monthly}
                monthlyRate={monthlyRate}
                maxMonths={120}
                maxRef={maxReference}
              />
            </motion.div>

            {/* DESKTOP-ONLY projections column */}
            <motion.div variants={fadeUp} className="hidden flex-col gap-4 sm:flex">
              {projections.map((p, i) => (
                <ProjectionCard
                  key={p.label}
                  label={`A ${p.label}`}
                  value={p.value}
                  featured={i === projections.length - 1}
                />
              ))}
              <p className="text-[10px] leading-relaxed text-muted uppercase tracking-wider mt-2" style={{ opacity: 0.7 }}>
                {config.disclaimer}
              </p>
            </motion.div>
          </div>

          <p className="mt-4 text-[9px] leading-relaxed text-muted uppercase tracking-wider sm:hidden" style={{ opacity: 0.6 }}>
            {config.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
