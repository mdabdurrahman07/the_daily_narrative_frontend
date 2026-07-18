import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "The Daily Narrative",
  description: "Blogging platform for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
