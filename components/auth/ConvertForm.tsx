"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ConvertForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function sendOtp() {
    if (!email.trim()) return;
    setLoading(true);
    setError(null);
    // Link email to the existing anonymous session
    const { error } = await supabase.auth.updateUser({
      email,
      data: name.trim() ? { display_name: name.trim() } : undefined,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setStep("otp");
    }
  }

  async function verifyOtp() {
    if (!otp.trim()) return;
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email_change",
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    if (name.trim() && data.user) {
      await supabase
        .from("profiles")
        .update({ display_name: name.trim() })
        .eq("id", data.user.id);
    }
    window.location.href = "/dashboard";
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Save your progress</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          All your mood logs, journal entries, and conversations will be kept.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === "email" ? (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Your name <span className="text-muted-foreground">(optional)</span></Label>
              <Input
                id="name"
                placeholder="Alex"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendOtp()}
              />
            </div>
            <Button className="w-full" onClick={sendOtp} disabled={loading || !email.trim()}>
              {loading ? "Sending…" : "Send verification code"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>.
            </p>
            <div className="space-y-1.5">
              <Label htmlFor="otp">Code</Label>
              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                placeholder="123456"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && verifyOtp()}
                autoFocus
              />
            </div>
            <Button className="w-full" onClick={verifyOtp} disabled={loading || otp.length < 6}>
              {loading ? "Verifying…" : "Create account & save data"}
            </Button>
            <button
              type="button"
              className="text-xs text-muted-foreground hover:underline w-full text-center"
              onClick={() => { setStep("email"); setOtp(""); setError(null); }}
            >
              Use a different email
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
