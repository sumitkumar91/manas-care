import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { MoodTrendChart } from "@/components/mood/MoodTrendChart";
import { EmotionInsightCard } from "@/components/mood/EmotionInsightCard";
import { buttonVariants } from "@/lib/button-variants";
import Link from "next/link";

export const metadata = { title: "Check-in History - Manas Care" };

const ENERGY_LABELS = ["", "Very Low", "Low", "Okay", "Good", "Great"];
const STRESS_LABELS = ["", "Very Low", "Low", "Moderate", "High", "Very High"];

export default async function CheckInHistoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const since = new Date(Date.now() - 30 * 86400000).toISOString();

  const [{ data: logs }, { data: checkins }] = await Promise.all([
    supabase
      .from("mood_logs")
      .select("id, logged_at, score, mood_emoji, mood_label, notes")
      .eq("user_id", user.id)
      .gte("logged_at", since)
      .order("logged_at", { ascending: false }),
    (supabase as any).from("daily_checkins")
      .select("id, date, type, sleep_hours, energy, stress")
      .eq("user_id", user.id)
      .gte("date", since.slice(0, 10))
      .order("date", { ascending: false }),
  ]);

  const allLogs = logs ?? [];
  const allCheckins = checkins ?? [];

  return (
    <div>
      <PageHeader
        title="History"
        description="Your mood and check-in data over the last 30 days."
        action={
          <Link href="/checkin" className={buttonVariants({ size: "sm" })}>
            Log today
          </Link>
        }
      />
      <div className="p-6 space-y-6">
        <MoodTrendChart logs={allLogs} />
        <EmotionInsightCard logs={allLogs} />

        {allCheckins.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Check-in logs</p>
            <div className="divide-y rounded-xl border overflow-hidden">
              {allCheckins.map((c: { id: string; date: string; type: string; sleep_hours: number | null; energy: number; stress: number }) => (
                <div key={c.id} className="flex items-center gap-3 px-4 py-3 bg-card hover:bg-muted/40 transition-colors">
                  <span className="text-xl shrink-0">{c.type === "morning" ? "🌅" : "🌙"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium capitalize">{c.type} check-in</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Energy: {ENERGY_LABELS[c.energy]} · Stress: {STRESS_LABELS[c.stress]}
                      {c.sleep_hours ? ` · Sleep: ${c.sleep_hours}h` : ""}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {new Date(c.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {allLogs.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Mood logs</p>
            <div className="divide-y rounded-xl border overflow-hidden">
              {allLogs.map((log) => (
                <div key={log.id} className="flex items-center gap-3 px-4 py-3 bg-card hover:bg-muted/40 transition-colors">
                  <span className="text-xl shrink-0">{log.mood_emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{log.mood_label}</p>
                    {log.notes && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{log.notes}</p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0" suppressHydrationWarning>
                    {new Date(log.logged_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
