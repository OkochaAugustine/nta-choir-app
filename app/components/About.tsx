"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="bg-white text-gray-800 py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-[#b8860b]"
        >
          About Us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600"
        >
          The Living Spring Voices is a vibrant choir of the NTA LFC assembly — a family of passionate
          worshippers committed to glorifying God through soul-lifting music and excellent ministry.
          We believe that every voice is a divine instrument to touch lives, heal hearts, and bring
          hope to the world.
        </motion.p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Our Vision",
              text: "To be a globally recognized choir that transforms lives through inspired worship and the beauty of sound.",
              icon: "🌍",
            },
            {
              title: "Our Mission",
              text: "To raise dedicated worshippers who blend musical excellence with spiritual passion to glorify God.",
              icon: "🔥",
            },
            {
              title: "Our Core Values",
              text: "Faith, Excellence, Discipline, and Unity — the pillars that define who we are and how we sing.",
              icon: "🎵",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 shadow-md border-t-4 border-[#b8860b] text-left"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold text-[#b8860b] mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
