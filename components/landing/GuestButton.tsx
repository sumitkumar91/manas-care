"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function GuestButton() {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const reset = () => setLoading(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  async function handleGuest() {
    setLoading(true);
    const { error } = await supabase.auth.signInAnonymously();
    if (!error) {
      window.location.href = "/dashboard";
    } else {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleGuest}
      disabled={loading}
      className="border px-6 py-3 rounded-xl font-semibold text-sm hover:bg-accent transition-colors disabled:opacity-50 cursor-pointer"
    >
      {loading ? "Starting…" : "Try without an account"}
    </button>
  );
}
