"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#0d1b2a] text-gray-300 py-16 px-6 overflow-hidden">
      {/* ✨ Animated Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-[#1b263b] to-transparent opacity-90"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* 🕊️ Left - Logo & Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-[#e0aaff] mb-4">Living Spring Voices</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Inspiring hearts through powerful voices — lifting souls and spreading harmony
            across generations through gospel music and faith-driven artistry.
          </p>
        </motion.div>

        {/* 📞 Middle - Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h4 className="text-xl font-semibold text-[#e0aaff] mb-3">Contact Us</h4>
          <p>Email: <span className="text-[#e0aaff]">ntalivingvoices@gmail.com</span></p>
          <p>Phone: <span className="text-[#e0aaff]">+234 803 123 4567</span></p>
          <p>Location: NTA LFC Living Spring Church, Nigeria</p>
        </motion.div>

        {/* 🔗 Right - Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h4 className="text-xl font-semibold text-[#e0aaff] mb-3">Quick Links</h4>
          <ul className="space-y-2">
            {["Home", "About", "Learn Singing", "Gallery", "Join Us"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-[#c77dff] transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="relative z-10 mt-12 border-t border-gray-700 pt-6 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} NTA Living Spring Voices. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
