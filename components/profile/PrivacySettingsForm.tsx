"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import type { Database } from "@/lib/supabase/types";

type PrivacySettings = Database["public"]["Tables"]["privacy_settings"]["Row"];

interface PrivacySettingsFormProps {
  settings: PrivacySettings;
}

export function PrivacySettingsForm({ settings }: PrivacySettingsFormProps) {
  const [allowAi, setAllowAi] = useState(settings.allow_ai_context);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  async function save() {
    setSaving(true);
    const { error } = await supabase
      .from("privacy_settings")
      .update({
        allow_ai_context: allowAi,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", settings.user_id);

    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Privacy settings saved");
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-sm">AI companion</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Control what Manas Care AI can see about you.
          </p>
        </div>
        <div className="flex items-start justify-between gap-4 p-4 border rounded-lg">
          <div className="space-y-1">
            <Label htmlFor="allow-ai" className="text-sm font-medium cursor-pointer">
              Allow AI to use my mood & journal context
            </Label>
            <p className="text-xs text-muted-foreground">
              When on, Manas Care AI uses your recent mood trends and journal titles (never content)
              to give more personalised responses. Turn off for a fully generic experience.
            </p>
          </div>
          <Switch
            id="allow-ai"
            checked={allowAi}
            onCheckedChange={setAllowAi}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="font-medium text-sm">Your data</h3>
        <p className="text-xs text-muted-foreground">
          Journal entries are encrypted on your device before being stored — we cannot read them.
          Mood logs and chat messages are stored securely and only accessible to you.
        </p>
      </div>

      <Button onClick={save} disabled={saving}>
        {saving ? "Saving…" : "Save settings"}
      </Button>
    </div>
  );
}
