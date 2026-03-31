import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface WeeklySummaryProps {
  moodLogs: { score: number; mood_label: string; logged_at: string }[];
  checkins: { type: string; energy: number; stress: number; sleep_hours: number | null }[];
}

export function WeeklySummary({ moodLogs, checkins }: WeeklySummaryProps) {
  if (moodLogs.length === 0 && checkins.length === 0) return null;

  const avgMood = moodLogs.length
    ? Math.round((moodLogs.reduce((s, l) => s + l.score, 0) / moodLogs.length) * 10) / 10
    : null;

  const avgEnergy = checkins.length
    ? Math.round((checkins.reduce((s, c) => s + c.energy, 0) / checkins.length) * 10) / 10
    : null;

  const avgStress = checkins.length
    ? Math.round((checkins.reduce((s, c) => s + c.stress, 0) / checkins.length) * 10) / 10
    : null;

  const morningCheckins = checkins.filter((c) => c.type === "morning");
  const avgSleep =
    morningCheckins.filter((c) => c.sleep_hours).length
      ? Math.round(
          (morningCheckins.reduce((s, c) => s + (c.sleep_hours ?? 0), 0) /
            morningCheckins.filter((c) => c.sleep_hours).length) *
            10
        ) / 10
      : null;

  const moodEmoji =
    avgMood === null ? null
    : avgMood >= 8 ? "😊"
    : avgMood >= 6 ? "🙂"
    : avgMood >= 4 ? "😐"
    : "😔";

  const stats: { label: string; value: string }[] = [];
  if (moodLogs.length > 0)
    stats.push({ label: "Mood logged", value: `${moodLogs.length}/7 days` });
  if (avgMood !== null)
    stats.push({ label: "Avg mood", value: `${moodEmoji} ${avgMood}/10` });
  if (avgEnergy !== null)
    stats.push({ label: "Avg energy", value: `${avgEnergy}/5` });
  if (avgStress !== null)
    stats.push({ label: "Avg stress", value: `${avgStress}/5` });
  if (avgSleep !== null)
    stats.push({ label: "Avg sleep", value: `${avgSleep}h` });

  return (
    <Card>
      <CardContent className="pt-5 pb-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0 bg-muted">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold leading-none">This week</p>
            <p className="text-xs text-muted-foreground mt-1">Your last 7 days at a glance</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="bg-muted/50 rounded-lg px-3 py-2">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-sm font-semibold mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
