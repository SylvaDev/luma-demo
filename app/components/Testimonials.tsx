"use client";

import { motion } from "framer-motion";

import { site } from "@/content/site";

export default function Testimonials() {
  return (
    <section id="stories" className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-medium uppercase tracking-[0.35em] text-white/50"
        >
          {site.testimonials.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-3 text-3xl font-semibold tracking-tight"
        >
          {site.testimonials.title}
        </motion.h2>
        <ul className="mt-12 flex flex-col gap-5 text-left md:gap-6">
          {site.testimonials.quotes.map((q, i) => (
            <motion.li
              key={q.text}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur-md md:px-8 md:py-6"
            >
              <p className="text-lg text-white/90 md:text-xl">&ldquo;{q.text}&rdquo;</p>
              <p className="mt-3 text-sm text-white/45">{q.by}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
