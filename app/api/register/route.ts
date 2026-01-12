import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";

// Schema
const ChoirMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    nationality: { type: String, required: true },
    location: { type: String, required: true },
    role: { type: String, required: true },
    part: { type: String },
    instrument: { type: String },
    password: { type: String, required: true }, // required for login
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ChoirMember model (checking if the model already exists)
const ChoirMember =
  mongoose.models.ChoirMember || mongoose.model("ChoirMember", ChoirMemberSchema);

// MongoDB connection handler (to avoid multiple connections)
async function connectToDatabase() {
  if (mongoose.connections[0].readyState) {
    // Already connected
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI!);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Ensure DB is connected
    await connectToDatabase();

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newMember = new ChoirMember({
      ...data,
      email: data.email.trim().toLowerCase(),
      password: hashedPassword,
    });

    // Save new choir member
    await newMember.save();

    // Return success response
    return NextResponse.json(
      { success: true, message: "Registration successful!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Registration error:", error);

    // Check for duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Email already registered!" },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { success: false, message: "Registration failed." },
      { status: 500 }
    );
  }
}
