import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-GGNTLHX6FQ";

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: { icon: "/logo2.png", apple: "/logo2.png" },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Manas Care",
  },
  title: "Manas Care - Your mental wellness companion",
  description:
    "Manas Care helps students and young adults manage their mental health through mood tracking, guided journaling, and compassionate AI support.",
  openGraph: {
    title: "Manas Care - Your mental wellness companion",
    description: "Vedic techniques meet modern AI for mental wellness. Raga therapy, Pranayama, Trataka, journaling and more.",
    url: "https://manascare.vercel.app",
    siteName: "Manas Care",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Manas Care - Your mental wellness companion",
    description: "Vedic techniques meet modern AI for mental wellness.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-right" />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
      </body>
    </html>
  );
}
