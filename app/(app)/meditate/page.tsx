import { PageHeader } from "@/components/shared/PageHeader";
import { MeditateClient } from "@/components/meditate/MeditateClient";

export const metadata = { title: "Pranayama - Manas Care" };

export default function MeditatePage() {
  return (
    <div>
      <PageHeader
        title="Pranayama"
        description="Vedic breath control exercises."
      />
      <div className="p-6 max-w-2xl">
        <MeditateClient />
      </div>
    </div>
  );
}
