"use client";

import { useState, useRef, useCallback } from "react";
import { SendIcon, SparklesIcon, RefreshCwIcon } from "./icons";

export default function SparringEmbed() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [reformulated, setReformulated] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setResponse("");
    setShowEmailPrompt(false);
    setEmailSent(false);
    setReformulated(null);
    setQuestions([]);

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
      let metaProcessed = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        full += chunk;

        if (!metaProcessed && full.includes("⏎META:")) {
          const metaStart = full.indexOf("⏎META:");
          const metaEnd = full.indexOf("⏎", metaStart + 7);
          if (metaEnd !== -1) {
            const metaJson = full.slice(metaStart + 7, metaEnd);
            try {
              const meta = JSON.parse(metaJson);
              if (meta.type === "reformulated") {
                setReformulated(meta.reformulated);
                setQuestions(meta.questions || []);
              }
            } catch {}
            full = full.slice(0, metaStart) + full.slice(metaEnd + 1);
            metaProcessed = true;
          }
        }

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
          <div className="mt-5 animate-fade-in-up space-y-4">
            {/* Reformulace */}
            {reformulated && (
              <div className="rounded-xl border p-4" style={{ borderColor: "var(--gold)" }}>
                <div className="mb-2 flex items-center gap-2">
                  <RefreshCwIcon size={14} style={{ color: "var(--gold)" }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--gold)" }}>
                    Tvoje zadání jsem pochopil jako
                  </span>
                </div>
                <p className="text-sm font-medium leading-relaxed">
                  {reformulated}
                </p>
                {questions.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                      Pro přesnější odhad by se hodilo vědět:
                    </p>
                    {questions.map((q, i) => (
                      <p key={i} className="text-xs" style={{ color: "var(--text-secondary)" }}>
                        • {q}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* AI odpověď */}
            <div className="rounded-xl bg-zinc-900/50 p-4 text-sm leading-relaxed sm:p-5">
              {response.split("\n").map((line, i) => (
                <p key={i} className={i > 0 ? "mt-3" : ""}>
                  {line}
                </p>
              ))}
            </div>

            {/* Email prompt — low key, žádná konzultace */}
            {showEmailPrompt && !emailSent && (
              <div className="animate-fade-in-up text-center">
                <p className="mb-3 text-sm" style={{ color: "var(--text-muted)" }}>
                  Chceš to v detailu?
                </p>
                <div className="mx-auto flex max-w-sm gap-2">
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
                <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
                  Pošlu ti rozepsanou analýzu + návrh tech stacku + odhad času, když si to budeš stavět sám.
                </p>
              </div>
            )}

            {emailSent && (
              <div className="animate-fade-in-up text-center">
                <p className="text-sm font-medium" style={{ color: "var(--gold)" }}>
                  ✓ Posílám na {email}
                </p>
                <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  Do 24h to máš v mailu.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
