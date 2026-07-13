"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CloseIcon, SendIcon } from "./icons";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const CONTEXT_SUGGESTIONS: Record<string, string[]> = {
  vocalbrain: ["Jak VocalBrain funguje?", "Jaké technologie používá?", "Je to open-source?"],
  "4rap": ["Kolik má entit?", "Jaké technologie?", "Kdo data spravuje?"],
  "4rap studio": ["Co je 4Bars?", "Co je 4Flow?", "Pro koho je určenej?"],
  stylemorph: ["Jak to funguje?", "Jaký model používá?", "Můžu to zkusit?"],
  scrollo: ["Jaké nástroje nabízí?", "Je to fakt bez reklam?", "Je to PWA?"],
  "autoblog": ["Jak funguje pipeline?", "S jakými CMS pracuje?", "Je to open-source?"],
  projekty: ["Co je VocalBrain?", "Co je 4rap.cz?", "Jaký je jeho nejoceňovanější projekt?"],
  "tech stack": ["Jaký backend?", "Jaké AI modely?", "Co GPU?"],
  "voice cloning": ["Jak to funguje?", "K čemu to používá?", "Poznáš rozdíl?"],
  "ai": ["Jaké AI projekty?", "Lokální vs cloud?", "Co je MCP?"],
  "zkušenosti": ["Kde pracoval?", "Jak dlouho dělá IT?", "Co umí?"],
  "proč": ["Jaké má výhody?", "Co ho odlišuje?", "Jak rychle dodá?"],
  kontakt: ["Jak mu napsat?", "Kde ho najdu?", "Jak rychle odpovídá?"],
};

const FALLBACK_SUGGESTIONS = [
  "Kdo je Petr?",
  "Co ho baví?",
  "Jak mi může pomoct?",
  "Proč miluje AI?",
  "Co děláš ty?",
  "Co tě denně sere?",
  "Jak vidí budoucnost?",
  "Co nesnáší?",
  "Má jeho práce smysl?",
  "Kam míří?",
];

const GREETINGS = [
  "Jsem Doofy. Peťův osobní asistent. Něco jako Eva od O2, jen vychytanější a vtipnější.",
  "Čau, jsem Doofy. Co tě denně sere? Ptej se na cokoliv.",
  "Ahoj, jsem Doofy. Ptej se na co chceš, já na co chci odpovím.",
  "Jsem Doofy. Kdo jsi ty? A co děláš?",
  "Jsem Doofy. Neboj, neprodávám nic. Jen se rád ptám. Co děláš?",
];

const SESSION_KEY = "***";
const OPENS_KEY = "doofy_opens";

