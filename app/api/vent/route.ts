import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getGeminiClient, getGeminiModel } from "@/lib/gemini/client";

export const runtime = "nodejs";

const VENT_SYSTEM_PROMPT = `You are a compassionate listener. The user has just vented their feelings to you.
Your job is to make them feel heard and validated - nothing more.

Rules:
- Acknowledge their feelings with warmth and empathy
- Do NOT give advice, suggestions, or solutions unless explicitly asked
- Do NOT minimize or reframe their feelings
- Do NOT ask follow-up questions
- Keep your response to 2-4 sentences
- Be human, warm, and genuine - not clinical

If the user expresses suicidal ideation or intent to self-harm, add [CRISIS_DETECTED] at the very end of your response.`;

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json() as { content: string };
    if (!content?.trim()) {
      return NextResponse.json({ error: "No content" }, { status: 400 });
    }

    const gemini = getGeminiClient();
    const model = gemini.getGenerativeModel({
      model: getGeminiModel(),
      systemInstruction: VENT_SYSTEM_PROMPT,
    });

    const result = await model.generateContent(content);
    const responseText = result.response.text();

    const isCrisis = responseText.includes("[CRISIS_DETECTED]");
    const clean = responseText.replace("[CRISIS_DETECTED]", "").trim();

    return NextResponse.json({ message: clean, crisis: isCrisis });
  } catch (e) {
    console.error("[vent/route]", e);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
