import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, slideInLeft, slideInRight, staggerContainer, viewportOnce } from "@/animations/motionPresets";
import SectionHeader from "./SectionHeader";

function MobileCaseCard({ item, index }) {
  return (
    <motion.article
      variants={fadeUp}
      className="glass-panel relative overflow-hidden rounded-2xl p-5"
    >
      {/* Ambient corner glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-60" style={{
        background: "radial-gradient(circle, rgba(142,224,2,0.18), transparent 70%)"
      }} />

      {/* Top: category badge + case number */}
      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-accent" style={{ backgroundColor: "var(--color-ink)" }}>
          <span className="h-1 w-1 rounded-full bg-accent" style={{ boxShadow: "0 0 6px 1px rgba(142,224,2,0.7)" }} />
          {item.category}
        </span>
        <span className="font-display text-2xl font-semibold" style={{ color: "var(--color-line)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Big gradient metric */}
      <div className="relative mt-4">
        <p className="m-case-metric font-display font-semibold currency-display" style={{
          background: "linear-gradient(135deg, var(--color-emerald), var(--color-accent), var(--color-accent-soft))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {item.metric}
        </p>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
          {item.metricLabel}
        </p>
      </div>

      {/* Title */}
      <h3 className="relative mt-5 font-display text-lg font-semibold text-paper">
        {item.title}
      </h3>

      {/* Divider with icon */}
      <div className="relative my-4 flex items-center gap-2">
        <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, var(--color-line), transparent)" }} />
        <svg className="h-3 w-3 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18" />
          <path d="M7 14l4-4 4 4 5-5" />
        </svg>
        <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, var(--color-line), transparent)" }} />
      </div>

      {/* Content blocks — all visible (Q1 answered B) */}
      <div className="relative space-y-3.5">
        <div>
          <div className="flex items-center gap-1.5">
            <div className="h-1 w-1 rounded-full bg-accent" />
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent">Contexto</p>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted">{item.context}</p>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <div className="h-1 w-1 rounded-full bg-accent" />
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent">Estrategia</p>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted">{item.strategy}</p>
        </div>

        {/* Impact — highlighted */}
        <div className="rounded-xl border-l-2 border-t border-r border-b pl-3 pr-3 py-3 mt-2" style={{
          borderLeftColor: "var(--color-accent)",
          borderTopColor: "rgba(142,224,2,0.15)",
          borderRightColor: "rgba(142,224,2,0.15)",
          borderBottomColor: "rgba(142,224,2,0.15)",
          backgroundColor: "rgba(142,224,2,0.05)",
        }}>
          <div className="flex items-center gap-1.5">
            <svg className="h-3 w-3 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent">Impacto</p>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-paper font-medium">{item.impact}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function SelectedWork() {
  const { work } = portfolioData;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="casos" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="Casos de Exito"
          title="Simulaciones reales, decisiones que ya estan dando resultado."
          subtitle="Cada estrategia parte de un caso concreto: un objetivo, un flujo de caja real y un plan estructurado para lograrlo."
        />

        {/* MOBILE VIEW — Deep-Dive Cards */}
        {isMobile && (
          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-8 flex flex-col gap-4"
          >
            {work.map((item, i) => (
              <MobileCaseCard key={item.title} item={item} index={i} />
            ))}
          </motion.div>
        )}

        {/* DESKTOP VIEW — Editorial Stacked (unchanged) */}
        {!isMobile && (
          <div className="mt-16 flex flex-col gap-14 sm:gap-20">
            {work.map((item, i) => {
              const isReversed = i % 2 === 1;
              return (
                <motion.article
                  key={item.title}
                  variants={staggerContainer(0.15)}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  className="relative"
                >
                  <div className={`grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 ${isReversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    <motion.div variants={isReversed ? slideInRight : slideInLeft} className="lg:col-span-5">
                      <div className="glass-panel relative overflow-hidden rounded-3xl p-10">
                        <div className="absolute inset-0 opacity-40" style={{
                          background: `radial-gradient(circle at ${isReversed ? "80%" : "20%"} 30%, rgba(142,224,2,0.15), transparent 60%)`
                        }} />
                        <div className="relative">
                          <div className="flex items-center gap-2">
                            <span className="font-display text-5xl font-semibold" style={{ color: "var(--color-line)" }}>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                              {item.category}
                            </span>
                          </div>
                          <div className="mt-12 flex flex-col">
                            <p className="font-display text-6xl font-semibold sm:text-7xl currency-display" style={{
                              background: "linear-gradient(135deg, var(--color-emerald), var(--color-accent), var(--color-accent-soft))",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}>
                              {item.metric}
                            </p>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                              {item.metricLabel}
                            </p>
                          </div>
                          <div className="mt-12 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-accent">
                            <span className="h-px w-8 bg-accent" style={{ opacity: 0.4 }} />
                            Resultado Proyectado
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={fadeUp} className="lg:col-span-7 lg:pt-6">
                      <h3 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
                        {item.title}
                      </h3>
                      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Contexto</p>
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{item.context}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Estrategia</p>
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{item.strategy}</p>
                        </div>
                      </div>
                      <div className="mt-8 rounded-2xl border-l-2 pl-5 py-2" style={{ borderColor: "var(--color-accent)" }}>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Impacto</p>
                        <p className="mt-2 text-base leading-relaxed text-paper sm:text-lg">{item.impact}</p>
                      </div>
                    </motion.div>
                  </div>

                  {i < work.length - 1 && (
                    <div className="mt-14 flex justify-center sm:mt-20">
                      <div className="h-px w-32" style={{ background: "linear-gradient(90deg, transparent, var(--color-line), transparent)" }} />
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
