"use client";

import { useEffect, useRef, useState } from "react";
import { MicrophoneIcon, CloseIcon, SendIcon } from "./icons";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "Co umí Peter?",
  "Proč ho zaměstnat?",
  "Jaké má projekty?",
  "Co je 4rap.cz?",
];

const GREETING: Message = {
  role: "assistant",
  content:
    "Čau! Jsem Doofy, Petrův AI asistent. Ptejte se na všechno o Petrovi — garantuji, že to stojí za to.",
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold text-zinc-950 shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold/50 ${
          open ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label="Otevřít chat s Doofy"
      >
        <MicrophoneIcon size={26} />
      </button>

      <div
        className={`fixed bottom-0 right-0 z-50 flex w-full flex-col overflow-hidden rounded-t-2xl bg-zinc-950 shadow-2xl transition-transform duration-300 ease-out sm:bottom-5 sm:right-5 sm:w-[400px] sm:rounded-2xl sm:border sm:border-white/10 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "min(640px, calc(100vh - 80px))", maxHeight: "640px" }}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900/60 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-zinc-950">
              <MicrophoneIcon size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Doofy</p>
              <p className="text-[10px] text-zinc-500">Petrova AI asistentka</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
            aria-label="Zavřít chat"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 scrollbar-thin"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
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
            <div className="mb-4 flex justify-start">
              <div className="glass inline-flex items-center gap-2 rounded-2xl rounded-bl-sm px-4 py-3">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 text-center text-xs text-red-400">{error}</div>
          )}
        </div>

        <div className="border-t border-white/10 bg-zinc-900/40 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestion(suggestion)}
                disabled={loading}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-300 transition-colors hover:border-gold/40 hover:text-gold disabled:opacity-50"
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
              placeholder="Napište zprávu..."
              disabled={loading}
              className="flex-1 rounded-full border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-gold/50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold text-zinc-950 transition-transform hover:scale-105 disabled:opacity-50"
              aria-label="Odeslat"
            >
              <SendIcon size={18} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
