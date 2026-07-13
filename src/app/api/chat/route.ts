import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT, validateMessages } from "@/lib/chatbot";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "anthropic/claude-sonnet-5";

// Parse Doofy's memory cookie
function parseDoofyMemory(cookie: string | null): {
  name: string;
  email: string;
  phone: string;
  visits: number;
  lastTopic: string;
} {
  const empty = { name: "", email: "", phone: "", visits: 0, lastTopic: "" };
  if (!cookie) return empty;
  try {
    const parts = cookie.split(";").find((c) => c.trim().startsWith("doofy_memory="));
    if (!parts) return empty;
    const raw = decodeURIComponent(parts.split("=")[1]);
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

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

    // Load Doofy's memory from cookie
    const memory = parseDoofyMemory(req.headers.get("cookie"));
    const userMessages = body.messages.filter((m: { role: string }) => m.role === "user");
    const messageCount = userMessages.length;
    const isReturning = memory.visits > 0;

    // Detect repeated questions
    const lastMsg = userMessages[userMessages.length - 1]?.content?.toLowerCase().trim() || "";
    const prevMsg = userMessages[userMessages.length - 2]?.content?.toLowerCase().trim() || "";
    const isRepeat = messageCount >= 2 && lastMsg === prevMsg;
    const isSimilarRepeat = messageCount >= 2 && lastMsg !== prevMsg &&
      (lastMsg.includes(prevMsg.slice(0, 15)) || prevMsg.includes(lastMsg.slice(0, 15)));

    // Dynamic max_tokens
    const isDetailQuestion = /(jak funguje|jak to funguje|vysvětli|popiš|detailně|jak přesně|architektura|pipeline|řekni víc|více|podrobně)/i.test(lastMsg);
    const isLongConvo = messageCount >= 5;
    const maxTokens = isDetailQuestion ? 400 : isLongConvo ? 200 : 120;

    // Build memory context for the prompt
    const memoryContext = memory.name
      ? `- Uživatelovo jméno (řekl ho Doofymu): "${memory.name}". Oslovuj ho tím jménem.`
      : "";
    const memoryContact = memory.email || memory.phone
      ? `- Uživatel dal Doofymu kontakt: ${memory.email ? "email " + memory.email : ""}${memory.phone ? "tel " + memory.phone : ""}`
      : "";
    const memoryTopic = memory.lastTopic
      ? `- Minule se bavili o: "${memory.lastTopic}". Můžeš na to navázat, pokud to dává smysl.`
      : "";

    const contextNote = `
[CONTEXT]
- Uživatel napsal ${messageCount} zpráv${messageCount > 1 ? ", povídáte si delší dobu" : ""}.
- ${isReturning ? `Uživatel se vrací (${memory.visits + 1}. návštěva).` : "První návštěva."}
${memoryContext}
${memoryContact}
${memoryTopic}
- ${messageCount === 1 ? "To je první zpráva." : ""}
- ${messageCount > 3 && messageCount < 8 ? "Už si povídáte chvíli. Buď uvolněnější." : ""}
- ${messageCount >= 8 ? "Dlouhá konverzace. Můžeš začít být více sebevědomý a osobní." : ""}
- ${isRepeat ? 'POZOR: Uživatel se ptal na úplně totéž. Reaguj humorně, neopakuj minulou odpověď.' : ''}
- ${isSimilarRepeat && !isRepeat ? 'Uživatel se ptal na něco podobného. Zkrácená odpověď nebo odsekni.' : ''}
- ${isDetailQuestion ? 'Uživatel chce detail. Můžeš odpovědět až 4-5 větami, ale nejdřív nabídni zkratku a doptávej se.' : 'PIŠ KRÁTCE. 1-2 věty. Jako na WhatsAppu. Pokud by odpověď byla delší, doptávej se místo toho.'}
- ${messageCount < 5 ? 'Zahřívací kolo. Piš fakt krátce, 1 věta max.' : ''}
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
        max_tokens: maxTokens,
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

    // Update memory: extract name, email, phone from user messages if mentioned
    const allUserText = userMessages.map((m: { content: string }) => m.content).join(" ");
    const nameMatch = allUserText.match(/jmenuju se\s+(\S+)/i) || allUserText.match(/říkaj mi\s+(\S+)/i) || allUserText.match(/jsem\s+(\S+)/i);
    const emailMatch = allUserText.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    const phoneMatch = allUserText.match(/((\+420|0)\s*[0-9]{3}\s*[0-9]{3}\s*[0-9]{3})/);

    const newMemory = {
      name: nameMatch ? nameMatch[1] : memory.name,
      email: emailMatch ? emailMatch[1] : memory.email,
      phone: phoneMatch ? phoneMatch[1].replace(/\s+/g, "") : memory.phone,
      visits: memory.visits + 1,
      lastTopic: lastMsg.slice(0, 100),
    };

    const res = NextResponse.json({ reply: reply.trim() });
    res.cookies.set("doofy_memory", JSON.stringify(newMemory), {
      maxAge: 60 * 60 * 24 * 365, // 1 year
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
