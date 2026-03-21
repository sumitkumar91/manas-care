"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

const TYPE_LABELS: Record<string, string> = {
  free: "Free write",
  cbt: "CBT exercise",
  gratitude: "Gratitude",
};

const TYPE_COLORS: Record<string, string> = {
  free: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  cbt: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  gratitude: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

interface Props {
  entry: {
    id: string;
    entry_type: string;
    title: string | null;
    created_at: string;
    is_pinned: boolean;
  };
}

export function JournalEntryCard({ entry }: Props) {
  const label = TYPE_LABELS[entry.entry_type] ?? entry.entry_type;
  const colorClass = TYPE_COLORS[entry.entry_type] ?? "bg-muted text-muted-foreground";

  return (
    <Link href={`/journal/${entry.id}`}>
      <div className="rounded-lg border p-4 hover:bg-accent/40 transition-colors cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">
              {entry.is_pinned && <span className="mr-1.5">📌</span>}
              {entry.title || "Untitled"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
            </p>
          </div>
          <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${colorClass}`}>
            {label}
          </span>
        </div>
      </div>
    </Link>
  );
}
