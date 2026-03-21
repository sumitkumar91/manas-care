"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { encryptJournal } from "@/lib/encryption/journal-crypto";
import { GRATITUDE_PROMPTS } from "@/lib/constants/cbt-prompts";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function GratitudeForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [entries, setEntries] = useState(["", "", ""]);
  const [reflection, setReflection] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    const hasContent = entries.some((e) => e.trim()) || reflection.trim();
    if (!hasContent) { toast.error("Add at least one thing you're grateful for"); return; }
    setSaving(true);
    try {
      const supabase = createClient();
      const content = JSON.stringify({ entries, reflection });
      const { ciphertext, iv } = await encryptJournal(content, userId);
      const title = `Gratitude — ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

      const { error } = await supabase.from("journal_entries").insert({
        user_id: userId, entry_type: "gratitude", title, content_encrypted: ciphertext, content_iv: iv,
      });
      if (error) throw error;

      toast.success("Gratitude entry saved");
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
        Practicing gratitude daily has been shown to improve mood and reduce anxiety over time.
      </div>
      {GRATITUDE_PROMPTS.map((prompt, i) => (
        <div key={i} className="space-y-1.5">
          <Label htmlFor={`g-${i}`}>{prompt}</Label>
          <Textarea
            id={`g-${i}`}
            rows={2}
            className="resize-none"
            value={entries[i]}
            onChange={(e) => setEntries((prev) => prev.map((v, j) => j === i ? e.target.value : v))}
          />
        </div>
      ))}
      <div className="space-y-1.5">
        <Label htmlFor="reflection">Reflection <span className="text-muted-foreground">(optional)</span></Label>
        <Textarea id="reflection" rows={3} className="resize-none" value={reflection} onChange={(e) => setReflection(e.target.value)} />
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={saving}>{saving ? "Saving…" : "Save entry"}</Button>
        <Button variant="ghost" onClick={() => router.push("/journal")} disabled={saving}>Cancel</Button>
      </div>
    </div>
  );
}
