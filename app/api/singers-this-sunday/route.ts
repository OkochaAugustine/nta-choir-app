import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to MongoDB
    const client = await clientPromise;

    // ✅ Use the correct database name from MongoDB Atlas
    const db = client.db("LivingSpringVoices");

    // 🧩 Log to verify connection and collections
    console.log("📂 Connected to DB:", db.databaseName);
    console.log("📄 Collections:", await db.listCollections().toArray());

    // ✅ Use the correct collection name
    const dutyRoster = db.collection("dutyroster");

    // Fetch the most recent duty roster
    const currentWeekRoster = await dutyRoster.findOne({}, { sort: { _id: -1 } });

    if (!currentWeekRoster) {
      return NextResponse.json({
        message: "No duty roster has been uploaded for this week yet.",
      });
    }

    // Return the roster text
    return NextResponse.json({
      message: currentWeekRoster.text,
    });
  } catch (error) {
    console.error("❌ Error fetching duty roster:", error);
    return NextResponse.json(
      { message: "Error fetching duty roster." },
      { status: 500 }
    );
  }
}
