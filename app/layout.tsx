import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pocket — Personal AI Assistant",
  description: "A few useful tools to make your day a little simpler.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
