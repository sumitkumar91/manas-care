import { Card, CardContent } from "@/components/ui/card";

export const metadata = { title: "Check your email - Manas Care" };

export default function ConvertConfirmPage() {
  return (
    <div className="p-6 flex justify-center">
      <Card className="max-w-md w-full">
        <CardContent className="pt-8 pb-8 text-center space-y-3">
          <p className="text-3xl">✉️</p>
          <p className="font-semibold text-lg">Check your email</p>
          <p className="text-muted-foreground text-sm">
            We sent a confirmation link. Click it to activate your account -
            all your data is already saved and will be there when you log back in.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
