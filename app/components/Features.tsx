"use client";
import { motion } from "framer-motion";

export default function Features() {
  const items = ["Custom Color Scenes", "Music Sync", "App Control"];

  return (
    <section className="py-20 flex flex-col items-center gap-6">
      {items.map((f, i) => (
        <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          {f}
        </motion.div>
      ))}
    </section>
  );
}