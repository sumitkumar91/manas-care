import Link from "next/link";
import { Smile, BookOpen, MessageCircle } from "lucide-react";

const actions = [
  { href: "/mood", icon: Smile, label: "Log Mood", color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
  { href: "/journal/new", icon: BookOpen, label: "Write", color: "text-green-600 bg-green-50 dark:bg-green-950/30" },
  { href: "/chat", icon: MessageCircle, label: "Talk to AI", color: "text-violet-500 bg-violet-50 dark:bg-violet-950/30" },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {actions.map(({ href, icon: Icon, label, color }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors"
        >
          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium text-center">{label}</span>
        </Link>
      ))}
    </div>
  );
}
