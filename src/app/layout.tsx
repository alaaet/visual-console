import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../assets/css/globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Visual Console",
  description: "a GUI to simplify interacting with servers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
