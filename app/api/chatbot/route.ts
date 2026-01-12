// app/api/chatbot/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "No message provided." }, { status: 400 });
    }

    const lowerMessage = message.toLowerCase();

    // ✅ Check if the message is about singing this Sunday or duty roster
    if (
      lowerMessage.includes("who is singing") ||
      lowerMessage.includes("this sunday") ||
      lowerMessage.includes("duty roster")
    ) {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:2000";
        const res = await fetch(`${baseUrl}/api/chatbot/dutyroster`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (data?.message) {
          return NextResponse.json({ reply: data.message });
        } else {
          return NextResponse.json({
            reply: "Sorry, I couldn't find the duty roster right now.",
          });
        }
      } catch (err) {
        console.error("Error fetching duty roster:", err);
        return NextResponse.json({
          reply: "Sorry, I couldn't fetch this week's duty roster.",
        });
      }
    }

    // 🧠 Default fallback
    return NextResponse.json({
      reply: "Sorry, I didn’t understand that. Try asking: 'Who is singing this Sunday?'",
    });
  } catch (err: any) {
    console.error("Chatbot POST error:", err);
    return NextResponse.json({ reply: "An error occurred." }, { status: 500 });
  }
}
