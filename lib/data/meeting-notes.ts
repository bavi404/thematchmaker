import type { MeetingNote } from "@/types";

export const meetingNotes: MeetingNote[] = [
  {
    id: "note-001",
    customerId: "cust-001",
    matchId: null,
    authorId: "cons-001",
    authorName: "Sarah Mitchell",
    content:
      "Initial consultation completed. Ananya is clear about wanting a partner who balances ambition with family values. Follow up in two weeks with curated profiles.",
    meetingDate: "2026-05-28",
    type: "consultation",
    createdAt: "2026-05-28T10:30:00Z",
    updatedAt: "2026-05-28T10:30:00Z",
  },
  {
    id: "note-002",
    customerId: "cust-001",
    matchId: "match-001",
    authorId: "cons-001",
    authorName: "Sarah Mitchell",
    content:
      "Introduced to Rohan Kapoor. Both parties expressed interest in a second meeting. Scheduling video call for next week.",
    meetingDate: "2026-06-05",
    type: "introduction",
    createdAt: "2026-06-05T14:00:00Z",
    updatedAt: "2026-06-05T14:00:00Z",
  },
  {
    id: "note-003",
    customerId: "cust-002",
    matchId: "match-001",
    authorId: "cons-001",
    authorName: "Sarah Mitchell",
    content:
      "Rohan responded positively to introduction with Ananya. Family background discussion went well. Awaiting Ananya's feedback.",
    meetingDate: "2026-06-06",
    type: "follow-up",
    createdAt: "2026-06-06T11:15:00Z",
    updatedAt: "2026-06-06T11:15:00Z",
  },
  {
    id: "note-004",
    customerId: "cust-003",
    matchId: null,
    authorId: "cons-002",
    authorName: "James Chen",
    content:
      "Screening call with Priya. Verified credentials and discussed timeline. She prefers matches within medical or academic fields.",
    meetingDate: "2026-06-01",
    type: "consultation",
    createdAt: "2026-06-01T09:00:00Z",
    updatedAt: "2026-06-01T09:00:00Z",
  },
  {
    id: "note-005",
    customerId: "cust-004",
    matchId: "match-002",
    authorId: "cons-002",
    authorName: "James Chen",
    content:
      "Shared Vikram's profile with Priya for review. High compatibility score noted. Pending her response.",
    meetingDate: "2026-06-03",
    type: "general",
    createdAt: "2026-06-03T16:45:00Z",
    updatedAt: "2026-06-03T16:45:00Z",
  },
];

export function getMeetingNotesByCustomerId(customerId: string): MeetingNote[] {
  return meetingNotes
    .filter((n) => n.customerId === customerId)
    .sort(
      (a, b) =>
        new Date(b.meetingDate).getTime() - new Date(a.meetingDate).getTime()
    );
}
