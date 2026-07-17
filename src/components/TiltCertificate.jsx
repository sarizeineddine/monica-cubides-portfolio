import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

export default function TiltCertificate() {
  const ref = useRef(null);
  const { certificate, skandiaLogo } = portfolioData.credentials;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springRX = useSpring(rotateX, { stiffness: 150, damping: 18 });
  const springRY = useSpring(rotateY, { stiffness: 150, damping: 18 });

  const glareBackground = useTransform(
    [glareX, glareY],
    (latest) => `radial-gradient(circle at ${latest[0]}% ${latest[1]}%, rgba(142,224,2,0.25), transparent 55%)`
  );

  const handleMove = (e) => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 14);
    rotateX.set((0.5 - py) * 14);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  const CertificateContent = (
    <>
      {/* Glare */}
      {isMobile ? (
        <div aria-hidden className="m-certificate-glare pointer-events-none absolute inset-0" />
      ) : (
        <motion.div aria-hidden style={{ background: glareBackground }} className="pointer-events-none absolute inset-0" />
      )}

      <div className="absolute inset-x-6 top-5 h-px sm:inset-x-8 sm:top-6" style={{ background: "linear-gradient(90deg, transparent, rgba(142,224,2,0.5), transparent)" }} />
      <div className="absolute inset-x-6 bottom-5 h-px sm:inset-x-8 sm:bottom-6" style={{ background: "linear-gradient(90deg, transparent, rgba(142,224,2,0.5), transparent)" }} />

      <div className="relative flex flex-col items-center text-center">
        <div
          className="mb-5 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border p-2"
          style={{
            borderColor: "rgba(142,224,2,0.4)",
            backgroundColor: "rgba(142,224,2,0.08)"
          }}
        >
          <img
            src={skandiaLogo}
            alt="Skandia Colombia"
            className="h-full w-full object-contain"
            onError={(e) => {
              e.target.outerHTML = '<div style="font-size:0.55rem;color:var(--color-accent);text-align:center;font-weight:700;letter-spacing:0.1em;line-height:1.2;">SKANDIA<br/>COLOMBIA</div>';
            }}
          />
        </div>

        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-accent">
          Certificado de Reconocimiento
        </p>
        <h3 className="font-display mt-3 sm:mt-4 max-w-md text-balance text-xl sm:text-2xl md:text-3xl font-semibold text-paper">
          {certificate.awardTitle}
        </h3>

        <p className="mt-5 sm:mt-6 text-xs uppercase tracking-wide text-muted">Otorgado a</p>
        <p className="font-display mt-1 text-lg sm:text-xl font-semibold text-accent-soft">
          {certificate.issuedTo}
        </p>

        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-2 sm:gap-3 border-t border-line pt-5 sm:pt-6 sm:grid-cols-2">
          {certificate.issuedBy.map((person) => (
            <p key={person} className="text-[11px] sm:text-xs leading-relaxed text-muted">
              {person}
            </p>
          ))}
        </div>

        <p className="mt-5 sm:mt-6 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-muted">
          {certificate.date}
        </p>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div className="w-full">
        <div
          ref={ref}
          className="m-certificate-float glass-panel relative overflow-hidden rounded-[24px] border border-line px-5 py-8"
        >
          {CertificateContent}
        </div>
      </div>
    );
  }

  return (
    <div style={{ perspective: 1200 }} className="w-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: springRX, rotateY: springRY, transformStyle: "preserve-3d" }}
        className="glass-panel relative overflow-hidden rounded-[28px] border border-line px-10 py-14"
      >
        {CertificateContent}
      </motion.div>
    </div>
  );
}
