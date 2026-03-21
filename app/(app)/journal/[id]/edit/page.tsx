import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { JournalEditLoader } from "@/components/journal/JournalEditLoader";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata = { title: "Edit Entry — Manas Care" };

export default async function JournalEditPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: entry } = await supabase
    .from("journal_entries")
    .select("id, entry_type, title, content_encrypted, content_iv")
    .eq("id", id)
    .eq("user_id", user!.id)
    .single();

  if (!entry) notFound();
  if (entry.entry_type !== "free") redirect(`/journal/${id}`);

  return (
    <div>
      <PageHeader title="Edit Entry" />
      <div className="p-6">
        <JournalEditLoader
          entryId={entry.id}
          title={entry.title}
          contentEncrypted={entry.content_encrypted}
          contentIv={entry.content_iv}
          userId={user!.id}
        />
      </div>
    </div>
  );
}
