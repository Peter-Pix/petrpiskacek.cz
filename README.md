# Petr Piskáček — Portfolio

Profesionální jednostránkové portfolio pro **Petra Piskáčka** — IT specialistu, psychologa, hudebního umělce a AI buildera.

## Tech stack

- **Next.js 16** + **React 19** + **TypeScript**
- **Tailwind CSS 4** — inline CSS import `@import "tailwindcss"`
- Žádné externí UI knihovny — všechny ikony jsou inline SVG
- Dark theme ve stylu 4rap.cz: `bg-zinc-950`, `text-zinc-100`, akcentová zlatá `#c8962e`, glassmorphism

## Struktura

```
src/
  app/
    layout.tsx          # Metadata a root layout
    page.tsx            # Landing page se všemi sekcemi
    globals.css         # Tailwind + custom CSS proměnné, animace, glass třídy
    api/chat/route.ts   # API endpoint pro chatbota
  components/
    Nav.tsx             # Pevná navigace s glass efektem
    Hero.tsx            # Full-viewport hero s animovaným pozadím
    About.tsx           # 3 karty: IT, psychologie, hudba
    Projects.tsx        # 4 projektové karty
    Skills.tsx          # Grid skill badgů
    Contact.tsx         # Kontaktní sekce
    ChatBot.tsx         # Plovoucí chat s Doofy
    icons.tsx           # Inline SVG ikony
  lib/
    chatbot.ts          # System prompt + validace zpráv
```

## Chatbot Doofy

Chatbot **Doofy** je osobní AI asistent Petra. Mluví česky, má suchý humor a zná:

- Petrovu profesní historii a psychologické vzdělání
- Všechny 4 projekty (4rap.cz, 4Rap Studio, Local AI, AI Media)
- Tech stack i pracovní styl

Komunikuje přes API endpoint `/api/chat`, který volá OpenRouter model `openai/gpt-4o-mini` s embedded system promptem. API klíč se načítá z `.env.local`.

## Příkazy

```bash
npm install          # Instalace závislostí
npm run typecheck    # TypeScript validace
npm run build        # Produkční build
npm run dev          # Vývojový server
```

## Poznámky

- Projekt je připravený k lokálnímu vývoji i deployi.
- Nepoužívá se statický export (`output: export`), protože `/api/chat` musí běžet jako serverless route.
- Všechny texty UI jsou v češtině, technické termíny zůstávají v angličtině.
