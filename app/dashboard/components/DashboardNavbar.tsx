"use client";

import { Menu } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface DashboardNavbarProps {
  onMenuClick: () => void;
}

export default function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
  // Animate the title on mount
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, scale: 1 });
  }, [controls]);

  return (
    <header className="w-full h-14 flex items-center px-4 justify-between
                       bg-gradient-to-r from-purple-900 via-pink-600 to-indigo-800
                       animate-gradient-x border-b border-gray-700 shadow-lg">
      {/* Mobile menu button */}
      <motion.button
        className="lg:hidden text-white p-2 rounded-full hover:bg-white/10 transition-all"
        onClick={onMenuClick}
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9, rotate: -10 }}
      >
        <Menu size={26} />
      </motion.button>

      {/* Animated title */}
      <motion.h1
        className="text-white text-lg font-semibold tracking-wide flex items-center gap-2"
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={controls}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="animate-pulse">🎶</span> Living Spring Voices Dashboard
      </motion.h1>
    </header>
  );
}
