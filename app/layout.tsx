import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MetaPixel from "./components/MetaPixel";
import Tracker from "./components/Tracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OroPuro - 24hs Online",
  description: "OroPuro - Retiros 24hs, pagos instantáneos, +5000 juegos. El poder de los dioses en tus manos.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Zeus Casino - El poder de los dioses",
    description: "Retiros 24hs, pagos instantáneos, +5000 juegos. El poder de los dioses en tus manos.",
    url: 'https://zeus-casino.pages.dev',
    siteName: 'Zeus Casino',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zeus Casino',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Zeus Casino - El poder de los dioses",
    description: "Retiros 24hs, pagos instantáneos, +5000 juegos.",
    images: ['/og-image.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MetaPixel />
        <Tracker />
        {children}
      </body>
    </html>
  );
}
