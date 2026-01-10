"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Login successful! Redirecting...");
        // ⏳ Redirect after short delay
        setTimeout(() => {
          router.push("/dashboard"); // 👈 Change this path if needed
        }, 2000);
      } else {
        setMessage(`❌ ${data.message || "Invalid credentials."}`);
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

      {/* 💫 Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-bold text-center mb-6 text-[#e0aaff] drop-shadow-lg"
        >
          🎶 Welcome Back
        </motion.h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c77dff] transition"
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #c77dff" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-gradient-to-r from-[#c77dff] to-[#e0aaff] text-[#240046] font-semibold rounded-lg shadow-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          {/* Feedback Message */}
          {message && (
            <p className="mt-4 text-center text-sm">{message}</p>
          )}
        </form>

        {/* Link to Register */}
        <p className="text-center mt-5 text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link href="/register" className="text-[#e0aaff] hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

