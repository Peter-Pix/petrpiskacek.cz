import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT, validateMessages } from "@/lib/chatbot";
import {
  parseMemory,
  stringifyMemory,
  updateMemory,
  buildMemoryContext,
} from "@/lib/doofy-memory";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "anthropic/claude-sonnet-5";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!validateMessages(body.messages)) {
      return NextResponse.json(
        { error: "Neplatný formát zpráv." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Chybí API klíč." },
        { status: 500 }
      );
    }

    const memory = parseMemory(req.headers.get("cookie"));
    const userMessages = body.messages.filter((m: { role: string }) => m.role === "user");
    const messageCount = userMessages.length;
    const lastMsg = userMessages[userMessages.length - 1]?.content || "";
    const prevMsg = userMessages[userMessages.length - 2]?.content || "";
    const isRepeat = messageCount >= 2 && lastMsg.toLowerCase().trim() === prevMsg.toLowerCase().trim();

    // Client metadata
    const responseTimeMs = body.responseTimeMs || 0;
    const sessionDurationMs = body.sessionDurationMs || 0;
    const hasOpenedTwice = body.hasOpenedTwice || false;

    // Update memory with latest user message
    const newMemory = updateMemory(memory, lastMsg, responseTimeMs);

    // Build context
    const isDetailQuestion = /(jak funguje|jak to funguje|vysvětli|popiš|detailně|jak přesně|architektura|pipeline|řekni víc|více|podrobně)/i.test(lastMsg);
    const isLongConvo = messageCount >= 5;
    const maxTokens = isDetailQuestion ? 400 : isLongConvo ? 200 : 120;

    const memoryContext = buildMemoryContext(newMemory);
    const contextNote = `
[CONTEXT]
${memoryContext}
- Uživatel napsal ${messageCount} zpráv.
- ${messageCount === 1 ? "První zpráva." : ""}
- ${messageCount > 3 && messageCount < 8 ? "Už si povídáte chvíli." : ""}
- ${messageCount >= 8 ? "Dlouhá konverzace." : ""}
- ${sessionDurationMs > 60000 ? "Už jste tu přes minutu." : ""}
- ${hasOpenedTwice ? "Otevřel chat podruhé." : ""}
- ${isRepeat ? "Uživatel opakuje stejnou otázku. Reaguj humorně." : ""}
- ${isDetailQuestion ? "Chce detail. Můžeš odpovědět 4-5 větami, ale rozděl to." : "PIŠ KRÁTCE. 1-2 věty. ROZDĚLUJ do více zpráv."}
- ${messageCount < 5 ? "Zahřívací kolo. 1 věta max." : ""}
- NENUŤ kontakt, pokud si ho sám neřekne.
`;

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://petr-piskacek.dev",
        "X-Title": "Petr Piskacek Portfolio",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT + contextNote },
          ...body.messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        temperature: 0.9,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => null);
      console.error("OpenRouter error:", response.status, errorText);
      return NextResponse.json(
        { error: "Doofy teď nemůže odpovědět." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (typeof reply !== "string") {
      return NextResponse.json({ error: "Doofy se zasekl." }, { status: 502 });
    }

    const trimmed = reply.trim();
    const replies = trimmed
      .split(/\n+/)
      .map((s: string) => s.trim())
      .filter((s: string) => s.length > 0);

    const res = NextResponse.json({ replies });
    res.cookies.set("doofy_memory", stringifyMemory(newMemory), {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      httpOnly: false,
      sameSite: "lax",
    });

    return res;
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Něco se pokazilo." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Použijte POST." },
    { status: 405 }
  );
}
