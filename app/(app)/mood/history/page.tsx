import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { MoodTrendChart } from "@/components/mood/MoodTrendChart";
import { EmotionInsightCard } from "@/components/mood/EmotionInsightCard";
import { buttonVariants } from "@/lib/button-variants";
import Link from "next/link";
import { format, parseISO } from "date-fns";

export const metadata = { title: "Mood History — ManaCare" };

export default async function MoodHistoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

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
                      <span className="text-muted-foreground font-normal ml-2">{log.score}/10</span>
                    </p>
                    {log.notes && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{log.notes}</p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {format(parseISO(log.logged_at), "MMM d")}
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
