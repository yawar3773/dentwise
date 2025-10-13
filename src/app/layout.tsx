import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DentWise - AI powered Dental Assisstant",
  description: "Get instant dental advice throught voice calls with our AI assisstant. Available 24/7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <ClerkProvider
    appearance={{
      variables:{
        colorPrimary: "#e78a53",
        colorBackground: "#f3f4f6",
        colorText: "#111827",
        colorTextSecondary: "#6b7280",
        colorInputBackground: "#f3f4f6",
      }
    }}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
=======
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
>>>>>>> 8aaf2ec11e6722b0c76e77de57dbef42a20cd8cd
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
