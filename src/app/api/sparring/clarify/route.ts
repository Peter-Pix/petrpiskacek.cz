import { NextRequest, NextResponse } from "next/server";

const OLLAMA_URL = "https://ollama.com/api/chat";
const MODEL = "deepseek-v4-flash";

const SYSTEM_PROMPT = `Jsi Sparring — AI architekt, co s tebou přemýšlí o projektu.
Hlas: přímý, vtipný, konkrétní. Mluvíš jako zkušený architekt v hospodě, ne jako korporát.

Když dostaneš zadání, tvůj úkol je ZJISTIT 1-2 KLÍČOVÉ INFO, které potřebuješ, abys mohl dát dobrý plán.

Vrať JSON ve formátu:
{
  "questions": [
    {
      "id": "q1",
      "text": "krátká otázka (max 8 slov)",
      "type": "choice" | "slider" | "text",
      "options": ["možnost1", "možnost2", "možnost3"]  // pouze pro type=choice
    }
  ]
}

PRAVIDLA:
- Max 2 otázky. Klidně jen 1, pokud stačí.
- Každá otázka max 8 slov. Krátké, jasné.
- type="choice" pokud se dá odpovědět výběrem z 2-4 možností (PREFERUJ)
- type="slider" pokud jde o škálu (např. velikost týmu, budget)
- type="text" jen pokud fakt nejde udělat choice nebo slider
- options: 2-4 krátké možnosti pro choice
- Ptej se na VĚCI, které mění architekturu: typ odvětví, velikost firmy, klíčová bolest, integrace, budget rámec.
- NEPTEJ SE na věci, na který je odpověď zřejmá ze zadání.
- NIKDY neptej se na "Co je vaším cílem" nebo podobné generické fráze.

PŘÍKLADY:
- {"id":"q1","text":"Velikost firmy?","type":"choice","options":["Do 10 lidí","10-50","50+"]}
- {"id":"q1","text":"Budget?","type":"slider","options":["Do 50k","50-150k","150k+"]}
- {"id":"q1","text":"Interní nebo SaaS?","type":"choice","options":["Interní nástroj","SaaS pro zákazníky","Obojí"]}`;

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

    let parsed: { questions?: Array<{ id?: string; text?: string; type?: string; options?: string[] }> };
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json({ error: "Nepodařilo se parsovat odpověď." }, { status: 502 });
    }

    const questions = (parsed.questions || []).slice(0, 2).map((q, i) => ({
      id: q.id || `q${i + 1}`,
      text: q.text || "",
      type: q.type || "choice",
      options: q.options || [],
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
