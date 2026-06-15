import type { SentMatch } from "@/types/sent-match";

const STORAGE_KEY = "matchmaker_sent_matches";

function readAll(): SentMatch[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as SentMatch[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(matches: SentMatch[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
}

export function getSentMatches(): SentMatch[] {
  return readAll().sort(
    (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
  );
}

export function getSentMatchesForClient(clientCustomerId: string): SentMatch[] {
  return getSentMatches().filter(
    (m) => m.clientCustomerId === clientCustomerId
  );
}

export function getSentCandidateIds(clientCustomerId: string): string[] {
  return getSentMatchesForClient(clientCustomerId).map(
    (m) => m.candidateCustomerId
  );
}

export function isMatchSent(
  clientCustomerId: string,
  candidateCustomerId: string
): boolean {
  return readAll().some(
    (m) =>
      m.clientCustomerId === clientCustomerId &&
      m.candidateCustomerId === candidateCustomerId
  );
}

export function saveSentMatch(
  match: Omit<SentMatch, "id" | "sentAt">
): SentMatch {
  const record: SentMatch = {
    ...match,
    id: `sent-${Date.now()}`,
    sentAt: new Date().toISOString(),
  };

  writeAll([record, ...readAll()]);
  return record;
}
