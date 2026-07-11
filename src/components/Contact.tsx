"use client";

import { useEffect, useState } from "react";
import { MailIcon, GithubIcon, ExternalLinkIcon } from "./icons";

const email = "ppix50@gmail.com";
const github = "https://github.com/Peter-Pix";
const website = "https://4rap.cz";

export default function Contact() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label mb-3">Kontakt</p>
        <h2 className="mb-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Pojďme něco vytvořit
        </h2>
        <p className="mb-12 text-zinc-400">
          Hledáte vývojáře, který rozumí technologii i lidem? Ozvěte se — rád
          proberu, jak můžu pomoct. Momentálně hledám nové příležitosti a projekty.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`mailto:${email}`}
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl glass px-6 py-4 text-sm font-medium text-white transition-colors hover:border-gold/40 sm:w-auto"
          >
            <MailIcon size={20} className="text-gold" />
            {email}
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl glass px-6 py-4 text-sm font-medium text-white transition-colors hover:border-gold/40 sm:w-auto"
          >
            <GithubIcon size={20} className="text-gold" />
            GitHub
          </a>
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl glass px-6 py-4 text-sm font-medium text-white transition-colors hover:border-gold/40 sm:w-auto"
          >
            <ExternalLinkIcon size={20} className="text-gold" />
            4rap.cz
          </a>
        </div>

        <p className="mt-12 text-xs text-zinc-600">
          © {year} Petr Piskáček. Built with Next.js & Tailwind.
        </p>
      </div>
    </section>
  );
}