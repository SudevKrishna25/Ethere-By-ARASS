import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ÉTHERE | The Future of Luxury",
  description: "An immersive white couture experience crafted beyond trends."
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
