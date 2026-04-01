import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { buttonVariants } from "@/lib/button-variants";
import Link from "next/link";
import { CheckInTabs } from "@/components/checkin/CheckInTabs";

export const metadata = { title: "Check-in - Manas Care" };

export default async function CheckInPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  return (
    <div>
      <PageHeader
        title="Daily Check-in"
        description="Track how you feel and how your day is going."
        action={
          <Link href="/checkin/history" className={buttonVariants({ variant: "outline", size: "sm" })}>
            History
          </Link>
        }
      />
      <div className="p-6 max-w-2xl">
        <CheckInTabs userId={user.id} />
      </div>
    </div>
  );
}
