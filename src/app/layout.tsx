import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { AppThemeProvider } from "@/providers/AppThemeProvider";
import { TanstackQueryProvider } from "@/providers/TanstackQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FelixHub",
  description: "FelixHub é uma plataforma de comunicação entre escola e família.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> 
        <AppThemeProvider>
          <AuthProvider>
            <TanstackQueryProvider>
              {children}
            </TanstackQueryProvider> 
          </AuthProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}

