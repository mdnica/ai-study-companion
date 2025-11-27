"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UploadSummarizer() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  // Only UI for now; backend comes later
  async function summarize() {
    if (!text.trim()) {
      alert("Please upload a file or paste text first.");
      return;
    }

    const res = await fetch("/api/summarize", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setSummary(data.summary);
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const uploaded = e.target.files?.[0];
    if (!uploaded) return;

    setFile(uploaded);

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      setText(content);
    };

    reader.readAsText(uploaded); // works for .txt; PDF backend comes later
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">File / PDF Summarizer</h1>

      {/* Upload section */}
      <div className="border p-4 rounded space-y-2">
        <label className="font-medium">Upload File</label>
        <input
          type="file"
          accept=".txt, .pdf, .md, .docx"
          className="w-full"
          onChange={handleFileUpload}
        />

        {file && (
          <p className="text-sm text-gray-600">
            Uploaded! <strong>{file.name}</strong>
          </p>
        )}
      </div>

      {/* Or paste text */}
      <div className="space-y-2">
        <label className="font-medium">Or paste text manually</label>
        <textarea
          className="border p-3 w-full h-40 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your study notes or file contents here..."
        />
      </div>

      {/* Summarize button */}
      {summary && (
        <div className="border p-4 rounded bg-gray-50 shadow-sm space-y-3">
          <h2 className="text-xl font-semibold">Summary</h2>
          <p className="text-gray-800">{summary}</p>
        </div>
      )}
    </div>
  );
}
