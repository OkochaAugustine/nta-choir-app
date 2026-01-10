"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [notes, setNotes] = useState<{ left: string; size: number }[]>([]);

  useEffect(() => {
    // Only run on client side (avoids hydration mismatch)
    const generatedNotes = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      size: Math.floor(Math.random() * 40) + 20,
    }));
    setNotes(generatedNotes);
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center text-center py-52 px-6 overflow-hidden bg-gradient-to-b from-[#2b1055] via-[#7597de] to-[#e0aaff]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero background"
          fill
          className="object-cover opacity-50"
        />
      </div>

      {/* Animated Floating Music Notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {notes.map((note, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{
              y: ["100vh", "-10vh"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute text-white"
            style={{
              left: note.left,
              fontSize: `${note.size}px`,
            }}
          >
            🎵
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-wide drop-shadow-2xl text-white z-10">
        Voices That Move the Soul
      </h1>
      <p className="text-lg md:text-2xl text-gray-200 max-w-2xl z-10">
        Experience the art of singing — where emotion, rhythm, and voice unite in perfect harmony.
      </p>
      <button className="mt-8 bg-[#e0aaff] hover:bg-[#c77dff] text-black font-semibold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-lg z-10">
        Join the Movement
      </button>
    </section>
  );
}


