import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from '@/components/Providers';
import { Analytics } from "@vercel/analytics/react"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: 'Grannell Cottage',
  description: 'Grannell Cottage is an ancestral home located in Casco Bay, Maine.'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} antialiased`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
