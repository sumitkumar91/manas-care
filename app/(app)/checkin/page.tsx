import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { buttonVariants } from "@/lib/button-variants";
import Link from "next/link";
import { CheckInTabs } from "@/components/checkin/CheckInTabs";

export const metadata = { title: "Check-in - Manas Care" };

function getTodayRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start: start.toISOString(), end: end.toISOString() };
}

export default async function CheckInPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

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
        title="Daily Check-in"
        description="Track how you feel and how your day is going."
        action={
          <Link href="/checkin/history" className={buttonVariants({ variant: "outline", size: "sm" })}>
            History
          </Link>
        }
      />
      <div className="p-6 max-w-2xl">
        <CheckInTabs
          userId={user.id}
          todayLog={todayLog ?? undefined}
        />
      </div>
    </div>
  );
}
