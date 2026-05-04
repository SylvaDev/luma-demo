"use client";

import { motion } from "framer-motion";

import { site } from "@/content/site";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Features() {
  return (
    <section id="features" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xs font-medium uppercase tracking-[0.35em] text-[#FF5A1F]/90"
        >
          {site.features.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-3 text-center text-3xl font-semibold tracking-tight md:text-4xl"
        >
          {site.features.title}
        </motion.h2>
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {site.features.items.map((f) => (
            <motion.li
              key={f.title}
              variants={item}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/10 bg-black/40 p-7 backdrop-blur-md"
            >
              <h3 className="text-lg font-medium text-white">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{f.copy}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
