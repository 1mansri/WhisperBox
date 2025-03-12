import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Whisper Box",
  description: "A simple app to help you to know more about you.",
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
          className={`antialiased`}
        >
          {children}
          <Toaster position="top-right" richColors />
        </body>
      </AuthProvider>
    </html>
  );
}
