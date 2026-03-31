"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoodLogForm } from "@/components/mood/MoodLogForm";
import { CheckInCard } from "@/components/dashboard/CheckInCard";

interface CheckInTabsProps {
  userId: string;
  todayLog?: { id: string; mood_emoji: string; mood_label: string; score: number; notes: string | null };
  completedTypes: string[];
}

export function CheckInTabs({ userId, todayLog, completedTypes }: CheckInTabsProps) {
  return (
    <Tabs defaultValue="mood">
      <TabsList className="w-full mb-6">
        <TabsTrigger value="mood" className="flex-1">Mood</TabsTrigger>
        <TabsTrigger value="checkin" className="flex-1">Daily Check-in</TabsTrigger>
      </TabsList>
      <TabsContent value="mood">
        <MoodLogForm userId={userId} existingLog={todayLog} />
      </TabsContent>
      <TabsContent value="checkin">
        <CheckInCard userId={userId} completedTypes={completedTypes} />
      </TabsContent>
    </Tabs>
  );
}
