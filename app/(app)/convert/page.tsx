import { ConvertForm } from "@/components/auth/ConvertForm";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata = { title: "Create Account — Manas" };

export default function ConvertPage() {
  return (
    <div>
      <PageHeader
        title="Create your account"
        description="Your guest data will be preserved."
      />
      <div className="p-6">
        <ConvertForm />
      </div>
    </div>
  );
}
