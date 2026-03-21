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

export function getGeminiModel(): string {
  const raw = process.env.GEMINI_MODEL;
  if (!raw) throw new Error("GEMINI_MODEL is not set");
  const models = raw.split(",").map((m) => m.trim()).filter(Boolean);
  if (!models.length) throw new Error("GEMINI_MODEL is empty");
  return models[Math.floor(Math.random() * models.length)];
}
