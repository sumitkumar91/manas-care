# Manas Care

A privacy-first mental wellness app for students and young adults, rooted in Vedic wisdom.

Live at [manascare.vercel.app](https://manascare.vercel.app) · [Join Discord](https://discord.gg/b8TQgZqCKD)

## Features

- **Vedic Practices** — Music Therapy (Raga Chikitsa), Pranayama (breath control), Trataka (gazing meditation), and Dinacharya (circadian scheduling)
- **Daily Check-in** — Log mood, energy, stress, and sleep in one place. Weekly summary on the dashboard.
- **Guided Journaling** — Free write, CBT exercises, and gratitude entries — all encrypted client-side
- **Vent Space** — Anonymous, judgment-free space to let it out
- **Privacy First** — Journal content is AES-GCM encrypted in the browser; the server only ever stores ciphertext

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Database & Auth** — Supabase (Postgres + RLS + Anonymous Auth)
- **AI** — Google Gemini API (task classification, vent response)
- **UI** — Tailwind CSS + shadcn/ui
- **Encryption** — Web Crypto API (AES-GCM 256-bit, PBKDF2 key derivation)
