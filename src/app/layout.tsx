import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/data/site';
import { LenisProvider } from '@/lib/providers/LenisProvider';
import { MotionProvider } from '@/lib/providers/MotionProvider';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { MobileBottomBar } from '@/components/common/MobileBottomBar';
import { CustomCursor } from '@/components/common/CustomCursor';
import { JsonLd } from '@/components/common/JsonLd';
import { ScrollProgressBar } from '@/components/common/ScrollProgressBar';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
  variable: '--font-cormorant',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: siteConfig.seo.metaTitle,
  description: siteConfig.seo.metaDescription,
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="font-sans antialiased text-green bg-ivory selection:bg-green selection:text-ivory">
        <LenisProvider>
          <MotionProvider>
            <ScrollProgressBar />
            <CustomCursor />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <MobileBottomBar />
          </MotionProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
