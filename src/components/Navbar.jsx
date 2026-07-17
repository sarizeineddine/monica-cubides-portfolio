import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { nav } = portfolioData;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-4 sm:top-6 z-50 flex justify-center px-3 sm:px-5 pointer-events-none">
      <nav
        className="flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border transition-all duration-500 pointer-events-auto sm:w-auto sm:gap-8"
        style={{
          backgroundColor: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg-top)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
          borderColor: scrolled ? "var(--nav-border-scrolled)" : "var(--nav-border-top)",
          boxShadow: scrolled ? "0 10px 40px -10px rgba(0,0,0,0.3)" : "none",
          padding: scrolled ? "0.7rem 1.1rem" : "0.6rem 1.1rem",
        }}
      >
        <a
          href="#inicio"
          onClick={(e) => { e.preventDefault(); handleNavClick("#inicio"); }}
          className="flex flex-col min-w-0"
        >
          <span className="font-display text-sm sm:text-base font-bold tracking-tight text-paper uppercase truncate">
            Monica Cubides
          </span>
          <span className="hidden sm:block text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">
            Planeacion Financiera
          </span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="nav-link text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          <button
            onClick={() => handleNavClick("#contacto")}
            className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full transition-all hover:scale-105"
            style={{ backgroundColor: "var(--color-accent)", color: "#04140a" }}
          >
            {nav.cta}
          </button>

          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-[5px] p-2 -m-1"
          >
            <div className={`h-[2px] w-5 bg-paper transition-transform duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
            <div className={`h-[2px] w-5 bg-paper transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <div className={`h-[2px] w-5 bg-paper transition-transform duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-16 left-3 right-3 border border-line rounded-3xl p-5 md:hidden pointer-events-auto shadow-2xl"
            style={{ backgroundColor: "var(--color-ink)" }}
          >
            <ul className="flex flex-col gap-4">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-lg font-semibold text-paper block py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <button
                onClick={() => handleNavClick("#contacto")}
                className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm mt-2"
                style={{ backgroundColor: "var(--color-accent)", color: "#04140a" }}
              >
                {nav.cta}
              </button>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
