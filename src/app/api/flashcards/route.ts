import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Generate flashcards. Return JSON: [{question: '', answer: ''}]",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const cards = JSON.parse(response.choices[0].message.content ?? "[]");

    return NextResponse.json({ cards });
  } catch (error: any) {
    console.error("Flashcards API error:", error);
    return NextResponse.json(
      { error: "Flashcard generation failed." },
      { status: 500 }
    );
  }
}
