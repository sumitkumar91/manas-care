import { redirect } from "next/navigation";

// Root "/" redirects to dashboard; middleware handles auth + onboarding redirects
export default function RootPage() {
  redirect("/dashboard");
}
