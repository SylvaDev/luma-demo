"use client";

import { motion } from "framer-motion";

import { site } from "@/content/site";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#020204]"
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="h-12 w-12 rounded-full border-2 border-white/15 border-t-[#FF5A1F]"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-sm tracking-wide text-white/60">{site.loader.message}</p>
      </div>
    </motion.div>
  );
}
