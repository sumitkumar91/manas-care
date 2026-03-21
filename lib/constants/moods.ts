export const MOODS = [
  { emoji: "😄", label: "Great", score: 9 },
  { emoji: "🙂", label: "Good", score: 7 },
  { emoji: "😐", label: "Okay", score: 5 },
  { emoji: "😕", label: "Low", score: 3 },
  { emoji: "😢", label: "Awful", score: 1 },
  { emoji: "😠", label: "Angry", score: 2 },
  { emoji: "😰", label: "Anxious", score: 3 },
  { emoji: "😴", label: "Tired", score: 4 },
  { emoji: "🥰", label: "Loved", score: 8 },
  { emoji: "🤩", label: "Excited", score: 10 },
] as const;

export type MoodOption = (typeof MOODS)[number];

// Color for score 1–10 on charts
export function scoreToColor(score: number): string {
  if (score >= 8) return "hsl(142 60% 45%)";  // green
  if (score >= 6) return "hsl(200 70% 50%)";  // blue
  if (score >= 4) return "hsl(45 80% 55%)";   // amber
  return "hsl(0 70% 55%)";                     // red
}
