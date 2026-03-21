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
  mood: string;
  benefits: string[];
  searchQuery: string;
}

export const RAGAS: Raga[] = [
  {
    name: "Raag Bhairav",
    time: "Early morning",
    mood: "Serene & devotional",
    benefits: ["Reduces anxiety", "Brings mental clarity", "Morning grounding"],
    searchQuery: "Raag Bhairav instrumental meditation",
  },
  {
    name: "Raag Yaman",
    time: "Evening (6–9 PM)",
    mood: "Uplifting & expansive",
    benefits: ["Lifts mood", "Relieves stress", "Opens the heart"],
    searchQuery: "Raag Yaman sitar meditation",
  },
  {
    name: "Raag Darbari Kanada",
    time: "Late night",
    mood: "Deeply meditative & profound",
    benefits: ["Induces deep relaxation", "Helps with insomnia", "Quiets mental chatter"],
    searchQuery: "Raag Darbari Kanada late night meditation",
  },
  {
    name: "Raag Bhoopali",
    time: "Anytime",
    mood: "Peaceful & content",
    benefits: ["Gentle stress relief", "Suitable for beginners", "Uplifts without excitement"],
    searchQuery: "Raag Bhoopali flute meditation",
  },
  {
    name: "Raag Malkauns",
    time: "Midnight",
    mood: "Introspective & mysterious",
    benefits: ["Deep meditation", "Emotional healing", "Inner stillness"],
    searchQuery: "Raag Malkauns meditation deep",
  },
  {
    name: "Raag Bhimpalasi",
    time: "Afternoon (3–5 PM)",
    mood: "Tender & longing",
    benefits: ["Soothes sadness", "Emotional release", "Gentle mood lift"],
    searchQuery: "Raag Bhimpalasi vocal meditation",
  },
  {
    name: "Raag Todi",
    time: "Late morning",
    mood: "Reflective & melancholic",
    benefits: ["Deep introspection", "Processes difficult emotions", "Cathartic release"],
    searchQuery: "Raag Todi morning meditation sitar",
  },
  {
    name: "Raag Kafi",
    time: "Night",
    mood: "Playful yet relaxing",
    benefits: ["Light relaxation", "Creative flow", "Gentle unwinding"],
    searchQuery: "Raag Kafi flute relaxing",
  },
];

export const TIMER_DURATIONS = [
  { label: "5 min", seconds: 5 * 60 },
  { label: "10 min", seconds: 10 * 60 },
  { label: "15 min", seconds: 15 * 60 },
  { label: "20 min", seconds: 20 * 60 },
  { label: "30 min", seconds: 30 * 60 },
];
