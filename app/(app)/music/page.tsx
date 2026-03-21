import { PageHeader } from "@/components/shared/PageHeader";
import { MusicTherapyClient } from "@/components/music/MusicTherapyClient";

export const metadata = { title: "Music Therapy - Manas Care" };

export default function MusicPage() {
  return (
    <div>
      <PageHeader
        title="Music Therapy"
        description="Raga Chikitsa - Indian classical music prescribed for your mind and moment."
      />
      <div className="p-6 max-w-5xl">
        <MusicTherapyClient />
      </div>
    </div>
  );
}
