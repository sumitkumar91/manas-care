import { createClient } from "@/lib/supabase/server";
import { ChatSession } from "@/components/chat/ChatSession";
import { PageHeader } from "@/components/shared/PageHeader";
import { buttonVariants } from "@/lib/button-variants";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ sessionId: string }>;
}

export const metadata = { title: "Manas Care AI — Manas Care" };

export default async function ChatSessionPage({ params }: Props) {
  const { sessionId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: session } = await supabase
    .from("chat_sessions")
    .select("id, title")
    .eq("id", sessionId)
    .eq("user_id", user!.id)
    .single();

  if (!session) notFound();

  const { data: messages } = await supabase
    .from("chat_messages")
    .select("id, role, content, flagged")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <PageHeader
        title={session.title ?? "Conversation"}
        action={
          <Link href="/chat" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            All chats
          </Link>
        }
      />
      <div className="flex-1 overflow-hidden">
        <ChatSession
          sessionId={sessionId}
          initialMessages={(messages ?? []).map((m) => ({
            id: m.id,
            role: m.role,
            content: m.content,
            flagged: m.flagged,
          }))}
        />
      </div>
    </div>
  );
}
