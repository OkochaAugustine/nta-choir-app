import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Song from "@/models/Song";

export async function GET() {
  try {
    await connectDB();

    // Fetch all songs, most recent first
    const songs = await Song.find().sort({ createdAt: -1 }).limit(50);

    return NextResponse.json({ success: true, data: songs });
  } catch (err: any) {
    console.error("❌ Failed to fetch songs:", err);
    return NextResponse.json(
      { success: false, data: [], error: err.message },
      { status: 500 }
    );
  }
}
