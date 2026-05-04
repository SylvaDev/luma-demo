"use client";

import { LayoutGroup, motion } from "framer-motion";

import { useTileTheme, type TileThemeId } from "@/app/context/ThemeContext";
import { site } from "@/content/site";

const THEME_ORDER: TileThemeId[] = ["warm", "cyan"];

export default function Navbar() {
  const { theme, setTheme } = useTileTheme();

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 z-40 flex w-full items-center justify-between gap-4 border-b border-white/10 bg-black/35 px-5 py-4 backdrop-blur-xl md:px-8"
    >
      <span className="text-lg font-semibold tracking-[0.35em] text-white/95">
        {site.brand.nameUpper}
      </span>

      <div className="flex flex-1 items-center justify-end gap-3 md:gap-5">
        <LayoutGroup>
        <div
          role="group"
          aria-label={site.theme.aria}
          className="flex rounded-full border border-white/15 bg-black/40 p-1"
        >
          {THEME_ORDER.map((id) => {
            const label = id === "warm" ? site.theme.warm : site.theme.cyan;
            const active = theme === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTheme(id)}
                className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition md:px-4 ${
                  active
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="theme-pill"
                    className="absolute inset-0 rounded-full bg-white/12"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>
        </LayoutGroup>

        <nav className="hidden items-center gap-5 text-sm text-white/70 sm:flex">
          <a href="#features" className="transition hover:text-white">
            {site.nav.features}
          </a>
          <a href="#stories" className="transition hover:text-white">
            {site.nav.stories}
          </a>
        </nav>

        <a
          href="#store"
          className="shrink-0 rounded-full bg-[#FF5A1F] px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(255,90,31,0.45)] transition hover:bg-[#ff6b35] hover:shadow-[0_0_32px_rgba(255,90,31,0.55)] md:px-5"
        >
          {site.nav.buy}
        </a>
      </div>
    </motion.header>
  );
}
