export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  benefit: string;
  phases: { label: string; duration: number; color: string }[];
}

export const BREATHING_EXERCISES: BreathingExercise[] = [
  {
    id: "nadi-shodhana",
    name: "Nadi Shodhana",
    description: "Alternate nostril breathing. Inhale right, exhale left, inhale left, exhale right. Repeat 10 breaths up to 10 minutes.",
    benefit: "Coordinates brain hemispheres",
    phases: [
      { label: "Right Inhale", duration: 4, color: "from-amber-400 to-amber-600" },
      { label: "Left Exhale", duration: 4, color: "from-teal-400 to-teal-600" },
      { label: "Left Inhale", duration: 4, color: "from-blue-400 to-blue-600" },
      { label: "Right Exhale", duration: 4, color: "from-teal-400 to-teal-600" },
    ],
  },
  {
    id: "sheetali",
    name: "Sheetali",
    description: "The cooling breath. Fold tongue lengthwise and inhale through it. Exhale through the nose. 10 breaths minimum.",
    benefit: "Reduces pitta — cools head & digestion",
    phases: [
      { label: "Inhale (tongue)", duration: 5, color: "from-cyan-400 to-cyan-600" },
      { label: "Exhale", duration: 5, color: "from-teal-400 to-teal-600" },
    ],
  },
  {
    id: "sheetkari",
    name: "Sheetkari",
    description: "The hissing breath. Clench teeth, expose them and take a deep hissing inhale. Exhale through the nose. Same effect as Sheetali.",
    benefit: "Reduces pitta, purifies the senses",
    phases: [
      { label: "Inhale (teeth)", duration: 5, color: "from-cyan-400 to-cyan-600" },
      { label: "Exhale", duration: 5, color: "from-teal-400 to-teal-600" },
    ],
  },
  {
    id: "surya-bhedna",
    name: "Surya Bhedna",
    description: "The solar breath. Inhale through the right nostril, exhale through the left. 10 breaths minimum, 10 minutes maximum.",
    benefit: "Heating breath — balances vata",
    phases: [
      { label: "Right Inhale", duration: 4, color: "from-amber-400 to-orange-600" },
      { label: "Left Exhale", duration: 4, color: "from-orange-400 to-red-600" },
    ],
  },
  {
    id: "chandra-bhedna",
    name: "Chandra Bhedna",
    description: "The lunar breath. Inhale through the left nostril, exhale through the right. 10 breaths minimum, 10 minutes maximum.",
    benefit: "Cooling breath — reduces pitta",
    phases: [
      { label: "Left Inhale", duration: 4, color: "from-blue-400 to-indigo-600" },
      { label: "Right Exhale", duration: 4, color: "from-indigo-400 to-violet-600" },
    ],
  },
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
  /** Human-readable time slot, e.g. "7 AM - 10 AM" */
  time: string;
  /** [start, end] in 0-23h. If end < start the slot wraps midnight (e.g. [22, 1]). */
  hourRange: [number, number];
  mood: string;
  searchQuery: string;
}

// ---------------------------------------------------------------------------
// Ragas from the classical Raag-Prahar (time-of-day) prescription system
// ---------------------------------------------------------------------------

