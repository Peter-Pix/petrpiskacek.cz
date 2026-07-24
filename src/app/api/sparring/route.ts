import { NextRequest, NextResponse } from "next/server";

const OLLAMA_URL = "https://ollama.com/api/chat";
const MODEL = "deepseek-v4-flash";

const ANALYZE_PROMPT = `Jsi AI konzultant. Uživatel napsal nápad na projekt. Zhodnoť, jestli je zadání dostatečně konkrétní.

Odpověz POUZE JSON:
{
  "clear": true/false,
  "reason": "proč je/není jasné",
  "reformulated": "pouze pokud !clear — přeformuluj myšlenku do konkrétního, ostrého zadání (1-2 věty)",
  "questions": ["otázka1", "otázka2"] — max 2 otázky, které by upřesnily zadání
}

Pravidla:
- clear=true pokud: víš co je cílem, kdo je cílová skupina, jaký je hlavní feature
- clear=false pokud: chybí kontext, je to moc obecné, nebo je to jen pocit/nálada bez konkrétna
- reformulated musí být konkrétní a ostrý — jako by to psal člověk, co ví přesně co chce
- questions max 2, krátké`;

const RESPONSE_PROMPT = `Jsi AI konzultant na projekty. Uživatel popíše nápad, ty odpovíš stručně a konkrétně.

Pravidla:
- Max 3 odstavce
- První odstavec: pochopení nápadu (1-2 věty)
- Druhý odstavec: co by to obnášelo (technologie, čas, náročnost)
- Třetí odstavec: doporučení + otázka, co dál

Piš česky. Žádný marketing. Žádný "skvělý nápad!". Buď konkrétní a upřímný.`;

async function callOllama(messages: { role: string; content: string }[], stream = false) {
  const apiKey = process.env.OLLAMA_API_KEY;
  const res = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      stream,
      options: { temperature: 0.7 },
    }),
  });
  return res;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== "string" || prompt.length > 2000) {
      return NextResponse.json({ error: "Chybí nebo je prompt příliš dlouhý." }, { status: 400 });
    }

    const apiKey = process.env.OLLAMA_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Chybí API klíč." }, { status: 500 });
    }

    // Fáze 1: Analyzovat prompt
    const analysisRes = await callOllama([
      { role: "system", content: ANALYZE_PROMPT },
      { role: "user", content: prompt },
    ]);

    if (!analysisRes.ok) {
      const text = await analysisRes.text().catch(() => "");
      console.error("[SPARRING] Analysis failed:", analysisRes.status, text.slice(0, 200));
      // Fallback: rovnou odpovědět
    } else {
      const analysisText = await analysisRes.text();
      let analysis: any = null;
      try {
        analysis = JSON.parse(analysisText);
      } catch {
        // Ignore parse error
      }

      if (analysis && !analysis.clear) {
        // Prompt není jasný — pošleme reformulaci + otázky + rovnou odpověď
        const reformulated = analysis.reformulated || prompt;
        const questions = analysis.questions || [];

        // Streamujeme odpověď: nejdřív reformulaci, pak odpověď
        const responseRes = await callOllama([
          { role: "system", content: RESPONSE_PROMPT },
          { role: "user", content: reformulated },
        ], true);

        if (!responseRes.ok || !responseRes.body) {
          return NextResponse.json({ error: "AI služba není dostupná." }, { status: 502 });
        }

        const reader = responseRes.body.getReader();
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            // Nejdřív pošleme reformulaci jako meta blok
            const meta = JSON.stringify({
              type: "reformulated",
              original: prompt,
              reformulated,
              questions,
            });
            controller.enqueue(encoder.encode(`⏎META:${meta}⏎\n\n`));

            // Pak streamujeme odpověď
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
                    if (content) controller.enqueue(encoder.encode(content));
                  } catch {}
                }
              }

              if (buffer.trim()) {
                try {
                  const parsed = JSON.parse(buffer.trim());
                  const content = parsed?.message?.content || "";
                  if (content) controller.enqueue(encoder.encode(content));
                } catch {}
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
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" },
        });
      }
    }

    // Fáze 2: Prompt je jasný — rovnou odpověď
    const responseRes = await callOllama([
      { role: "system", content: RESPONSE_PROMPT },
      { role: "user", content: prompt },
    ], true);

    if (!responseRes.ok || !responseRes.body) {
      return NextResponse.json({ error: "AI služba není dostupná." }, { status: 502 });
    }

    const reader = responseRes.body.getReader();
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
                if (content) controller.enqueue(encoder.encode(content));
              } catch {}
            }
          }

          if (buffer.trim()) {
            try {
              const parsed = JSON.parse(buffer.trim());
              const content = parsed?.message?.content || "";
              if (content) controller.enqueue(encoder.encode(content));
            } catch {}
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
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" },
    });
  } catch (err) {
    console.error("[SPARRING] Fatal error:", err);
    return NextResponse.json({ error: "Něco se pokazilo." }, { status: 500 });
  }
}
