"use client";

import { motion } from "framer-motion";

import { site } from "@/content/site";

export default function CTA() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl md:p-12"
      >
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{site.cta.title}</h2>
        <p className="mt-4 text-white/60">{site.cta.body}</p>
        <a
          href="#store"
          className="mt-8 inline-flex rounded-full bg-[#FF5A1F] px-8 py-3.5 text-sm font-medium text-white shadow-[0_0_32px_rgba(255,90,31,0.4)] transition hover:bg-[#ff6b35]"
        >
          {site.cta.button}
        </a>
      </motion.div>
    </section>
  );
}
