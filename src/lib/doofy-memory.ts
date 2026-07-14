export type CommunicationStyle = "formal" | "casual" | "teasing" | "guarded" | "open" | "unknown";

export type ShadowMessage = {
  role: "user" | "assistant";
  content: string;
  ts: number;
};

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
  sessionCount: number;
  totalMessages: number;
  openedChatCount: number;
  // Behavioral predictions
  predictedChurn: number; // 0-100, how likely user is to leave
  engagementScore: number; // 0-100, how engaged user is
  conversionReadiness: number; // 0-100, ready for contact offer
  // Metrics
  avgWordsPerMessage: number;
  timeSpentSeconds: number;
  questionsAsked: number;
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
  sessionCount: 0,
  totalMessages: 0,
  openedChatCount: 0,
  predictedChurn: 50,
  engagementScore: 30,
  conversionReadiness: 0,
  avgWordsPerMessage: 0,
  timeSpentSeconds: 0,
  questionsAsked: 0,
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
  if (/\b(kurva|kokot|debil|píča|hovno|seru|jebat|jebni|zasranej)\b/.test(lower)) return "teasing";
  if (/\b(dobrý den|pane|vážený|s pozdravem|žádost|firm[ay])\b/.test(lower)) return "formal";
  if (/\b(čau|cau|hele|kámo|lol|haha|xd|😂|joke|sranda|borec)\b/.test(lower)) return "open";
  if (/\b(nechci|nemám zájem|spam|neodpovídej|neotravuj|nesnáším)\b/.test(lower)) return "guarded";
  if (text.length < 20) return "casual";
  return "unknown";
}

export function detectEmotionalPeak(text: string): string | null {
  const lower = text.toLowerCase();
  if (/\b(haha|lol|xd|😂|směj|vtipný|sranda|hehe)\b/.test(lower)) return "laugh";
  if (/\b(nesnáším|nyní|píča|kokot|debil|seru|hovno|vytáčí|nasrat|zajebanej)\b/.test(lower)) return "anger";
  if (/\b(zajímavé|fakt|vážně|jak to|proč|jak|co to je|k čemu|ukáž)\b/.test(lower)) return "curiosity";
  if (/\b(nudí|nuda|zbytečný|nekonečno|dlouhý|mdlý|spát)\b/.test(lower)) return "boredom";
  if (/\b(nevěřím|pochybuju|ale fakt|seriozně|fakt?|vážně?)\b/.test(lower)) return "skepticism";
  if (/\b(díky|super|skvělý|paráda|geniální|bomba|perfektní)\b/.test(lower)) return "appreciation";
  if (/\b(strach|bojím|obávám|nevím jestli|risk|nejsem si jistej)\b/.test(lower)) return "fear";
  if (/\b(zkusíme|chci to|jdu do toho|jak začít|kde objednat|napiš)\b/.test(lower)) return "interest";
  return null;
}

export function detectTrigger(text: string): string | null {
  const lower = text.toLowerCase();
  if (/\b(čas|hodin|dlouho|trvá|ručně|kopírovat|vypisovat|report|excel|admin|faktur|účetnictví|mzdy|dane|papírování)\b/.test(lower)) return "time_waste";
  if (/\b(peníze|korun|eur|usd|náklady|drahý|levný|cena|zisk|budget|rozpočet|kalkulace)\b/.test(lower)) return "money";
  if (/\b(klient|zákazník|zákazníci|podpora|stížnost|obchod|prodej|lead)\b/.test(lower)) return "customer";
  if (/\b(tým|lidi|zaměstnanci|kolegové|vedení|šéf|personál|nábor|HR)\b/.test(lower)) return "people";
  if (/\b(ai|umělá inteligence|chatbot|automatizace|robot|llm|gpt|claude|model|stroj)\b/.test(lower)) return "ai";
  if (/\b(web|stránky|eshop|aplikace|app|frontend|backend|nextjs|react|python)\b/.test(lower)) return "tech";
  if (/\b(marketing|seo|obsah|copywriting|sociální sítě|postovat|blog)\b/.test(lower)) return "marketing";
  if (/\b(dokumentace|wiki|znalostní báze|data|databáze|reporty|dashboard)\b/.test(lower)) return "knowledge";
  return null;
}

