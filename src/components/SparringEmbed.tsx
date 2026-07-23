"use client";

import { useState, useRef, useCallback } from "react";
import { SendIcon, SparklesIcon } from "./icons";

export default function SparringEmbed() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setResponse("");
    setShowEmailPrompt(false);
    setEmailSent(false);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/sparring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
        signal: controller.signal,
      });

      if (!res.ok) {
        setResponse("AI zrovna nestíhá. Zkus to znovu za pár vteřin.");
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setResponse(full);
      }

      setShowEmailPrompt(true);
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setResponse("Něco se pokazilo. Zkus to znovu.");
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }, [prompt, loading]);

  const handleSendEmail = useCallback(async () => {
    if (!email.trim() || emailLoading) return;

    setEmailLoading(true);
    // Simulace odeslání — v produkci by volalo API
    await new Promise((r) => setTimeout(r, 800));
    setEmailSent(true);
    setEmailLoading(false);
  }, [email, emailLoading]);

  return (
    <div className="mx-auto mt-16 max-w-2xl">
      <div className="mb-6 text-center">
        <p className="eyebrow mb-2">Zkus to hned</p>
        <h3 className="headline-md mb-2">Máš nápad?</h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Napiš, co potřebuješ postavit. AI odpoví do pár vteřin.
        </p>
      </div>

      <div className="glass-card p-5 sm:p-6">
        {/* Input */}
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Např. Chci web, kde si lidi můžou nahrát fotku a AI jim navrhne styl..."
            rows={3}
            className="apple-input w-full resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim() || loading}
            className="btn-apple btn-apple-primary mt-3 inline-flex w-full items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Analyzuju...
              </>
            ) : (
              <>
                <SparklesIcon size={16} />
                Nacenit nápad
              </>
            )}
          </button>
        </div>

        {/* Response */}
        {response && (
          <div className="mt-5 animate-fade-in-up">
            <div className="rounded-xl bg-zinc-900/50 p-4 text-sm leading-relaxed sm:p-5">
              {response.split("\n").map((line, i) => (
                <p key={i} className={i > 0 ? "mt-3" : ""}>
                  {line}
                </p>
              ))}
            </div>

            {/* Email prompt — killer offer */}
            {showEmailPrompt && !emailSent && (
              <div className="mt-5 animate-fade-in-up rounded-xl border p-4 sm:p-5"
                style={{ borderColor: "var(--gold)" }}
              >
                <p className="mb-1 text-sm font-semibold">
                  Chceš kompletní projektovej plán?
                </p>
                <p className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
                  Pošlu ti ho emailem. Včetně harmonogramu, rozpočtu a 30min konzultace zdarma.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tvuj@email.cz"
                    className="apple-input flex-1"
                  />
                  <button
                    onClick={handleSendEmail}
                    disabled={!email.trim() || emailLoading}
                    className="btn-apple btn-apple-primary inline-flex items-center gap-1.5 px-4 py-2 text-sm"
                  >
                    {emailLoading ? (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <SendIcon size={14} />
                    )}
                    Poslat
                  </button>
                </div>
              </div>
            )}

            {emailSent && (
              <div className="mt-5 animate-fade-in-up text-center">
                <p className="text-sm font-medium" style={{ color: "var(--gold)" }}>
                  ✓ Plán letí na {email}
                </p>
                <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  Do 24h ho máš v mailu. Těším se.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
