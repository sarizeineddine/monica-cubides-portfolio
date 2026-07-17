import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const icons = {
  graduation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 sm:h-8 sm:w-8">
      <path d="M22 10L12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
      <path d="M22 10v6" />
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 sm:h-8 sm:w-8">
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 4 4 5-5" />
      <path d="M16 9h4v4" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 sm:h-8 sm:w-8">
      <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

export default function ServicesCarousel({ services }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(null);

  const total = services.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goNext = useCallback(() => setActiveIndex((prev) => (prev + 1) % total), [total]);
  const goPrev = useCallback(() => setActiveIndex((prev) => (prev - 1 + total) % total), [total]);
  const goTo = useCallback((idx) => setActiveIndex(idx), []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => { goNext(); }, 6000);
    return () => clearInterval(timer);
  }, [goNext, isPaused, activeIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) { if (diff > 0) goPrev(); else goNext(); }
    touchStartX.current = null;
  };

  const getCardStyle = (idx) => {
    const offset = idx - activeIndex;
    let normalizedOffset = offset;
    if (offset > total / 2) normalizedOffset = offset - total;
    if (offset < -total / 2) normalizedOffset = offset + total;

    const isActive = normalizedOffset === 0;
    const abs = Math.abs(normalizedOffset);

    if (isMobile) {
      // Coverflow: side cards visible at angles, active card front & center
      const xShift = normalizedOffset * 75;
      const zDepth = isActive ? 0 : -120;
      const rotY = normalizedOffset * -18;
      const scale = isActive ? 1 : 0.88;
      return {
        transform: `translateX(${xShift}%) translateZ(${zDepth}px) rotateY(${rotY}deg) scale(${scale})`,
        opacity: abs > 1 ? 0 : isActive ? 1 : 0.4,
        zIndex: isActive ? 10 : 5 - abs,
        pointerEvents: isActive ? "auto" : "none",
        filter: isActive ? "none" : "blur(1.5px) brightness(0.7)",
      };
    }

    return {
      transform: `translateX(${normalizedOffset * 60}%) translateZ(${isActive ? 0 : -200}px) rotateY(${normalizedOffset * -25}deg) scale(${isActive ? 1 : 0.85})`,
      opacity: abs > 1 ? 0 : isActive ? 1 : 0.5,
      zIndex: isActive ? 10 : 5 - abs,
      pointerEvents: isActive ? "auto" : "none",
      filter: isActive ? "none" : "blur(2px) brightness(0.6)",
    };
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="m-carousel-stage carousel-perspective relative mx-auto flex h-[440px] items-center justify-center sm:h-[480px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {services.map((service, idx) => (
          <div
            key={service.marker}
            className="m-carousel-card carousel-card absolute w-[300px] sm:w-[380px] md:w-[420px]"
            style={getCardStyle(idx)}
          >
            <div className="m-card-padding glass-panel relative flex flex-col rounded-3xl p-5 sm:p-8" style={{ minHeight: "380px" }}>
              <div className="flex items-start justify-between">
                <div
                  className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl text-accent"
                  style={{
                    backgroundColor: "rgba(142,224,2,0.08)",
                    border: "1px solid rgba(142,224,2,0.25)",
                  }}
                >
                  {icons[service.icon]}
                </div>
                <span
                  className="font-display text-3xl sm:text-4xl font-semibold currency-display"
                  style={{ color: "var(--color-line)" }}
                >
                  {service.marker}
                </span>
              </div>

              <h3 className="m-card-title font-display mt-5 sm:mt-7 text-xl sm:text-2xl md:text-[1.7rem] font-semibold text-paper">
                {service.title}
              </h3>
              <p className="m-label mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {service.subtitle}
              </p>
              <p className="m-body-text mt-3 sm:mt-4 flex-1 text-sm leading-relaxed text-muted sm:text-base">
                {service.description}
              </p>

              <div
                className="mt-4 sm:mt-5 rounded-2xl px-4 py-3 sm:px-5 sm:py-4"
                style={{
                  border: "1px solid rgba(142,224,2,0.25)",
                  backgroundColor: "rgba(142,224,2,0.06)",
                }}
              >
                <p className="m-label text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-accent">
                  Beneficio Clave
                </p>
                <p className="mt-1 text-sm sm:text-base font-semibold text-paper">
                  {service.result}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 sm:mt-8 flex items-center justify-center gap-4 sm:gap-6">
        <button onClick={goPrev} aria-label="Servicio anterior" className="carousel-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {services.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Ir al servicio ${idx + 1}`}
              className={`carousel-dot ${idx === activeIndex ? "carousel-dot-active" : ""}`}
            />
          ))}
        </div>

        <button onClick={goNext} aria-label="Siguiente servicio" className="carousel-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={activeIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="m-label mt-4 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-muted px-4 sm:mt-6"
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
