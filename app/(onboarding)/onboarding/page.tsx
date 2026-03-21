import { redirect } from "next/navigation";

// /onboarding redirects to first step
export default function OnboardingIndexPage() {
  redirect("/onboarding/goals");
}
