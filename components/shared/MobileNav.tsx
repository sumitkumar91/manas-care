"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Smile,
  BookOpen,
  MessageCircle,
  User,
  Wind,
  Music2,
  Flower2,
  Flame,
  Sun,
  LogOut,
  MoreHorizontal,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const PRIMARY = [
  { href: "/dashboard", label: "Home",    icon: LayoutDashboard },
  { href: "/mood",      label: "Mood",    icon: Smile },
  { href: "/journal",   label: "Journal", icon: BookOpen },
  { href: "/chat",      label: "AI",      icon: MessageCircle },
];

const MORE = [
  { href: "/vent",        label: "Vent",        icon: Wind },
  { href: "/music",       label: "Music",        icon: Music2 },
  { href: "/meditate",    label: "Pranayama",    icon: Flower2 },
  { href: "/trataka",     label: "Trataka",      icon: Flame },
  { href: "/dinacharya",  label: "Dinacharya",   icon: Sun },
  { href: "/profile",     label: "Profile",      icon: User },
];

export function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [open, setOpen] = useState(false);

  // close sheet on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      {/* Bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-around h-16 px-2">
          {PRIMARY.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors min-w-0",
                  active ? "text-primary" : "text-muted-foreground"
                )}
                aria-label={label}
              >
                <Icon className={cn("h-5 w-5", active && "stroke-[2.5]")} />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setOpen(true)}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors",
              MORE.some(({ href }) => pathname === href || pathname.startsWith(href + "/"))
                ? "text-primary"
                : "text-muted-foreground"
            )}
            aria-label="More"
          >
            <MoreHorizontal className="h-5 w-5" />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-up sheet */}
      <div
        className={cn(
          "md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl border-t shadow-xl transition-transform duration-300",
          open ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-sm font-semibold">Features</span>
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1 px-4 pb-4">
          {MORE.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-4 rounded-xl transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("h-6 w-6", active && "stroke-[2.5]")} />
                <span className="text-xs font-medium text-center">{label}</span>
              </Link>
            );
          })}
        </div>

        <div className="px-4 pb-6 border-t pt-3">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}
