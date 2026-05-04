"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { site } from "@/content/site";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.35]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center md:pt-0"
    >
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-3xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-[#FF5A1F]/90">
          {site.hero.eyebrow}
        </p>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl md:leading-[1.05]">
          {site.hero.titleLine1}
          <br />
          <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            {site.hero.titleLine2}
          </span>
        </h1>
        <p className="mt-6 text-balance text-base text-white/70 md:text-lg">
          {site.hero.sub}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#store"
            className="inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#0a0a0c] transition hover:bg-white/90"
          >
            {site.hero.primaryCta}
          </a>
          <a
            href="#features"
            className="inline-flex rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-medium text-white/90 backdrop-blur-sm transition hover:border-white/40 hover:bg-white/10"
          >
            {site.hero.secondaryCta}
          </a>
        </div>
        <div className="mt-16 inline-flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] uppercase tracking-[0.3em]">{site.hero.scroll}</span>
          <motion.span
            className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent"
            animate={{ scaleY: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
