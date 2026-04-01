"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/lib/button-variants";
import { createClient } from "@/lib/supabase/client";

export function MoodSummaryCard({ userId }: { userId: string }) {
  const [todayLog, setTodayLog] = useState<{ mood_emoji: string; mood_label: string } | null | undefined>(undefined);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString();

    createClient()
      .from("mood_logs")
      .select("mood_emoji, mood_label")
      .eq("user_id", userId)
      .gte("logged_at", start)
      .lt("logged_at", end)
      .order("logged_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => setTodayLog(data ?? null));
  }, [userId]);

  // still loading
  if (todayLog === undefined) return null;

  return (
    <Card>
      <CardContent className="pt-5 pb-5 flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-muted">
          {todayLog ? todayLog.mood_emoji : "💭"}
        </div>
        <div className="flex-1 min-w-0">
          {todayLog ? (
            <>
              <p className="font-semibold leading-none">{todayLog.mood_label}</p>
              <p className="text-xs text-muted-foreground mt-1">Today&apos;s mood logged</p>
            </>
          ) : (
            <>
              <p className="font-semibold leading-none">Daily check-in</p>
              <p className="text-xs text-muted-foreground mt-1">Log your mood and how your day is going</p>
            </>
          )}
        </div>
        <Link
          href="/checkin"
          className={buttonVariants({ size: "sm", variant: todayLog ? "outline" : "default" })}
        >
          {todayLog ? "Update" : "Check in"}
        </Link>
      </CardContent>
    </Card>
  );
}