export function detectIndustry(text: string): string | null {
  const lower = text.toLowerCase();
  if (/\b(programátor|developer|IT|software|coder|backend|frontend|devops)\b/.test(lower)) return "tech";
  if (/\b(podnikatel|firma|živnost|s.r.o.|a.s.|vlastník|CEO)\b/.test(lower)) return "business";
  if (/\b(marketing|agentura|SEO|copywriter|social media)\b/.test(lower)) return "marketing";
  if (/\b(účetní|daně|finance|banka|pojišťovna)\b/.test(lower)) return "finance";
  if (/\b(prodej|obchod|realit|auta|eshop|retail)\b/.test(lower)) return "sales";
  if (/\b(škola|učitel|student|vzdělávání|kurz)\b/.test(lower)) return "education";
  if (/\b(zdravotnictví|lékař|nemocnice|pacient|klinika)\b/.test(lower)) return "healthcare";
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

function updateMetric(oldVal: number, newVal: number, alpha = 0.7): number {
  if (oldVal === 0) return newVal;
  return Math.round(oldVal * alpha + newVal * (1 - alpha));
}

export function updateMemory(
  memory: DoofyMemory,
  userText: string,
  responseTimeMs: number,
  sessionDurationMs: number,
  openedChat: boolean = false
): DoofyMemory {
  const now = Date.now();
  const style = detectStyle(userText);
  const peak = detectEmotionalPeak(userText);
  const trigger = detectTrigger(userText);
  const industry = detectIndustry(userText);
  const name = extractName(userText);
  const email = extractEmail(userText);
  const phone = extractPhone(userText);

  const words = userText.trim().split(/\s+/).length;
  const newAvgWords = updateMetric(memory.avgWordsPerMessage, words);
  const newTotalMessages = memory.totalMessages + 1;
  const newTimeSpent = memory.timeSpentSeconds + Math.round(sessionDurationMs / 1000);

  const newTopics = [...memory.topics];
  if (trigger && !newTopics.includes(trigger)) newTopics.push(trigger);
  if (industry && !newTopics.includes(industry)) newTopics.push(industry);

  const newEmotionalPeaks = [...memory.emotionalPeaks];
  if (peak) {
    newEmotionalPeaks.push(peak);
    if (newEmotionalPeaks.length > 15) newEmotionalPeaks.shift();
  }

  const newTriggers = [...memory.triggers];
  if (trigger) {
    newTriggers.push(trigger);
    if (newTriggers.length > 12) newTriggers.shift();
  }

  const newQuestions = [...memory.lastQuestions, userText.slice(0, 80)].slice(-5);
  const newQuestionsAsked = memory.questionsAsked + (/\?/.test(userText) ? 1 : 0);

  // Engagement score
  let engagement = Math.min(100, 30 + newTotalMessages * 5 + newQuestionsAsked * 3 + Math.min(newTimeSpent / 10, 20));
  if (peak === "laugh") engagement = Math.min(100, engagement + 10);
  if (peak === "curiosity") engagement = Math.min(100, engagement + 8);
  if (peak === "interest") engagement = Math.min(100, engagement + 15);
  if (peak === "boredom") engagement = Math.max(10, engagement - 15);
  if (peak === "guarded") engagement = Math.max(10, engagement - 10);

  // Automation interest
  let automationInterest = memory.automationInterest;
  if (trigger === "time_waste") automationInterest = Math.min(100, automationInterest + 18);
  if (trigger === "ai") automationInterest = Math.min(100, automationInterest + 12);
  if (trigger === "marketing") automationInterest = Math.min(100, automationInterest + 10);
  if (trigger === "knowledge") automationInterest = Math.min(100, automationInterest + 14);
  if (trigger === "customer") automationInterest = Math.min(100, automationInterest + 16);
  if (peak === "curiosity") automationInterest = Math.min(100, automationInterest + 6);
  if (peak === "anger") automationInterest = Math.min(100, automationInterest + 12);
  if (peak === "interest") automationInterest = Math.min(100, automationInterest + 20);
  if (peak === "boredom") automationInterest = Math.max(0, automationInterest - 8);

  // Conversion readiness — combination of engagement + automation interest + depth
  let conversionReadiness = Math.min(100, Math.round(
    automationInterest * 0.5 + engagement * 0.3 + Math.min(newTotalMessages * 3, 20)
  ));
  if (trigger === "money") conversionReadiness = Math.min(100, conversionReadiness + 8);
  if (memory.email || memory.phone) conversionReadiness = Math.min(100, conversionReadiness + 15);

  // Predicted churn
  let churn = Math.max(10, 100 - engagement);
  if (peak === "boredom") churn = Math.min(100, churn + 25);
  if (peak === "guarded") churn = Math.min(100, churn + 20);
  if (peak === "interest") churn = Math.max(10, churn - 25);
  if (peak === "laugh") churn = Math.max(10, churn - 15);

  // Jokes landed
  let jokesLanded = memory.jokesLanded;
  if (peak === "laugh") jokesLanded = Math.min(100, jokesLanded + 1);

  const newAvgResponseTime = updateMetric(memory.avgResponseTimeMs, responseTimeMs);

  const length = userText.length;
  const messageLength: "short" | "medium" | "long" =
    length < 30 ? "short" : length < 120 ? "medium" : "long";

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
    sessionCount: memory.sessionCount + 1,
    totalMessages: newTotalMessages,
    openedChatCount: memory.openedChatCount + (openedChat ? 1 : 0),
    predictedChurn: churn,
    engagementScore: engagement,
    conversionReadiness,
    avgWordsPerMessage: newAvgWords,
    timeSpentSeconds: newTimeSpent,
    questionsAsked: newQuestionsAsked,
  };
}

