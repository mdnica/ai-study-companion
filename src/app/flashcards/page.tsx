"use client";

import { useState } from "react";

export default function FlashcardsPage() {
  const [text, setText] = useState("");
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function generateFlashcards() {
    if (!text.trim()) return;

    setLoading(true);

    // MOCK DATA
    const mock = [
      {
        question: "What is photosynthesis?",
        answer: "The process plants use to convert light into energy.",
      },
      {
        question: "Where does photosynthesis occur?",
        answer: "In the chloroplasts of plant cells.",
      },
    ];

    // Simulate slow AI for realism
    await new Promise((r) => setTimeout(r, 1000));

    setCards(mock);
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Flashcard Generator</h1>

      <textarea
        className="w-full border p-3 rounded-lg"
        rows={6}
        placeholder="Paste or write your study text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={generateFlashcards}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Flashcards"}
      </button>

      {cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {cards.map((card, i) => (
            <div key={i} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{card.question}</h3>
              <p className="text-gray-700">{card.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
