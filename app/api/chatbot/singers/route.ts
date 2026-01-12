// /app/api/chatbot/singers/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose, { Document, Model } from "mongoose";

// Define Singer document type
interface SingerDoc extends Document {
  name: string;
  isSunday: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define Singer schema
const SingerSchema = new mongoose.Schema<SingerDoc>(
  {
    name: { type: String, required: true },
    isSunday: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create model if it doesn't exist
const Singer: Model<SingerDoc> = mongoose.models.Singer || mongoose.model<SingerDoc>("Singer", SingerSchema);

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Fetch Sunday singers
    const sundaySingers = await Singer.find({ isSunday: true }).lean();

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
