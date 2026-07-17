import { motion } from "framer-motion";

export default function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="relative flex h-8 w-14 items-center rounded-full border border-line p-1 transition-colors duration-300"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <motion.div
        className="flex h-6 w-6 items-center justify-center rounded-full"
        animate={{ x: isDark ? 22 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ backgroundColor: "var(--color-accent)", color: "#04140a" }}
      >
        {isDark ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
      </motion.div>
    </button>
  );
}
