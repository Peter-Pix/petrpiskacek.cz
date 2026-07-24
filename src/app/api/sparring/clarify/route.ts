import { NextRequest, NextResponse } from "next/server";

const OLLAMA_URL = "https://ollama.com/api/chat";
const MODEL = "deepseek-v4-flash";

const SYSTEM_PROMPT = `Jsi Sparring — AI architekt, co s tebou přemýšlí o projektu.
Hlas: přímý, vtipný, konkrétní. Mluvíš jako zkušený architekt v hospodě, ne jako korporát.

Když dostaneš zadání, tvůj úkol je ZJISTIT 1-2 KLÍČOVÉ INFO, které potřebuješ, abys mohl dát dobrý plán.

Vrať JSON ve formátu:
{
  "questions": [
    { "id": "q1", "text": "krátká otázka (max 8 slov)" },
    { "id": "q2", "text": "další krátká otázka (volitelné)" }
  ]
}

PRAVIDLA:
- Max 2 otázky. Klidně jen 1, pokud stačí.
- Každá otázka max 8 slov. Krátké, jasné.
- Ptej se na VĚCI, které mění architekturu: typ odvětví, velikost firmy, klíčová bolest, integrace, budget rámec.
- NEPTEJ SE na věci, na který je odpověď zřejmá ze zadání.
- NIKDY neptej se na "Co je vaším cílem" nebo podobné generické fráze.

PŘÍKLADY DOBRÝCH OTÁZEK:
- "Sklady, doprava, nebo plánování tras?"
- "Malá firma do 20 lidí, nebo větší?"
- "Bude to interní tool, nebo SaaS pro zákazníky?"
- "Kolik dat denně? GB, MB, nebo něco jiného?"
- "Real-time, nebo stačí dávkové zpracování?"

PŘÍKLADY ŠPATNÝCH OTÁZEK:
- "Jaké jsou vaše obchodní cíle?" (korporát, moc obecné)
- "Jakou máte vizi?" (generické)
- "Co je vaší prioritou?" (neříká nic)`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
      return NextResponse.json({ error: "Zadej zadání." }, { status: 400 });
    }

    const apiKey = process.env.OLLAMA_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Chybí API klíč." }, { status: 500 });
    }

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
        stream: false,
        options: { temperature: 0.6 },
        format: "json",
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("Ollama error (clarify):", response.status, text.slice(0, 300));
      return NextResponse.json({ error: "AI služba není dostupná." }, { status: 502 });
    }

    const data = await response.json();
    const content = data?.message?.content;
    if (typeof content !== "string" || !content.trim()) {
      return NextResponse.json({ error: "Prázdná odpověď." }, { status: 502 });
    }

    let parsed: { questions?: Array<{ id?: string; text?: string }> };
    try {
      parsed = JSON.parse(content);
    } catch {
      const questions = [];
      const lines = content.split("\n");
      for (const line of lines) {
        const match = line.match(/["']?text["']?\s*:\s*["']([^"']+)["']/);
        if (match) questions.push({ id: `q${questions.length + 1}`, text: match[1] });
      }
      if (questions.length === 0) {
        return NextResponse.json({ error: "Nepodařilo se parsovat odpověď." }, { status: 502 });
      }
      return NextResponse.json({ questions: questions.slice(0, 2) });
    }

    const questions = (parsed.questions || []).slice(0, 2).map((q, i) => ({
      id: q.id || `q${i + 1}`,
      text: q.text || "",
    })).filter((q) => q.text.length > 0);

    if (questions.length === 0) {
      return NextResponse.json({ error: "AI nevrátilo otázky." }, { status: 502 });
    }

    return NextResponse.json({ questions });
  } catch (err) {
    console.error("Clarify API error:", err);
    return NextResponse.json({ error: "Něco se pokazilo." }, { status: 500 });
  }
}
