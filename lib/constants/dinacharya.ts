export type Dosha = "Vata" | "Pitta" | "Kapha";

export interface DoshaZone {
  id: string;
  dosha: Dosha;
  time: string;
  hourRange: [number, number];
  tagline: string;
  qualities: string[];
  bestForLabels: string[];
}

export interface Task {
  id: string;
  text: string;
  zoneId: string;
  done: boolean;
}

export const DOSHA_ZONES: DoshaZone[] = [
  {
    id: "vata-dawn",
    dosha: "Vata",
    time: "2 AM - 6 AM",
    hourRange: [2, 6],
    tagline: "Stillness & intuition",
    qualities: ["Light", "Clear", "Spacious"],
    bestForLabels: ["Meditation", "Journaling", "Prayer", "Deep reading"],
  },
  {
    id: "kapha-morning",
    dosha: "Kapha",
    time: "6 AM - 10 AM",
    hourRange: [6, 10],
    tagline: "Grounded & steady",
    qualities: ["Stable", "Building", "Methodical"],
    bestForLabels: ["Exercise", "Yoga", "Physical tasks", "Routine work"],
  },
  {
    id: "pitta-midday",
    dosha: "Pitta",
    time: "10 AM - 2 PM",
    hourRange: [10, 14],
    tagline: "Sharp & analytical",
    qualities: ["Hot", "Focused", "Decisive"],
    bestForLabels: ["Deep work", "Analysis", "Problem solving", "Important decisions"],
  },
  {
    id: "vata-afternoon",
    dosha: "Vata",
    time: "2 PM - 6 PM",
    hourRange: [14, 18],
    tagline: "Creative & communicative",
    qualities: ["Mobile", "Expansive", "Airy"],
    bestForLabels: ["Brainstorming", "Meetings", "Creative work", "Communication"],
  },
  {
    id: "kapha-evening",
    dosha: "Kapha",
    time: "6 PM - 10 PM",
    hourRange: [18, 22],
    tagline: "Winding down",
    qualities: ["Heavy", "Slow", "Nourishing"],
    bestForLabels: ["Light social", "Dinner", "Gentle walks", "Family time"],
  },
  {
    id: "pitta-night",
    dosha: "Pitta",
    time: "10 PM - 2 AM",
    hourRange: [22, 2],
    tagline: "Rest & restoration",
    qualities: ["Fiery", "Restorative", "Processing"],
    bestForLabels: ["Sleep", "Body repair", "Dream processing"],
  },
];

const KEYWORD_ZONES: Array<{ zoneId: string; keywords: string[] }> = [
  {
    zoneId: "vata-dawn",
    keywords: [
      "meditate", "meditation", "journal", "journaling", "pray", "prayer",
      "breathe", "breathing", "spiritual", "silent", "contemplat",
    ],
  },
  {
    zoneId: "kapha-morning",
    keywords: [
      "exercise", "workout", "gym", "yoga", "run", "running", "walk", "walking",
      "clean", "cleaning", "cook breakfast", "grocery", "shop", "shopping", "errand",
      "stretch", "commute", "organize", "declutter", "laundry", "dishes",
    ],
  },
  {
    zoneId: "pitta-midday",
    keywords: [
      "code", "coding", "program", "debug", "study", "studies", "research", "analyze",
      "analysis", "plan", "planning", "budget", "finance", "report", "review", "audit",
      "calculate", "data", "exam", "solve", "problem", "decision", "strategy", "math",
      "spreadsheet", "document", "draft", "learn", "test", "fix",
    ],
  },
  {
    zoneId: "vata-afternoon",
    keywords: [
      "design", "brainstorm", "meeting", "call", "present", "presentation", "creative",
      "art", "draw", "sketch", "idea", "ideate", "pitch", "blog", "social", "post",
      "collaborate", "workshop", "interview", "chat", "video", "podcast", "illustrate", "prototype",
    ],
  },
  {
    zoneId: "kapha-evening",
    keywords: [
      "dinner", "lunch", "eat", "meal", "cook dinner", "cook lunch", "family", "friend",
      "social", "leisure", "hobby", "relax", "unwind", "rest", "nap", "watch", "movie",
      "tv", "music", "walk evening", "light", "gentle",
    ],
  },
  {
    zoneId: "pitta-night",
    keywords: [
      "sleep", "bed", "bedtime", "wind down", "wind-down", "night routine", "skincare",
      "read before", "light reading",
    ],
  },
];

/** Returns a zone ID from keyword matching, or null if no keyword matched. */
export function classifyByKeyword(text: string): string | null {
  const lower = text.toLowerCase();
  for (const { zoneId, keywords } of KEYWORD_ZONES) {
    if (keywords.some((kw) => lower.includes(kw))) return zoneId;
  }
  return null;
}

export function getZoneById(id: string): DoshaZone | undefined {
  return DOSHA_ZONES.find((z) => z.id === id);
}

export function getCurrentZone(hour: number): DoshaZone {
  const match = DOSHA_ZONES.find((z) => {
    const [s, e] = z.hourRange;
    if (s < e) return hour >= s && hour < e;
    return hour >= s || hour < e;
  });
  return match ?? DOSHA_ZONES[2];
}

export const DOSHA_COLORS: Record<Dosha, {
  zone: string;
  activezone: string;
  badge: string;
  dot: string;
  text: string;
  label: string;
}> = {
  Vata: {
    zone: "border-violet-200 dark:border-violet-800/60 bg-violet-50/40 dark:bg-violet-950/20",
    activezone: "border-violet-400 dark:border-violet-500 bg-violet-50 dark:bg-violet-950/40 shadow-md shadow-violet-100 dark:shadow-violet-900/20",
    badge: "bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300",
    dot: "bg-violet-500",
    text: "text-violet-700 dark:text-violet-300",
    label: "bg-violet-500",
  },
  Pitta: {
    zone: "border-orange-200 dark:border-orange-800/60 bg-orange-50/40 dark:bg-orange-950/20",
    activezone: "border-orange-400 dark:border-orange-500 bg-orange-50 dark:bg-orange-950/40 shadow-md shadow-orange-100 dark:shadow-orange-900/20",
    badge: "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300",
    dot: "bg-orange-500",
    text: "text-orange-700 dark:text-orange-300",
    label: "bg-orange-500",
  },
  Kapha: {
    zone: "border-teal-200 dark:border-teal-800/60 bg-teal-50/40 dark:bg-teal-950/20",
    activezone: "border-teal-400 dark:border-teal-500 bg-teal-50 dark:bg-teal-950/40 shadow-md shadow-teal-100 dark:shadow-teal-900/20",
    badge: "bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300",
    dot: "bg-teal-500",
    text: "text-teal-700 dark:text-teal-300",
    label: "bg-teal-500",
  },
};
