// /app/api/chatbot/song/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import mongoose from "mongoose";

// Define Song schema
const SongSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String },
    url: { type: String }, // optional: for audio link
    lyrics: { type: String },
    isSunday: { type: Boolean, default: false }, // flag for Sunday song
  },
  { timestamps: true }
);

// Create model if it doesn't exist
const Song = mongoose.models.Song || mongoose.model("Song", SongSchema);

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Fetch latest Sunday song
    const sundaySong = await Song.findOne({ isSunday: true }).sort({ createdAt: -1 });

    if (!sundaySong) {
      return NextResponse.json({ message: "No song assigned for this Sunday yet." });
    }

    return NextResponse.json({ message: `Song for this Sunday: ${sundaySong.title}` });
  } catch (err) {
    console.error("❌ Error fetching Sunday song:", err);
    return NextResponse.json(
      { message: "Error fetching Sunday song." },
      { status: 500 }
    );
  }
}
