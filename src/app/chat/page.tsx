"use client";

import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim()) return;

    setLoading(true);
    setReply("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (error) {
      setReply("Error contacting AI.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">AI Chat</h1>

      <textarea
        className="w-full border p-3 rounded-lg"
        rows={4}
        placeholder="Ask me anything about your studies..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendMessage}
        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Send"}
      </button>

      {reply && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap">
          {reply}
        </div>
      )}
    </div>
  );
}
