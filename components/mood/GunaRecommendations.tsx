"use client";

import Link from "next/link";
import { GUNAS, GUNA_RECOMMENDATIONS, type Guna } from "@/lib/constants/gunas";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

interface Props {
  guna: Guna;
  onDismiss: () => void;
}

export function GunaRecommendations({ guna, onDismiss }: Props) {
  const def = GUNAS.find((g) => g.id === guna)!;
  const rec = GUNA_RECOMMENDATIONS[guna];

  return (
    <div className={cn("rounded-2xl border-2 p-5 space-y-4", def.bgColor, def.borderColor)}>
      <div className="flex items-start gap-3">
        <span className="text-3xl">{def.emoji}</span>
        <div>
          <p className={cn("font-semibold text-sm", def.color)}>{rec.title}</p>
          <p className="text-sm text-muted-foreground mt-0.5">{rec.description}</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Recommended for you
        </p>
        <div className="flex flex-wrap gap-2">
          {rec.actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
            >
              <span>{action.emoji}</span> {action.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={cn("rounded-lg p-3 text-xs", def.bgColor)}>
        <span className="font-medium">💡 Tip: </span>
        <span className="text-muted-foreground">{rec.tip}</span>
      </div>

      <button
        onClick={onDismiss}
        className="text-xs text-muted-foreground hover:underline"
      >
        Dismiss
      </button>
    </div>
  );
}
