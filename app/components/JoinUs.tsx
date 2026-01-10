"use client";

import { motion } from "framer-motion";

export default function ContactJoin() {
  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#0d1b2a] text-gray-200 py-24 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-[#e0aaff]"
        >
          Get in Touch
        </motion.h2>

        <p className="max-w-3xl mx-auto mb-12 text-gray-300 text-lg">
          We’d love to hear from you — whether you want to learn, partner, or join the Living Spring
          Voices family.
        </p>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 text-left">
          {[
            {
              icon: "📍",
              title: "Visit Us",
              text: "Living Faith Church, NTA Area, Enugu, Nigeria",
            },
            {
              icon: "📞",
              title: "Call Us",
              text: "+234 803 123 4567",
            },
            {
              icon: "✉️",
              title: "Email Us",
              text: "ntalivingspringvoices@gmail.com",
            },
          ].map((info, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-md hover:bg-white/20 border border-white/10"
            >
              <div className="text-4xl mb-3">{info.icon}</div>
              <h3 className="text-xl font-semibold text-[#e0aaff] mb-2">
                {info.title}
              </h3>
              <p className="text-gray-300">{info.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Join Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-20 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-2xl p-10 max-w-4xl mx-auto text-center shadow-lg"
        >
          <h3 className="text-3xl font-bold text-[#e0aaff] mb-4">
            Join the Choir Family
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            There’s a place for your voice! Whether you sing, play an instrument, or love worship,
            come be part of something bigger.
          </p>
          <button className="bg-[#e0aaff] hover:bg-[#c77dff] text-black font-semibold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-lg">
            Become a Member
          </button>
        </motion.div>
      </div>
    </section>
  );
}
