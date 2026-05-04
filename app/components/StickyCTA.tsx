"use client";

import { motion } from "framer-motion";

import { site } from "@/content/site";

export default function StickyCTA() {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
    >
      <a
        href="#store"
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-6 py-3 text-sm font-medium text-white shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF5A1F]" />
        {site.stickyCta.label}
      </a>
    </motion.div>
  );
}
