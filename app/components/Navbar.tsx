"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full relative z-[50] overflow-hidden"
    >
      {/* 🔥 Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2a] via-[#3c096c] to-[#240046] animate-gradient-x opacity-95 backdrop-blur-lg shadow-lg"></div>

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 relative z-10 text-white">
        {/* LOGO */}
        <Link href="#home" className="flex items-center gap-3 flex-none">
          <div className="w-14 h-14 relative flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Living Spring Voices Logo"
              fill
              className="object-contain rounded-full drop-shadow-lg"
              priority
            />
          </div>
          <span className="hidden sm:inline-block text-lg md:text-xl font-semibold tracking-wide text-white drop-shadow-md">
            Living Spring Voices
          </span>
        </Link>

        {/* ✨ Animated Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
          className="relative font-extrabold text-lg md:text-2xl text-[#e0aaff] animate-pulse whitespace-nowrap drop-shadow-[0_0_12px_rgba(224,170,255,0.8)]"
        >
          <Link
            href="login"
            className="hover:text-[#c77dff] hover:scale-105 transition-all duration-300"
          >
            Click here to explore 
          </Link>

          {/* ✨ Animated underline */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2.5,
              ease: "easeInOut",
            }}
            className="absolute left-0 bottom-[-4px] h-[2px] bg-gradient-to-r from-[#e0aaff] to-[#c77dff] shadow-[0_0_8px_#c77dff]"
          ></motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
