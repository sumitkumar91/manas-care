# Manas Care

A privacy-first mental wellness app for students and young adults, rooted in Vedic wisdom.

Live at [manascare.vercel.app](https://manascare.vercel.app) · [Join Discord](https://discord.gg/b8TQgZqCKD)

## Features

- **Vedic Practices** — Music Therapy (Raga Chikitsa), Pranayama, Trataka, and Dinacharya (circadian scheduling)
- **Mood Tracking** — Daily mood logs with streak tracking and trend history
- **Guided Journaling** — Free write, CBT exercises, and gratitude entries — all encrypted client-side
- **Vent Space** — Anonymous, judgment-free space to let it out
- **Privacy First** — Journal content is AES-GCM encrypted in the browser; the server only ever stores ciphertext

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Database & Auth** — Supabase (Postgres + RLS + Anonymous Auth)
- **AI** — Google Gemini API (task classification, vent response)
- **UI** — Tailwind CSS + shadcn/ui
- **Encryption** — Web Crypto API (AES-GCM 256-bit, PBKDF2 key derivation)

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/sumitkumar91/manas-care.git
cd manas-care
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

- Supabase credentials from [supabase.com](https://supabase.com)
- Gemini API key from [aistudio.google.com](https://aistudio.google.com)
- Generate a pepper: `openssl rand -base64 24`

### 3. Run database migrations

Run the SQL files in `supabase/migrations/` in order via the Supabase SQL editor.

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
