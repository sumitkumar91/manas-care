import { PageHeader } from "@/components/shared/PageHeader";
import { MeditateClient } from "@/components/meditate/MeditateClient";

export const metadata = { title: "Meditate — Manas Care" };

export default function MeditatePage() {
  return (
    <div>
      <PageHeader
        title="Meditate"
        description="Breathing, stillness, and music for your mind."
      />
      <div className="p-6 max-w-2xl">
        <MeditateClient />
      </div>
    </div>
  );
}
