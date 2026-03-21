import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";

export const metadata = { title: "Feedback - Manas Care" };

export default async function FeedbackPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  return (
    <div>
      <PageHeader
        title="Share Feedback"
        description="Help us make Manas Care better for you."
      />
      <div className="p-6 max-w-lg">
        <FeedbackForm userId={user.id} />
      </div>
    </div>
  );
}
