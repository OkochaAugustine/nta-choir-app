// app/api/chatbot/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  // Normalize the user’s message
  const lowerMessage = message.toLowerCase();

  // ✅ If user asks who is singing this Sunday or about duty roster
  if (
    lowerMessage.includes("who is singing") ||
    lowerMessage.includes("this sunday") ||
    lowerMessage.includes("duty roster")
  ) {
    try {
      // Fetch the static duty roster text
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:200"}/api/chatbot/dutyroster`, {
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
    } catch (error) {
      console.error("Error fetching duty roster:", error);
      return NextResponse.json({
        reply: "Sorry, I couldn't fetch this week's duty roster.",
      });
    }
  }

  // 🧠 Default fallback for unrecognized messages
  return NextResponse.json({
    reply: "Sorry, I didn’t understand that. Try asking: 'Who is singing this Sunday?'",
  });
}
