export type CommunicationStyle = "formal" | "casual" | "teasing" | "guarded" | "open" | "unknown";

export type DoofyMemory = {
  name: string;
  email: string;
  phone: string;
  visits: number;
  lastTopic: string;
  topics: string[];
  emotionalPeaks: string[];
  triggers: string[];
  communicationStyle: CommunicationStyle;
  avgResponseTimeMs: number;
  messageLength: "short" | "medium" | "long";
  jokesLanded: number;
  automationInterest: number;
  lastQuestions: string[];
  suggestedTopics: string[];
  lastMessageAt: number;
};

export const EMPTY_MEMORY: DoofyMemory = {
  name: "",
  email: "",
  phone: "",
  visits: 0,
  lastTopic: "",
  topics: [],
  emotionalPeaks: [],
  triggers: [],
  communicationStyle: "unknown",
  avgResponseTimeMs: 0,
  messageLength: "short",
  jokesLanded: 0,
  automationInterest: 0,
  lastQuestions: [],
  suggestedTopics: [],
  lastMessageAt: 0,
};

export function parseMemory(cookie: string | null): DoofyMemory {
  if (!cookie) return { ...EMPTY_MEMORY };
  try {
    const parts = cookie.split(";").find((c) => c.trim().startsWith("doofy_memory="));
    if (!parts) return { ...EMPTY_MEMORY };
    const raw = decodeURIComponent(parts.split("=")[1]);
    return { ...EMPTY_MEMORY, ...JSON.parse(raw) };
  } catch {
    return { ...EMPTY_MEMORY };
  }
}

export function stringifyMemory(memory: DoofyMemory): string {
  return JSON.stringify(memory);
}

export function detectStyle(text: string): CommunicationStyle {
  const lower = text.toLowerCase();
  if (/\b(kurva|kokot|debil|píča|hovno|seru|jebat)\b/.test(lower)) return "teasing";
  if (/\b(dobrý den|pane|vážený|s pozdravem|žádost|firm[ay])\b/.test(lower)) return "formal";
  if (/\b(čau|cau|hele|kámo|lol|haha|xd|😂|joke)\b/.test(lower)) return "open";
  if (/\b(nechci|nemám zájem|spam|neodpovídej|neotravuj)\b/.test(lower)) return "guarded";
  if (text.length < 15) return "casual";
  return "unknown";
}

export function detectEmotionalPeak(text: string): string | null {
  const lower = text.toLowerCase();
  if (/\b(haha|lol|xd|😂|směj|vtipný|sranda)\b/.test(lower)) return "laugh";
  if (/\b(nesnáším|nyní|píča|kokot|debil|seru|hovno)\b/.test(lower)) return "anger";
  if (/\b(zajímavé|fakt|vážně|jak to|proč|jak)\b/.test(lower)) return "curiosity";
  if (/\b(nudí|nuda|zbytečný|nekonečno|dlouhý)\b/.test(lower)) return "boredom";
  if (/\b(nevěřím|pochybuju|ale fakt|seriozně)\b/.test(lower)) return "skepticism";
  if (/\b(díky|super|skvělý|paráda|geniální)\b/.test(lower)) return "appreciation";
  if (/\b(strach|bojím|obávám|nevím jestli|risk)\b/.test(lower)) return "fear";
  return null;
}

export function detectTrigger(text: string): string | null {
  const lower = text.toLowerCase();
  if (/\b(čas|hodin|dlouho|trvá|ručně|kopírovat|vypisovat|report|excel|admin|faktur)\b/.test(lower)) return "time_waste";
  if (/\b(peníze|korun|eur|usd|náklady|drahý|levný|cena|zisk)\b/.test(lower)) return "money";
  if (/\b(klient|zákazník|zákazníci|podpora|stížnost)\b/.test(lower)) return "customer";
  if (/\b(tým|lidi|zaměstnanci|kolegové|vedení|šéf)\b/.test(lower)) return "people";
  if (/\b(ai|umělá inteligence|chatbot|automatizace|robot|llm|gpt|claude)\b/.test(lower)) return "ai";
  if (/\b(web|stránky|eshop|aplikace|app|frontend|backend)\b/.test(lower)) return "tech";
  return null;
}

export function extractName(text: string): string | null {
  const m = text.match(/(?:jmenuju se|jmenuji se|říkaj mi|říkám si|jsem)\s+(\S{2,})/i);
  return m?.[1] ?? null;
}

