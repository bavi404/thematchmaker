import OpenAI from "openai";
import type { MeetingNoteSummary } from "@/types/meeting-note-summary";
import { MEETING_NOTE_SYSTEM_PROMPT } from "./meeting-note-prompt";

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not configured. Add it to your environment variables."
    );
  }
  return new OpenAI({ apiKey });
}

function parseSummaryPayload(content: string): MeetingNoteSummary {
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("OpenAI returned invalid JSON.");
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("summary" in parsed) ||
    typeof (parsed as MeetingNoteSummary).summary !== "string"
  ) {
    throw new Error("OpenAI response missing required summary field.");
  }

  const data = parsed as Record<string, unknown>;

  function toStringArray(value: unknown, field: string): string[] {
    if (!Array.isArray(value)) {
      throw new Error(`OpenAI response field "${field}" must be an array.`);
    }
    return value.map((item) => {
      if (typeof item !== "string") {
        throw new Error(`OpenAI response field "${field}" must contain strings.`);
      }
      return item.trim();
    }).filter(Boolean);
  }

  return {
    summary: data.summary as string,
    keyPreferences: toStringArray(data.keyPreferences, "keyPreferences"),
    potentialConcerns: toStringArray(data.potentialConcerns, "potentialConcerns"),
    relationshipGoals: toStringArray(data.relationshipGoals, "relationshipGoals"),
  };
}

export async function summarizeMeetingNote(
  noteText: string,
  customerName?: string
): Promise<MeetingNoteSummary> {
  const trimmed = noteText.trim();
  if (!trimmed) {
    throw new Error("Note text is required.");
  }

  const openai = getOpenAIClient();
  const userContent = customerName
    ? `Client: ${customerName}\n\nMeeting notes:\n${trimmed}`
    : `Meeting notes:\n${trimmed}`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: MEETING_NOTE_SYSTEM_PROMPT },
      { role: "user", content: userContent },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI returned an empty response.");
  }

  return parseSummaryPayload(content);
}
