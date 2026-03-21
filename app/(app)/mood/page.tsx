import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { MoodLogForm } from "@/components/mood/MoodLogForm";
import { buttonVariants } from "@/lib/button-variants";
import Link from "next/link";

export const metadata = { title: "Mood — ManaCare" };

function getTodayRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start: start.toISOString(), end: end.toISOString() };
}

export default async function MoodPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { start, end } = getTodayRange();
  const { data: todayLog } = await supabase
    .from("mood_logs")
    .select("*")
    .eq("user_id", user.id)
    .gte("logged_at", start)
    .lte("logged_at", end)
    .order("logged_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <div>
      <PageHeader
        title={todayLog ? "Update today's mood" : "How are you feeling?"}
        description={todayLog ? `Last logged: ${todayLog.mood_emoji} ${todayLog.mood_label}` : "Take a moment to check in with yourself."}
        action={
          <Link href="/mood/history" className={buttonVariants({ variant: "outline", size: "sm" })}>
            History →
          </Link>
        }
      />
      <div className="p-6">
        <MoodLogForm userId={user.id} existingLog={todayLog ?? undefined} />
      </div>
    </div>
  );
}
