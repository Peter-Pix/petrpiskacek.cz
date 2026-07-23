import { NextRequest, NextResponse } from "next/server";

const OLLAMA_URL = "https://ollama.com/api/chat";
const MODEL = "deepseek-v4-flash";

const SYSTEM_PROMPT = `Jsi AI konzultant na projekty. Uživatel popíše nápad, ty odpovíš stručně a konkrétně.

Pravidla:
- Max 3 odstavce
- První odstavec: pochopení nápadu (1-2 věty)
- Druhý odstavec: co by to obnášelo (technologie, čas, náročnost)
- Třetí odstavec: doporučení + otázka, co dál

Piš česky. Žádný marketing. Žádný "skvělý nápad!". Buď konkrétní a upřímný.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== "string" || prompt.length > 2000) {
      return NextResponse.json({ error: "Chybí nebo je prompt příliš dlouhý." }, { status: 400 });
    }

    const apiKey = process.env.OLLAMA_API_KEY;
    console.log("[SPARRING] OLLAMA_API_KEY exists:", !!apiKey, "length:", apiKey?.length);

    if (!apiKey) {
      return NextResponse.json({ error: "Chybí API klíč." }, { status: 500 });
    }

    console.log("[SPARRING] Calling Ollama API...");
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        stream: true,
        options: { temperature: 0.7 },
      }),
    });

    console.log("[SPARRING] Ollama response status:", response.status);

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("[SPARRING] Ollama error:", response.status, text.slice(0, 300));
      return NextResponse.json({ error: "AI služba není dostupná." }, { status: 502 });
    }

    const reader = response.body?.getReader();
    if (!reader) {
      return NextResponse.json({ error: "No response stream." }, { status: 502 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed) continue;

              try {
                const parsed = JSON.parse(trimmed);
                const content = parsed?.message?.content || "";
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch {
                // Skip malformed JSON lines
              }
            }
          }

          if (buffer.trim()) {
            try {
              const parsed = JSON.parse(buffer.trim());
              const content = parsed?.message?.content || "";
              if (content) {
                controller.enqueue(encoder.encode(content));
              }
            } catch {
              // Skip
            }
          }
        } catch (err) {
          console.error("[SPARRING] Stream error:", err);
        } finally {
          controller.close();
          reader.releaseLock();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("[SPARRING] Fatal error:", err);
    return NextResponse.json({ error: "Něco se pokazilo." }, { status: 500 });
  }
}
