"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Smile,
  BookOpen,
  MessageCircle,
  User,
  LogOut,
  Wind,
  Flower2,
  Music2,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/mood", label: "Mood", icon: Smile },
  { href: "/journal", label: "Journal", icon: BookOpen },
  { href: "/vent", label: "Vent", icon: Wind },
  { href: "/music", label: "Music Therapy", icon: Music2 },
  { href: "/meditate", label: "Pranayama", icon: Flower2 },
  { href: "/trataka", label: "Trataka", icon: Flame },
  { href: "/chat", label: "Manas Care AI", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="hidden md:flex flex-col w-60 min-h-screen border-r bg-sidebar px-3 py-5 shrink-0">
      <Link href="/dashboard" className="flex items-center gap-2 px-2 mb-6">
        <span className="text-2xl font-bold text-primary">Manas Care</span>
      </Link>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2">
        <Separator />
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
