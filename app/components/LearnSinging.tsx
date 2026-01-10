"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LearnSinging() {
  return (
    <section
      id="learn"
      className="relative bg-[#0d1b2a] text-white py-20 px-6 overflow-hidden"
    >
      {/* 🌌 Clear and vivid background image */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute inset-0"
      >
        <Image
          src="/images/learn-bg.jpg"
          alt="Learn Singing Background"
          fill
          priority
          className="object-cover opacity-90 brightness-105 contrast-115"
        />
        {/* Softer gradient overlay to preserve clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a]/30 via-[#0d1b2a]/50 to-[#0d1b2a]/85"></div>
      </motion.div>

      {/* 💫 Foreground content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Learn the Art of Singing
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-100 max-w-3xl mx-auto mb-12 leading-relaxed text-lg"
        >
          Discover your voice, master the techniques, and learn how to sing with
          power and confidence. Join our classes and take your passion to a
          professional level.
        </motion.p>

        {/* 🎵 Info cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Vocal Training",
              desc: "Learn breath control, vocal range, and tone improvement from expert coaches.",
              img: "/images/vocal.jpg",
            },
            {
              title: "Stage Performance",
              desc: "Build your confidence and presence on stage with our performance masterclasses.",
              img: "/images/stage.jpg",
            },
            {
              title: "Choir Harmony",
              desc: "Experience the joy of singing in harmony and performing as part of a powerful choir.",
              img: "/images/microphone.jpg",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/15 rounded-2xl overflow-hidden backdrop-blur-md shadow-lg hover:scale-[1.03] transition-transform"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-[#e0aaff]">
                  {item.title}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <button className="bg-[#e0aaff] hover:bg-[#c77dff] text-black font-semibold py-3 px-10 rounded-full transition-transform hover:scale-105 shadow-xl">
            Start Learning
          </button>
        </motion.div>
      </div>
    </section>
  );
}

