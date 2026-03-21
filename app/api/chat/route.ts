import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getGeminiClient, getGeminiModel } from "@/lib/gemini/client";
import { buildSystemPrompt } from "@/lib/gemini/system-prompt";
import { buildUserContext } from "@/lib/gemini/context-builder";

export const runtime = "nodejs";

// Simple in-memory rate limiter: 100 messages per user per day
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const entry = rateLimitMap.get(userId);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + dayMs });
    return true;
  }
  if (entry.count >= 100) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!checkRateLimit(user.id)) {
      return NextResponse.json(
        { error: "Daily message limit reached (100 messages/day)" },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { message, sessionId } = body as { message: string; sessionId: string };

    if (!message?.trim() || !sessionId) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Verify the session belongs to this user
    const { data: session } = await supabase
      .from("chat_sessions")
      .select("id")
      .eq("id", sessionId)
      .eq("user_id", user.id)
      .single();

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Fetch last 20 messages for context
    const { data: history } = await supabase
      .from("chat_messages")
      .select("role, content")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(20);

    // Save user message
    await supabase.from("chat_messages").insert({
      session_id: sessionId,
      user_id: user.id,
      role: "user",
      content: message,
    });

    // Build system prompt with optional user context
    const userContext = await buildUserContext(user.id);
    const systemPrompt = buildSystemPrompt(userContext ?? undefined);

    // Build Gemini chat history
    const chatHistory = (history ?? []).map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("model" as const),
      parts: [{ text: m.content }],
    }));

    const gemini = getGeminiClient();
    const model = gemini.getGenerativeModel({
      model: getGeminiModel(),
      systemInstruction: systemPrompt,
    });

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    // Detect crisis marker
    const isCrisis = responseText.includes("[CRISIS_DETECTED]");
    const cleanResponse = responseText.replace("[CRISIS_DETECTED]", "").trim();

    // Save assistant response
    await supabase.from("chat_messages").insert({
      session_id: sessionId,
      user_id: user.id,
      role: "assistant",
      content: cleanResponse,
      flagged: isCrisis,
    });

    // Update session updated_at
    await supabase
      .from("chat_sessions")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", sessionId);

    return NextResponse.json({ message: cleanResponse, crisis: isCrisis });
  } catch (e) {
    console.error("[chat/route]", e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
