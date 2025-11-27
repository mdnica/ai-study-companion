"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function QuizGenerator() {
  const [notes, setNotes] = useState("");
  const [questions, setQuestions] = useState<
    { question: string; answer: string }[]
  >([]);

  async function generateQuiz() {
    if (!notes.trim()) {
      alert("Please enter some notes first.");
      return;
    }

    // Backend added later
    const res = await fetch("/api/quiz", {
      method: "POST",
      body: JSON.stringify({ notes }),
    });

    const data = await res.json();
    setQuestions(data.questions);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Notes → Quiz Generator</h1>

      {/* Notes */}
      <div className="space-y-2">
        <label className="font-medium">Paste your notes</label>
        <textarea
          className="border p-3 w-full h-48 rounded"
          placeholder="Paste your notes here…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <Button onClick={generateQuiz} className="w-full">
        Generate Quiz Questions
      </Button>

      {/* Result questions */}
      {questions.length > 0 && (
        <div className="pt-6">
          <h2 className="text-xl font-semibold pb-2">Generated Questions</h2>

          <Accordion type="multiple" className="space-y-2">
            {questions.map((q, i) => (
              <AccordionItem key={i} value={`q-${i}`}>
                <AccordionTrigger>
                  Question {i + 1}: {q.question}
                </AccordionTrigger>

                <AccordionContent>
                  <div className="p-3 border rounded bg-gray-50">
                    <strong>Answer:</strong>
                    <p className="mt-2">{q.answer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
