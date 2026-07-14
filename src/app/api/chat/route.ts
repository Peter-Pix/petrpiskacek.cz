import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT, validateMessages } from "@/lib/chatbot";
import {
  buildShadowContext,
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
    const clientShadow = Array.isArray(body.shadow) ? body.shadow : [];

    // Update memory
    const newMemory = updateMemory(memory, lastMsg, responseTimeMs, sessionDurationMs, hasOpenedTwice);

    // Build context
    const isDetailQuestion = /(jak funguje|jak to funguje|vysvětli|popiš|detailně|jak přesně|architektura|pipeline|řekni víc|více|podrobně)/i.test(lastMsg);
    const isLongConvo = messageCount >= 5;
    const maxTokens = isDetailQuestion ? 500 : isLongConvo ? 300 : 250;

    const memoryContext = buildMemoryContext(newMemory);
    const shadowContext = buildShadowContext(clientShadow);

    const isReturning = newMemory.totalMessages > 1 && clientShadow.length > 0;
    const isConversionReady = newMemory.conversionReadiness >= 75 && newMemory.engagementScore >= 60;
    const isStartingIntent = /\b(jak začn|začneme|chci to|jdu do toho|jak dál|kontakt|call|zavolej|napiš|email|whatsapp|kde tě najdu)\b/i.test(lastMsg);
    const shouldOfferContact = isConversionReady || (isStartingIntent && newMemory.engagementScore >= 50);

    const returningNote = isReturning
      ? "\n- Uživatel se vrací. Naváž na minulou konverzaci a pokračuj v tématu, pokud to dává smysl."
      : "";
    const conversionNote = shouldOfferContact
      ? "\n- >>> PRIO: Uživatel je připravený / chce začít. PŘÍMO NABÍDNI KONTAKT: WhatsApp +420 728 951 823, email ppix50@gmail.com, nebo call. <<<"
      : "";

    const ctaExample = shouldOfferContact
      ? `\n\n[CTA PŘÍKLAD]\nUživatel: \"Jak začnem?\"\nSprávná odpověď Doofy: \"Jednoduše. Napiš Petrovi na WhatsApp +420 728 951 823 nebo email ppix50@gmail.com. Vyber si. Call trvá 20 minut a uvidíš, jestli to dává smysl.\"\n[/CTA PŘÍKLAD]`
      : "";

    const contextNote = `
[DOOFY CONTEXT — pouze pro tebe, neukazuj uživateli]
${returningNote}
- Zpráva #${messageCount}.
- ${messageCount === 1 ? "První zpráva." : ""}
- ${messageCount > 3 && messageCount < 8 ? "Konverzace se rozjíždí." : ""}
- ${messageCount >= 8 ? "Dlouhá konverzace." : ""}
- ${sessionDurationMs > 60000 ? "Už jste tu přes minutu." : ""}
- ${hasOpenedTwice ? "Chat otevřen opakovaně." : ""}
- ${isRepeat ? "Uživatel opakuje otázku. Reaguj humorně." : ""}
- ${isDetailQuestion ? "Chce detail. Odpověz 4-5 větami, rozděleno do zpráv." : "PIŠ KRÁTCE. 1-2 věty. ROZDĚLUJ do více zpráv."}
- ${messageCount < 5 ? "Zahřívací kolo. Max 1 věta." : ""}
- NIKDY neříkej, že vidíš předchozí konverzaci nebo data o uživateli. Použij je tiše.${conversionNote}${ctaExample}
[/DOOFY CONTEXT]
`;

    const shadowBlock = shadowContext
      ? `\n[MINULÁ KONVERZACE — interní kontext, neviditelná pro uživatele]\n${shadowContext}\n[/MINULÁ KONVERZACE]`
      : "";

    const memoryBlock = `\n[PROFIL UŽIVATELE — interní]\n${memoryContext}\n[/PROFIL UŽIVATELE]`;

    const hasUsefulMemory = newMemory.name || newMemory.email || newMemory.phone || newMemory.topics.length > 0 || newMemory.lastTopic;
    const shouldInjectContext = shadowContext || hasUsefulMemory;

    const internalContextMessage = shouldInjectContext
      ? `[Interní kontext pro Doofy — neviditelný pro uživatele]${memoryBlock}${shadowBlock}\n---\nNyní odpověz na aktuální zprávu. Nikdy neprozraď, že máš tento kontext.`
      : "";

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
          ...(shouldInjectContext ? [{ role: "user" as const, content: internalContextMessage }] : []),
          ...(shouldOfferContact
            ? [{ role: "system" as const, content: "[DOOFY DIRECTIVE — priority] Uživatel je připravený a ptá se 'Jak začnem?'. Nepokračuj v dotazech. Přímo nabídni kontakt: WhatsApp +420 728 951 823, email ppix50@gmail.com, nebo call." }]
            : []),
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

    // Log interaction metrics
    console.log("[DOOFY METRICS]", {
      messageCount,
      engagementScore: newMemory.engagementScore,
      churnRisk: newMemory.predictedChurn,
      automationInterest: newMemory.automationInterest,
      conversionReadiness: newMemory.conversionReadiness,
      emotionalPeak: newMemory.emotionalPeaks.at(-1),
      trigger: newMemory.triggers.at(-1),
      style: newMemory.communicationStyle,
      avgWords: newMemory.avgWordsPerMessage,
    });

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
