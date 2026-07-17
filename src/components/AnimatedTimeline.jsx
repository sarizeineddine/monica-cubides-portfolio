import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stepIcons = {
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
      <path d="M11 8v6M8 11h6" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  blueprint: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 3v18" opacity="0.5" />
      <circle cx="15" cy="15" r="1.5" fill="currentColor" />
    </svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M7 12l3-3 3 3-3 3-3-3z" />
      <path d="M13 12l3-3 3 3-3 3-3-3z" />
      <path d="M2 14v-4a2 2 0 012-2h2M22 10v4a2 2 0 01-2 2h-2" strokeLinecap="round" />
    </svg>
  ),
};

export default function AnimatedTimeline({ steps }) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 30%"],
  });

  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const orbPosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * steps.length + 0.1), steps.length - 1);
      setActiveStep(idx);
    });
    return () => unsub();
  }, [scrollYProgress, steps.length]);

  // ══ MOBILE VERTICAL LAYOUT ══
  if (isMobile) {
    return (
      <div ref={containerRef} className="relative pl-16">
        {/* Vertical rail */}
        <div className="absolute left-6 top-0 bottom-0 w-[3px] rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-line)", opacity: 0.5 }}>
          <motion.div
            className="w-full origin-top"
            style={{
              scaleY: progressScale,
              height: "100%",
              background: "linear-gradient(180deg, var(--color-emerald), var(--color-accent), var(--color-accent-soft))",
              boxShadow: "0 0 16px rgba(142,224,2,0.5)",
            }}
          />
        </div>

        {/* Traveling orb with trail */}
        <motion.div
          className="absolute left-6 z-10"
          style={{ top: orbPosition, translateX: "-50%", translateY: "-50%" }}
        >
          <div className="relative">
            <div className="h-5 w-5 rounded-full" style={{
              backgroundColor: "var(--color-accent)",
              boxShadow: "0 0 0 3px var(--color-ink), 0 0 0 5px rgba(142,224,2,0.3), 0 0 24px 6px rgba(142,224,2,0.6)",
            }} />
          </div>
        </motion.div>

        <div className="flex flex-col gap-12">
          {steps.map((item, idx) => {
            const isActive = idx <= activeStep;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Icon badge floating on the rail */}
                <div
                  className="absolute -left-16 top-0 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: "var(--color-ink)",
                    border: `1px solid ${isActive ? "var(--color-accent)" : "var(--color-line)"}`,
                    color: isActive ? "var(--color-accent)" : "var(--color-muted)",
                    boxShadow: isActive ? "0 0 0 4px rgba(142,224,2,0.1), 0 0 24px rgba(142,224,2,0.3)" : "none",
                  }}
                >
                  {stepIcons[item.icon]}
                </div>

                {/* Card */}
                <div
                  className="glass-panel rounded-2xl p-6 transition-all duration-500"
                  style={{
                    borderColor: isActive ? "rgba(142,224,2,0.3)" : undefined,
                  }}
                >
                  <div className="flex items-baseline justify-between">
                    <p
                      className="font-display text-5xl font-semibold transition-colors duration-500 currency-display"
                      style={{
                        color: isActive ? "var(--color-accent)" : "var(--color-line)",
                      }}
                    >
                      {item.step}
                    </p>
                    <span
                      className="text-[9px] font-bold uppercase tracking-[0.2em] rounded-full px-3 py-1"
                      style={{
                        backgroundColor: "var(--color-surface)",
                        color: "var(--color-muted)",
                        border: "1px solid var(--color-line)",
                      }}
                    >
                      {item.duration}
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-xl font-semibold text-paper">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // ══ DESKTOP HORIZONTAL LAYOUT ══
  return (
    <div ref={containerRef} className="relative">
      {/* Top rail with progress */}
      <div className="relative mb-10 h-[3px] w-full">
        <div className="absolute inset-0 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-line)", opacity: 0.5 }}>
          <motion.div
            className="h-full origin-left"
            style={{
              scaleX: progressScale,
              background: "linear-gradient(90deg, var(--color-emerald), var(--color-accent), var(--color-accent-soft))",
              boxShadow: "0 0 16px rgba(142,224,2,0.5)",
            }}
          />
        </div>

        {/* Traveling orb */}
        <motion.div
          className="absolute top-1/2 z-10"
          style={{ left: orbPosition, translateX: "-50%", translateY: "-50%" }}
        >
          <div className="h-5 w-5 rounded-full" style={{
            backgroundColor: "var(--color-accent)",
            boxShadow: "0 0 0 3px var(--color-ink), 0 0 0 5px rgba(142,224,2,0.3), 0 0 28px 6px rgba(142,224,2,0.6)",
          }} />
        </motion.div>

        {/* Step markers on the rail */}
        {steps.map((_, idx) => {
          const isActive = idx <= activeStep;
          const leftPct = ((idx + 0.5) / steps.length) * 100;
          return (
            <div
              key={idx}
              className="absolute top-1/2"
              style={{
                left: `${leftPct}%`,
                translate: "-50% -50%",
              }}
            >
              <div
                className="h-3 w-3 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: isActive ? "var(--color-accent)" : "var(--color-surface)",
                  border: `2px solid ${isActive ? "var(--color-accent)" : "var(--color-line)"}`,
                  boxShadow: isActive ? "0 0 12px rgba(142,224,2,0.6)" : "none",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Chapter cards */}
      <div className="grid grid-cols-3 gap-6">
        {steps.map((item, idx) => {
          const isActive = idx <= activeStep;
          return (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel relative flex flex-col rounded-2xl p-7 transition-all duration-500"
              style={{
                borderColor: isActive ? "rgba(142,224,2,0.3)" : undefined,
                transform: isActive ? "translateY(-4px)" : "translateY(0)",
              }}
            >
              {/* Duration tag top right */}
              <span
                className="absolute right-5 top-5 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full px-3 py-1 transition-all duration-500"
                style={{
                  backgroundColor: isActive ? "rgba(142,224,2,0.08)" : "var(--color-surface)",
                  color: isActive ? "var(--color-accent)" : "var(--color-muted)",
                  border: `1px solid ${isActive ? "rgba(142,224,2,0.25)" : "var(--color-line)"}`,
                }}
              >
                {item.duration}
              </span>

              {/* Icon */}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500"
                style={{
                  backgroundColor: isActive ? "rgba(142,224,2,0.1)" : "var(--color-surface)",
                  border: `1px solid ${isActive ? "rgba(142,224,2,0.3)" : "var(--color-line)"}`,
                  color: isActive ? "var(--color-accent)" : "var(--color-muted)",
                  boxShadow: isActive ? "0 0 20px rgba(142,224,2,0.2)" : "none",
                }}
              >
                {stepIcons[item.icon]}
              </div>

              {/* Big number */}
              <p
                className="font-display mt-6 text-6xl font-semibold transition-colors duration-500 currency-display"
                style={{
                  color: isActive ? "var(--color-accent)" : "var(--color-line)",
                }}
              >
                {item.step}
              </p>

              {/* Title */}
              <h3 className="font-display mt-3 text-xl font-semibold text-paper sm:text-2xl">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