export const RAGAS: Raga[] = [
  // 1 AM - 4 AM
  { name: "Adana",         time: "1 AM - 4 AM", hourRange: [1, 4],   mood: "Devotional, playful",                         searchQuery: "Raag Adana classical vocal meditation" },
  { name: "Darbari Kanada",time: "1 AM - 4 AM", hourRange: [1, 4],   mood: "Deep, serious, meditative, devotional",        searchQuery: "Raag Darbari Kanada late night meditation deep" },
  { name: "Malkauns",      time: "1 AM - 4 AM", hourRange: [1, 4],   mood: "Tranquility, romance, devotion",               searchQuery: "Raag Malkauns midnight meditation deep" },

  // 4 AM - 7 AM
  { name: "Lalit",         time: "4 AM - 7 AM", hourRange: [4, 7],   mood: "Serene, devotional, yearning",                 searchQuery: "Raag Lalit pre dawn meditation sitar" },

  // 7 AM - 10 AM
  { name: "Ahir Bhairav",  time: "7 AM - 10 AM", hourRange: [7, 10], mood: "Meditative, devotional",                       searchQuery: "Raag Ahir Bhairav morning meditation sitar" },
  { name: "Alhaiya Bilawal",time: "7 AM - 10 AM",hourRange: [7, 10], mood: "Serene and uplifting",                         searchQuery: "Raag Alhaiya Bilawal morning classical" },
  { name: "Bhairav",       time: "7 AM - 10 AM", hourRange: [7, 10], mood: "Peaceful, calming, devotional, meditative",    searchQuery: "Raag Bhairav morning meditation instrumental" },
  { name: "Deshkar",       time: "7 AM - 10 AM", hourRange: [7, 10], mood: "Heroism, strength, courage",                   searchQuery: "Raag Deshkar morning classical meditation" },
  { name: "Ramkali",       time: "7 AM - 10 AM", hourRange: [7, 10], mood: "Soulful, yearning, devotion, pathos",          searchQuery: "Raag Ramkali morning meditation classical" },

  // 10 AM - 1 PM
  { name: "Asawari",       time: "10 AM - 1 PM", hourRange: [10, 13], mood: "Divine and tranquil, surrender",              searchQuery: "Raag Asawari late morning meditation classical" },
  { name: "Jaunpuri",      time: "10 AM - 1 PM", hourRange: [10, 13], mood: "Devotion, separation, longing",               searchQuery: "Raag Jaunpuri late morning meditation vocal" },
  { name: "Todi",          time: "10 AM - 1 PM", hourRange: [10, 13], mood: "Deep, serious, tranquil, sorrowful, devotional", searchQuery: "Raag Todi morning meditation sitar" },

  // 1 PM - 4 PM
  { name: "Bhimpalas",     time: "1 PM - 4 PM",  hourRange: [13, 16], mood: "Sweet, playful, romance, devotion",           searchQuery: "Raag Bhimpalasi afternoon vocal meditation" },

  // 4 PM - 7 PM
  { name: "Champak",       time: "4 PM - 7 PM",  hourRange: [16, 19], mood: "Romantic, peaceful, gentle loving, devotion", searchQuery: "Raag Champak evening meditation classical" },

  // 7 PM - 10 PM
  { name: "Bhoopali",      time: "7 PM - 10 PM", hourRange: [19, 22], mood: "Peace, joy, romance, devotion",               searchQuery: "Raag Bhoopali flute meditation peaceful evening" },
  { name: "Chhayanat",     time: "7 PM - 10 PM", hourRange: [19, 22], mood: "Adornment, separation in love",               searchQuery: "Raag Chhayanat Kalyan evening meditation classical" },
  { name: "Hameer",        time: "7 PM - 10 PM", hourRange: [19, 22], mood: "Bravery, courage",                            searchQuery: "Raag Hameer evening classical meditation" },
  { name: "Hansadhwani",   time: "7 PM - 10 PM", hourRange: [19, 22], mood: "Devotion, romance",                           searchQuery: "Raag Hansadhwani evening meditation classical" },
  { name: "Kamod",         time: "7 PM - 10 PM", hourRange: [19, 22], mood: "Beauty, romance, devotion",                   searchQuery: "Raag Kamod evening meditation sitar" },
  { name: "Kedar",         time: "7 PM - 10 PM", hourRange: [19, 22], mood: "Beauty, romance, separation",                 searchQuery: "Raag Kedar evening meditation classical" },
  { name: "Shuddh Kalyan", time: "7 PM - 10 PM", hourRange: [19, 22], mood: "Happy, peaceful, romantic, devotional",       searchQuery: "Raag Shuddh Kalyan evening meditation classical" },
  { name: "Shyam Kalyan",  time: "7 PM - 10 PM", hourRange: [19, 22], mood: "Romantic",                                    searchQuery: "Raag Shyam Kalyan evening meditation sitar" },
  { name: "Yaman",         time: "7 PM - 10 PM", hourRange: [19, 22], mood: "Happy, romantic, majestic",                   searchQuery: "Raag Yaman evening meditation sitar" },

  // 10 PM - 1 AM (wraps midnight)
  { name: "Bageshri",      time: "10 PM - 1 AM", hourRange: [22, 1],  mood: "Romantic",                                    searchQuery: "Raag Bageshri night meditation vocal" },
  { name: "Gaud Malhar",   time: "10 PM - 1 AM", hourRange: [22, 1],  mood: "Romance, longing, uplifting, joyous",         searchQuery: "Raag Gaud Malhar night meditation classical" },
  { name: "Gorakh Kalyan", time: "10 PM - 1 AM", hourRange: [22, 1],  mood: "Romantic",                                    searchQuery: "Raag Gorakh Kalyan night meditation classical" },
  { name: "Kafi",          time: "10 PM - 1 AM", hourRange: [22, 1],  mood: "Shringar (romance)",                          searchQuery: "Raag Kafi night meditation flute" },
  { name: "Khamaj",        time: "10 PM - 1 AM", hourRange: [22, 1],  mood: "Shringar (romance)",                          searchQuery: "Raag Khamaj night classical meditation" },
  { name: "Kirwani",       time: "10 PM - 1 AM", hourRange: [22, 1],  mood: "Romantic, serious, devotional",               searchQuery: "Raag Kirwani night meditation classical" },
  { name: "Puriya",        time: "10 PM - 1 AM", hourRange: [22, 1],  mood: "Deep, serious, peace and tranquility",        searchQuery: "Raag Puriya night meditation sitar" },
];

function ragaInRange(h: number, start: number, end: number): boolean {
  if (start < end) return h >= start && h < end;
  // wraps midnight (e.g. [22, 1])
  return h >= start || h < end;
}

/** Returns all ragas appropriate for the given hour (0-23). */
export function getRagasForTime(hour: number): Raga[] {
  const matches = RAGAS.filter((r) => ragaInRange(hour, r.hourRange[0], r.hourRange[1]));
  return matches.length > 0 ? matches : RAGAS.filter((r) => r.name === "Bhoopali");
}

export const TIMER_DURATIONS = [
  { label: "5 min", seconds: 5 * 60 },
  { label: "10 min", seconds: 10 * 60 },
  { label: "15 min", seconds: 15 * 60 },
  { label: "20 min", seconds: 20 * 60 },
  { label: "30 min", seconds: 30 * 60 },
];
