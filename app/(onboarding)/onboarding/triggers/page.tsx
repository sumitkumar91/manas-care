"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { KNOWN_TRIGGERS } from "@/lib/constants/onboarding";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { SelectionGrid } from "@/components/onboarding/SelectionGrid";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "manas_onboarding";
const NEXT = "/onboarding/coping-styles";
const PREV = "/onboarding/goals";

export default function TriggersPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (saved.triggers) setSelected(saved.triggers);
    } catch {}
  }, []);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function persist(values: string[]) {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, triggers: values }));
    } catch {}
  }

  function handleContinue() {
    persist(selected);
    router.push(NEXT);
  }

  function handleSkip() {
    persist([]);
    router.push(NEXT);
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm p-6 space-y-6">
      <OnboardingProgress />
      <div>
        <h2 className="text-lg font-semibold">What tends to affect your mood?</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Knowing your stressors helps Manas personalize your experience.
        </p>
      </div>
      <SelectionGrid
        items={KNOWN_TRIGGERS}
        selected={selected}
        onToggle={toggle}
        columns={2}
      />
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => router.push(PREV)} className="text-muted-foreground">
            ← Back
          </Button>
          <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
            Skip
          </Button>
        </div>
        <Button onClick={handleContinue} disabled={selected.length === 0}>
          Continue →
        </Button>
      </div>
    </div>
  );
}
