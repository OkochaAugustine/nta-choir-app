"use client";

import { useRef } from "react";
import GospelYouTubeVideos from "@/app/components/GospelYouTubeVideos";

export default function SongsTable({ songs }: { songs: any[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = (url: string) => {
    if (!audioRef.current) return;
    audioRef.current.src = url;
    audioRef.current.play();
  };

  return (
    <>
      <audio ref={audioRef} hidden />

      {/* 🎵 SONGS TABLE */}
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
              <tr
                key={i}
                className="border-b border-white/10 hover:bg-white/5 transition"
              >
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

      {/* 🎥 GOSPEL YOUTUBE VIDEOS */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">
          🎥 Gospel Worship Videos
        </h2>

        <GospelYouTubeVideos />
      </section>
    </>
  );
}
