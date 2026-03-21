"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";

interface MoodEntry {
  logged_at: string;
  score: number;
  mood_emoji: string;
  mood_label: string;
  notes: string | null;
}

interface MoodTrendChartProps {
  logs: MoodEntry[];
}

type Range = "7d" | "30d";

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { payload: MoodEntry }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-card border rounded-lg shadow-md p-3 text-sm max-w-[180px]">
      <p className="font-medium">
        {d.mood_emoji} {d.mood_label} - {d.score}/10
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">
        {format(parseISO(d.logged_at), "EEE, MMM d")}
      </p>
      {d.notes && (
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{d.notes}</p>
      )}
    </div>
  );
}

export function MoodTrendChart({ logs }: MoodTrendChartProps) {
  const [range, setRange] = useState<Range>("7d");

  const days = range === "7d" ? 7 : 30;
  const cutoff = new Date(Date.now() - days * 86400000).toISOString();
  const filtered = logs
    .filter((l) => l.logged_at >= cutoff)
    .sort((a, b) => a.logged_at.localeCompare(b.logged_at));

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground text-sm gap-2">
        <span className="text-3xl">📊</span>
        <p>No mood logs in the last {days} days.</p>
      </div>
    );
  }

  const data = filtered.map((l) => ({
    ...l,
    date: format(parseISO(l.logged_at), "MMM d"),
  }));

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["7d", "30d"] as Range[]).map((r) => (
          <Button
            key={r}
            size="sm"
            variant={range === r ? "default" : "outline"}
            onClick={() => setRange(r)}
          >
            {r === "7d" ? "7 days" : "30 days"}
          </Button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(264 55% 55%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(264 55% 55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "hsl(0 0% 45%)" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[1, 10]}
            ticks={[1, 3, 5, 7, 10]}
            tick={{ fontSize: 11, fill: "hsl(0 0% 45%)" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="score"
            stroke="hsl(264 55% 55%)"
            strokeWidth={2.5}
            fill="url(#moodGradient)"
            dot={{ r: 4, fill: "hsl(264 55% 55%)", strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
