"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users, Music } from "lucide-react";

export default function RehearsalPage() {
  const schedules = [
    {
      day: "Tuesday",
      time: "5:00 PM - 6:30 PM",
    },
    {
      day: "Saturday",
      time: "1:00 PM - 3:00 PM",
    },
  ];

  const steps = [
    "Start with a short prayer 🙏",
    "Vocal warm-ups and exercises 🎤",
    "Choir training & practice songs 🎵",
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-purple-900 to-[#1b263b] text-white pb-20">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-10 px-6"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
          Choir Rehearsal Schedule
        </h1>
        <p className="mt-3 text-lg opacity-70">
          Join us to worship, train your voice, and grow in spirit-filled music.
        </p>
      </motion.div>

      {/* Rehearsal Cards */}
      <section className="px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {schedules.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-[#2b2f4c] p-6 rounded-xl shadow-lg border-l-4 border-purple-500 hover:scale-105 hover:shadow-2xl transition-transform"
          >
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CalendarDays /> {s.day} Rehearsal
            </h2>
            <p className="mt-2 text-lg opacity-80">{s.time}</p>
          </motion.div>
        ))}
      </section>

      {/* Rehearsal Steps */}
      <section className="mt-16 px-6 md:px-10 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-2"
        >
          <Music /> What We Do During Rehearsals
        </motion.h2>

        <ol className="list-decimal list-inside space-y-4 text-white/90">
          {steps.map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-[#1b263b] p-4 rounded-lg border-l-4 border-pink-500 shadow-md hover:bg-[#3c096c]/50 transition"
            >
              {step}
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Venue */}
      <section className="mt-16 px-6 md:px-10 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2"
        >
          <MapPin /> Venue
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#1b263b] p-6 rounded-xl border-l-4 border-green-500 shadow-md text-white/90"
        >
          Church Premises, Nigeria, Asaba, Delta State <br />
          Behind NTA opposite Ladiva Hotel
        </motion.p>
      </section>

      {/* Join Us Call-to-Action */}
      <section className="mt-20 text-center px-6">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition"
        >
          Join Our Next Rehearsal
        </motion.button>
      </section>
    </div>
  );
}
