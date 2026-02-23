import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { initializeOptimizely, registerReactComponentResolver } from "../lib/optimizely/init";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import HomePage from "../components/HomePage/HomePage";
import BlogPage from "../components/Blog/BlogPage";
import ArticlePage from "../components/Blog/ArticlePage";
import LandingPage from "../components/LandingPage/LandingPage";

// Initialize Optimizely CMS SDK registries (content types)
initializeOptimizely();

// Register React component resolver from a Next server module so .tsx
// imports are handled by Next's compiler instead of Node's ESM loader.
registerReactComponentResolver({
  HomePage,
  BlogPage,
  ArticlePage,
  LandingPage,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Training Site - Powered by Optimizely CMS",
  description: "A modern learning platform built with Optimizely CMS and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
