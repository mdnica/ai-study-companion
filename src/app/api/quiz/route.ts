import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { notes } = await res.json();

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Generate 5 multiple-choice questions in JSON format.",
        },
        { role: "user", content: notes },
      ],
    });

    const quiz = JSON.parse(response.choices[0].message.content ?? "[]");

    return NextResponse.json({ quiz });
  } catch (error: any) {
    console.error("Quiz API error:", error);
    return NextResponse.json(
      { error: "Quiz generation failed." },
      { status: 500 }
    );
  }
}
