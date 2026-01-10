"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music } from "lucide-react";
import SongsTable from "../../components/songsTable"; // Reusing the SongsTable from your Dashboard
import Link from "next/link";

export default function GospelSongsPage() {
  const [gospelSongs, setGospelSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [songSearch, setSongSearch] = useState("");

  useEffect(() => {
    async function loadData() {
      // ✅ Fetch songs from an external API (e.g., iTunes)
      const gRes = await fetch("https://itunes.apple.com/search?term=gospel&entity=song&limit=200");
      const gData = await gRes.json();
      setGospelSongs(
        gData.results?.map((v: any) => ({
          title: v.trackName,
          artist: v.artistName,
          duration: `${Math.floor(v.trackTimeMillis / 60000)}:${(
            (v.trackTimeMillis % 60000) / 1000
          ).toFixed(0).padStart(2, "0")}`,
          preview: v.previewUrl,
        })) || []
      );
      setLoading(false);
    }

    loadData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading songs...
      </div>
    );

  const filteredSongs = gospelSongs.filter((s) =>
    s.title.toLowerCase().includes(songSearch.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen text-white pb-20">
      {/* ✅ HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-6"
      >
        <h1 className="text-4xl font-extrabold tracking-wide">Gospel Songs Library</h1>
        <p className="opacity-70 mt-2">Discover and play the best gospel songs.</p>
      </motion.div>

      {/* ✅ SONG SEARCH INPUT */}
      <section className="mt-12 px-6 lg:px-10">
        <input
          placeholder="Search gospel songs..."
          value={songSearch}
          onChange={(e) => setSongSearch(e.target.value)}
          className="w-full p-3 rounded-md mb-4 bg-[#1b263b] outline-none"
        />
      </section>

      {/* ✅ SONG TABLE */}
      <section className="mt-12 px-6 lg:px-10">
        <h2 className="flex items-center gap-2 font-bold text-xl text-purple-300 mb-3">
          <Music /> Gospel Songs
        </h2>

        <SongsTable songs={filteredSongs} />
      </section>
    </div>
  );
}
