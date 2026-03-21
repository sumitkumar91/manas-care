interface MoodLog {
  logged_at: string;
  score: number;
  mood_label: string;
}

interface EmotionInsightCardProps {
  logs: MoodLog[];
}

export function EmotionInsightCard({ logs }: EmotionInsightCardProps) {
  if (logs.length < 3) return null;

  const insights: string[] = [];

  // Average score
  const avg = logs.reduce((s, l) => s + l.score, 0) / logs.length;
  insights.push(`Your average mood score over this period is **${avg.toFixed(1)}/10**.`);

  // Day of week pattern
  const byDay: Record<number, number[]> = {};
  logs.forEach((l) => {
    const day = new Date(l.logged_at).getDay();
    if (!byDay[day]) byDay[day] = [];
    byDay[day].push(l.score);
  });

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let bestDay = -1, worstDay = -1, bestAvg = 0, worstAvg = 11;

  Object.entries(byDay).forEach(([day, scores]) => {
    if (scores.length < 2) return;
    const dayAvg = scores.reduce((a, b) => a + b, 0) / scores.length;
    if (dayAvg > bestAvg) { bestAvg = dayAvg; bestDay = Number(day); }
    if (dayAvg < worstAvg) { worstAvg = dayAvg; worstDay = Number(day); }
  });

  if (bestDay >= 0 && bestDay !== worstDay) {
    insights.push(`You tend to feel best on **${dayNames[bestDay]}s** and lowest on **${dayNames[worstDay]}s**.`);
  }

  // Trend (last 3 vs first 3)
  if (logs.length >= 6) {
    const sorted = [...logs].sort((a, b) => a.logged_at.localeCompare(b.logged_at));
    const firstAvg = sorted.slice(0, 3).reduce((s, l) => s + l.score, 0) / 3;
    const lastAvg = sorted.slice(-3).reduce((s, l) => s + l.score, 0) / 3;
    const diff = lastAvg - firstAvg;
    if (Math.abs(diff) >= 1) {
      insights.push(
        diff > 0
          ? `Your mood has been **improving** lately - up ${diff.toFixed(1)} points recently.`
          : `Your mood has been **dipping** lately - down ${Math.abs(diff).toFixed(1)} points recently.`
      );
    }
  }

  return (
    <div className="rounded-xl border bg-accent/30 p-4 space-y-2">
      <p className="text-sm font-semibold text-foreground">✨ Insights</p>
      <ul className="space-y-1.5">
        {insights.map((insight, i) => (
          <li key={i} className="text-sm text-foreground/80">
            {insight.split("**").map((part, j) =>
              j % 2 === 1 ? <strong key={j}>{part}</strong> : part
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
