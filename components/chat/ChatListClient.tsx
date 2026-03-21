"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface Session {
  id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

interface Props {
  userId: string;
  initialSessions: Session[];
}

export function ChatListClient({ userId, initialSessions }: Props) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);

  async function handleNewChat() {
    setCreating(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("chat_sessions")
        .insert({ user_id: userId, title: null })
        .select("id")
        .single();
      if (error) throw error;
      router.push(`/chat/${data.id}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to start chat");
      setCreating(false);
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleNewChat} disabled={creating} size="sm">
        {creating ? "Starting…" : "New conversation"}
      </Button>

      {initialSessions.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="text-sm text-muted-foreground">No conversations yet.</p>
          <p className="text-xs text-muted-foreground mt-1">
            Start a conversation with Manas AI — it's confidential and non-judgmental.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {initialSessions.map((s) => (
            <Link key={s.id} href={`/chat/${s.id}`}>
              <div className="rounded-lg border p-4 hover:bg-accent/40 transition-colors cursor-pointer">
                <p className="text-sm font-medium">{s.title ?? "Conversation"}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatDistanceToNow(new Date(s.updated_at), { addSuffix: true })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
