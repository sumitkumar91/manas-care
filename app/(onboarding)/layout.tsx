export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <span className="text-3xl font-bold text-primary">Manas Care</span>
          <p className="text-muted-foreground text-sm mt-1">Let&apos;s set you up</p>
        </div>
        {children}
      </div>
    </div>
  );
}
