import type { MeetingNote } from "@/types";

const STORAGE_KEY = "matchmaker_local_notes";

function readAll(): MeetingNote[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as MeetingNote[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(notes: MeetingNote[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function getLocalNotesForCustomer(customerId: string): MeetingNote[] {
  return readAll()
    .filter((n) => n.customerId === customerId)
    .sort(
      (a, b) =>
        new Date(b.meetingDate).getTime() - new Date(a.meetingDate).getTime()
    );
}

export function saveLocalNote(note: MeetingNote): void {
  writeAll([note, ...readAll()]);
}

export function mergeNotes(
  serverNotes: MeetingNote[],
  customerId: string
): MeetingNote[] {
  const local = getLocalNotesForCustomer(customerId);
  const serverIds = new Set(serverNotes.map((n) => n.id));

  return [...local.filter((n) => !serverIds.has(n.id)), ...serverNotes].sort(
    (a, b) =>
      new Date(b.meetingDate).getTime() - new Date(a.meetingDate).getTime()
  );
}
