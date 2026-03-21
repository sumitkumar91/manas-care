import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { JournalEntryView } from "@/components/journal/JournalEntryView";
import { buttonVariants } from "@/lib/button-variants";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata = { title: "Journal Entry — Manas" };

export default async function JournalEntryPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: entry } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("id", id)
    .eq("user_id", user!.id)
    .single();

  if (!entry) notFound();

  return (
    <div>
      <PageHeader
        title={entry.title ?? "Untitled"}
        action={
          entry.entry_type === "free" ? (
            <Link
              href={`/journal/${id}/edit`}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Edit
            </Link>
          ) : undefined
        }
      />
      <div className="p-6">
        <JournalEntryView
          entry={{
            id: entry.id,
            entry_type: entry.entry_type,
            content_encrypted: entry.content_encrypted,
            content_iv: entry.content_iv,
            created_at: entry.created_at,
            is_pinned: entry.is_pinned,
          }}
          userId={user!.id}
        />
      </div>
    </div>
  );
}
