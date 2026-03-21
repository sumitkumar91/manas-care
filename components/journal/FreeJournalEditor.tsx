"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { encryptJournal } from "@/lib/encryption/journal-crypto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

interface FreeJournalEditorProps {
  userId: string;
  existing?: { id: string; title: string | null; content: string };
}

export function FreeJournalEditor({ userId, existing }: FreeJournalEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(existing?.title ?? "");
  const [content, setContent] = useState(existing?.content ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!content.trim()) { toast.error("Write something first"); return; }
    setSaving(true);
    try {
      const supabase = createClient();
      const { ciphertext, iv } = await encryptJournal(content, userId);

      if (existing) {
        const { error } = await supabase
          .from("journal_entries")
          .update({ title: title || null, content_encrypted: ciphertext, content_iv: iv, updated_at: new Date().toISOString() })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("journal_entries")
          .insert({ user_id: userId, entry_type: "free", title: title || null, content_encrypted: ciphertext, content_iv: iv });
        if (error) throw error;
      }

      trackEvent("journal_saved", { entry_type: "free", is_edit: !!existing });
      toast.success("Entry saved");
      router.push("/journal");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="space-y-1.5">
        <Label htmlFor="title">Title <span className="text-muted-foreground">(optional)</span></Label>
        <Input id="title" placeholder="Give your entry a title…" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="content">Your thoughts</Label>
        <Textarea
          id="content"
          placeholder="Write freely - this is encrypted and only you can read it…"
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="resize-none"
        />
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={saving}>{saving ? "Saving…" : "Save entry"}</Button>
        <Button variant="ghost" onClick={() => router.push("/journal")} disabled={saving}>Cancel</Button>
      </div>
    </div>
  );
}
