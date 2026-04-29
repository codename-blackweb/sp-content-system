import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shatterproof Content System",
  description:
    "A premium Shatterproof-branded content operations system for mission-aligned campaign execution."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
