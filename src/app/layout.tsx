import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import TopMarquee from './components/TopMarquee';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'রূপশী ২.০',
  description: 'রূপশী ২.০ অ্যাপ্লিকেশন',
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/icon-192x192.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="light">
      <body
        className={`${inter.className} bg-white text-gray-900 overflow-x-hidden flex flex-col min-h-screen`}
      >
        <div className="w-full bg-pink-600 flex items-center justify-between px-2">
          <TopMarquee />
          <div className="w-full hidden md:block">
            <TopBar />
          </div>
        </div>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
