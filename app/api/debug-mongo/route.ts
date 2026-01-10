import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  const uri = process.env.MONGODB_URI;
  console.log("URI in Next.js:", uri ? uri.replace(/:[^:]*@/, ":****@") : "undefined");

  if (!uri) {
    return NextResponse.json({ ok: false, error: ".env not loaded" });
  }

  try {
    await mongoose.connect(uri);
    return NextResponse.json({ ok: true, message: "Connected successfully!" });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message });
  }
}
