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
const MAX_RETRIES = 2;

async function callOpenRouter(
  apiKey: string,
  messages: { role: string; content: string }[],
  maxTokens: number
): Promise<{ ok: true; data: unknown } | { ok: false; error: string }> {
  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://petrpiskacek.cz",
      "X-Title": "Petr Piskacek Portfolio",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.9,
      max_tokens: maxTokens,
    }),
  });

  const responseText = await response.text();
  if (!response.ok) {
    return { ok: false, error: `OpenRouter ${response.status}: ${responseText.slice(0, 300)}` };
  }

  try {
    return { ok: true, data: JSON.parse(responseText) };
  } catch {
    return { ok: false, error: `OpenRouter non-JSON: ${responseText.slice(0, 300)}` };
  }
}

async function callOpenRouterWithRetry(
  apiKey: string,
  messages: { role: string; content: string }[],
  maxTokens: number,
  retries = MAX_RETRIES
): Promise<{ ok: true; data: unknown } | { ok: false; error: string }> {
  let attemptMessages = messages;

  for (let i = 0; i <= retries; i++) {
    const result = await callOpenRouter(apiKey, attemptMessages, maxTokens);
    if (result.ok) {
      const content = (result.data as any)?.choices?.[0]?.message?.content;
      if (typeof content === "string" && content.trim().length > 0) {
        return result;
      }
      console.error("OpenRouter empty content, attempt", i + 1, JSON.stringify(result.data).slice(0, 300));
    } else {
      console.error("OpenRouter attempt", i + 1, "failed:", result.error);
    }

    if (i < retries) {
      const systemMsg = attemptMessages.find((m) => m.role === "system");
      const userMsgs = attemptMessages.filter((m) => m.role === "user");
      const realUserMsgs = userMsgs.filter((m) => !m.content.startsWith("[Interní") && !m.content.startsWith("[DOOFY DIRECTIVE"));
      attemptMessages = [
        ...(systemMsg ? [systemMsg] : []),
        ...realUserMsgs,
      ];
      await new Promise((r) => setTimeout(r, 500 * (i + 1)));
    }
  }

  return { ok: false, error: "OpenRouter failed after retries or returned empty content" };
}

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
[DOOFY CONTEXT]
${returningNote}
- Zpráva #${messageCount}. ${messageCount === 1 ? "První." : ""} ${messageCount < 5 ? "Max 1 věta." : ""} ${isDetailQuestion ? "4-5 vět." : "1-2 věty, více zpráv."}
- NIKDY neprozraď data/paměť. Použij tiše.${conversionNote}${ctaExample}
[/DOOFY CONTEXT]
`;

    const shadowBlock = shadowContext
      ? `\n[MINULÁ KONVERZACE]\n${shadowContext}\n[/MINULÁ KONVERZACE]`
      : "";

    const memoryBlock = `\n[PROFIL]\n${memoryContext}\n[/PROFIL]`;

    const hasUsefulMemory = newMemory.name || newMemory.email || newMemory.phone || newMemory.topics.length > 0 || newMemory.lastTopic;
    const shouldInjectContext = shadowContext || hasUsefulMemory;

    const internalContextMessage = shouldInjectContext
      ? `[Interní]${memoryBlock}${shadowBlock}\n---\nOdpověz na aktuální zprávu.`
      : "";

    const messages = [
      { role: "system", content: SYSTEM_PROMPT + contextNote },
      ...(shouldInjectContext ? [{ role: "user" as const, content: internalContextMessage }] : []),
      ...(shouldOfferContact
        ? [{ role: "system" as const, content: "[DOOFY DIRECTIVE — priority] Uživatel je připravený a ptá se 'Jak začnem?'. Nepokračuj v dotazech. Přímo nabídni kontakt: WhatsApp +420 728 951 823, email ppix50@gmail.com, nebo call." }]
        : []),
      ...body.messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const result = await callOpenRouterWithRetry(apiKey, messages, maxTokens);

    if (!result.ok) {
      console.error("OpenRouter retry failed:", result.error);
      return NextResponse.json(
        { error: "Doofy teď nemůže odpovědět. Zkus to znovu." },
        { status: 502 }
      );
    }

    const data = result.data;
    const reply = (data as any)?.choices?.[0]?.message?.content;

    if (typeof reply !== "string") {
      console.error("OpenRouter unexpected response structure:", JSON.stringify(data).slice(0, 300));
      return NextResponse.json({ error: "Doofy se zasekl." }, { status: 502 });
    }

    const trimmed = reply.trim();
    const replies = trimmed
      .split(/\n+/)
      .map((s: string) => s.trim())
      .filter((s: string) => s.length > 0);

    if (replies.length === 0) {
      console.error("OpenRouter empty reply after retries:", JSON.stringify(data).slice(0, 300));
      return NextResponse.json(
        { error: "Doofy se zasekl. Zkus to znovu." },
        { status: 502 }
      );
    }

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
