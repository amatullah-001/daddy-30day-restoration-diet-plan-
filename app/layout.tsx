import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "30-Day Restoration Diet Plan",
  description: "A comprehensive guide to restore your health in 30 days",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background">
      <body>{children}</body>
    </html>
  );
}
