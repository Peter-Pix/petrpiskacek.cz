"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, SendIcon } from "./icons";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTION_POOL = [
  // Projekty (6)
  "Co je VocalBrain?",
  "Co je 4rap.cz?",
  "Co je 4Rap Studio?",
  "Co je StyleMorph?",
  "Co je Scrollo.cz?",
  "Co je AutoBlog Publisher?",
  // Pracovní pohovor (4)
  "Proč zrovna Petr?",
  "Jaké má zkušenosti s AI?",
  "Jaký je jeho tech stack?",
  "Kde pracoval předtím?",
  // Sranda (2)
  "Kolik má Petr rukou?",
  "Proč je takovej workoholik?",
];

function pickRandomSuggestions(count: number): string[] {
  const shuffled = [...SUGGESTION_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const GREETINGS = [
  "Jsem Doofy. Peťův AI asistent, něco jako Eva od O2, jen vychytanější a vtipnější.",
  "Čau, jsem Doofy. Peťův AI asistent. Co tě sem přivádí? Nech mě hádat — osud.",
  "Ahoj, jsem Doofy. Peťův AI asistent. Porovnej sám — přijde ti, že konverzuju jako AI v korporátu? Neřekl bych.",
];

// Inline Doofy avatar — stylized "D" monogram, no external icon needed
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

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const greetingSet = useRef(false);

  // Pick greeting + suggestions on client only to avoid hydration mismatch
  useEffect(() => {
    if (!greetingSet.current) {
      greetingSet.current = true;
      setMessages([
        { role: "assistant", content: GREETINGS[Math.floor(Math.random() * GREETINGS.length)] },
      ]);
      setSuggestions(pickRandomSuggestions(4));
    }
  }, []);

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

  async function sendMessage(content: string) {
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

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Doofy má momentálně technickou pauzu. Zkuste to za chvíli."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleSuggestion(text: string) {
    sendMessage(text);
  }

  return (
    <>
      {/* Floating button — safe margins, always in viewport */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-4 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-zinc-950 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold/50 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14 ${
          open ? "pointer-events-none scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label="Otevřít chat s Doofy"
      >
        <DoofyAvatar size={28} />
      </button>

      {/* Chat panel — uses safe-area-inset for mobile, max constraints */}
      <div
        className={`fixed z-50 flex w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl bg-zinc-950 shadow-2xl transition-transform duration-300 ease-out sm:border sm:border-white/10 ${
          open ? "translate-y-0" : "translate-y-[120%]"
        }`}
        style={{
          bottom: "max(1rem, env(safe-area-inset-bottom))",
          right: "max(1rem, env(safe-area-inset-right))",
          height: "min(600px, calc(100vh - 2rem - env(safe-area-inset-bottom) - env(safe-area-inset-top)))",
          maxHeight: "600px",
        }}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-zinc-900/60 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-gold">
              <DoofyAvatar size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">Doofy</p>
              <p className="text-[10px] text-zinc-500 leading-tight">asistent</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
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
                  msg.role === "user"
                    ? "rounded-br-sm bg-gold text-zinc-950"
                    : "rounded-bl-sm glass text-zinc-100"
                }`}
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
            <div className="mb-3 text-center text-xs text-red-400">{error}</div>
          )}
        </div>

        {/* Input area */}
        <div className="shrink-0 border-t border-white/10 bg-zinc-900/40 px-3 py-3">
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestion(suggestion)}
                disabled={loading}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-zinc-300 transition-colors hover:border-gold/40 hover:text-gold disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Napiš zprávu..."
              disabled={loading}
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-gold/50"
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
