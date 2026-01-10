// /app/api/chatbot/singers/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import mongoose from "mongoose";

// Define Singer schema
const SingerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isSunday: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create model if it doesn't exist
const Singer = mongoose.models.Singer || mongoose.model("Singer", SingerSchema);

export async function GET() {
  try {
    // Connect to MongoDB using Mongoose
    await connectDB();

    // Fetch Sunday singers
    const sundaySingers = await Singer.find({ isSunday: true });

    if (!sundaySingers.length) {
      return NextResponse.json({ message: "No singers assigned for this Sunday yet." });
    }

    const singerNames = sundaySingers.map(s => s.name).join(", ");
    return NextResponse.json({ message: `Singers this Sunday: ${singerNames}` });
  } catch (err) {
    console.error("❌ Error fetching Sunday singers:", err);
    return NextResponse.json({ message: "Error fetching Sunday singers." }, { status: 500 });
  }
}
