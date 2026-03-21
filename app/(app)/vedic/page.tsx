import { PageHeader } from "@/components/shared/PageHeader";
import { VedicHub } from "@/components/vedic/VedicHub";

export const metadata = { title: "Vedic Practices - Manas Care" };

export default function VedicPage() {
  return (
    <div>
      <PageHeader
        title="Vedic Practices"
        description="Ancient Indian wisdom adapted for modern mental wellness."
      />
      <div className="p-6 max-w-4xl">
        <VedicHub />
      </div>
    </div>
  );
}
