"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CloseIcon, SendIcon } from "./icons";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Contextual suggestion map — keyed by keywords in the last assistant message
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
  "Co je VocalBrain?",
  "Co je 4rap.cz?",
  "Jaké má zkušenosti s AI?",
  "Proč zrovna Petr?",
];

const GREETINGS = [
  "Jsem Doofy. Peťův osobní asistent. Něco jako Eva od O2, jen vychytanější a vtipnější.",
  "Čau, jsem Doofy. Peťův osobní asistent. Co tě sem přivádí? Nech mě hádat — osud.",
  "Ahoj, jsem Doofy. Peťův osobní asistent. Porovnej sám — přijde ti, že konverzuju jako AI v korporátu? Neřekl bych.",
  "Jsem Doofy. Peťův osobní asistent. Vypadáš sympaticky. Tobě to povím.",
];

const SESSION_KEY = "doofy_messages";

function DoofyAvatar({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="15" fill="currentColor" opacity="0.15" />
      <path
        d="M10 22V10h5.5a4.5 4.5 0 0 1 0 9H12.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="21" cy="11" r="1.8" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function getContextSuggestions(lastAssistantMessage: string): string[] {
  const lower = lastAssistantMessage.toLowerCase();
  // Find best matching context key
  let bestKey = "";
  let bestScore = 0;
  for (const [key, _suggestions] of Object.entries(CONTEXT_SUGGESTIONS)) {
    if (lower.includes(key)) {
      const score = key.length; // longer match = more specific
      if (score > bestScore) {
        bestScore = score;
        bestKey = key;
      }
    }
  }
  if (bestKey) {
    const pool = CONTEXT_SUGGESTIONS[bestKey];
    // Pick 3 random from the pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }
  // Fallback: pick 3 random from fallback pool
  const shuffled = [...FALLBACK_SUGGESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const greetingSet = useRef(false);
  const lastAssistantRef = useRef("");

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Restore session from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          greetingSet.current = true;
          // Restore suggestions from last assistant message
          const lastAssistant = [...parsed].reverse().find((m) => m.role === "assistant");
          if (lastAssistant) {
            lastAssistantRef.current = lastAssistant.content;
            setSuggestions(getContextSuggestions(lastAssistant.content));
          }
          return;
        }
      }
    } catch {
      // ignore
    }
    // First visit
    if (!greetingSet.current) {
      greetingSet.current = true;
      const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
      setMessages([{ role: "assistant", content: greeting }]);
      lastAssistantRef.current = greeting;
      setSuggestions(getContextSuggestions(greeting));
    }
  }, []);

  // Save to sessionStorage on messages change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
      } catch {
        // ignore
      }
    }
  }, [messages]);

  useEffect(() => {
    function handleOpenDoofy() {
      setOpen(true);
    }
    window.addEventListener("open-doofy", handleOpenDoofy);
    return () => window.removeEventListener("open-doofy", handleOpenDoofy);
  }, []);

  const [ringPulse, setRingPulse] = useState(false);
  useEffect(() => {
    if (open) return;
    const interval = setInterval(() => {
      setRingPulse(true);
      setTimeout(() => setRingPulse(false), 1200);
    }, 10000);
    return () => clearInterval(interval);
  }, [open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || loading) return;

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
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Něco se pokazilo. Zkuste to znovu.");
      }

      // Multi-message support: add each reply with a delay
      const replies: string[] = data.replies || [data.reply];
      for (let i = 0; i < replies.length; i++) {
        const r = replies[i];
        if (!r?.trim()) continue;
        // Delay between messages: 400ms for first, 600ms for subsequent
        if (i > 0) await new Promise((resolve) => setTimeout(resolve, 600));
        setMessages((prev) => [...prev, { role: "assistant", content: r.trim() }]);
        if (i === replies.length - 1) {
          lastAssistantRef.current = r.trim();
          setSuggestions(getContextSuggestions(r.trim()));
        }
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Doofy má momentálně technickou pauzu. Zkuste to za chvíli."
      );
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleSuggestion(text: string) {
    sendMessage(text);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`doofy-float-btn fixed bottom-4 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-zinc-950 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold/50 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14 ${
          open ? "pointer-events-none scale-0 opacity-0" : "scale-100 opacity-100"
        } ${ringPulse ? "pulse-ring" : ""}`}
        aria-label="Otevřít chat s Doofy"
      >
        <DoofyAvatar size={28} />
      </button>

      <div
        className={`fixed z-50 flex flex-col overflow-hidden shadow-2xl transition-transform duration-300 ease-out ${
          isMobile
            ? "inset-0 h-dvh w-full rounded-none border-0"
            : "w-[calc(100vw-2rem)] max-w-[400px] rounded-2xl border"
        } ${open ? "translate-y-0" : "translate-y-[120%]"}`}
        style={
          isMobile
            ? {
                backgroundColor: "var(--bg)",
              }
            : {
                bottom: "max(1rem, env(safe-area-inset-bottom))",
                right: "max(1rem, env(safe-area-inset-right))",
                height: "min(600px, calc(100vh - 2rem - env(safe-area-inset-bottom) - env(safe-area-inset-top)))",
                maxHeight: "600px",
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
              }
        }
        aria-hidden={!open}
      >
        {/* Header */}
        <div
          className="flex shrink-0 items-center justify-between border-b px-4 py-3"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-gold">
              <DoofyAvatar size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight" style={{ color: "var(--text)" }}>Doofy</p>
              <p className="text-[10px] leading-tight" style={{ color: "var(--text-muted)" }}>osobní asistent</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1.5 transition-colors hover:opacity-80"
            style={{ color: "var(--text-muted)" }}
            aria-label="Zavřít chat"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 scrollbar-thin"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user" ? "rounded-br-sm" : "rounded-bl-sm glass"
                }`}
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
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}

          {error && (
            <div className="mb-3 text-center text-xs" style={{ color: "#ef4444" }}>{error}</div>
          )}
        </div>

        {/* Input area */}
        <div
          className="shrink-0 border-t px-3 py-3"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          {/* Contextual suggestions — max 3 */}
          {suggestions.length > 0 && (
            <div className="mb-2.5 flex flex-wrap gap-1.5">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestion(suggestion)}
                  disabled={loading}
                  className="rounded-full border px-2.5 py-1 text-[10px] transition-all duration-200 hover:border-gold/40 hover:text-gold disabled:opacity-50"
                  style={{
                    borderColor: "var(--tag-border)",
                    backgroundColor: "var(--tag-bg)",
                    color: "var(--tag-text)",
                  }}
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
              onChange={(e) => setInput(e.target.value)}
              placeholder="Napiš zprávu..."
              disabled={loading}
              className="min-w-0 flex-1 rounded-full border px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold/50"
              style={{
                borderColor: "var(--input-border)",
                backgroundColor: "var(--input-bg)",
                color: "var(--input-text)",
              }}
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
