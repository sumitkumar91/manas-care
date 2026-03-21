export type Guna = "sattva" | "rajas" | "tamas";

export interface GunaDefinition {
  id: Guna;
  name: string;
  sanskrit: string;
  emoji: string;
  tagline: string;
  description: string;
  signs: string[];
  color: string;
  bgColor: string;
  borderColor: string;
}

export const GUNAS: GunaDefinition[] = [
  {
    id: "sattva",
    name: "Sattva",
    sanskrit: "सत्त्व",
    emoji: "✨",
    tagline: "Calm & clear",
    description: "You feel balanced, focused, and at peace. Thoughts are clear and energy flows naturally.",
    signs: ["Feeling calm", "Clear-headed", "Motivated", "Grateful", "Present"],
    color: "text-emerald-700 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
  },
  {
    id: "rajas",
    name: "Rajas",
    sanskrit: "रजस्",
    emoji: "🔥",
    tagline: "Restless & anxious",
    description: "Your mind is active and overworking. You may feel anxious, scattered, or overstimulated.",
    signs: ["Anxious", "Overthinking", "Restless", "Irritable", "Rushed"],
    color: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
  {
    id: "tamas",
    name: "Tamas",
    sanskrit: "तमस्",
    emoji: "🌑",
    tagline: "Heavy & low",
    description: "You feel sluggish, unmotivated, or withdrawn. Energy is low and it's hard to get started.",
    signs: ["Low energy", "Unmotivated", "Withdrawn", "Heavy", "Numb"],
    color: "text-indigo-700 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    borderColor: "border-indigo-200 dark:border-indigo-800",
  },
];

export interface GunaRecommendation {
  title: string;
  description: string;
  actions: { label: string; href: string; emoji: string }[];
  tip: string;
}

export const GUNA_RECOMMENDATIONS: Record<Guna, GunaRecommendation> = {
  sattva: {
    title: "You're in a sattvic state — protect it.",
    description: "This clarity is rare. Use it to go deeper, not to burn through it.",
    actions: [
      { label: "Meditate", href: "/meditate", emoji: "🧘" },
      { label: "Write in journal", href: "/journal/new", emoji: "📓" },
      { label: "Gratitude entry", href: "/journal/new", emoji: "🌱" },
    ],
    tip: "Avoid overstimulation (doom-scrolling, loud music). Let the stillness settle.",
  },
  rajas: {
    title: "Your mind is racing — slow it down.",
    description: "Rajas energy needs to be channeled, not suppressed. Ground yourself through breath.",
    actions: [
      { label: "Box Breathing", href: "/meditate", emoji: "🌬️" },
      { label: "4-7-8 Breathing", href: "/meditate", emoji: "💨" },
      { label: "Vent it out", href: "/vent", emoji: "🗣️" },
    ],
    tip: "Avoid caffeine and screens for the next 30 minutes. Cold water on your face helps.",
  },
  tamas: {
    title: "Heaviness is here — gently activate.",
    description: "Don't fight it, but don't sink into it. Small movements create momentum.",
    actions: [
      { label: "5-min meditation", href: "/meditate", emoji: "⏱️" },
      { label: "Log your mood", href: "/mood", emoji: "📊" },
      { label: "Talk to AI", href: "/chat", emoji: "💬" },
    ],
    tip: "Sunlight, water, and a 5-minute walk are more powerful than they sound. Start there.",
  },
};
