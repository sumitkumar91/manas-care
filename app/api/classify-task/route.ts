import { createClient } from "@/lib/supabase/server";
import { generateWithFallback } from "@/lib/gemini/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { task } = await request.json();
  if (!task?.trim()) return NextResponse.json({ error: "Task is required" }, { status: 400 });

  const prompt = `You are scheduling a task using the Vedic Dinacharya system. Pick the single most appropriate time window for this task.

- "vata-dawn"      — Vata (2 AM - 6 AM): stillness and intuition. Meditation, journaling, prayer, spiritual practice, silent reading.
- "kapha-morning"  — Kapha (6 AM - 10 AM): grounded steady energy. Exercise, gym, yoga, physical chores, cooking breakfast, errands, commute.
- "pitta-midday"   — Pitta (10 AM - 2 PM): peak mental sharpness. Deep work, studying, analysis, planning, coding, decisions, problem solving.
- "vata-afternoon" — Vata (2 PM - 6 PM): peak creativity and communication. Brainstorming, meetings, calls, design, creative writing, collaboration.
- "kapha-evening"  — Kapha (6 PM - 10 PM): winding down. Dinner, family time, light socialising, gentle walks, leisure, hobbies.
- "pitta-night"    — Pitta (10 PM - 2 AM): rest and restoration. Sleep, body recovery, wind-down routine, light reading before bed.

Task: "${task}"

Reply with ONLY the zone ID: vata-dawn, kapha-morning, pitta-midday, vata-afternoon, kapha-evening, or pitta-night.`;

  const VALID = ["vata-dawn", "kapha-morning", "pitta-midday", "vata-afternoon", "kapha-evening", "pitta-night"];

  try {
    const raw = await generateWithFallback(prompt);
    const zoneId = raw.trim().toLowerCase().replace(/\s/g, "");
    console.log("[classify-task] raw:", raw.trim(), "| parsed:", zoneId, "| valid:", VALID.includes(zoneId));
    return NextResponse.json({ zoneId: VALID.includes(zoneId) ? zoneId : "pitta-midday" });
  } catch (e) {
    console.error("[classify-task] error:", e);
    return NextResponse.json({ zoneId: "pitta-midday" });
  }
}
