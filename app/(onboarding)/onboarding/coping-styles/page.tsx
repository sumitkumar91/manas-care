"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { COPING_STYLES } from "@/lib/constants/onboarding";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { SelectionGrid } from "@/components/onboarding/SelectionGrid";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "manascare_onboarding";
const PREV = "/onboarding/triggers";

export default function CopingStylesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (saved.coping) setSelected(saved.coping);
    } catch {}
  }, []);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function saveAndFinish(copingValues: string[]) {
    setSaving(true);
    setError(null);

    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      const supabase = createClient();

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const goals: string[] = Array.isArray(saved.goals) ? saved.goals : [];
      const triggers: string[] = Array.isArray(saved.triggers) ? saved.triggers : [];

      const { data: existing } = await supabase
        .from("onboarding_responses")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existing) {
        const { error: updateError } = await supabase
          .from("onboarding_responses")
          .update({ mental_health_goals: goals, known_triggers: triggers, preferred_coping: copingValues })
          .eq("user_id", user.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("onboarding_responses")
          .insert({ user_id: user.id, mental_health_goals: goals, known_triggers: triggers, preferred_coping: copingValues });
        if (insertError) throw insertError;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .update({ onboarding_done: true })
        .eq("id", user.id);
      if (profileError) throw profileError;

      localStorage.removeItem(STORAGE_KEY);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm p-6 space-y-6">
      <OnboardingProgress />
      <div>
        <h2 className="text-lg font-semibold">How do you prefer to cope?</h2>
        <p className="text-sm text-muted-foreground mt-1">
          ManaCare will suggest strategies that match your style.
        </p>
      </div>
      <SelectionGrid
        items={COPING_STYLES}
        selected={selected}
        onToggle={toggle}
        columns={2}
      />
      {error && <p className="text-destructive text-sm">{error}</p>}
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => router.push(PREV)} className="text-muted-foreground" disabled={saving}>
            ← Back
          </Button>
          <Button variant="ghost" onClick={() => saveAndFinish([])} className="text-muted-foreground" disabled={saving}>
            Skip
          </Button>
        </div>
        <Button onClick={() => saveAndFinish(selected)} disabled={saving || selected.length === 0}>
          {saving ? "Setting up…" : "Start my journey →"}
        </Button>
      </div>
    </div>
  );
}
