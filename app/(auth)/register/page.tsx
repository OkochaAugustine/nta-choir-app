"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    nationality: "",
    location: "",
    role: "Singer",
    part: "",
    instrument: "",
    password: "", // ✅ Added password
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Registration successful! Redirecting to login...");
        setForm({
          name: "",
          phone: "",
          email: "",
          nationality: "",
          location: "",
          role: "Singer",
          part: "",
          instrument: "",
          password: "",
        });

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1b2a] via-[#3c096c] to-[#240046] text-white relative overflow-hidden">
      {/* 🌌 Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-[#c77dff] opacity-20 rounded-full blur-3xl top-10 left-10"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-[#e0aaff] opacity-20 rounded-full blur-3xl bottom-10 right-10"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
      </div>

      {/* 🌟 Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-bold text-center mb-6 text-[#e0aaff] drop-shadow-lg"
        >
          🎤 Join Living Spring Voices
        </motion.h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c77dff] transition"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c77dff] transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c77dff] transition"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Create a strong password"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c77dff] transition"
              required
            />
          </div>

          {/* Nationality */}
          <div>
            <label className="block text-sm font-medium mb-1">Nationality</label>
            <input
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
              type="text"
              placeholder="Enter your nationality"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c77dff] transition"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              type="text"
              placeholder="City / Region"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c77dff] transition"
              required
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <motion.select
              name="role"
              value={form.role}
              onChange={handleChange}
              whileFocus={{ boxShadow: "0 0 12px #c77dff" }}
              className="w-full p-3 rounded-lg bg-[#1a1a2e]/70 text-white focus:outline-none focus:ring-2 focus:ring-[#c77dff] transition appearance-none"
            >
              <option value="Singer" className="bg-[#0d1b2a] text-white">
                Singer
              </option>
              <option value="Instrumentalist" className="bg-[#0d1b2a] text-white">
                Instrumentalist
              </option>
            </motion.select>
          </div>

          {/* Conditional Fields */}
          {form.role === "Singer" ? (
            <motion.div
              key="singer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="block text-sm font-medium mb-1">Part You Sing</label>
              <motion.select
                name="part"
                value={form.part}
                onChange={handleChange}
                whileFocus={{ boxShadow: "0 0 12px #c77dff" }}
                className="w-full p-3 rounded-lg bg-[#1a1a2e]/70 text-white focus:outline-none focus:ring-2 focus:ring-[#c77dff] transition appearance-none"
                required
              >
                <option value="">Select part</option>
                <option value="Soprano">Soprano</option>
                <option value="Alto">Alto</option>
                <option value="Tenor">Tenor</option>
                <option value="Bass">Bass</option>
              </motion.select>
            </motion.div>
          ) : (
            <motion.div
              key="instrumentalist"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="block text-sm font-medium mb-1">Instrument</label>
              <input
                name="instrument"
                value={form.instrument}
                onChange={handleChange}
                type="text"
                placeholder="E.g. Piano, Guitar, Violin"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c77dff] transition"
              />
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #c77dff" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-gradient-to-r from-[#c77dff] to-[#e0aaff] text-[#240046] font-semibold rounded-lg shadow-lg transition"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>

          {message && <p className="mt-4 text-center text-sm">{message}</p>}
        </form>

        <p className="text-center mt-5 text-sm text-gray-300">
          Already have an account?{" "}
          <Link href="/login" className="text-[#e0aaff] hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

