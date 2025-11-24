"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function StudyPlanner() {
  const [examDate, setExamDate] = useState("");
  const [topics, setTopics] = useState("");
  const [plan, setPlan] = useState<string[]>([]);

  async function generatePlan() {
    if (!examDate) {
      alert("Please enter an exam date.");
      return;
    }

    // Backend comes later
    const res = await fetch("/api/planner", {
      method: "POST",
      body: JSON.stringify({ examDate, topics }),
    });

    const data = await res.json();
    setPlan(data.plan);
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">AI Study Planner</h1>

      {/* Exam date */}
      <div className="space-y-2">
        <label className="font-medium">Exam Date</label>
        <input
          type="date"
          className="border p-2 rounded w-full"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
        />
      </div>

      {/* Topics */}
      <div className="space-y-2">
        <label className="font-medium">Topics (optional)</label>
        <textarea
          className="border p-3 w-full rounded h-32"
          placeholder="Example: Algebra, Geometry, Calculus..."
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
        />
      </div>

      <Button onClick={generatePlan} className="w-full">
        Generate Study Plan
      </Button>

      {/* Results */}
      {plan.length > 0 && (
        <div className="mt-6 space-y-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">Your Study Plan</h2>

          <div className="space-y-3">
            {plan.map((day, i) => (
              <div key={i} className="p-3 border rounded bg-gray-50 shadow-sm">
                <strong>Day {i + 1}</strong>
                <p className="mt-1 text-gray-700">{day}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
