import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppShell from "../components/layout/AppShell";
import ThemeProvider from "../components/ui/ThemeProvider";
import ToastProvider from "../components/ui/ToastProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MK Dashboard Pro",
    template: "%s | MK Dashboard Pro",
  },
  description:
    "Enterprise SaaS dashboard pro správu objednávek, zákazníků a analytiky.",
  openGraph: {
    title: "MK Dashboard Pro",
    description:
      "Enterprise SaaS dashboard pro správu objednávek, zákazníků a analytiky.",
    type: "website",
    locale: "cs_CZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ToastProvider>
            <AppShell>{children}</AppShell>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
