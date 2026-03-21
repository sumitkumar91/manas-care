import { createClient } from "@/lib/supabase/server";

/**
 * Builds a context string for Gemini from the user's profile data.
 * Only called if privacy_settings.allow_ai_context = true.
 * Never includes journal content — only titles and mood summaries.
 */
export async function buildUserContext(userId: string): Promise<string | null> {
  const supabase = await createClient();

  // Check privacy setting
  const { data: privacy } = await supabase
    .from("privacy_settings")
    .select("allow_ai_context")
    .eq("user_id", userId)
    .single();

  if (!privacy?.allow_ai_context) return null;

  const [profileResult, onboardingResult, moodResult, journalResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("display_name")
      .eq("id", userId)
      .single(),

    supabase
      .from("onboarding_responses")
      .select("mental_health_goals, known_triggers, preferred_coping")
      .eq("user_id", userId)
      .single(),

    supabase
      .from("mood_logs")
      .select("mood_label, score, logged_at")
      .eq("user_id", userId)
      .gte("logged_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order("logged_at", { ascending: false }),

    supabase
      .from("journal_entries")
      .select("title, entry_type, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(3),
  ]);

  const parts: string[] = [];

  if (profileResult.data?.display_name) {
    parts.push(`User's name: ${profileResult.data.display_name}`);
  }

  const onboarding = onboardingResult.data;
  if (onboarding) {
    if (onboarding.mental_health_goals?.length) {
      parts.push(`Their goals: ${onboarding.mental_health_goals.join(", ")}`);
    }
    if (onboarding.known_triggers?.length) {
      parts.push(`Known triggers: ${onboarding.known_triggers.join(", ")}`);
    }
    if (onboarding.preferred_coping?.length) {
      parts.push(`Preferred coping strategies: ${onboarding.preferred_coping.join(", ")}`);
    }
  }

  const moods = moodResult.data ?? [];
  if (moods.length) {
    const avg = moods.reduce((s, m) => s + m.score, 0) / moods.length;
    const recentMoods = moods.slice(0, 3).map((m) => m.mood_label).join(", ");
    parts.push(
      `Mood over the last 7 days: average score ${avg.toFixed(1)}/10, recent moods: ${recentMoods}`
    );
  }

  const journals = journalResult.data ?? [];
  if (journals.length) {
    const titles = journals
      .filter((j) => j.title)
      .map((j) => `"${j.title}" (${j.entry_type})`)
      .join(", ");
    if (titles) parts.push(`Recent journal entries (titles only): ${titles}`);
  }

  return parts.length ? parts.join("\n") : null;
}
