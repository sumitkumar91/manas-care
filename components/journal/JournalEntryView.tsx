"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decryptJournal } from "@/lib/encryption/journal-crypto";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import { CBT_PROMPTS, GRATITUDE_PROMPTS } from "@/lib/constants/cbt-prompts";

interface Props {
  entry: {
    id: string;
    entry_type: string;
    content_encrypted: string;
    content_iv: string;
    created_at: string;
    is_pinned: boolean;
  };
  userId: string;
}

export function JournalEntryView({ entry, userId }: Props) {
  const router = useRouter();
  const [content, setContent] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    decryptJournal(entry.content_encrypted, entry.content_iv, userId)
      .then(setContent)
      .catch(() => setContent("(Could not decrypt entry)"));
  }, [entry.content_encrypted, entry.content_iv, userId]);

  async function handleDelete() {
    if (!confirm("Delete this entry? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("journal_entries")
        .delete()
        .eq("id", entry.id);
      if (error) throw error;
      toast.success("Entry deleted");
      router.push("/journal");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to delete");
      setDeleting(false);
    }
  }

  async function handleTogglePin() {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("journal_entries")
        .update({ is_pinned: !entry.is_pinned })
        .eq("id", entry.id);
      if (error) throw error;
      router.refresh();
    } catch {
      toast.error("Failed to update pin");
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <p className="text-xs text-muted-foreground" suppressHydrationWarning>
        {format(new Date(entry.created_at), "MMMM d, yyyy 'at' h:mm a")}
      </p>

      {content === null ? (
        <p className="text-sm text-muted-foreground animate-pulse">Decrypting…</p>
      ) : (
        <EntryContent entryType={entry.entry_type} rawContent={content} />
      )}

      <div className="flex items-center gap-2 pt-2 border-t">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleTogglePin}
        >
          {entry.is_pinned ? "Unpin" : "Pin"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting…" : "Delete"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/journal")}
        >
          Back
        </Button>
      </div>
    </div>
  );
}

function EntryContent({ entryType, rawContent }: { entryType: string; rawContent: string }) {
  if (entryType === "free") {
    return (
      <div className="whitespace-pre-wrap text-sm leading-relaxed">{rawContent}</div>
    );
  }

  try {
    const parsed = JSON.parse(rawContent);

    if (entryType === "gratitude") {
      const { entries, reflection } = parsed as { entries: string[]; reflection: string };
      return (
        <div className="space-y-4">
          {GRATITUDE_PROMPTS.map((prompt, i) => (
            entries[i] && (
              <div key={i} className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{prompt}</p>
                <p className="text-sm">{entries[i]}</p>
              </div>
            )
          ))}
          {reflection && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Reflection</p>
              <p className="text-sm">{reflection}</p>
            </div>
          )}
        </div>
      );
    }

    if (entryType === "cbt") {
      const fields = parsed as Record<string, string>;
      const fieldLabels: Record<string, string> = {
        situation: "The Situation",
        automaticThought: "Automatic Thought",
        evidenceFor: "Evidence For",
        evidenceAgainst: "Evidence Against",
        balancedThought: "Balanced Thought",
      };
      return (
        <div className="space-y-4">
          {(Object.keys(CBT_PROMPTS) as (keyof typeof CBT_PROMPTS)[]).map((key) => (
            fields[key] && (
              <div key={key} className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {fieldLabels[key]}
                </p>
                <p className="text-sm">{fields[key]}</p>
              </div>
            )
          ))}
        </div>
      );
    }
  } catch {
    // Fall through to raw
  }

  return <div className="whitespace-pre-wrap text-sm leading-relaxed">{rawContent}</div>;
}
