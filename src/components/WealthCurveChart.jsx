import { useMemo, useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

function futureValue(monthly, monthlyRate, months) {
  if (monthlyRate === 0) return monthly * months;
  return monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
}

const currency = new Intl.NumberFormat("es-CO", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

export default function WealthCurveChart({ monthly, monthlyRate, maxMonths = 120, maxRef }) {
  const [hasDrawn, setHasDrawn] = useState(false);
  const [breathe, setBreathe] = useState(0);

  const points = useMemo(() => {
    const steps = 40;
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const month = (maxMonths / steps) * i;
      const val = futureValue(monthly, monthlyRate, month);
      const x = (i / steps) * 340 + 20;
      const y = 200 - (val / maxRef) * 175;
      pts.push({ x, y: Math.max(y, 15), val });
    }
    return pts;
  }, [monthly, monthlyRate, maxMonths, maxRef]);

  const linePath = useMemo(() => {
    return points
      .map((p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        const prev = points[i - 1];
        const cpx1 = prev.x + (p.x - prev.x) * 0.5;
        const cpx2 = prev.x + (p.x - prev.x) * 0.5;
        return `C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`;
      })
      .join(" ");
  }, [points]);

  const areaPath = useMemo(() => {
    return linePath + ` L ${points[points.length - 1].x} 210 L ${points[0].x} 210 Z`;
  }, [linePath, points]);

  // Mark as drawn after first mount animation completes
  useEffect(() => {
    const timer = setTimeout(() => setHasDrawn(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  // Subtle breathing when idle
  useAnimationFrame((t) => {
    setBreathe(Math.sin(t / 1400) * 0.6);
  });

  const yTicks = [
    { y: 25, value: maxRef },
    { y: 112, value: maxRef / 2 },
    { y: 200, value: 0 },
  ];

  const xLabels = [
    { x: 20, label: "Hoy" },
    { x: 105, label: "3A" },
    { x: 190, label: "5A" },
    { x: 275, label: "7A" },
    { x: 360, label: "10A" },
  ];

  const dotIndices = [0, 8, 16, 24, 32, 40];
  const finalPoint = points[points.length - 1];

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 380 240" className="w-full" style={{ height: "220px", overflow: "visible" }}>
        <defs>
          <linearGradient id="wealthFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.32" />
            <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wealthLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-emerald)" />
            <stop offset="50%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-accent-soft)" />
          </linearGradient>
          <filter id="chartGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid lines */}
        {yTicks.map((tick) => (
          <line
            key={tick.y}
            x1="20"
            x2="360"
            y1={tick.y}
            y2={tick.y}
            stroke="var(--chart-grid)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
        ))}

        {/* Y-axis compact labels */}
        {yTicks.slice(0, 2).map((tick) => (
          <text
            key={tick.y}
            x="14"
            y={tick.y + 3}
            fill="var(--color-muted)"
            fontSize="8"
            textAnchor="end"
            fontFamily="var(--font-sans)"
            fontWeight="600"
            style={{ letterSpacing: "0.02em" }}
          >
            {currency.format(tick.value)}
          </text>
        ))}

        {/* Area under curve — always visible, morphs smoothly */}
        <motion.path
          d={areaPath}
          fill="url(#wealthFill)"
          initial={hasDrawn ? false : { opacity: 0 }}
          animate={hasDrawn ? { d: areaPath } : { opacity: 1, d: areaPath }}
          transition={{
            opacity: { duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
            d: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
        />

        {/* Main curve line */}
        {!hasDrawn ? (
          // FIRST LOAD: beautiful draw-in animation
          <motion.path
            d={linePath}
            fill="none"
            stroke="url(#wealthLine)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#chartGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : (
          // AFTER FIRST LOAD: smooth path morph on slider change
          <motion.path
            d={linePath}
            fill="none"
            stroke="url(#wealthLine)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#chartGlow)"
            initial={false}
            animate={{ d: linePath }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: `translateY(${breathe}px)` }}
          />
        )}

        {/* Data points */}
        {dotIndices.map((idx, i) => {
          const p = points[idx];
          if (!p) return null;
          return (
            <motion.circle
              key={`dot-${idx}`}
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="var(--color-accent)"
              stroke="var(--color-ink)"
              strokeWidth="2"
              initial={hasDrawn ? false : { scale: 0, opacity: 0 }}
              animate={hasDrawn ? { cx: p.x, cy: p.y } : { scale: 1, opacity: 1, cx: p.x, cy: p.y }}
              transition={
                hasDrawn
                  ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                  : {
                      scale: { duration: 0.4, delay: 0.3 + (i / dotIndices.length) * 1.1, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.4, delay: 0.3 + (i / dotIndices.length) * 1.1 },
                    }
              }
            />
          );
        })}

        {/* Final point */}
        <motion.circle
          cx={finalPoint.x}
          cy={finalPoint.y}
          r="6"
          fill="var(--color-accent)"
          stroke="var(--color-ink)"
          strokeWidth="2.5"
          initial={hasDrawn ? false : { scale: 0, opacity: 0 }}
          animate={hasDrawn ? { cx: finalPoint.x, cy: finalPoint.y } : { scale: 1, opacity: 1, cx: finalPoint.x, cy: finalPoint.y }}
          transition={
            hasDrawn
              ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }
          }
        />

        {/* Pulse ring on final point (always active) */}
        <motion.circle
          cx={finalPoint.x}
          cy={finalPoint.y}
          r="6"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          opacity="0.5"
          initial={false}
          animate={{ cx: finalPoint.x, cy: finalPoint.y }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <animate attributeName="r" from="6" to="16" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0" dur="2.2s" repeatCount="indefinite" />
        </motion.circle>

        {/* X-axis labels */}
        {xLabels.map((label) => (
          <text
            key={label.x}
            x={label.x}
            y="230"
            fill="var(--color-muted)"
            fontSize="9"
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontWeight="700"
            style={{ letterSpacing: "0.1em" }}
          >
            {label.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
