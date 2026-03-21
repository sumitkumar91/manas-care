export const MENTAL_HEALTH_GOALS = [
  { id: "reduce_anxiety", label: "Reduce anxiety", emoji: "😌" },
  { id: "manage_stress", label: "Manage stress", emoji: "🧘" },
  { id: "better_sleep", label: "Sleep better", emoji: "😴" },
  { id: "improve_mood", label: "Lift my mood", emoji: "☀️" },
  { id: "build_resilience", label: "Build resilience", emoji: "💪" },
  { id: "process_emotions", label: "Process emotions", emoji: "💭" },
  { id: "academic_pressure", label: "Handle academic pressure", emoji: "📚" },
  { id: "relationships", label: "Improve relationships", emoji: "🤝" },
  { id: "self_esteem", label: "Build self-esteem", emoji: "🌱" },
  { id: "grief", label: "Cope with loss or grief", emoji: "🕊️" },
] as const;

export const KNOWN_TRIGGERS = [
  { id: "exams", label: "Exams & deadlines", emoji: "📝" },
  { id: "social_situations", label: "Social situations", emoji: "👥" },
  { id: "finances", label: "Money & finances", emoji: "💸" },
  { id: "family", label: "Family pressure", emoji: "🏠" },
  { id: "future_uncertainty", label: "Future uncertainty", emoji: "🌫️" },
  { id: "loneliness", label: "Loneliness", emoji: "🫂" },
  { id: "sleep", label: "Poor sleep", emoji: "🌙" },
  { id: "social_media", label: "Social media", emoji: "📱" },
  { id: "work", label: "Work overload", emoji: "💼" },
  { id: "health", label: "Health concerns", emoji: "🏥" },
] as const;

export const COPING_STYLES = [
  {
    id: "journaling",
    label: "Journaling",
    description: "Writing thoughts and feelings to process them",
    emoji: "✍️",
  },
  {
    id: "breathing",
    label: "Breathing exercises",
    description: "Calming the nervous system through breath",
    emoji: "🌬️",
  },
  {
    id: "talking",
    label: "Talking it out",
    description: "Processing emotions through conversation",
    emoji: "💬",
  },
  {
    id: "movement",
    label: "Physical movement",
    description: "Running, yoga, walks to reset your mind",
    emoji: "🏃",
  },
  {
    id: "creative",
    label: "Creative outlets",
    description: "Art, music, or creative expression",
    emoji: "🎨",
  },
  {
    id: "mindfulness",
    label: "Mindfulness",
    description: "Staying present and grounding techniques",
    emoji: "🧘",
  },
] as const;

export type GoalId = (typeof MENTAL_HEALTH_GOALS)[number]["id"];
export type TriggerId = (typeof KNOWN_TRIGGERS)[number]["id"];
export type CopingId = (typeof COPING_STYLES)[number]["id"];
