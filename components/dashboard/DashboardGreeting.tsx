"use client";

import { useEffect, useState } from "react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function DashboardGreeting({ name }: { name: string }) {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <div className="flex items-start justify-between px-6 py-5 border-b">
      <div>
        <h1 className="text-xl font-semibold" suppressHydrationWarning>
          {greeting ? `${greeting}, ${name}` : name}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">Here&apos;s your wellness snapshot.</p>
      </div>
    </div>
  );
}
