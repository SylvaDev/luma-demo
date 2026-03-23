"use client";
import { motion } from "framer-motion";

export default function Testimonials() {
  const t = [
    "This setup changed my room 🔥",
    "Feels like a $10k studio",
    "Best upgrade this year",
  ];

  return (
    <section className="py-20 flex flex-col items-center gap-6">
      {t.map((x, i) => (
        <motion.div key={i} whileInView={{ opacity: 1 }} initial={{ opacity: 0 }}>
          {x}
        </motion.div>
      ))}
    </section>
  );
}