"use client";

import { useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  StickyNote,
  Plus,
  Sparkles,
  Loader2,
  Heart,
  AlertCircle,
  Target,
  ListChecks,
} from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import {
  MatchmakerCard,
  MatchmakerCardContent,
  MatchmakerButton,
} from "@/components/matchmaker";
import type { Customer, MeetingNote } from "@/types";
import { getCustomerFullName } from "@/types";
import type { MeetingNoteSummary } from "@/types";
import { getSession } from "@/lib/auth";
import { formatDate } from "@/lib/formatters";
import { mergeNotes, saveLocalNote } from "@/lib/meeting-notes-storage";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

interface MeetingNoteWithSummary extends MeetingNote {
  aiSummary?: MeetingNoteSummary;
}

interface MeetingNotesSectionProps {
  customer: Customer;
  initialNotes: MeetingNote[];
  onNoteCountChange?: (count: number) => void;
}

export function MeetingNotesSection({
  customer,
  initialNotes,
  onNoteCountChange,
}: MeetingNotesSectionProps) {
  const [notes, setNotes] = useState<MeetingNoteWithSummary[]>(initialNotes);
  const [draft, setDraft] = useState("");
  const [summary, setSummary] = useState<MeetingNoteSummary | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    setNotes(mergeNotes(initialNotes, customer.id) as MeetingNoteWithSummary[]);
  }, [initialNotes, customer.id]);

  const updateNotes = useCallback(
    (next: MeetingNoteWithSummary[]) => {
      setNotes(next);
      onNoteCountChange?.(next.length);
    },
    [onNoteCountChange]
  );

  async function handleSummarize() {
    const text = draft.trim();
    if (!text) {
      setError("Enter meeting notes before summarizing.");
      return;
    }

    setIsSummarizing(true);
    setError(null);

    try {
      const response = await fetch("/api/meeting-notes/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          noteText: text,
          customerName: getCustomerFullName(customer),
        }),
      });

      const data = (await response.json()) as {
        summary?: MeetingNoteSummary;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to summarize note.");
      }

      if (!data.summary) {
        throw new Error("No summary returned.");
      }

      setSummary(data.summary);
      showToast("✨ AI summary ready");
    } catch (err) {
      setSummary(null);
      setError(err instanceof Error ? err.message : "Failed to summarize note.");
    } finally {
      setIsSummarizing(false);
    }
  }

  function handleAddNote() {
    const text = draft.trim();
    if (!text) {
      setError("Enter meeting notes before saving.");
      return;
    }

    const session = getSession();
    const now = new Date().toISOString();
    const newNote: MeetingNoteWithSummary = {
      id: `note-local-${Date.now()}`,
      customerId: customer.id,
      matchId: null,
      authorId: session?.username ?? "admin",
      authorName: session?.username ?? "Admin",
      content: text,
      meetingDate: now.split("T")[0]!,
      type: "general",
      createdAt: now,
      updatedAt: now,
      ...(summary ? { aiSummary: summary } : {}),
    };

    updateNotes([newNote, ...notes]);
    saveLocalNote(newNote);
    setDraft("");
    setSummary(null);
    setError(null);
    showToast("📝 Note saved successfully");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Composer */}
      <MatchmakerCard variant="gradient" className="overflow-hidden">
        <MatchmakerCardContent className="space-y-4 p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-xl bg-cupid-primary/10">
              <StickyNote className="size-4 text-cupid-primary" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-cupid-foreground">
                Add Meeting Note
              </h3>
              <p className="text-xs text-cupid-muted-foreground">
                Record consultation notes for {customer.firstName}
              </p>
            </div>
          </div>

          <label htmlFor="meeting-note-input" className="sr-only">
            Meeting note for {customer.firstName}
          </label>
          <textarea
            id="meeting-note-input"
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Enter free-form meeting notes — observations, client quotes, preferences discussed..."
            rows={5}
            className={cn(
              "w-full resize-y rounded-xl border border-cupid-border/60 bg-white/80 px-3.5 py-3 text-sm leading-relaxed text-cupid-foreground",
              "placeholder:text-cupid-muted-foreground/70",
              "outline-none transition-colors focus:border-cupid-primary/50 focus:ring-3 focus:ring-cupid-primary/10",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            disabled={isSummarizing}
          />

          {error && (
            <p className="flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle className="size-3.5 shrink-0" />
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <MatchmakerButton
              variant="gradient"
              size="sm"
              onClick={handleAddNote}
              disabled={!draft.trim() || isSummarizing}
            >
              <Plus />
              Add Note
            </MatchmakerButton>
            <MatchmakerButton
              variant="outline"
              size="sm"
              onClick={handleSummarize}
              disabled={!draft.trim() || isSummarizing}
            >
              {isSummarizing ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Sparkles />
              )}
              {isSummarizing ? "Summarizing…" : "Summarize with AI"}
            </MatchmakerButton>
          </div>

          <AnimatePresence>
            {summary && (
              <AiSummaryPanel
                summary={summary}
                onDismiss={() => setSummary(null)}
              />
            )}
          </AnimatePresence>
        </MatchmakerCardContent>
      </MatchmakerCard>

      {/* Note history */}
      {notes.length === 0 ? (
        <EmptyState
          icon={StickyNote}
          title="No meeting notes yet"
          description="Record your first consultation note above to start building this client's matchmaking history."
        />
      ) : (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-cupid-muted-foreground">
            Note History
          </h3>
          {notes.map((note, index) => (
            <NoteCard key={note.id} note={note} index={index} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function AiSummaryPanel({
  summary,
  onDismiss,
}: {
  summary: MeetingNoteSummary;
  onDismiss: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="rounded-xl border border-cupid-primary/20 bg-gradient-to-br from-white via-cupid-background/60 to-cupid-secondary/10 p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-cupid-primary" />
            <span className="text-sm font-semibold text-cupid-foreground">
              AI Summary
            </span>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            className="text-xs text-cupid-muted-foreground transition-colors hover:text-cupid-primary"
          >
            Dismiss
          </button>
        </div>

        <div className="space-y-4">
          <SummaryBlock title="Summary" icon={ListChecks}>
            <p className="text-sm leading-relaxed text-cupid-foreground/90">
              {summary.summary}
            </p>
          </SummaryBlock>

          <SummaryList
            title="Key Preferences"
            icon={Heart}
            items={summary.keyPreferences}
            emptyText="No preferences identified."
            accent="emerald"
          />

          <SummaryList
            title="Potential Concerns"
            icon={AlertCircle}
            items={summary.potentialConcerns}
            emptyText="No concerns flagged."
            accent="amber"
          />

          <SummaryList
            title="Relationship Goals"
            icon={Target}
            items={summary.relationshipGoals}
            emptyText="No goals specified."
            accent="rose"
          />
        </div>

        <p className="mt-3 text-[10px] text-cupid-muted-foreground">
          Summary will be saved with the note when you click Add Note.
        </p>
      </div>
    </motion.div>
  );
}

function SummaryBlock({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-cupid-muted-foreground">
        <Icon className="size-3.5 text-cupid-accent" />
        {title}
      </h4>
      {children}
    </div>
  );
}

function SummaryList({
  title,
  icon: Icon,
  items,
  emptyText,
  accent,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: readonly string[];
  emptyText: string;
  accent: "emerald" | "amber" | "rose";
}) {
  const dotColor = {
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    rose: "bg-cupid-primary",
  }[accent];

  return (
    <SummaryBlock title={title} icon={Icon}>
      {items.length === 0 ? (
        <p className="text-xs italic text-cupid-muted-foreground">{emptyText}</p>
      ) : (
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm leading-snug text-cupid-foreground/90"
            >
              <span
                className={cn("mt-1.5 size-1.5 shrink-0 rounded-full", dotColor)}
              />
              {item}
            </li>
          ))}
        </ul>
      )}
    </SummaryBlock>
  );
}

function NoteCard({
  note,
  index,
}: {
  note: MeetingNoteWithSummary;
  index: number;
}) {
  const typeStyles: Record<MeetingNote["type"], string> = {
    consultation: "bg-sky-50 text-sky-700 border-sky-200",
    introduction: "bg-rose-50 text-rose-700 border-rose-200",
    "follow-up": "bg-amber-50 text-amber-700 border-amber-200",
    general: "bg-cupid-muted text-cupid-foreground border-cupid-border",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="rounded-xl border border-cupid-border/60 bg-white p-4 shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <StickyNote className="size-4 text-cupid-accent" />
          <span className="text-sm font-medium text-cupid-foreground">
            {note.authorName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize",
              typeStyles[note.type]
            )}
          >
            {note.type.replace("-", " ")}
          </span>
          <time
            dateTime={note.meetingDate}
            className="text-xs text-cupid-muted-foreground"
          >
            {formatDate(note.meetingDate)}
          </time>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-cupid-foreground/90">
        {note.content}
      </p>

      {note.aiSummary && (
        <div className="mt-4 rounded-lg border border-cupid-border/40 bg-cupid-background/50 p-3">
          <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cupid-primary">
            <Sparkles className="size-3" />
            AI Summary
          </p>
          <p className="text-xs leading-relaxed text-cupid-foreground/85">
            {note.aiSummary.summary}
          </p>
          {note.aiSummary.keyPreferences.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {note.aiSummary.keyPreferences.slice(0, 3).map((pref) => (
                <span
                  key={pref}
                  className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-700"
                >
                  {pref}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
