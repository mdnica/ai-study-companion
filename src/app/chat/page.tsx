"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessage((m) => [...m, userMessage]);

    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const aiMessage = { role: "assistant", content: data.reply };
    setMessages((m) => [...m, aiMessage]);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">AI Study Chat</h1>

      <div className="space-y-3 border p-4 h-[400px] overflow-y-auto rounded">
        {messages.map((msg, i) => (
          <p
            key={i}
            className={
              msg.role === "user"
                ? "text-right text-blue-600"
                : "text-left text-green-700"
            }
          >
            {msg.content}
          </p>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          className="border p-2 flex-1 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
