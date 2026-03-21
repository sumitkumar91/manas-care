import { PageHeader } from "@/components/shared/PageHeader";
import { TratakaPractice } from "@/components/meditate/TratakaPractice";

export const metadata = { title: "Trataka - Manas Care" };

export default function TratakaPage() {
  return (
    <div>
      <PageHeader
        title="Trataka"
        description="Ancient yogic candle-gazing for concentration and inner stillness."
      />
      <div className="p-6 max-w-4xl">
        <TratakaPractice />
      </div>
    </div>
  );
}
