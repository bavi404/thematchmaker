export type MeetingNoteType =
  | "consultation"
  | "introduction"
  | "follow-up"
  | "general";

export interface MeetingNote {
  readonly id: string;
  readonly customerId: string;
  readonly matchId: string | null;
  readonly authorId: string;
  readonly authorName: string;
  readonly content: string;
  readonly meetingDate: string;
  readonly type: MeetingNoteType;
  readonly createdAt: string;
  readonly updatedAt: string;
}
