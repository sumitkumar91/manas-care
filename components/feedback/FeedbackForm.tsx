"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function FeedbackForm({ userId }: { userId: string }) {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit() {
    if (!message.trim()) return;
    setSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("feedback")
      .insert({ user_id: userId, message: message.trim() });

    if (error) {
      toast.error("Failed to send feedback. Try again.");
    } else {
      setDone(true);
    }
    setSubmitting(false);
  }

  if (done) {
    return (
      <div className="text-center space-y-3 py-10">
        <p className="text-3xl">🙏</p>
        <p className="font-semibold">Thank you!</p>
        <p className="text-sm text-muted-foreground">Your feedback means a lot and helps us improve.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="What's working well? What could be better? Any features you'd love to see?"
        rows={8}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={2000}
        className="resize-none"
        autoFocus
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{message.length}/2000</span>
        <Button onClick={handleSubmit} disabled={submitting || !message.trim()}>
          {submitting ? "Sending…" : "Send feedback"}
        </Button>
      </div>
    </div>
  );
}
