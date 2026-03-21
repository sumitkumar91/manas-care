import { createClient } from "@/lib/supabase/server";
import { getGeminiClient, getGeminiModel } from "@/lib/gemini/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { feeling } = await request.json();
  if (!feeling?.trim()) return NextResponse.json({ error: "Feeling is required" }, { status: 400 });

  const client = getGeminiClient();
  const model = client.getGenerativeModel({ model: getGeminiModel() });

  const prompt = `You are an expert in Indian classical music and its therapeutic effects (Raga Chikitsa).

A user describes their current emotional state: "${feeling}"

Based on this, recommend exactly ONE raga from Indian classical music that would be most therapeutic for them right now.

Respond with ONLY valid JSON in this exact format:
{
  "raga": "Raag Yaman",
  "time": "Evening",
  "mood": "Uplifting and expansive",
  "reason": "One sentence explaining why this raga suits their state",
  "benefit": "One specific therapeutic benefit",
  "searchQuery": "Raag Yaman sitar meditation peaceful"
}

Only recommend ragas from Indian classical tradition. The searchQuery should help find a good YouTube video.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const json = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const data = JSON.parse(json);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to get recommendation" }, { status: 500 });
  }
}
