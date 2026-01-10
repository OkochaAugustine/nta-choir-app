"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import VideoModal from "./VideoModal";

type Video = {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  category: string;
};

const categories = [
  "All",
  "Praise",
  "Worship",
  "Choir",
  "Instrumental",
];

export default function GospelYouTubeVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=gospel worship choir&type=video&maxResults=50&videoCategoryId=10&key=${apiKey}`
        );

        const data = await res.json();

        const formatted = data.items.map((item: any) => {
          const title = item.snippet.title.toLowerCase();

          let category = "Worship";
          if (title.includes("praise")) category = "Praise";
          if (title.includes("choir")) category = "Choir";
          if (title.includes("instrumental")) category = "Instrumental";

          return {
            id: item.id.videoId,
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            thumbnail: item.snippet.thumbnails.high.url,
            category,
          };
        });

        setVideos(formatted);
      } catch (err) {
        console.error("YouTube fetch error", err);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  const filteredVideos =
    activeCategory === "All"
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  if (loading) {
    return <p className="text-center py-10 opacity-70">Loading videos...</p>;
  }

  return (
    <>
      {/* 🎛 CATEGORY FILTER */}
      <div className="flex gap-3 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              activeCategory === cat
                ? "bg-purple-600"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🎥 VIDEO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <motion.div
            key={video.id}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedVideo(video.id)}
            className="cursor-pointer bg-[#1b263b] rounded-xl overflow-hidden border border-white/10"
          >
            <div className="relative w-full h-52">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <PlayCircle size={60} />
              </div>
            </div>

            <div className="p-3">
              <h3 className="text-sm font-semibold line-clamp-2">
                {video.title}
              </h3>
              <p className="text-xs opacity-60 mt-1">{video.channel}</p>
              <span className="text-xs text-purple-300">
                {video.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🎬 MODAL */}
      {selectedVideo && (
        <VideoModal
          videoId={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
}
