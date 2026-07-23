"use client";

import { CodeIcon, BrainIcon, MusicIcon } from "./icons";

export default function About() {
  return (
    <section id="about" className="section-apple">
      <div className="container-apple">
        <p className="eyebrow mb-3 text-center">Kdo jsem</p>
        <h2 className="headline-lg mb-12 text-center">
          Programátor. Psycholog. Muzikant.
        </h2>

        <div className="mx-auto mb-12 max-w-2xl space-y-5 text-center text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          <p>
            Programuju od 8 let. Od Delphi přes mikroprocesory až po generativní AI.
            <span className="font-semibold" style={{ color: "var(--gold)" }}> Kód mám v krvi.</span>
          </p>
          <p>
            Vystudoval jsem psychologii. Rozumím motivaci, rozhodování a tomu,
            <span className="font-semibold" style={{ color: "var(--gold)" }}> proč lidi používají (nebo nepoužívají) technologie.</span>
          </p>
          <p>
            Jako Willy Tea píšu rap. Vím, co je autenticita a co je póza.
            <span className="font-semibold" style={{ color: "var(--gold)" }}> Stejně přistupuju k projektům.</span>
          </p>
        </div>

        <div className="mx-auto mb-12 max-w-2xl">
          <div className="bento-grid">
            <div className="glass-card p-6 sm:p-8">
              <div className="mb-5 inline-flex rounded-2xl bg-gold/10 p-3 text-gold">
                <CodeIcon size={28} />
              </div>
              <h3 className="headline-md mb-3 text-xl">IT & Engineering</h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Next.js, AI modely, automatizace, GPU akcelerace. Od návrhu po nasazení — dělám sám.
              </p>
            </div>
            <div className="glass-card p-6 sm:p-8">
              <div className="mb-5 inline-flex rounded-2xl bg-gold/10 p-3 text-gold">
                <BrainIcon size={28} />
              </div>
              <h3 className="headline-md mb-3 text-xl">Psychologie & chování</h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Umím debugovat kód i lidi. Stavím systémy, který lidi fakt budou používat.
              </p>
            </div>
            <div className="glass-card p-6 sm:p-8">
              <div className="mb-5 inline-flex rounded-2xl bg-gold/10 p-3 text-gold">
                <MusicIcon size={28} />
              </div>
              <h3 className="headline-md mb-3 text-xl">Hudba & kreativita</h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Jako Willy Tea tvořím hip-hop. Autenticita, ironie, společenské postřehy — stejný princip jako u kódu.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>
            Chceš vědět víc? Přečti si příběh na petrpiskacek.online.
          </p>
          <a
            href="https://petrpiskacek.online"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-apple btn-apple-secondary"
          >
            Přečíst příběh →
          </a>
        </div>
      </div>
    </section>
  );
}
