import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner"

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
          className={`antialiased`}
        >
          {children}
          <Toaster richColors />
        </body>
      </AuthProvider>
    </html>
  );
}