function DoofyAvatar({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="currentColor" opacity="0.15" />
      <path d="M10 22V10h5.5a4.5 4.5 0 0 1 0 9H12.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="21" cy="11" r="1.8" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function getContextSuggestions(lastAssistantMessage: string): string[] {
  const lower = lastAssistantMessage.toLowerCase();
  let bestKey = "";
  let bestScore = 0;
  for (const [key] of Object.entries(CONTEXT_SUGGESTIONS)) {
    if (lower.includes(key)) {
      const score = key.length;
      if (score > bestScore) { bestScore = score; bestKey = key; }
    }
  }
  if (bestKey) {
    const pool = CONTEXT_SUGGESTIONS[bestKey];
    return [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
  }
  return [...FALLBACK_SUGGESTIONS].sort(() => Math.random() - 0.5).slice(0, 3);
}

function randomDelay(): number {
  return Math.floor(Math.random() * 1195) + 5;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [openCount, setOpenCount] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const greetingSet = useRef(false);
  const lastAssistantRef = useRef("");
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRepliesRef = useRef<string[]>([]);
  const isSendingRef = useRef(false);
  const lastUserMessageAtRef = useRef<number>(0);
  const chatOpenedAtRef = useRef<number>(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          greetingSet.current = true;
          const lastAssistant = [...parsed].reverse().find((m) => m.role === "assistant");
          if (lastAssistant) {
            lastAssistantRef.current = lastAssistant.content;
            setSuggestions(getContextSuggestions(lastAssistant.content));
          }
          return;
        }
      }
    } catch { /* ignore */ }
    if (!greetingSet.current) {
      greetingSet.current = true;
      const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
      setMessages([{ role: "assistant", content: greeting }]);
      lastAssistantRef.current = greeting;
      setSuggestions(getContextSuggestions(greeting));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages)); } catch { /* ignore */ }
    }
  }, [messages]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-doofy", handler);
    return () => window.removeEventListener("open-doofy", handler);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      if (chatOpenedAtRef.current === 0) chatOpenedAtRef.current = Date.now();
      const count = parseInt(sessionStorage.getItem(OPENS_KEY) || "0", 10) + 1;
      sessionStorage.setItem(OPENS_KEY, String(count));
      setOpenCount(count);
    }
  }, [open]);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, loading]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    setUserTyping(true);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => setUserTyping(false), 1500);
  }

  async function waitIfTyping(): Promise<void> {
    await new Promise((r) => setTimeout(r, randomDelay()));
    while (userTyping) {
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  async function processPending() {
    if (isSendingRef.current || pendingRepliesRef.current.length === 0) return;
    isSendingRef.current = true;
    const replies = [...pendingRepliesRef.current];
    pendingRepliesRef.current = [];

    for (let i = 0; i < replies.length; i++) {
      const r = replies[i];
      if (!r?.trim()) continue;
      if (i > 0) {
        await waitIfTyping();
        await new Promise((r) => setTimeout(r, randomDelay()));
      }
      setMessages((prev) => [...prev, { role: "assistant", content: r.trim() }]);
      if (i === replies.length - 1) {
        lastAssistantRef.current = r.trim();
        setSuggestions(getContextSuggestions(r.trim()));
      }
    }
    isSendingRef.current = false;
    setLoading(false);
  }

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || loading) return;

    const now = Date.now();
    const responseTimeMs = lastUserMessageAtRef.current ? now - lastUserMessageAtRef.current : 0;
    lastUserMessageAtRef.current = now;
    const sessionDurationMs = chatOpenedAtRef.current ? now - chatOpenedAtRef.current : 0;

    const userMessage: Message = { role: "user", content: content.trim() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          responseTimeMs,
          sessionDurationMs,
          hasOpenedTwice: openCount >= 2,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) throw new Error(data.error || "Něco se pokazilo.");

      const replies: string[] = data.replies || [data.reply];
      pendingRepliesRef.current = [...pendingRepliesRef.current, ...replies.filter((r: string) => r?.trim())];

      if (!isSendingRef.current) processPending();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Doofy má technickou pauzu.");
      setLoading(false);
    }
  }, [messages, loading, openCount]);

  function handleSubmit(e: React.FormEvent) { e.preventDefault(); sendMessage(input); }
  function handleSuggestion(text: string) { sendMessage(text); }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium shadow-2xl transition-all duration-300 hover:scale-105 sm:bottom-6 sm:right-6 ${
          open ? "pointer-events-none scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface-strong)",
          color: "var(--text)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
        }}
        aria-label="Chat s Doofy"
      >
        <DoofyAvatar size={22} />
        <span className="hidden sm:inline">Doofy</span>
      </button>

      <div
        className={`fixed z-50 flex flex-col overflow-hidden shadow-2xl transition-transform duration-300 ease-out ${
          isMobile ? "inset-0 h-dvh w-full rounded-none border-0" : "w-[calc(100vw-2rem)] max-w-[400px] rounded-2xl border"
        } ${open ? "translate-y-0" : "translate-y-[120%]"}`}
        style={isMobile ? { backgroundColor: "var(--bg)" } : {
          bottom: "max(1rem, env(safe-area-inset-bottom))",
          right: "max(1rem, env(safe-area-inset-right))",
          height: "min(600px, calc(100vh - 2rem - env(safe-area-inset-bottom) - env(safe-area-inset-top)))",
          maxHeight: "600px",
          backgroundColor: "var(--bg)",
          borderColor: "var(--border)",
        }}
        aria-hidden={!open}
      >
        <div className="flex shrink-0 items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-gold"><DoofyAvatar size={22} /></div>
            <div>
              <p className="text-sm font-semibold leading-tight" style={{ color: "var(--text)" }}>Doofy</p>
              <p className="text-[10px] leading-tight" style={{ color: "var(--text-muted)" }}>osobní asistent</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 transition-colors hover:opacity-80" style={{ color: "var(--text-muted)" }} aria-label="Zavřít chat"><CloseIcon size={18} /></button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 scrollbar-thin">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "rounded-br-sm" : "rounded-bl-sm glass"}`}
                style={{
                  color: msg.role === "user" ? "var(--chat-user-text)" : "var(--chat-assistant-text)",
                  backgroundColor: msg.role === "user" ? "var(--chat-user-bg)" : "var(--chat-assistant-bg)",
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="mb-3 flex justify-start">
              <div className="glass inline-flex items-center gap-1.5 rounded-2xl rounded-bl-sm px-4 py-3">
                <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
              </div>
            </div>
          )}
          {error && <div className="mb-3 text-center text-xs" style={{ color: "#ef4444" }}>{error}</div>}
        </div>

        <div className="shrink-0 border-t px-3 py-3" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}>
          {suggestions.length > 0 && (
            <div className="mb-2.5 flex flex-wrap gap-1.5">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestion(suggestion)}
                  disabled={loading}
                  className="rounded-full border px-2.5 py-1 text-[10px] transition-all duration-200 hover:border-gold/40 hover:text-gold disabled:opacity-50"
                  style={{ borderColor: "var(--tag-border)", backgroundColor: "var(--tag-bg)", color: "var(--tag-text)" }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Napiš zprávu..."
              disabled={loading}
              className="min-w-0 flex-1 rounded-full border px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold/50"
              style={{ borderColor: "var(--input-border)", backgroundColor: "var(--input-bg)", color: "var(--input-text)" }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold text-zinc-950 transition-transform hover:scale-105 disabled:opacity-50"
              aria-label="Odeslat"
            >
              <SendIcon size={17} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
