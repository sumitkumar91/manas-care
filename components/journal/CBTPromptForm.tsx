"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { encryptJournal } from "@/lib/encryption/journal-crypto";
import { CBT_PROMPTS } from "@/lib/constants/cbt-prompts";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface CBTPromptFormProps {
  userId: string;
}

type CBTFields = Record<keyof typeof CBT_PROMPTS, string>;

export function CBTPromptForm({ userId }: CBTPromptFormProps) {
  const router = useRouter();
  const [fields, setFields] = useState<CBTFields>({
    situation: "", automaticThought: "", evidenceFor: "", evidenceAgainst: "", balancedThought: "",
  });
  const [saving, setSaving] = useState(false);

  const fieldLabels: Record<keyof typeof CBT_PROMPTS, string> = {
    situation: "The Situation",
    automaticThought: "Automatic Thought",
    evidenceFor: "Evidence For",
    evidenceAgainst: "Evidence Against",
    balancedThought: "Balanced Thought",
  };

  async function handleSave() {
    const hasContent = Object.values(fields).some((v) => v.trim());
    if (!hasContent) { toast.error("Fill in at least one field"); return; }
    setSaving(true);
    try {
      const supabase = createClient();
      const content = JSON.stringify(fields);
      const { ciphertext, iv } = await encryptJournal(content, userId);
      const title = fields.situation.slice(0, 60) || "CBT Exercise";

      const { error } = await supabase.from("journal_entries").insert({
        user_id: userId, entry_type: "cbt", title, content_encrypted: ciphertext, content_iv: iv,
      });
      if (error) throw error;

      toast.success("CBT exercise saved");
      router.push("/journal");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="rounded-lg border bg-accent/20 p-3 text-sm text-muted-foreground">
        CBT (Cognitive Behavioral Therapy) helps you identify and reframe unhelpful thinking patterns.
        Fill in as much or as little as feels right.
      </div>
      {(Object.keys(CBT_PROMPTS) as (keyof typeof CBT_PROMPTS)[]).map((key, i) => (
        <div key={key} className="space-y-1.5">
          <Label htmlFor={key} className="font-medium">
            <span className="text-primary mr-1.5">{i + 1}.</span>{fieldLabels[key]}
          </Label>
          <p className="text-xs text-muted-foreground -mt-0.5">{CBT_PROMPTS[key]}</p>
          <Textarea
            id={key}
            rows={3}
            className="resize-none"
            value={fields[key]}
            onChange={(e) => setFields((prev) => ({ ...prev, [key]: e.target.value }))}
          />
        </div>
      ))}
      <div className="flex items-center gap-3 pt-2">
        <Button onClick={handleSave} disabled={saving}>{saving ? "Saving…" : "Save exercise"}</Button>
        <Button variant="ghost" onClick={() => router.push("/journal")} disabled={saving}>Cancel</Button>
      </div>
    </div>
  );
}
