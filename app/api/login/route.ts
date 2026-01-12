// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import ChoirMember from "@/models/ChoirMember";


export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Simple validation
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
    }

    // Connect to DB
    await connectDB();

    // Find member by email
    const member = await ChoirMember.findOne({ email });
    if (!member) {
      return NextResponse.json({ success: false, message: "No account found with that email." }, { status: 404 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, member.password || "");
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid password." }, { status: 401 });
    }

    // Success — return user data
    return NextResponse.json({ success: true, message: "Login successful!", user: member });
  } catch (err) {
    console.error("❌ Login error:", err);
    return NextResponse.json({ success: false, message: "Login failed. Try again." }, { status: 500 });
  }
}
