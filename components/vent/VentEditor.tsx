"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { encryptJournal } from "@/lib/encryption/journal-crypto";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CrisisResourceBanner } from "@/components/chat/CrisisResourceBanner";
import { GunaRecommendations } from "@/components/mood/GunaRecommendations";
import type { Guna } from "@/lib/constants/gunas";
import { toast } from "sonner";

type Stage = "write" | "response" | "done";

interface Props {
  userId: string;
}

export function VentEditor({ userId }: Props) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [stage, setStage] = useState<Stage>("write");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [crisis, setCrisis] = useState(false);
  const [detectedGuna, setDetectedGuna] = useState<Guna | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!content.trim()) return;
    setLoading(true);

    // Fire AI empathy call
    try {
      const res = await fetch("/api/vent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        const data = await res.json();
        setAiResponse(data.message);
        setCrisis(data.crisis ?? false);
        setDetectedGuna(data.guna ?? null);
      }
    } catch {
      // AI response is optional — don't block on failure
    }

    setStage("response");
    setLoading(false);
  }

  async function handleSaveToJournal() {
    setLoading(true);
    try {
      const supabase = createClient();
      const { ciphertext, iv } = await encryptJournal(content, userId);
      const title = `Vent — ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
      const { error } = await supabase.from("journal_entries").insert({
        user_id: userId,
        entry_type: "vent",
        title,
        content_encrypted: ciphertext,
        content_iv: iv,
      });
      if (error) throw error;
      toast.success("Saved to journal");
      router.push("/journal");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save");
      setLoading(false);
    }
  }

  async function handleRelease() {
    setStage("done");
  }

  if (stage === "done") {
    return (
      <div className="max-w-2xl text-center space-y-4 py-12">
        <p className="text-4xl">🌬️</p>
        <p className="font-semibold text-lg">Released.</p>
        <p className="text-sm text-muted-foreground">
          That took courage. You can always come back when you need to vent again.
        </p>
        <Button variant="ghost" onClick={() => router.push("/dashboard")}>
          Back to dashboard
        </Button>
      </div>
    );
  }

  if (stage === "response") {
    return (
      <div className="max-w-2xl space-y-6">
        {crisis && <CrisisResourceBanner />}

        {aiResponse && (
          <div className="rounded-xl border bg-accent/30 p-5 space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Manas Care heard you
            </p>
            <p className="text-sm leading-relaxed">{aiResponse}</p>
          </div>
        )}

        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-xs text-muted-foreground mb-2">Your vent</p>
          <p className="text-sm whitespace-pre-wrap text-muted-foreground leading-relaxed line-clamp-4">
            {content}
          </p>
        </div>

        {detectedGuna && (
          <GunaRecommendations guna={detectedGuna} onDismiss={() => setDetectedGuna(null)} />
        )}

        <div className="space-y-2">
          <p className="text-sm font-medium">What do you want to do with this?</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleSaveToJournal}
              disabled={loading}
            >
              Save to journal
            </Button>
            <Button
              className="flex-1"
              onClick={handleRelease}
              disabled={loading}
            >
              Release it 🔥
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            "Release it" deletes your vent permanently — nothing is stored.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-4">
      <div className="rounded-lg border bg-accent/20 p-3 text-sm text-muted-foreground">
        This is your space. No structure, no prompts — just get it out.
        You can choose to save it or release it when you&apos;re done.
      </div>
      <Textarea
        placeholder="What's weighing on you right now…"
        rows={14}
        className="resize-none text-base"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoFocus
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{content.length} characters</span>
        <Button onClick={handleSubmit} disabled={loading || !content.trim()}>
          {loading ? "Sending…" : "I'm done venting"}
        </Button>
      </div>
    </div>
  );
}
