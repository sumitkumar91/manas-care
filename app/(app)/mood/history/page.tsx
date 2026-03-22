import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { MoodTrendChart } from "@/components/mood/MoodTrendChart";
import { EmotionInsightCard } from "@/components/mood/EmotionInsightCard";
import { buttonVariants } from "@/lib/button-variants";
import Link from "next/link";
import { format, parseISO } from "date-fns";

export const metadata = { title: "Mood History - Manas Care" };

export default async function MoodHistoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  // Fetch last 30 days
  const since = new Date(Date.now() - 30 * 86400000).toISOString();
  const { data: logs } = await supabase
    .from("mood_logs")
    .select("id, logged_at, score, mood_emoji, mood_label, notes")
    .eq("user_id", user.id)
    .gte("logged_at", since)
    .order("logged_at", { ascending: false });

  const allLogs = logs ?? [];

  return (
    <div>
      <PageHeader
        title="Mood History"
        description="Your emotional trends over the last 30 days."
        action={
          <Link href="/mood" className={buttonVariants({ size: "sm" })}>
            Log today
          </Link>
        }
      />
      <div className="p-6 space-y-6">
        <MoodTrendChart logs={allLogs} />

        <EmotionInsightCard logs={allLogs} />

        {/* Log list */}
        {allLogs.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Recent logs</p>
            <div className="divide-y rounded-xl border overflow-hidden">
              {allLogs.map((log) => (
                <div key={log.id} className="flex items-center gap-3 px-4 py-3 bg-card hover:bg-muted/40 transition-colors">
                  <span className="text-xl shrink-0">{log.mood_emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      {log.mood_label}
                    </p>
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
