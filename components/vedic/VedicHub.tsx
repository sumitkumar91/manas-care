import Link from "next/link";
import { Music2, Flower2, Flame, Sun } from "lucide-react";

const FEATURES = [
  {
    href: "/music",
    label: "Music Therapy",
    subtitle: "Raga Chikitsa",
    description:
      "Indian classical ragas prescribed for your current time of day. Each raga carries a distinct emotional quality that resonates with your mind.",
    icon: Music2,
    accent: "from-amber-500/10 to-orange-500/10 border-amber-500/20",
    iconColor: "text-amber-500",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    href: "/meditate",
    label: "Pranayama",
    subtitle: "Breath Control",
    description:
      "Vedic breathing exercises that regulate the nervous system. From calming Nadi Shodhana to energising Kapalabhati.",
    icon: Flower2,
    accent: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20",
    iconColor: "text-emerald-500",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    href: "/trataka",
    label: "Trataka",
    subtitle: "Candle Gazing",
    description:
      "A Hatha Yoga purification practice. Sustained focus on a single point builds concentration, steadies the mind, and reduces anxiety.",
    icon: Flame,
    accent: "from-rose-500/10 to-orange-500/10 border-rose-500/20",
    iconColor: "text-rose-500",
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  },
  {
    href: "/dinacharya",
    label: "Dinacharya",
    subtitle: "Circadian Scheduling",
    description:
      "Organise your day according to Vata, Pitta, and Kapha cycles. Schedule tasks when your dosha is most aligned for that type of activity.",
    icon: Sun,
    accent: "from-violet-500/10 to-indigo-500/10 border-violet-500/20",
    iconColor: "text-violet-500",
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  },
];

export function VedicHub() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {FEATURES.map(({ href, label, subtitle, description, icon: Icon, accent, iconColor, badge }) => (
        <Link key={href} href={href}>
          <div
            className={`group h-full rounded-2xl border bg-gradient-to-br ${accent} p-6 hover:shadow-md transition-all duration-200 cursor-pointer`}
          >
            <div className="flex items-start gap-4">
              <div className={`rounded-xl p-2.5 bg-background/60 ${iconColor} shrink-0`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-base">{label}</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${badge}`}>
                    {subtitle}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Open →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
