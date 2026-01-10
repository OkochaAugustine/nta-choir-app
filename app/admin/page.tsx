"use client";

import { useState } from "react";

export default function AdminDashboard() {
  // Song uploader states
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [cover, setCover] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  // Duty roster states
  const [rosterText, setRosterText] = useState("");
  const [rosterMessage, setRosterMessage] = useState("");

  // Song upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !artist || !audioFile) {
      setMessage("❌ Title, Artist, and Audio file are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("year", year);
    formData.append("language", language);
    formData.append("lyrics", lyrics);
    formData.append("cover", cover);
    formData.append("audio", audioFile);

    try {
      const res = await fetch("/admin/api/upload-song", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("✅ Song uploaded successfully!");
        setTitle("");
        setArtist("");
        setYear("");
        setLanguage("");
        setLyrics("");
        setCover("");
        setAudioFile(null);
      } else {
        const data = await res.json();
        setMessage(`❌ Upload failed: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed: Server error");
    }
  };

  // Duty Roster Submit
  const submitRoster = async () => {
    if (!rosterText.trim()) {
      setRosterMessage("❌ Duty roster text is required");
      return;
    }

    try {
      const res = await fetch("/admin/api/duty-roster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roster: rosterText }),
      });

      if (res.ok) {
        setRosterMessage("✅ Duty roster posted successfully!");
        setRosterText("");
      } else {
        const data = await res.json();
        setRosterMessage(`❌ Failed: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setRosterMessage("❌ Server error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex flex-col items-center p-6 space-y-10">

      {/* SONG UPLOAD */}
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard – Upload Songs</h1>

        <form
          className="bg-[#1b273b] rounded-lg p-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Song Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-[#0d1b2a]/50"
          />
          <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full p-2 rounded bg-[#0d1b2a]/50"
          />
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-2 rounded bg-[#0d1b2a]/50"
          />
          <input
            type="text"
            placeholder="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 rounded bg-[#0d1b2a]/50"
          />
          <input
            type="text"
            placeholder="Cover Photo URL"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            className="w-full p-2 rounded bg-[#0d1b2a]/50"
          />
          <textarea
            placeholder="Lyrics"
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            className="w-full p-2 rounded bg-[#0d1b2a]/50"
            rows={3}
          />
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="w-full text-sm"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 p-2 rounded font-semibold transition"
          >
            Upload Song
          </button>
        </form>

        {message && <p className="mt-4 text-center">{message}</p>}
      </div>

      {/* DUTY ROSTER SECTION */}
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Post Duty Roster</h2>

        <div className="bg-[#1b273b] p-6 rounded-lg space-y-4">
          <textarea
            placeholder="Enter duty roster text (for chatbot)..."
            value={rosterText}
            onChange={(e) => setRosterText(e.target.value)}
            className="w-full p-2 rounded bg-[#0d1b2a]/50"
            rows={5}
          />

          <button
            onClick={submitRoster}
            className="w-full bg-green-600 hover:bg-green-500 p-2 rounded font-semibold transition"
          >
            Post Duty Roster
          </button>

          {rosterMessage && (
            <p className="text-center mt-2">{rosterMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

