"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { MOODS } from "@/lib/constants/moods";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

interface ExistingLog {
  id: string;
  mood_emoji: string;
  mood_label: string;
  score: number;
  notes: string | null;
}

interface MoodLogFormProps {
  userId: string;
  existingLog?: ExistingLog;
}

export function MoodLogForm({ userId, existingLog: initialLog }: MoodLogFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [existingLog, setExistingLog] = useState<ExistingLog | undefined>(initialLog);
  const [selectedMood, setSelectedMood] = useState<(typeof MOODS)[number] | null>(
    initialLog ? (MOODS.find((m) => m.emoji === initialLog.mood_emoji) ?? null) : null
  );
  const [score, setScore] = useState(initialLog?.score ?? 5);
  const [notes, setNotes] = useState(initialLog?.notes ?? "");
  const [saving, setSaving] = useState(false);

  // Fetch today's log client-side using local time (avoids UTC mismatch)
  useEffect(() => {
    if (initialLog) return; // already have it from server (fast path on same-timezone servers)
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString();

    supabase
      .from("mood_logs")
      .select("id, mood_emoji, mood_label, score, notes")
      .eq("user_id", userId)
      .gte("logged_at", start)
      .lt("logged_at", end)
      .order("logged_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setExistingLog(data);
          setSelectedMood(MOODS.find((m) => m.emoji === data.mood_emoji) ?? null);
          setScore(data.score);
          setNotes(data.notes ?? "");
        }
      });
  }, [userId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedMood) { toast.error("Pick a mood first"); return; }

    setSaving(true);

    const payload = {
      mood_emoji: selectedMood.emoji,
      mood_label: selectedMood.label,
      score,
      notes: notes.trim() || null,
    };

    let error;

    if (existingLog) {
      ({ error } = await supabase.from("mood_logs").update(payload).eq("id", existingLog.id));
    } else {
      ({ error } = await supabase.from("mood_logs").insert({ ...payload, user_id: userId }));
      if (!error) await updateStreak(userId);
    }

    if (error) {
      toast.error(error.message);
      setSaving(false);
    } else {
      trackEvent("mood_logged", { mood_label: selectedMood.label, score });
      toast.success(existingLog ? "Mood updated" : "Mood logged ✓");
      router.push("/checkin/history");
      router.refresh();
      setSaving(false);
    }
  }

  async function updateStreak(uid: string) {
    const today = new Date().toLocaleDateString("en-CA");
    const { data: streak } = await supabase.from("streaks").select("*").eq("user_id", uid).single();
    if (!streak) return;
    const last = streak.last_active_at;
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("en-CA");
    if (last === today) return;
    const newStreak = last === yesterday ? streak.current_streak + 1 : 1;
    await supabase.from("streaks").update({
      current_streak: newStreak,
      longest_streak: Math.max(newStreak, streak.longest_streak),
      last_active_at: today,
      updated_at: new Date().toISOString(),
    }).eq("user_id", uid);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-lg">
      <div className="space-y-3">
        <Label className="text-base font-medium">How are you feeling?</Label>
        <div className="grid grid-cols-5 gap-2">
          {MOODS.map((mood) => (
            <button
              key={mood.emoji}
              type="button"
              onClick={() => { setSelectedMood(mood); setScore(mood.score); }}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-xl border transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                selectedMood?.emoji === mood.emoji
                  ? "border-primary bg-primary/8 shadow-sm scale-105"
                  : "border-border hover:border-primary/30 hover:bg-muted/40"
              )}
            >
              <span className="text-2xl leading-none">{mood.emoji}</span>
              <span className="text-[10px] text-muted-foreground font-medium">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-base font-medium">
          What&apos;s on your mind? <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Textarea
          id="notes"
          placeholder="Just a quick note about your day…"
          rows={3}
          maxLength={500}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <p className="text-xs text-muted-foreground text-right">{notes.length}/500</p>
      </div>

      <Button type="submit" disabled={saving || !selectedMood} className="w-full sm:w-auto">
        {saving ? "Saving…" : existingLog ? "Update mood" : "Log mood"}
      </Button>
    </form>
  );
}
