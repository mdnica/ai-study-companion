"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionConten,
} from "@/components/ui/accordion";

export default function Flaschards() {
  const [input, setInput] = useState("");
  const [cards, setCards] = useState<string[]>([]);

  async function generate() {
    const res = await fetch("/api/flashcards", {
      method: "POST",
      body: JSON.stringify({ notes: input }),
    });

    const data = await res.json();
    setCards(data.cards);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Flashcard Generator</h1>

      <textarea
        className="border p-3 w-full h-40 rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your study notes here..."
      />

      <Button onClick={generate}>Generate Flashcards</Button>

      <Accordion type="single" collapsible className="pt-4">
        {cards.map((c, i) => (
          <AccordionItem key={i} value={`card-${i}`}>
            <AccordionTrigger>Flashcard {i + 1}</AccordionTrigger>
            <AccordionContent>{c}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
