import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { GuestButton } from "@/components/landing/GuestButton";
import { GoogleSignInButton } from "@/components/landing/GoogleSignInButton";
import {
  Smile,
  BookOpen,
  Wind,
  Music2,
  Flower2,
  ShieldCheck,
  Flame,
  Sun,
  Sparkles,
} from "lucide-react";

export default async function LandingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <span className="text-xl font-bold text-primary">Manas Care</span>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 gap-6 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 bg-primary/10 px-3 py-1 rounded-full">
          Rooted in Vedic wisdom
        </span>
        <h1 className="text-5xl font-bold leading-tight tracking-tight">
          Mental wellness built for the modern mind
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Manas Care combines ancient Vedic techniques — Raga therapy, Pranayama, Trataka, and Dinacharya — with mood tracking, guided journaling, and a space to just breathe.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <GoogleSignInButton className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer" />
          <GuestButton />
        </div>
        <p className="text-xs text-muted-foreground">No credit card. No password. Just open it.</p>
      </section>

      {/* Features */}
      <section className="px-6 pb-24 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Everything your mind needs</h2>
          <p className="text-muted-foreground mt-2">
            Ancient practices, thoughtfully built for the modern day.
          </p>
        </div>

        {/* Vedic practices block */}
        <div className="rounded-2xl border bg-gradient-to-br from-amber-500/5 to-violet-500/5 border-primary/20 p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Vedic Practices</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VEDIC_FEATURES.map((f) => (
              <div key={f.title} className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-background/80 flex items-center justify-center shrink-0">
                  <f.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{f.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CORE_FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border p-5 space-y-3 hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{f.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vedic Differentiator */}
      <section className="bg-primary/5 border-y px-6 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Why Vedic?</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Most mental health apps give you CBT worksheets and step counters. We go deeper. Indian classical science has studied the mind for thousands of years — Raga Chikitsa (music therapy), Pranayama (breath science), Trataka (visual focus training), and Dinacharya (circadian scheduling aligned to your dosha) are not trends. They are proven, time-tested tools for mental clarity and emotional balance. We&apos;ve made them accessible in a modern wellness app.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {["Raga Chikitsa", "Pranayama", "Trataka", "Dinacharya", "Privacy First"].map((tag) => (
              <span key={tag} className="text-sm border rounded-full px-4 py-1.5 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="px-6 py-20 max-w-3xl mx-auto text-center space-y-4">
        <ShieldCheck className="h-8 w-8 text-primary mx-auto" />
        <h2 className="text-2xl font-bold">Your data stays yours</h2>
        <p className="text-muted-foreground">
          Journal entries are encrypted in your browser before they ever reach our servers - we cannot read them even if we wanted to. No ads. No selling your data. Ever.
        </p>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-xl mx-auto text-center bg-primary/5 border rounded-3xl p-10 space-y-4">
          <h2 className="text-2xl font-bold">Ready to start?</h2>
          <p className="text-muted-foreground text-sm">
            Takes 2 minutes. No email required if you just want to explore.
          </p>
          <GoogleSignInButton className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer" />
        </div>
      </section>

      {/* Discord */}
      <section className="px-6 pb-16">
        <div className="max-w-xl mx-auto text-center border rounded-3xl p-8 space-y-3 bg-[#5865F2]/5 border-[#5865F2]/20">
          <p className="text-2xl">💬</p>
          <h2 className="text-xl font-bold">Join the community</h2>
          <p className="text-sm text-muted-foreground">
            Talk to other users, share feedback, and stay updated on new features.
          </p>
          <a
            href="https://discord.gg/b8TQgZqCKD"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#5865F2] text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#4752C4] transition-colors"
          >
            Join Discord
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Manas Care · Built with care for your mind.
      </footer>
    </div>
  );
}

const VEDIC_FEATURES = [
  {
    icon: Music2,
    title: "Music Therapy",
    description:
      "Raga Chikitsa — Indian classical ragas prescribed for your time of day. Each raga carries a distinct emotional quality that resonates with your mind.",
  },
  {
    icon: Flower2,
    title: "Pranayama",
    description:
      "Guided breathing exercises — Box breathing, 4-7-8, Nadi Shodhana — with a visual animated circle that breathes with you.",
  },
  {
    icon: Flame,
    title: "Trataka",
    description:
      "The ancient yogic candle-gazing practice for building concentration and quieting mental chatter.",
  },
  {
    icon: Sun,
    title: "Dinacharya",
    description:
      "Organise your day according to Vata, Pitta, and Kapha cycles. Schedule tasks when your dosha is most aligned.",
  },
];

const CORE_FEATURES = [
  {
    icon: Smile,
    title: "Mood Tracking",
    description:
      "Log your mood daily with trends and insights. See patterns over time and understand what affects you.",
  },
  {
    icon: BookOpen,
    title: "Guided Journaling",
    description:
      "Free write, CBT exercises, or gratitude prompts. All entries are encrypted end-to-end — only you can read them.",
  },
  {
    icon: Wind,
    title: "Venting Space",
    description:
      "Just need to get it out? Vent freely with no judgment. Release it or save it — you decide.",
  },
];
