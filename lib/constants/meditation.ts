export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  benefit: string;
  phases: { label: string; duration: number; color: string }[];
}

export const BREATHING_EXERCISES: BreathingExercise[] = [
  {
    id: "box",
    name: "Box Breathing",
    description: "Equal counts of inhale, hold, exhale, hold.",
    benefit: "Reduces stress & improves focus",
    phases: [
      { label: "Inhale", duration: 4, color: "from-blue-400 to-blue-600" },
      { label: "Hold", duration: 4, color: "from-violet-400 to-violet-600" },
      { label: "Exhale", duration: 4, color: "from-teal-400 to-teal-600" },
      { label: "Hold", duration: 4, color: "from-violet-400 to-violet-600" },
    ],
  },
  {
    id: "478",
    name: "4-7-8 Breathing",
    description: "Inhale for 4, hold for 7, exhale slowly for 8.",
    benefit: "Calms anxiety & aids sleep",
    phases: [
      { label: "Inhale", duration: 4, color: "from-blue-400 to-blue-600" },
      { label: "Hold", duration: 7, color: "from-violet-400 to-violet-600" },
      { label: "Exhale", duration: 8, color: "from-teal-400 to-teal-600" },
    ],
  },
  {
    id: "belly",
    name: "Belly Breathing",
    description: "Deep diaphragmatic breathing to ground yourself.",
    benefit: "Activates the relaxation response",
    phases: [
      { label: "Inhale", duration: 5, color: "from-blue-400 to-blue-600" },
      { label: "Exhale", duration: 5, color: "from-teal-400 to-teal-600" },
    ],
  },
  {
    id: "coherent",
    name: "Coherent Breathing",
    description: "Slow 5-second inhale and exhale — the resonance frequency of the heart.",
    benefit: "Balances the nervous system",
    phases: [
      { label: "Inhale", duration: 5, color: "from-amber-400 to-amber-600" },
      { label: "Exhale", duration: 5, color: "from-orange-400 to-orange-600" },
    ],
  },
];

export interface Raga {
  name: string;
  time: string;
  hourRange: [number, number]; // 24h, e.g. [6, 9]
  mood: string;
  benefits: string[];
  searchQuery: string;
}

export const RAGAS: Raga[] = [
  {
    name: "Raag Bhairav",
    time: "Early morning (5–8 AM)",
    hourRange: [5, 8],
    mood: "Serene & devotional",
    benefits: ["Reduces anxiety", "Brings mental clarity", "Morning grounding"],
    searchQuery: "Raag Bhairav instrumental meditation peaceful",
  },
  {
    name: "Raag Lalit",
    time: "Pre-dawn (3–6 AM)",
    hourRange: [3, 6],
    mood: "Yearning & contemplative",
    benefits: ["Deep stillness", "Spiritual awakening", "Inner peace"],
    searchQuery: "Raag Lalit pre dawn meditation sitar",
  },
  {
    name: "Raag Todi",
    time: "Late morning (8–11 AM)",
    hourRange: [8, 11],
    mood: "Reflective & melancholic",
    benefits: ["Deep introspection", "Processes difficult emotions", "Cathartic release"],
    searchQuery: "Raag Todi morning meditation sitar",
  },
  {
    name: "Raag Bhimpalasi",
    time: "Afternoon (2–5 PM)",
    hourRange: [14, 17],
    mood: "Tender & longing",
    benefits: ["Soothes sadness", "Emotional release", "Gentle mood lift"],
    searchQuery: "Raag Bhimpalasi afternoon vocal meditation",
  },
  {
    name: "Raag Puriya Dhanashri",
    time: "Twilight (5–7 PM)",
    hourRange: [17, 19],
    mood: "Rich & bittersweet",
    benefits: ["Transitions the mind", "Releases day's stress", "Opens creativity"],
    searchQuery: "Raag Puriya Dhanashri evening sitar meditation",
  },
  {
    name: "Raag Yaman",
    time: "Evening (6–9 PM)",
    hourRange: [18, 21],
    mood: "Uplifting & expansive",
    benefits: ["Lifts mood", "Relieves stress", "Opens the heart"],
    searchQuery: "Raag Yaman sitar meditation evening",
  },
  {
    name: "Raag Bhoopali",
    time: "Evening (7–10 PM)",
    hourRange: [19, 22],
    mood: "Peaceful & content",
    benefits: ["Gentle stress relief", "Suitable for beginners", "Uplifts without excitement"],
    searchQuery: "Raag Bhoopali flute meditation peaceful",
  },
  {
    name: "Raag Kafi",
    time: "Night (9 PM–12 AM)",
    hourRange: [21, 24],
    mood: "Playful yet relaxing",
    benefits: ["Light relaxation", "Creative flow", "Gentle unwinding"],
    searchQuery: "Raag Kafi flute relaxing night",
  },
  {
    name: "Raag Darbari Kanada",
    time: "Late night (10 PM–2 AM)",
    hourRange: [22, 26],
    mood: "Deeply meditative & profound",
    benefits: ["Induces deep relaxation", "Helps with insomnia", "Quiets mental chatter"],
    searchQuery: "Raag Darbari Kanada late night meditation deep",
  },
  {
    name: "Raag Malkauns",
    time: "Midnight (12–3 AM)",
    hourRange: [24, 27],
    mood: "Introspective & mysterious",
    benefits: ["Deep meditation", "Emotional healing", "Inner stillness"],
    searchQuery: "Raag Malkauns midnight meditation deep",
  },
];

/** Returns the most appropriate raga for the current hour */
export function getRagaForTime(hour: number): Raga {
  // Normalize hour for past-midnight (e.g. 1 AM = 25)
  const scored = RAGAS.map((r) => {
    const [start, end] = r.hourRange;
    const h = hour < 3 ? hour + 24 : hour;
    const inRange = h >= start && h < end;
    return { raga: r, score: inRange ? 1 : 0 };
  });
  const match = scored.find((s) => s.score === 1);
  // Fallback: Bhoopali works anytime
  return match?.raga ?? RAGAS.find((r) => r.name === "Raag Bhoopali")!;
}

export const TIMER_DURATIONS = [
  { label: "5 min", seconds: 5 * 60 },
  { label: "10 min", seconds: 10 * 60 },
  { label: "15 min", seconds: 15 * 60 },
  { label: "20 min", seconds: 20 * 60 },
  { label: "30 min", seconds: 30 * 60 },
];
