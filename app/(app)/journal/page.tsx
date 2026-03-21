import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { buttonVariants } from "@/lib/button-variants";
import { JournalEntryCard } from "@/components/journal/JournalEntryCard";
import Link from "next/link";

export const metadata = { title: "Journal — ManaCare" };

export default async function JournalPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: entries } = await supabase
    .from("journal_entries")
    .select("id, entry_type, title, created_at, updated_at, is_pinned")
    .eq("user_id", user!.id)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div>
      <PageHeader
        title="Journal"
        description="Your private, encrypted space to reflect."
        action={
          <Link href="/journal/new" className={buttonVariants({ size: "sm" })}>
            New entry
          </Link>
        }
      />
      <div className="p-6 space-y-3 max-w-2xl">
        {!entries?.length ? (
          <div className="rounded-lg border border-dashed p-10 text-center">
            <p className="text-sm text-muted-foreground">No entries yet.</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your journal is encrypted — only you can read it.
            </p>
            <Link
              href="/journal/new"
              className={buttonVariants({ size: "sm", className: "mt-4" })}
            >
              Write your first entry
            </Link>
          </div>
        ) : (
          entries.map((entry) => (
            <JournalEntryCard key={entry.id} entry={entry} />
          ))
        )}
      </div>
    </div>
  );
}
