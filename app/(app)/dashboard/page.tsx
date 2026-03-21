import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { StreakWidget } from "@/components/dashboard/StreakWidget";
import { MoodSummaryCard } from "@/components/dashboard/MoodSummaryCard";
import { QuickActions } from "@/components/dashboard/QuickActions";

export const metadata = { title: "Dashboard - Manas Care" };

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getTodayRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString();
  return { start, end };
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const [{ data: profile }, { data: streak }, { data: todayLog }] = await Promise.all([
    supabase.from("profiles").select("display_name").eq("id", user.id).single(),
    supabase.from("streaks").select("current_streak, longest_streak").eq("user_id", user.id).single(),
    supabase.from("mood_logs")
      .select("mood_emoji, mood_label, score")
      .eq("user_id", user.id)
      .gte("logged_at", getTodayRange().start)
      .lt("logged_at", getTodayRange().end)
      .order("logged_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const name = profile?.display_name?.split(" ")[0] ?? "there";

  return (
    <div>
      <PageHeader
        title={`${getGreeting()}, ${name}`}
        description="Here's your wellness snapshot."
      />
      <div className="p-6 space-y-5 max-w-2xl">
        <QuickActions />
        <MoodSummaryCard todayLog={todayLog ?? null} />
        <StreakWidget
          currentStreak={streak?.current_streak ?? 0}
          longestStreak={streak?.longest_streak ?? 0}
        />
      </div>
    </div>
  );
}
