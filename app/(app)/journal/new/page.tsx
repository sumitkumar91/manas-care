import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { JournalTypeSelector } from "@/components/journal/JournalTypeSelector";

export const metadata = { title: "New Entry — Manas Care" };

export default async function NewJournalEntryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div>
      <PageHeader title="New Journal Entry" description="What's on your mind?" />
      <div className="p-6">
        <JournalTypeSelector userId={user!.id} />
      </div>
    </div>
  );
}
