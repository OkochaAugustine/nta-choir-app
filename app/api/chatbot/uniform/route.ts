// /app/api/chatbot/uniform/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import mongoose from "mongoose";

// --- Define Uniform Schema ---
const UniformSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    isSunday: { type: Boolean, default: false },
    postedBy: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

// --- Register Model (or reuse existing) ---
const Uniform = mongoose.models.Uniform || mongoose.model("Uniform", UniformSchema);

// --- GET Endpoint ---
export async function GET() {
  try {
    await connectDB(); // ✅ Ensure DB is connected

    const sundayUniform = await Uniform.findOne({ isSunday: true }).sort({ createdAt: -1 });

    if (!sundayUniform) {
      return NextResponse.json({
        message: "No uniform assigned for this Sunday yet.",
      });
    }

    return NextResponse.json({
      message: `Uniform for this Sunday: ${sundayUniform.description}`,
    });
  } catch (err) {
    console.error("❌ Error fetching Sunday uniform:", err);
    return NextResponse.json(
      { message: "Error fetching Sunday uniform." },
      { status: 500 }
    );
  }
}
