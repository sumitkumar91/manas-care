import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { buttonVariants } from "@/lib/button-variants";
import Link from "next/link";

export const metadata = { title: "Profile — Manas" };

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");

  return (
    <div>
      <PageHeader
        title="Profile"
        description="Manage your account details."
        action={
          <Link href="/profile/settings" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Settings
          </Link>
        }
      />
      <div className="p-6">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
