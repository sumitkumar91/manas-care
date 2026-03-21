import { PageHeader } from "@/components/shared/PageHeader";
import { MeditateClient } from "@/components/meditate/MeditateClient";

export const metadata = { title: "Pranayama & Trataka — Manas Care" };

export default function MeditatePage() {
  return (
    <div>
      <PageHeader
        title="Pranayama & Trataka"
        description="Vedic breath control and visual focus training."
      />
      <div className="p-6 max-w-2xl">
        <MeditateClient />
      </div>
    </div>
  );
}
