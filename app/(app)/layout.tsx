import { createClient } from "@/lib/supabase/server";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { MobileNav } from "@/components/shared/MobileNav";
import { GuestBanner } from "@/components/shared/GuestBanner";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Anonymous users have is_anonymous: true in their metadata
  const isGuest = user?.is_anonymous === true;

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">
        {isGuest && <GuestBanner />}
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
