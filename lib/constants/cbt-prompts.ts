export const CBT_PROMPTS = {
  situation: "Describe the situation. What happened? Where were you? Who was involved?",
  automaticThought: "What thoughts went through your mind? What were you telling yourself?",
  evidenceFor: "What evidence supports this thought? What facts back it up?",
  evidenceAgainst: "What evidence challenges this thought? What would a friend say?",
  balancedThought: "Write a more balanced, realistic version of the thought.",
} as const;

export const GRATITUDE_PROMPTS = [
  "Something that made me smile today",
  "Someone I'm grateful for",
  "A small win or thing I'm proud of",
] as const;
