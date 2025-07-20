import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Insyd App",
  description: "Insyd App",
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
