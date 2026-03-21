import { PageHeader } from "@/components/shared/PageHeader";
import { DinacharyaClient } from "@/components/dinacharya/DinacharyaClient";

export const metadata = { title: "Dinacharya - Manas Care" };

export default function DinacharyaPage() {
  return (
    <div>
      <PageHeader
        title="Dinacharya"
        description="Schedule your day with the Vedic circadian clock - work with your natural energy, not against it."
      />
      <div className="p-6 max-w-5xl">
        <DinacharyaClient />
      </div>
    </div>
  );
}
