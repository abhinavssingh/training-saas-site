import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Footer, Header } from '@/components/layout';
import '@/lib/config';
// Initialize Optimizely SDK registries
import '@/optimizely';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ministry of Investment',
  description:
    'World-class infrastructure and strategic location at the crossroads of continents, enabling seamless connectivity',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
