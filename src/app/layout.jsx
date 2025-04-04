"use client"
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import StoreProvider from "./StoreProvider";
import './globals.css'
import InnerLayout from "./InnerLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="fr">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <InnerLayout>{children}</InnerLayout>
        </body>
      </html>
    </StoreProvider>
  );
}
