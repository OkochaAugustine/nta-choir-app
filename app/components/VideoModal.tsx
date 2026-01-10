"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function VideoModal({
  videoId,
  onClose,
}: {
  videoId: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black/60 p-2 rounded-full"
        >
          <X />
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full"
        />
      </motion.div>
    </motion.div>
  );
}
