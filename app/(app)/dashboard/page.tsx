import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StreakWidget } from "@/components/dashboard/StreakWidget";
import { MoodSummaryCard } from "@/components/dashboard/MoodSummaryCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { DashboardGreeting } from "@/components/dashboard/DashboardGreeting";
import { WeeklySummary } from "@/components/dashboard/WeeklySummary";

export const metadata = { title: "Dashboard - Manas Care" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();

  const [{ data: profile }, { data: streak }, { data: weekMoods }, { data: weekCheckins }] = await Promise.all([
    supabase.from("profiles").select("display_name").eq("id", user.id).single(),
    supabase.from("streaks").select("current_streak, longest_streak").eq("user_id", user.id).single(),
    supabase.from("mood_logs")
      .select("score, mood_label, logged_at")
      .eq("user_id", user.id)
      .gte("logged_at", weekAgo),
    (supabase as any).from("daily_checkins")
      .select("type, energy, stress, sleep_hours")
      .eq("user_id", user.id)
      .gte("date", weekAgo.slice(0, 10)),
  ]);

  const name = profile?.display_name?.split(" ")[0] ?? "there";

  return (
    <div>
      <DashboardGreeting name={name} />
      <div className="p-6 space-y-5 max-w-2xl">
        <QuickActions />
        <MoodSummaryCard userId={user.id} />
        <WeeklySummary moodLogs={weekMoods ?? []} checkins={weekCheckins ?? []} />
        <StreakWidget
          currentStreak={streak?.current_streak ?? 0}
          longestStreak={streak?.longest_streak ?? 0}
        />
      </div>
    </div>
  );
}
