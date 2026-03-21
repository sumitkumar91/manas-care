import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { VentEditor } from "@/components/vent/VentEditor";

export const metadata = { title: "Vent - Manas Care" };

export default async function VentPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div>
      <PageHeader
        title="Vent"
        description="Get it off your chest. No judgment, no pressure."
      />
      <div className="p-6">
        <VentEditor userId={user!.id} />
      </div>
    </div>
  );
}
