import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { AppThemeProvider } from "@/providers/AppThemeProvider";
import { TanstackQueryProvider } from "@/providers/TanstackQueryProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Escola Maria Élida",
  description: "ÉlidaHub é uma plataforma de apoio à equipe pedagógica da Escola Maria Élida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} antialiased`}> 
        <AppThemeProvider>
          <AuthProvider>
            <TanstackQueryProvider>
              {children}
              <Toaster />
            </TanstackQueryProvider> 
          </AuthProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}

