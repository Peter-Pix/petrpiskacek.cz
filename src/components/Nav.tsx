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

  return (
    <header className="nav-apple">
      <a href="#top" className="text-sm font-semibold tracking-tight" style={{ color: "var(--text)" }}>
        Petr Piskáček
      </a>

      <ul className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="link-apple">
              {link.label}
            </a>
          </li>
        ))}
        <li className="flex items-center gap-3 pl-2">
          <ThemeToggle />
          <button
            onClick={() => window.dispatchEvent(new Event("open-doofy"))}
            className="btn-apple btn-apple-primary"
          >
            <ChatIcon size={16} />
            Doofy
          </button>
        </li>
      </ul>

      <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors"
          style={{ color: "var(--text-secondary)" }}
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={open}
        >
          {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-x-0 top-14 z-40 border-t px-6 pb-8 pt-6 md:hidden"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface-strong)",
            backdropFilter: "blur(24px)",
          }}
        >
          <ul className="flex flex-col gap-5">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-lg font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <button
                onClick={() => {
                  setOpen(false);
                  window.dispatchEvent(new Event("open-doofy"));
                }}
                className="btn-apple btn-apple-primary w-full"
              >
                <ChatIcon size={18} />
                Zeptej se Doofyho
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
