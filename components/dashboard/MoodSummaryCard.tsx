import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/lib/button-variants";

interface MoodSummaryCardProps {
  todayLog: { mood_emoji: string; mood_label: string; score: number } | null;
}

export function MoodSummaryCard({ todayLog }: MoodSummaryCardProps) {
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
