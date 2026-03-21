import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { ChatListClient } from "@/components/chat/ChatListClient";

export const metadata = { title: "Chat - Manas Care" };

export default async function ChatPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: sessions } = await supabase
    .from("chat_sessions")
    .select("id, title, created_at, updated_at")
    .eq("user_id", user!.id)
    .order("updated_at", { ascending: false })
    .limit(30);

  return (
    <div>
      <PageHeader
        title="Manas Care AI"
        description="A safe, non-judgmental space to talk."
      />
      <div className="p-6 max-w-2xl">
        <ChatListClient userId={user!.id} initialSessions={sessions ?? []} />
      </div>
    </div>
  );
}
