import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Summarize the user's text into clear bullet points.",
        },
        { role: "user", content: text },
      ],
    });

    return NextResponse.json({
      summary: response.choices[0].message.content,
    });
  } catch (error: any) {
    console.error("summarizer API error:", error);
    return NextResponse.json({ error: "summarization failed." });
  }
}