// --- Storage helpers (browser-only) ---

const MEMORY_COOKIE = "doofy_memory";
const SHADOW_KEY = "doofy_shadow";
const MAX_SHADOW_MESSAGES = 10;

export function loadShadow(): ShadowMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SHADOW_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.slice(-MAX_SHADOW_MESSAGES);
  } catch { /* ignore */ }
  return [];
}

export function saveShadow(messages: ShadowMessage[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SHADOW_KEY, JSON.stringify(messages.slice(-MAX_SHADOW_MESSAGES)));
  } catch { /* ignore */ }
}

export function loadMemory(): DoofyMemory {
  if (typeof window === "undefined") return { ...EMPTY_MEMORY };
  try {
    return parseMemory(document.cookie);
  } catch { /* ignore */ }
  return { ...EMPTY_MEMORY };
}

export function saveMemory(memory: DoofyMemory) {
  if (typeof window === "undefined") return;
  try {
    document.cookie = `${MEMORY_COOKIE}=${encodeURIComponent(stringifyMemory(memory))}; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;
  } catch { /* ignore */ }
}

export function appendShadow(messages: ShadowMessage[], role: ShadowMessage["role"], content: string): ShadowMessage[] {
  return [...messages, { role, content, ts: Date.now() }].slice(-MAX_SHADOW_MESSAGES);
}

export function buildShadowContext(messages: ShadowMessage[]): string {
  if (!messages.length) return "";
  return messages
    .map((m) => `${m.role === "user" ? "UŽIVATEL" : "DOOFY"}: ${m.content}`)
    .join("\n");
}

export function buildMemoryContext(memory: DoofyMemory): string {
  const parts: string[] = [];
  if (memory.name) parts.push(`JMÉNO: ${memory.name}. Oslovuj ho.`);
  if (memory.email) parts.push(`EMAIL: ${memory.email}.`);
  if (memory.phone) parts.push(`TEL: ${memory.phone}.`);
  if (memory.visits > 0) parts.push(`NÁVŠTĚVA #${memory.visits}.`);

  // Strategic decisions based on data
  parts.push(`ENGAGEMENT: ${memory.engagementScore}/100.`);
  parts.push(`CHURN RISK: ${memory.predictedChurn}/100.`);
  parts.push(`AUTOMATION INTEREST: ${memory.automationInterest}/100.`);
  parts.push(`CONVERSION READY: ${memory.conversionReadiness}/100.`);

  if (memory.communicationStyle !== "unknown") parts.push(`STYL: ${memory.communicationStyle}.`);
  if (memory.messageLength) parts.push(`DÉLKA ZPRÁV: ${memory.messageLength}.`);
  if (memory.avgResponseTimeMs > 0) parts.push(`RYCHLOST ODP: ${Math.round(memory.avgResponseTimeMs / 1000)}s.`);
  if (memory.avgWordsPerMessage > 0) parts.push(`PRŮMĚR SLOV/ZPRÁVU: ${memory.avgWordsPerMessage}.`);
  if (memory.topics.length) parts.push(`TÉMATA: ${memory.topics.join(", ")}.`);
  if (memory.triggers.length) parts.push(`TRIGGERY: ${memory.triggers.join(", ")}.`);
  if (memory.emotionalPeaks.length) parts.push(`EMOCE: ${memory.emotionalPeaks.slice(-5).join(", ")}.`);
  if (memory.lastQuestions.length) parts.push(`POSLEDNÍ OTÁZKY: ${memory.lastQuestions.join(" | ")}.`);

  // Strategy rules
  if (memory.conversionReadiness >= 75 && memory.engagementScore >= 60) {
    parts.push(`>> STRATEGIE: Uživatel je připravený. Nabídni kontakt nebo call. Neotravuj, ale buď přímý.`);
  } else if (memory.predictedChurn >= 70) {
    parts.push(`>> STRATEGIE: Uživatel nudí nebo odchází. Hoď něco nečekaného. Šokni ho vtipně nebo dej cliffhanger.`);
  } else if (memory.automationInterest >= 60 && memory.engagementScore >= 50) {
    parts.push(`>> STRATEGIE: Uživatel má zájem o automatizaci. Ptej se na detail a počítej výhody. Push & pull.`);
  } else if (memory.jokesLanded >= 3) {
    parts.push(`>> STRATEGIE: Uživatel reaguje na humor. Buď vtipnější, ale nevtíravý.`);
  } else {
    parts.push(`>> STRATEGIE: Zahřívej se. Zajímej se, prudi, ale netlač. Hledej trigger.`);
  }

  return parts.join("\n");
}

const FIRST_GREETINGS = [
  "Čau. Co tě zajímá? Můžu ti říct o Petrovi, jeho projektech, nebo jak by ti mohl pomoct.",
  "Ahoj. Chceš vědět, co Petr umí, co staví, nebo jak by ti ušetřil čas?",
  "Čau. Mám info o Petrovi, jeho projektech a o tom, jak lidem pomáhá. Co chceš slyšet?",
];

const RETURNING_GREETINGS = [
  "Hele, ty ses tu už stavil, ne? Co tě zajímá teď?",
  "Vítej zpět. Tobě se tu zalíbilo, viď?",
  "Zase ty. Dobře. Co řešíš?",
  "Ahoj znovu. Navážem tam, kde jsme skončili?",
];

const WARM_GREETINGS = [
  "Ahoj{NAME}. Minule jsme řešili {TOPIC}. Pokračujem?",
  "Čau{NAME}. Posledně tě zajímalo {TOPIC}. Chceš víc?",
  "Hele{NAME}, vracíš se k {TOPIC}, nebo řešíš něco novýho?",
];

const LONG_ABSENCE_GREETINGS = [
  "Čau{NAME}. Už je to nějaká doba. Posledně jsme koukali na {TOPICS}. Co teď?",
  "Ahoj{NAME}. Dlouho jsme se neviděli. Pamatuješ? {TOPICS}. Nový téma?",
];

function formatName(name: string): string {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function buildGreeting(memory: DoofyMemory): string {
  // New = never sent a message. Opening the bubble without chatting is not a "returning conversation".
  if (memory.totalMessages === 0) {
    return FIRST_GREETINGS[Math.floor(Math.random() * FIRST_GREETINGS.length)];
  }

  const daysSinceLastMessage = memory.lastMessageAt
    ? Math.round((Date.now() - memory.lastMessageAt) / (1000 * 60 * 60 * 24))
    : 0;

  if (daysSinceLastMessage >= 7 && (memory.name || memory.topics.length > 0)) {
    const name = formatName(memory.name);
    const topics = memory.topics.slice(-3).join(", ");
    if (name && topics) {
      const raw = LONG_ABSENCE_GREETINGS[Math.floor(Math.random() * LONG_ABSENCE_GREETINGS.length)];
      return raw.replace("{NAME}", ` ${name}`).replace("{TOPICS}", topics);
    }
  }

  if (memory.engagementScore >= 50 && (memory.name || memory.lastTopic)) {
    const name = formatName(memory.name);
    const topic = memory.lastTopic || memory.topics.at(-1) || "to tvoje";
    if (name || topic) {
      const raw = WARM_GREETINGS[Math.floor(Math.random() * WARM_GREETINGS.length)];
      return raw.replace("{NAME}", name ? ` ${name}` : "").replace("{TOPIC}", topic);
    }
  }

  return RETURNING_GREETINGS[Math.floor(Math.random() * RETURNING_GREETINGS.length)];
}

