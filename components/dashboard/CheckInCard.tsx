"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface CheckInCardProps {
  userId: string;
  completedTypes: string[];
}

const ENERGY_LABELS = ["", "Very Low", "Low", "Okay", "Good", "Great"];
const STRESS_LABELS = ["", "Very Low", "Low", "Moderate", "High", "Very High"];

export function CheckInCard({ userId, completedTypes }: CheckInCardProps) {
  const [type, setType] = useState<"morning" | "evening" | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sleepHours, setSleepHours] = useState<number | "">("");
  const [energy, setEnergy] = useState(0);
  const [stress, setStress] = useState(0);

  useEffect(() => {
    const hour = new Date().getHours();
    const t = hour >= 17 ? "evening" : "morning";
    setType(t);
    setDone(completedTypes.includes(t));
  }, [completedTypes]);

  if (!type) return null;

  const isMorning = type === "morning";

  async function handleSubmit() {
    if (isMorning && !sleepHours) return toast.error("Enter sleep hours");
    if (!energy) return toast.error("Select energy level");
    if (!stress) return toast.error("Select stress level");

    setSubmitting(true);
    const supabase = createClient();
    const today = new Date().toLocaleDateString("en-CA");

    const { error } = await (supabase as any).from("daily_checkins").upsert({
      user_id: userId,
      date: today,
      type,
      sleep_hours: isMorning ? sleepHours : null,
      energy,
      stress,
    }, { onConflict: "user_id,date,type" });

    if (error) {
      toast.error("Failed to save check-in.");
    } else {
      setDone(true);
    }
    setSubmitting(false);
  }

  if (done) {
    return (
      <Card>
        <CardContent className="pt-5 pb-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-muted">
            {isMorning ? "🌅" : "🌙"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold leading-none">{isMorning ? "Morning" : "Evening"} check-in done</p>
            <p className="text-xs text-muted-foreground mt-1">See you {isMorning ? "tonight" : "tomorrow"}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-5 pb-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-muted">
            {isMorning ? "🌅" : "🌙"}
          </div>
          <div>
            <p className="font-semibold leading-none">{isMorning ? "Morning" : "Evening"} check-in</p>
            <p className="text-xs text-muted-foreground mt-1">
              {isMorning ? "How did you sleep? How are you starting the day?" : "How did the day go?"}
            </p>
          </div>
        </div>

        {isMorning && (
          <div className="space-y-1">
            <p className="text-sm font-medium">Sleep hours</p>
            <div className="flex gap-2 flex-wrap">
              {[4, 5, 6, 7, 8, 9].map((h) => (
                <button
                  key={h}
                  onClick={() => setSleepHours(h)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                    sleepHours === h
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {h}h
                </button>
              ))}
              <button
                onClick={() => setSleepHours(sleepHours === 3 ? "" : 3)}
                className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                  sleepHours === 3
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:bg-muted"
                }`}
              >
                &lt;4h
              </button>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <p className="text-sm font-medium">Energy {energy > 0 && <span className="text-muted-foreground font-normal">- {ENERGY_LABELS[energy]}</span>}</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                onClick={() => setEnergy(v)}
                className={`flex-1 py-2 rounded-lg text-sm border transition-colors ${
                  energy === v
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:bg-muted"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Stress {stress > 0 && <span className="text-muted-foreground font-normal">- {STRESS_LABELS[stress]}</span>}</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                onClick={() => setStress(v)}
                className={`flex-1 py-2 rounded-lg text-sm border transition-colors ${
                  stress === v
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:bg-muted"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={submitting} className="w-full">
          {submitting ? "Saving..." : "Submit check-in"}
        </Button>
      </CardContent>
    </Card>
  );
}
