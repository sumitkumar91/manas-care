import { US_CRISIS_RESOURCES } from "@/lib/constants/crisis-keywords";

export function CrisisResourceBanner() {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20 p-4 space-y-2">
      <p className="text-sm font-semibold text-red-800 dark:text-red-300">
        It sounds like you might be going through something really painful. You deserve support.
      </p>
      <p className="text-xs text-red-700 dark:text-red-400">
        Please reach out to a crisis resource — trained counselors are available 24/7:
      </p>
      <ul className="space-y-1.5 mt-1">
        {US_CRISIS_RESOURCES.map((r) => (
          <li key={r.name} className="text-xs">
            <span className="font-medium text-red-800 dark:text-red-300">{r.name}</span>
            <span className="text-red-700 dark:text-red-400"> — {r.contact}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
