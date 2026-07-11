import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT, validateMessages } from "@/lib/chatbot";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-4o-mini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!validateMessages(body.messages)) {
      return NextResponse.json(
        { error: "Neplatný formát zpráv. Pošlete prosím smysluplnou zprávu." },
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

    // Track conversation for context-aware behavior
    const userMessages = body.messages.filter((m: { role: string }) => m.role === "user");
    const messageCount = userMessages.length;
    const returningVisitor = req.headers.get("cookie")?.includes("doofy_visited=");

    // Detect repeated questions (compare last two user messages)
    const lastMsg = userMessages[userMessages.length - 1]?.content?.toLowerCase().trim() || "";
    const prevMsg = userMessages[userMessages.length - 2]?.content?.toLowerCase().trim() || "";
    const isRepeat = messageCount >= 2 && lastMsg === prevMsg;
    const isSimilarRepeat = messageCount >= 2 && lastMsg !== prevMsg &&
      (lastMsg.includes(prevMsg.slice(0, 15)) || prevMsg.includes(lastMsg.slice(0, 15)));

    const contextNote = `
[CONTEXT]
- Uživatel napsal ${messageCount} zpráv${messageCount > 1 ? ", povídáte si delší dobu" : ""}.
- ${returningVisitor ? "Tento uživatel už tady byl — ví, kdo je Petr." : "První návštěva."}
- ${messageCount === 1 ? "To je první zpráva. Použij jeden z otevíráků." : ""}
- ${messageCount > 3 && messageCount < 8 ? "Už si povídáte chvíli. Buď uvolněnější." : ""}
- ${messageCount >= 8 ? "Dlouhá konverzace. Můžeš začít být více sebevědomý a osobní." : ""}
- ${isRepeat ? 'POZOR: Uživatel se ptal na úplně totéž. Reaguj humorně, neopakuj minulou odpověď.' : ''}
- ${isSimilarRepeat && !isRepeat ? 'Uživatel se ptal na něco podobného. Zkrácená odpověď nebo odsekni.' : ''}
- NENUŤ uživatele k napsání kontaktu, pokud si o něj sám neřekne!
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
        max_tokens: 200,
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

    // Set cookie for returning visitor detection (30 days)
    const res = NextResponse.json({ reply: reply.trim() });
    res.cookies.set("doofy_visited", "true", {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      httpOnly: false,
      sameSite: "lax",
    });

    return res;
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