"use client";

import { useState } from "react";
import { SparklesIcon, ArrowRightIcon, RefreshCwIcon, ChevronDownIcon, SendIcon } from "./icons";

type Phase = "input" | "clarify" | "blocks" | "done";

const BLOCK_ORDER = ["core", "stack", "costs", "timeline"] as const;
type BlockKind = typeof BLOCK_ORDER[number];

const BLOCK_LABELS: Record<BlockKind, string> = {
  core: "Jádro",
  stack: "Stack",
  costs: "Náklady",
  timeline: "Postup",
};

type ClarifyQuestion = { id: string; text: string; type?: string; options?: string[] };
type Block = { kind: BlockKind; [key: string]: any };
type BlockWithMeta = { block: Block; expanded?: boolean; expansion?: string };

const SAMPLE_PROMPTS = [
  "AI asistent pro logistiku...",
  "Chatbot pro e-shop...",
  "Nástroj na shrnutí meetingů...",
  "AI na analýzu smluv...",
];

export default function SparringEmbed() {
  const [phase, setPhase] = useState<Phase>("input");
  const [prompt, setPrompt] = useState("");
  const [questions, setQuestions] = useState<ClarifyQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [blocks, setBlocks] = useState<Partial<Record<BlockKind, BlockWithMeta>>>({});
  const [currentBlockIdx, setCurrentBlockIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    tech: false,
    plan: false,
  });

  function toggleSection(section: string) {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  }

  async function handleStart() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/sparring/clarify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Nepodařilo se spojit s AI");
      }
      const data = await res.json();
      setQuestions(data.questions || []);
      const initialAnswers: Record<string, string> = {};
      for (const q of data.questions || []) initialAnswers[q.id] = "";
      setAnswers(initialAnswers);
      setPhase("clarify");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Něco se pokazilo");
    } finally {
      setLoading(false);
    }
  }

  async function handleClarifySubmit() {
    const finalAnswers: Record<string, string> = {};
    for (const q of questions) finalAnswers[q.id] = answers[q.id]?.trim() || "(neuvedeno)";
    setAnswers(finalAnswers);
    setPhase("blocks");
    setCurrentBlockIdx(0);
    setBlocks({});
    void generateBlock("core", finalAnswers);
  }

  async function generateBlock(kind: BlockKind, finalAnswers: Record<string, string>) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/sparring/block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), answers: finalAnswers, blockKind: kind }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Nepodařilo se vygenerovat blok");
      }
      const data = await res.json();
      setBlocks(prev => ({ ...prev, [kind]: { block: data.block, expanded: false } }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Něco se pokazilo");
    } finally {
      setLoading(false);
    }
  }

  async function handleNextBlock() {
    const nextIdx = currentBlockIdx + 1;
    if (nextIdx >= BLOCK_ORDER.length) { setPhase("done"); return; }
    setCurrentBlockIdx(nextIdx);
    const nextKind = BLOCK_ORDER[nextIdx];
    if (!blocks[nextKind]) await generateBlock(nextKind, answers);
  }

  async function handleExpand(kind: BlockKind) {
    const current = blocks[kind];
    if (!current || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/sparring/expand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), answers, blockKind: kind, currentBlock: current.block }),
      });
      if (!res.ok) throw new Error("Nepodařilo se rozšířit");
      const data = await res.json();
      setBlocks(prev => ({ ...prev, [kind]: { block: prev[kind]!.block, expanded: true, expansion: data.expansion } }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Něco se pokazilo");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setPhase("input"); setPrompt(""); setQuestions([]); setAnswers({});
    setBlocks({}); setCurrentBlockIdx(0); setError(""); setEmail(""); setEmailSent(false);
  }

  async function handleSendEmail() {
    if (!email.trim() || emailLoading) return;
    setEmailLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setEmailSent(true);
    setEmailLoading(false);
  }

  return (
    <div className="mx-auto mt-16 max-w-2xl">
      <div className="mb-6 text-center">
        <p className="eyebrow mb-2">Zkus to hned</p>
        <h3 className="headline-md mb-2">Máš nápad?</h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Vyber téma. Doptám se. Uvidíš sám.
        </p>
      </div>

      <div className="apple-card p-0 overflow-hidden">
        {/* Input phase */}
        {phase === "input" && (
          <div className="p-5 sm:p-6">
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Např. AI pro plánování závozů v logistické firmě..."
              rows={4}
              className="apple-input w-full resize-none"
              onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void handleStart(); }}
            />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>⌘ + Enter pro start</span>
              <button onClick={() => void handleStart()} disabled={!prompt.trim() || loading} className="btn-apple btn-apple-primary">
                {loading ? "Přemýšlím..." : <><SparklesIcon size={16} /> Začít</>}
              </button>
            </div>
            <div className="mt-4">
              <p className="mb-2 text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Nebo zkus:</p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_PROMPTS.map(s => (
                  <button key={s} onClick={() => setPrompt(s)}
                    className="rounded-full border px-3 py-1.5 text-xs transition-colors hover:border-gold"
                    style={{ borderColor: "var(--tag-border)", backgroundColor: "var(--tag-bg)", color: "var(--tag-text)" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Clarify phase */}
        {phase === "clarify" && (
          <div className="p-5 sm:p-6">
            <div className="mb-6 rounded-xl p-4" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
              <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Tvoje zadání</p>
              <p className="mt-1 text-sm font-medium">{prompt}</p>
            </div>
            <p className="mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>Než začnu, potřebuju vědět:</p>
            <div className="mb-6 space-y-5">
              {questions.map(q => (
                <div key={q.id}>
                  <label className="mb-3 block text-sm font-medium">{q.text}</label>
                  
                  {q.type === "choice" && q.options && q.options.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {q.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                          className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                            answers[q.id] === opt
                              ? "border-gold bg-gold/10"
                              : "hover:border-gold/50"
                          }`}
                          style={{
                            borderColor: answers[q.id] === opt ? "var(--gold)" : "var(--input-border)",
                            backgroundColor: answers[q.id] === opt ? "rgba(200, 150, 46, 0.1)" : "transparent",
                            color: answers[q.id] === opt ? "var(--gold)" : "var(--text-primary)",
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                      {answers[q.id] && (
                        <button
                          onClick={() => setAnswers(prev => ({ ...prev, [q.id]: "" }))}
                          className="text-xs underline px-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Zrušit
                        </button>
                      )}
                    </div>
                  )}
                  
                  {q.type === "slider" && q.options && q.options.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs px-1" style={{ color: "var(--text-muted)" }}>
                        {q.options.map((opt, i) => (
                          <span key={i} className={answers[q.id] === opt ? "font-medium" : ""}
                            style={{ color: answers[q.id] === opt ? "var(--gold)" : undefined }}>
                            {opt}
                          </span>
                        ))}
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={q.options!.length - 1}
                        value={q.options!.indexOf(answers[q.id] || q.options![0])}
                        onChange={e => setAnswers(prev => ({ ...prev, [q.id]: q.options![parseInt(e.target.value)] }))}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                        style={{
                          backgroundColor: "var(--border)",
                          accentColor: "var(--gold)",
                        }}
                      />
                    </div>
                  )}
                  
                  {q.type === "text" && (
                    <input
                      type="text"
                      value={answers[q.id] || ""}
                      onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder="Napiš..." 
                      className="apple-input w-full"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button onClick={handleReset} className="btn-apple btn-apple-secondary">Zpět</button>
              <button onClick={() => void handleClarifySubmit()} disabled={loading} className="btn-apple btn-apple-primary">
                {loading ? "Přemýšlím..." : <>Pokračovat <ArrowRightIcon size={16} /></>}
              </button>
            </div>
          </div>
        )}

        {/* Blocks phase */}
        {phase === "blocks" && (
          <div className="p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Blok {currentBlockIdx + 1} z {BLOCK_ORDER.length} — {BLOCK_LABELS[BLOCK_ORDER[currentBlockIdx]]}
              </p>
              <button onClick={handleReset} className="text-xs underline" style={{ color: "var(--text-muted)" }}>Začít znovu</button>
            </div>
            <div className="space-y-3">
              {BLOCK_ORDER.slice(0, currentBlockIdx + 1).map((kind, idx) => {
                const block = blocks[kind];
                if (!block) return (
                  <div key={kind} className="apple-card flex items-center gap-3 p-4">
                    <RefreshCwIcon size={16} className="animate-spin" />
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>Generuju {BLOCK_LABELS[kind].toLowerCase()}...</span>
                  </div>
                );
                return (
                  <BlockCard key={kind} kind={kind} block={block.block}
                    expansion={block.expansion} isCurrent={idx === currentBlockIdx}
                    onExpand={() => void handleExpand(kind)} expanding={loading && idx === currentBlockIdx} />
                );
              })}
            </div>
            {currentBlockIdx < BLOCK_ORDER.length - 1 && blocks[BLOCK_ORDER[currentBlockIdx]] && (
              <div className="mt-5 flex justify-end">
                <button onClick={() => void handleNextBlock()} disabled={loading} className="btn-apple btn-apple-primary">
                  Další blok <ArrowRightIcon size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Done phase — Jobs style */}
        {phase === "done" && (
          <div className="p-5 sm:p-6 space-y-6">
            {/* Co to je */}
            {blocks.core && (
              <div className="text-center">
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Tvůj nápad v jedné větě</p>
                <p className="text-xl font-semibold leading-snug sm:text-2xl" style={{ color: "var(--text-primary)" }}>
                  {blocks.core.block.what}
                </p>
              </div>
            )}

            {/* Jak to funguje — 3 kroky */}
            {blocks.timeline && (
              <div className="apple-card p-5 sm:p-6">
                <p className="text-xs uppercase tracking-widest mb-4 text-center" style={{ color: "var(--text-muted)" }}>Jak to funguje</p>
                <div className="space-y-3">
                  <Step number={1} text={blocks.timeline.block.phase1} />
                  <Step number={2} text={blocks.timeline.block.phase2} />
                  <Step number={3} text={blocks.timeline.block.phase3} />
                </div>
              </div>
            )}

            {/* Proč to udělat */}
            {blocks.core && (
              <div className="text-center">
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>Proč to udělat</p>
                <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {blocks.core.block.mainFeature}
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="apple-card p-6 sm:p-8 text-center space-y-5">
              {!emailSent ? (
                <>
                  <p className="text-lg font-semibold">Chceš to?</p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Pošlu ti kompletní plán. Tech stack, harmonogram, odhad času.
                  </p>
                  <div className="mx-auto flex max-w-xs gap-2">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="tvuj@email.cz" className="apple-input flex-1 text-center" />
                    <button onClick={() => void handleSendEmail()} disabled={!email.trim() || emailLoading}
                      className="btn-apple btn-apple-primary inline-flex items-center gap-1.5 px-5 py-2.5 text-sm shrink-0">
                      {emailLoading ? <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <SendIcon size={14} />}
                      Poslat
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  <p className="text-base font-medium" style={{ color: "var(--gold)" }}>✓ Posílám na {email}</p>
                  <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>Do 24h to máš v mailu.</p>
                </div>
              )}

              <div className="pt-2">
                <button onClick={handleReset} className="text-sm underline transition-opacity hover:opacity-70" style={{ color: "var(--text-muted)" }}>
                  Začít znovu s jiným zadáním
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-5 sm:p-6">
            <div className="rounded-xl border p-4 text-sm" style={{ borderColor: "rgba(239, 68, 68, 0.3)", backgroundColor: "rgba(239, 68, 68, 0.08)", color: "#ef4444" }}>
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Apple-style collapsible section */
function SectionToggle({ title, subtitle, isOpen, onToggle, children }: {
  title: string; subtitle: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div>
      <button onClick={onToggle} className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/[0.02]">
        <div className="pr-4">
          <p className="text-base font-semibold">{title}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{subtitle}</p>
        </div>
        <ChevronDownIcon size={20} className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} style={{ color: "var(--text-muted)" }} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-6 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}

/* Block card — compact, Apple style */
function BlockCard({ kind, block, expansion, isCurrent, onExpand, expanding }: {
  kind: BlockKind; block: Block; expansion?: string; isCurrent: boolean; onExpand: () => void; expanding: boolean;
}) {
  return (
    <div className="apple-card p-5 animate-fade-in-up" style={{ borderColor: isCurrent ? "var(--gold)" : undefined }}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--gold)" }}>{BLOCK_LABELS[kind]}</h3>
        <button onClick={onExpand} disabled={expanding}
          className="text-xs px-2 py-1 rounded-lg transition-colors hover:bg-white/5 disabled:opacity-30"
          style={{ color: "var(--text-muted)" }}>
          {expanding ? "Přemýšlím..." : "↻ Rozveď"}
        </button>
      </div>
      <BlockContent block={block} />
      {expansion && (
        <div className="mt-3 rounded-xl p-4 text-sm leading-relaxed" style={{ backgroundColor: "var(--bg-primary)", border: "1px solid var(--border)" }}>
          <p className="mb-1.5 text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Rozšíření</p>
          {expansion}
        </div>
      )}
    </div>
  );
}

function BlockContent({ block }: { block: Block }) {
  if (block.kind === "core") {
    return (
      <div className="space-y-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Co to je</p>
          <p className="text-sm font-medium leading-relaxed">{block.what}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Pro koho</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{block.forWhom}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Hlavní feature</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{block.mainFeature}</p>
        </div>
      </div>
    );
  }
  if (block.kind === "stack") {
    const items = [
      { label: "Frontend", value: block.frontend },
      { label: "Backend", value: block.backend },
      { label: "Databáze", value: block.database },
      { label: "AI", value: block.ai },
      { label: "Infra", value: block.infra },
    ];
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map(item => (
          <div key={item.label} className="rounded-xl p-3" style={{ backgroundColor: "var(--bg-primary)", border: "1px solid var(--border)" }}>
            <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>{item.label}</p>
            <p className="text-sm font-medium">{item.value}</p>
          </div>
        ))}
      </div>
    );
  }
  if (block.kind === "costs") {
    return (
      <div className="space-y-3">
        <CostRow label="Jednorázově" value={block.oneTime} />
        <CostRow label="Měsíčně" value={block.monthly} />
        <CostRow label="MVP" value={block.mvp} />
        {block.note && <p className="mt-2 text-xs italic leading-relaxed" style={{ color: "var(--text-muted)" }}>{block.note}</p>}
      </div>
    );
  }
  if (block.kind === "timeline") {
    return (
      <div className="space-y-3">
        <TimelineRow label="Fáze 1 (1-2 týdny)" value={block.phase1} />
        <TimelineRow label="Fáze 2 (2-4 týdny)" value={block.phase2} />
        <TimelineRow label="Fáze 3 (1+ měsíc)" value={block.phase3} />
      </div>
    );
  }
  return null;
}

function CostRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl p-3" style={{ backgroundColor: "var(--bg-primary)", border: "1px solid var(--border)" }}>
      <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{value}</p>
    </div>
  );
}

function Step({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(200, 150, 46, 0.1)" }}>
        <span className="text-sm font-bold" style={{ color: "var(--gold)" }}>{number}</span>
      </div>
      <p className="text-sm leading-relaxed pt-1" style={{ color: "var(--text-secondary)" }}>{text}</p>
    </div>
  );
}

function TimelineRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl p-3" style={{ backgroundColor: "var(--bg-primary)", border: "1px solid var(--border)" }}>
      <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>{label}</p>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{value}</p>
    </div>
  );
}
