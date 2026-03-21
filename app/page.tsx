import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { GuestButton } from "@/components/landing/GuestButton";
import { GoogleSignInButton } from "@/components/landing/GoogleSignInButton";
import {
  Smile,
  BookOpen,
  Wind,
  Music2,
  Flower2,
  MessageCircle,
  ShieldCheck,
  Flame,
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
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Get started
          </Link>
        </div>
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
          Manas Care combines ancient Vedic techniques - Raga therapy, Pranayama, Trataka - with AI-powered journaling, mood tracking, and compassionate support.
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
            A complete toolkit - ancient practices meet modern technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border p-5 space-y-3 hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{f.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{f.description}</p>
              </div>
              {f.tag && (
                <span className="inline-block text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">
                  {f.tag}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Vedic Differentiator */}
      <section className="bg-primary/5 border-y px-6 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Why Vedic?</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Most mental health apps give you CBT worksheets and step counters. We go deeper. Indian classical science has studied the mind for thousands of years - Raga Chikitsa (music therapy), Pranayama (breath science), and Trataka (visual focus training) are not trends. They are proven, time-tested tools for mental clarity and emotional balance. We&apos;ve made them accessible for the first time in a modern wellness app.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {["Raga Chikitsa", "Pranayama", "Trataka", "Vedic Wisdom", "Privacy First"].map((tag) => (
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

      {/* Footer */}
      <footer className="border-t px-6 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Manas Care · Built with care for your mind.
      </footer>
    </div>
  );
}

const FEATURES = [
  {
    icon: Music2,
    title: "Music Therapy",
    description:
      "Raga Chikitsa - AI recommends an Indian classical raga based on your emotional state or time of day. Listen and let it heal.",
    tag: "Vedic",
  },
  {
    icon: Flower2,
    title: "Pranayama",
    description:
      "Guided breathing exercises - Box breathing, 4-7-8, Nadi Shodhana - with a visual animated circle that breathes with you.",
    tag: "Vedic",
  },
  {
    icon: Flame,
    title: "Trataka",
    description:
      "The ancient yogic candle-gazing practice for building concentration and quieting mental chatter.",
    tag: "Vedic",
  },
  {
    icon: Smile,
    title: "Mood Tracking",
    description:
      "Log your mood daily with trends and insights. See patterns over time and understand what affects you.",
    tag: undefined,
  },
  {
    icon: BookOpen,
    title: "Guided Journaling",
    description:
      "Free write, CBT exercises, or gratitude prompts. All entries are encrypted end-to-end - only you can read them.",
    tag: undefined,
  },
  {
    icon: Wind,
    title: "Venting Space",
    description:
      "Just need to get it out? Vent freely with no judgment. Release it or save it - you decide.",
    tag: undefined,
  },
  {
    icon: MessageCircle,
    title: "AI Companion",
    description:
      "Talk to an empathetic AI that listens without judgment, detects when you need real help, and always respects your privacy.",
    tag: undefined,
  },
];
