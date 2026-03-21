"use client";

import { cn } from "@/lib/utils";

interface Item {
  id: string;
  label: string;
  emoji: string;
  description?: string;
}

interface SelectionGridProps {
  items: readonly Item[];
  selected: string[];
  onToggle: (id: string) => void;
  columns?: 2 | 3;
}

export function SelectionGrid({
  items,
  selected,
  onToggle,
  columns = 2,
}: SelectionGridProps) {
  return (
    <div
      className={cn(
        "grid gap-3",
        columns === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"
      )}
    >
      {items.map((item) => {
        const isSelected = selected.includes(item.id);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onToggle(item.id)}
            className={cn(
              "flex flex-col items-start gap-1.5 p-3.5 rounded-xl border text-left transition-all cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isSelected
                ? "border-primary bg-primary/8 shadow-sm"
                : "border-border bg-card hover:border-primary/40 hover:bg-muted/50"
            )}
          >
            <span className="text-xl leading-none">{item.emoji}</span>
            <span className={cn("text-sm font-medium", isSelected && "text-primary")}>
              {item.label}
            </span>
            {item.description && (
              <span className="text-xs text-muted-foreground leading-snug">
                {item.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
