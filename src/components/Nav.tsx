"use client";

import { useState } from "react";
import { MenuIcon, CloseIcon, ChatIcon } from "./icons";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#about", label: "O mně" },
  { href: "#services", label: "Služby" },
  { href: "#projects", label: "Projekty" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Kontakt" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="text-sm font-semibold tracking-tight text-white">
          Petr Piskáček
        </a>

        <ul className="hidden items-center gap-6 text-sm sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-gold"
                style={{ color: "var(--text-secondary)" }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
          <li>
            <button
              onClick={() => window.dispatchEvent(new Event("open-doofy"))}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 btn-primary text-xs"
            >
              <ChatIcon size={16} />
              Zeptej se Doofyho
            </button>
          </li>
        </ul>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-300 hover:text-white"
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
            aria-expanded={open}
          >
            {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-zinc-950/95 px-4 pb-6 sm:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block text-base text-zinc-300 transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <button
                onClick={() => {
                  closeMenu();
                  window.dispatchEvent(new Event("open-doofy"));
                }}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 btn-primary text-sm"
              >
                <ChatIcon size={16} />
                Zeptej se Doofyho
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
