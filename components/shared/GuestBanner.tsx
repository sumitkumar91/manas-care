"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/lib/button-variants";

export function GuestBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-primary/10 border-b border-primary/20 px-4 py-2.5 flex items-center gap-3 text-sm">
      <span className="flex-1 text-foreground">
        You&apos;re exploring as a guest.{" "}
        <span className="text-muted-foreground">
          Create a free account to save your data permanently.
        </span>
      </span>
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/convert"
          className={buttonVariants({ size: "sm" })}
        >
          Save my data
        </Link>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
