"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Gallery() {
  const galleryImages = [
    "/images/galary.jpg",
    "/images/galary2.jpg",
    "/images/galary3.jpg",
    "/images/galary4.jpg",
    "/images/galary5.jpg",
    "/images/galary6.jpg",
    "/images/galary7.jpg",
    "/images/galary8.jpg",
    "/images/galary9.jpg",
    "/images/galary10.jpg",
  ];

  return (
    <section
      id="gallery"
      className="relative py-24 px-6 md:px-16 text-gray-100 overflow-hidden"
    >
      {/* 🎵 Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/gallery-bg.jpg" // 👈 Put your background image here
          alt="Gallery background"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
      </div>

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* ✨ Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-10 text-[#FFD700] drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]"
        >
          Our Gallery
        </motion.h2>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-5 space-y-5">
          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer border border-white/10"
            >
              <Image
                src={src}
                alt={`Gallery ${i + 1}`}
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-4 text-white text-sm">
                <span className="italic">
                  Captured moments of praise & worship
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
