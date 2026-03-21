import { Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StreakWidgetProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakWidget({ currentStreak, longestStreak }: StreakWidgetProps) {
  return (
    <Card>
      <CardContent className="pt-5 pb-5 flex items-center gap-4">
        <div
          className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: currentStreak > 0 ? "hsl(30 90% 55% / 0.15)" : "hsl(0 0% 90% / 0.5)" }}
        >
          <Flame
            className="h-6 w-6"
            style={{ color: currentStreak > 0 ? "hsl(30 90% 55%)" : "hsl(0 0% 60%)" }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-2xl font-bold leading-none">
            {currentStreak}
            <span className="text-sm font-normal text-muted-foreground ml-1">
              day{currentStreak !== 1 ? "s" : ""}
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {currentStreak > 0 ? "Current streak" : "Start your streak today"}
            {longestStreak > 0 && ` · Best: ${longestStreak}`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
