"use client";

import { useState } from "react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function ChoirChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // 🧠 Fetch duty roster from API
  const fetchDutyRoster = async (): Promise<string> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:2000"}/api/chatbot/dutyroster`,
        { cache: "no-store" }
      );
      if (!res.ok) return "❌ Error fetching duty roster.";
      const data = await res.json();

      const formatted = data.message
        .replace(/\n/g, "<br>")
        .replace(/---/g, "<hr class='border-gray-600 my-3' />");

      return formatted;
    } catch (err) {
      console.error("Error fetching duty roster:", err);
      return "⚠️ Unable to fetch the duty roster right now.";
    }
  };

  // 🩵 Static Sunday uniform text (you can later fetch this from MongoDB)
  const fetchUniform = async (): Promise<string> => {
    return `
👕 <b>Sunday Uniform:</b><br>
💜 Ladies: Purple dress with gold scarf.<br>
💙 Men: White shirt with purple tie.<br>
Please ensure you're well-dressed and in your seat by 7:45 AM. 😊
    `;
  };

  // 📩 Handle user message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.toLowerCase().trim();
    setMessages(prev => [...prev, { sender: "user", text: input }]);
    setInput("");

    let botResponse = "Sorry, I don't understand that yet.";

    // 💬 Respond to known questions
    if (
      userMessage.includes("who is singing") ||
      userMessage.includes("singers this sunday") ||
      userMessage.includes("duty roster")
    ) {
      botResponse = await fetchDutyRoster();
    } else if (
      userMessage.includes("uniform") ||
      userMessage.includes("what are we wearing") ||
      userMessage.includes("dress code")
    ) {
      botResponse = await fetchUniform();
    }

    setMessages(prev => [...prev, { sender: "bot", text: botResponse }]);
  };

  // 🧹 Clear chat function
  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="bg-[#0d1b2a]/70 rounded-xl p-4 shadow-lg max-w-full mx-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#e0aaff]">🎤 Choir ChatBot</h2>
        {messages.length > 0 && (
          <button
            onClick={handleClear}
            className="text-sm text-red-400 hover:text-red-500 border border-red-400 px-2 py-1 rounded-md transition"
          >
            Clear Chat
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto mb-3 space-y-2 pr-1">
        {messages.length === 0 && (
          <div className="text-gray-400 text-sm italic text-center">
            👋 Hi there! You can ask me things like: <br />
            <span className="text-purple-300">
              “Who is singing on Sunday?”<br />“What uniform are we wearing?”
            </span>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg whitespace-pre-line ${
              msg.sender === "user"
                ? "bg-purple-600 text-white ml-auto"
                : "bg-white/10 text-white"
            }`}
          >
            {msg.sender === "bot" ? (
              <div
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          className="flex-1 rounded-md p-2 bg-white/10 text-white placeholder-gray-300 outline-none"
          placeholder="Ask me something..."
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-md transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
