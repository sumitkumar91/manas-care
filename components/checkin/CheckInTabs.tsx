"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoodLogForm } from "@/components/mood/MoodLogForm";
import { CheckInCard } from "@/components/dashboard/CheckInCard";

export function CheckInTabs({ userId }: { userId: string }) {
  return (
    <Tabs defaultValue="mood">
      <TabsList className="w-full mb-6">
        <TabsTrigger value="mood" className="flex-1">Mood</TabsTrigger>
        <TabsTrigger value="checkin" className="flex-1">Daily Check-in</TabsTrigger>
      </TabsList>
      <TabsContent value="mood">
        <MoodLogForm userId={userId} />
      </TabsContent>
      <TabsContent value="checkin">
        <CheckInCard userId={userId} />
      </TabsContent>
    </Tabs>
  );
}
