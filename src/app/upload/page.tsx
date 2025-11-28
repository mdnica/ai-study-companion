"use client";

import { useState } from "react";

export default function UploadSummarizer() {
  const [fileText, setFileText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFileUpload(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Read uploaded file text
    const reader = new FileReader();
    reader.onload = () => {
      setFileText(reader.result as string);
    };
    reader.readAsText(file);
  }

  async function summarize() {
    if (!fileText.trim()) return;

    setLoading(true);

    // MOCK SUMMARY
    const mockSummary = `
    • This is a mock summary.
• When you add OpenAI credits, you will get real AI summaries.
• The tool is fully functional and waiting for your API.
    `;

    // Simulate AI delay
    await new Promise((r) => setTimeout(r, 1000));

    setSummary(mockSummary);
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">PDF / File Summarizer</h1>

      {/* File Upload */}
      <div>
        <label className="block font-medium mb-2">Upload a text file:</label>
        <input
          type="file"
          accept=".txt,.md,.csv"
          onChange={handleFileUpload}
          className="border p-2 rounded-lg"
        />
      </div>

      {/* file Preview */}
      {fileText && (
        <div className="bg-gray-50 p-4 rounded-lg border shadow-sm">
          <h2 className="font-semibold mb-2">file Content Preview:</h2>
          <pre className="whitespace-pre-wrap text-gray-800">{fileText}</pre>
        </div>
      )}

      {/* Summarize Button */}
      {fileText && (
        <button
          onClick={summarize}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      )}

      {/* Summary Output */}
      {summary && (
        <div className="bg-gray-100 p-4 mt-4 rounded-lg border shadow-sm whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">Summary:</h2>
          {summary}
        </div>
      )}
    </div>
  );
}
