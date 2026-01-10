"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Music, CalendarDays, Users } from "lucide-react";
import ChoirChatBot from "@/app/components/ChoirChatBot";
import Link from "next/link";

export default function DashboardPage() {
  const [gospelSongs, setGospelSongs] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [songSearch, setSongSearch] = useState("");
  const [choirCount, setChoirCount] = useState<number>(0);

  useEffect(() => {
    async function loadData() {
      const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

      // ✅ FETCH CHOIR MEMBERS FROM BACKEND
      const membersRes = await fetch("/api/choir-members");
      const membersData = await membersRes.json();
      setChoirCount(membersData.members?.length || 0);

      // ✅ FETCH SONGS
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

      // ✅ FETCH VIDEOS
      const yRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=choir vocal training tutorial&type=video&maxResults=8&key=${apiKey}`
      );
      const yData = await yRes.json();
      setVideos(
        yData.items?.map((v: any) => ({
          title: v.snippet.title,
          url: `https://www.youtube.com/embed/${v.id.videoId}`,
          cover: v.snippet.thumbnails.medium.url,
        })) || []
      );

      setLoading(false);
    }

    loadData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading dashboard...
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
        <h1 className="text-4xl font-extrabold tracking-wide">Living Spring Voices Dashboard</h1>
        <p className="opacity-70 mt-2">Manage songs, rehearsals, and choir activities beautifully.</p>
      </motion.div>

      {/* ✅ PROFESSIONAL LIVE DASHBOARD STATS */}
      <section className="px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link href="/dashboard/members">
          <div className="cursor-pointer border-l-4 border-purple-500 pl-4 hover:bg-white/5 p-3 rounded-lg transition">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users /> Choir Members
            </h3>
            <p className="text-3xl font-extrabold mt-1">{choirCount}</p>
          </div>
        </Link>

        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="text-lg font-semibold">Upcoming Rehearsals</h3>
          <p className="text-3xl font-extrabold mt-1">3</p>
        </div>

        <div className="border-l-4 border-pink-500 pl-4">
          <h3 className="text-lg font-semibold">Announcements</h3>
          <p className="text-3xl font-extrabold mt-1">5</p>
        </div>
      </section>

      {/* ✅ TRAINING VIDEOS */}
      <section className="mt-12 px-6 lg:px-10">
        <h2 className="flex items-center gap-2 font-bold text-xl text-purple-300 mb-4">
          <CalendarDays /> Choir Video Tutorials
        </h2>

        <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
          {videos.map((v, i) => (
            <div
              key={i}
              className="min-w-[250px] md:min-w-[320px] bg-[#1b263b] rounded-xl overflow-hidden shadow-lg"
            >
              <iframe src={v.url} className="w-full h-48 md:h-56" allowFullScreen />
              <p className="text-xs text-center p-2">{v.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ SONG TABLE */}
      <section className="mt-12 px-6 lg:px-10">
        <h2 className="flex items-center gap-2 font-bold text-xl text-purple-300 mb-3">
          <Music /> Gospel Songs Library
        </h2>

        <input
          placeholder="Search songs..."
          value={songSearch}
          onChange={(e) => setSongSearch(e.target.value)}
          className="w-full p-3 rounded-md mb-4 bg-[#1b263b] outline-none"
        />

        <SongsTable songs={filteredSongs} />
      </section>

      {/* ✅ CHATBOT */}
      <section className="mt-10 px-6 lg:px-10 max-w-3xl mx-auto">
        <ChoirChatBot />
      </section>
    </div>
  );
}

function SongsTable({ songs }: { songs: any[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = (url: string) => {
    if (!audioRef.current) return;
    audioRef.current.src = url;
    audioRef.current.play();
  };

  return (
    <>
      <audio ref={audioRef} hidden />
      <div className="overflow-x-auto overflow-y-auto max-h-[400px] border border-white/10 rounded-lg">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-[#3c096c]/50 text-purple-200 uppercase text-xs">
            <tr>
              <th className="p-3">Song</th>
              <th className="p-3">Artist</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Play</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((s, i) => (
              <tr key={i} className="border-b border-white/10 hover:bg-white/5 transition">
                <td className="p-3">{s.title}</td>
                <td className="p-3">{s.artist}</td>
                <td className="p-3">{s.duration}</td>
                <td className="p-3">
                  <button
                    onClick={() => play(s.preview)}
                    className="py-1.5 px-4 rounded-full bg-purple-600 hover:bg-purple-700"
                  >
                    ▶ Play
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
