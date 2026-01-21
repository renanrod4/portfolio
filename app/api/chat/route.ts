import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/", 
  apiKey: process.env.GOOGLE_AI_API,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gemini-2.5-flash",
    messages: [
      { role: "system", content: "Você é um assistente útil." },
      { role: "user", content: message },
    ],
  });

  return NextResponse.json({
    response: completion.choices[0].message.content,
  });
}
