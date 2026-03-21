import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { PrivacySettingsForm } from "@/components/profile/PrivacySettingsForm";

export const metadata = { title: "Settings — Manas" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: settings } = await supabase
    .from("privacy_settings")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!settings) redirect("/profile");

  return (
    <div>
      <PageHeader title="Settings" description="Privacy and account preferences." />
      <div className="p-6">
        <PrivacySettingsForm settings={settings} />
      </div>
    </div>
  );
}
