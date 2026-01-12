import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Schema
const SingerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String },
    service: { type: String },
  },
  { timestamps: true }
);

// Model
const SingerThisSunday =
  mongoose.models.SingerThisSunday ||
  mongoose.model("SingerThisSunday", SingerSchema);

export async function GET() {
  try {
    await connectDB();

    const singers = await SingerThisSunday.find().sort({ createdAt: 1 });

    if (!singers.length) {
      return NextResponse.json({ message: "No singers assigned for this Sunday yet." });
    }

    return NextResponse.json({ singers });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("❌ Error fetching singers:", errMsg);
    return NextResponse.json({ message: "Error fetching singers." }, { status: 500 });
  }
}
