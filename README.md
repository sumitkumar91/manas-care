# Manas Care

A privacy-first mental health companion for students and young adults. Combines AI chat, mood tracking, and guided journaling in one place.

## Features

- **AI Chat** — Conversational support powered by Gemini AI, with crisis detection and US helpline resources
- **Mood Tracking** — Daily mood logs, streak tracking, and 7/30-day trend charts
- **Guided Journaling** — Free write, CBT exercises, and gratitude entries — all encrypted client-side
- **Guest Mode** — Try everything without signing up; convert to a full account anytime
- **Privacy First** — Journal content is AES-GCM encrypted in the browser; the server only ever stores ciphertext

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Database & Auth** — Supabase (Postgres + RLS + Anonymous Auth)
- **AI** — Google Gemini API (`@google/generative-ai`)
- **UI** — Tailwind CSS + shadcn/ui (Base UI)
- **Encryption** — Web Crypto API (AES-GCM 256-bit, PBKDF2 key derivation)

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/sumitkumar91/manas.git
cd manas
npm install
```

### 2. Set up environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-1.5-flash
JOURNAL_ENCRYPTION_PEPPER=your-32-char-random-secret
```

- Get Supabase credentials from [supabase.com](https://supabase.com)
- Get a Gemini API key from [aistudio.google.com](https://aistudio.google.com)
- Generate a pepper: `openssl rand -base64 24`

`GEMINI_MODEL` accepts comma-separated values — each request picks one randomly (e.g. `gemini-1.5-flash,gemini-1.5-pro`).

### 3. Run database migrations

Run the SQL files in `supabase/migrations/` in order via the Supabase SQL editor.

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

