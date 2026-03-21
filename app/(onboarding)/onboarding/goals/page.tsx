"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MENTAL_HEALTH_GOALS } from "@/lib/constants/onboarding";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { SelectionGrid } from "@/components/onboarding/SelectionGrid";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "manascare_onboarding";
const NEXT = "/onboarding/triggers";

export default function GoalsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (saved.goals) setSelected(saved.goals);
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, goals: values }));
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
        <h2 className="text-lg font-semibold">What brings you here?</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select everything that resonates. You can always update this later.
        </p>
      </div>
      <SelectionGrid
        items={MENTAL_HEALTH_GOALS}
        selected={selected}
        onToggle={toggle}
        columns={2}
      />
      <div className="flex justify-between items-center pt-2">
        <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
          Skip for now
        </Button>
        <Button onClick={handleContinue} disabled={selected.length === 0}>
          Continue →
        </Button>
      </div>
    </div>
  );
}
