import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { summarizeMeetingNote } from "@/lib/ai/summarize-meeting-note";
import { verifySession, unauthorizedResponse } from "@/lib/auth/verify-session";

interface SummarizeRequestBody {
  noteText?: string;
  customerName?: string;
}

export async function POST(request: NextRequest) {
  if (!verifySession(request)) {
    return unauthorizedResponse();
  }

  try {
    const body = (await request.json()) as SummarizeRequestBody;
    const noteText = body.noteText?.trim();

    if (!noteText) {
      return NextResponse.json(
        { error: "Note text is required." },
        { status: 400 }
      );
    }

    const summary = await summarizeMeetingNote(noteText, body.customerName);

    return NextResponse.json({ summary });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to summarize note.";

    const status = message.includes("OPENAI_API_KEY") ? 503 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
