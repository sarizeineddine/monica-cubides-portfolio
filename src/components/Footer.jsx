import { portfolioData } from "@/data/portfolioData";

export default function Footer() {
  const { identity, footer, contact } = portfolioData;

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative border-t border-line"
      style={{ backgroundColor: "var(--color-ink)" }}
    >
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-display text-lg font-semibold text-paper">{identity.name}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{identity.role}</p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted mt-1">{identity.secondaryRole} - Aliada Skandia</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{footer.text}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="text-sm text-muted transition-colors hover:text-accent">
              WhatsApp
            </a>
            <a href={`mailto:${contact.email}`} className="text-sm text-muted transition-colors hover:text-accent">
              Correo
            </a>
            <button
              type="button"
              onClick={scrollTop}
              aria-label="Volver arriba"
              className="group flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted transition-colors hover:text-accent"
            >
              Arriba
              <svg
                className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {identity.name}. {footer.legal}
          </p>
          <p style={{ opacity: 0.7 }}>{identity.alliance}</p>
        </div>
      </div>
    </footer>
  );
}
