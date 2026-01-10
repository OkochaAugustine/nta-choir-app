// app/api/dutyroster/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import mongoose from "mongoose";

// Define a simple schema for dutyRoster
const DutyRosterSchema = new mongoose.Schema(
  { text: { type: String, required: true } },
  { timestamps: true }
);

// Create model if it doesn't exist
const DutyRoster =
  mongoose.models.DutyRoster || mongoose.model("DutyRoster", DutyRosterSchema);

export async function GET() {
  try {
    // Connect to MongoDB using Mongoose
    await connectDB();

    // Fetch the most recent roster
    const currentWeekRoster = await DutyRoster.findOne().sort({ createdAt: -1 });

    if (currentWeekRoster && currentWeekRoster.text) {
      console.log("✅ Duty roster loaded from MongoDB");
      return NextResponse.json({ message: currentWeekRoster.text });
    }

    console.warn("⚠ No roster found in database — using fallback text.");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB — using fallback text:", error);
  }

  // Fallback static duty roster
  const dutyRosterText = `
Greetings, family,

Below is the Choir Duty Roster for the Week. Kindly take note of the roles assigned to you and ensure punctuality for every service.
📌 For those on Sunday duty, please remember to submit your praise lines on Saturday during rehearsal.

---

🎼 CHOIR DUTY ROSTER FOR THE WEEK

✨ Monday – 27th October 2025 (Prayer Meeting)
🙏 Prayers: ———
🎶 Opening Praise: Sis Isioma
🎤 Testimony Praise: Sis. Aforke 

---

✨ Wednesday – 29th October (Communion Service)
🎶 First Praise: Bro Broght (Coach)
🎤 Testimony Praise: Sis. Goodness
✝ Offering & Communion: Sis. Aforke

---

✨ Sunday – 2nd November 2025 (Worship Services)

⛪ First Service
🎶 Opening Praise: Sis. Goodness 
✝ Offering: Sis. Kome
🙏 Altar Call & First: Sis. Amarachi 

⛪ Second Service
🎶 Opening Praise: Bro Austin   
✝ Offering: Sis. Isioma
🙏 Altar Call & First timer: Sis. Amarachi 

---

✨ Thank you all for your commitment and excellence in service. May God continue to reward your labor of love in Jesus’ Name. 🙏🎶

---

💡 Special Note to the Choir Family:
We deeply appreciate every one of you. Even if you are not on the roster this week, please know that your presence and contribution are highly valued...
`;

  return NextResponse.json({ message: dutyRosterText });
}
