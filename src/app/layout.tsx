import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Know your Enemy!",
  description: "A simple app to help you learn about your enemies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`antialiased ${inter.className}`}
        >
          {children}
          <Toaster richColors />
        </body>
      </AuthProvider>
    </html>
  );
}
