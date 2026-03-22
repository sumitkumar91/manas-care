import { GoogleGenerativeAI } from "@google/generative-ai";

let _client: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  if (!_client) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
    _client = new GoogleGenerativeAI(apiKey);
  }
  return _client;
}

export function getGeminiModels(): string[] {
  const raw = process.env.GEMINI_MODEL;
  if (!raw) throw new Error("GEMINI_MODEL is not set");
  const models = raw.split(",").map((m) => m.trim()).filter(Boolean);
  if (!models.length) throw new Error("GEMINI_MODEL is empty");
  return models;
}

export function getGeminiModel(): string {
  return getGeminiModels()[0];
}

/** Try each model in order, falling back on rate limit (429) or quota errors. */
export async function generateWithFallback(prompt: string): Promise<string> {
  const client = getGeminiClient();
  const models = getGeminiModels();
  let lastError: unknown;
  for (const model of models) {
    try {
      const m = client.getGenerativeModel({ model });
      const result = await m.generateContent(prompt);
      return result.response.text();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      const isQuota = msg.includes("429") || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED");
      if (!isQuota) throw e;
      lastError = e;
    }
  }
  throw lastError;
}
