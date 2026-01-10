import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import ChoirMember from "@/models/ChoirMember";

export async function GET() {
  await (connectDB)

  const members = await ChoirMember.find();
  return NextResponse.json({ members });
}
