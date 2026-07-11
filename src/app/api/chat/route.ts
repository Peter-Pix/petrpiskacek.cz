import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT, validateMessages } from "@/lib/chatbot";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-4o-mini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!validateMessages(body.messages)) {
      return NextResponse.json(
        { error: "Neplatný formát zpráv. Pošlete nám prosím smysluplnou zprávu." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Chybí API klíč. Doofy momentálně nemůže odpovídat." },
        { status: 500 }
      );
    }

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://petr-piskacek.dev",
        "X-Title": "Peter Piskacek Portfolio",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...body.messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        temperature: 0.85,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => null);
      console.error("OpenRouter error:", response.status, errorText);
      return NextResponse.json(
        { error: "Doofy teď nemůže odpovědět. Zkuste to za chvíli." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (typeof reply !== "string") {
      return NextResponse.json(
        { error: "Doofy se zasekl. Zkuste to znovu." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply: reply.trim() });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Něco se pokazilo. Doofy se omlouvá — zkuste to znovu." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Použijte POST požadavek pro chat." },
    { status: 405 }
  );
}
