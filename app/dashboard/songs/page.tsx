"use client";

import { useEffect, useState } from "react";
import { Music } from "lucide-react";

export default function SongsPage() {
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const res = await fetch("/api/songs");
        const data = await res.json();
        setSongs(data?.data || []);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSongs();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="flex gap-2 items-center text-3xl font-bold mb-6">
        <Music className="text-purple-400" /> Uploaded Songs
      </h1>

      {loading ? (
        <p>Loading songs...</p>
      ) : songs.length === 0 ? (
        <p className="text-gray-300">No songs uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {songs.map((song, idx) => (
            <div
              key={idx}
              className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition"
            >
              <p className="font-bold">{song.title}</p>
              <p className="text-sm text-gray-300">{song.artist}</p>

              <audio controls className="w-full mt-3">
                <source src={song.url} />
              </audio>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