export function extractEmail(text: string): string | null {
  const m = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  return m?.[1] ?? null;
}

export function extractPhone(text: string): string | null {
  const m = text.match(/((?:\+420|0)\s*[0-9]{3}\s*[0-9]{3}\s*[0-9]{3})/);
  return m?.[1].replace(/\s+/g, "") ?? null;
}

export function updateMemory(
  memory: DoofyMemory,
  userText: string,
  responseTimeMs: number
): DoofyMemory {
  const now = Date.now();
  const style = detectStyle(userText);
  const peak = detectEmotionalPeak(userText);
  const trigger = detectTrigger(userText);
  const name = extractName(userText);
  const email = extractEmail(userText);
  const phone = extractPhone(userText);

  const newTopics = [...memory.topics];
  if (trigger && !newTopics.includes(trigger)) newTopics.push(trigger);

  const newEmotionalPeaks = [...memory.emotionalPeaks];
  if (peak) {
    newEmotionalPeaks.push(peak);
    if (newEmotionalPeaks.length > 10) newEmotionalPeaks.shift();
  }

  const newTriggers = [...memory.triggers];
  if (trigger) {
    newTriggers.push(trigger);
    if (newTriggers.length > 8) newTriggers.shift();
  }

  const newAvgResponseTime =
    memory.avgResponseTimeMs === 0
      ? responseTimeMs
      : Math.round(memory.avgResponseTimeMs * 0.7 + responseTimeMs * 0.3);

  const length = userText.length;
  const messageLength: "short" | "medium" | "long" =
    length < 30 ? "short" : length < 120 ? "medium" : "long";

  let automationInterest = memory.automationInterest;
  if (trigger === "time_waste") automationInterest = Math.min(100, automationInterest + 15);
  if (trigger === "ai") automationInterest = Math.min(100, automationInterest + 10);
  if (peak === "curiosity") automationInterest = Math.min(100, automationInterest + 5);
  if (peak === "anger") automationInterest = Math.min(100, automationInterest + 10);

  let jokesLanded = memory.jokesLanded;
  if (peak === "laugh") jokesLanded = Math.min(100, jokesLanded + 1);

  const newQuestions = [...memory.lastQuestions, userText.slice(0, 80)].slice(-5);

  return {
    ...memory,
    name: name || memory.name,
    email: email || memory.email,
    phone: phone || memory.phone,
    visits: memory.visits + (memory.lastMessageAt === 0 ? 1 : 0),
    lastTopic: userText.slice(0, 100),
    topics: newTopics,
    emotionalPeaks: newEmotionalPeaks,
    triggers: newTriggers,
    communicationStyle: style !== "unknown" ? style : memory.communicationStyle,
    avgResponseTimeMs: newAvgResponseTime,
    messageLength,
    jokesLanded,
    automationInterest,
    lastQuestions: newQuestions,
    lastMessageAt: now,
  };
}

export function buildMemoryContext(memory: DoofyMemory): string {
  const parts: string[] = [];
  if (memory.name) parts.push(`Uživatelovo jméno: "${memory.name}". Oslovuj ho.`);
  if (memory.email) parts.push(`Má email: ${memory.email}.`);
  if (memory.phone) parts.push(`Má telefon: ${memory.phone}.`);
  if (memory.visits > 0) parts.push(`Návštěva č. ${memory.visits + 1}.`);
  if (memory.communicationStyle !== "unknown") parts.push(`Styl komunikace: ${memory.communicationStyle}.`);
  if (memory.messageLength) parts.push(`Délka zpráv: ${memory.messageLength}.`);
  if (memory.avgResponseTimeMs > 0) parts.push(`Průměrná rychlost odpovědi: ${Math.round(memory.avgResponseTimeMs / 1000)}s.`);
  if (memory.topics.length) parts.push(`Probíraná témata: ${memory.topics.join(", ")}.`);
  if (memory.triggers.length) parts.push(`Aktivní triggery: ${memory.triggers.join(", ")}.`);
  if (memory.emotionalPeaks.length) parts.push(`Emoční stavy: ${memory.emotionalPeaks.slice(-5).join(", ")}.`);
  parts.push(`Zájem o automatizaci: ${memory.automationInterest}/100.`);
  if (memory.jokesLanded > 0) parts.push(`Zareagoval pozitivně na ${memory.jokesLanded} vtipů.`);
  if (memory.lastQuestions.length) parts.push(`Poslední otázky: ${memory.lastQuestions.join(" | ")}.`);
  return parts.join("\n");
}
