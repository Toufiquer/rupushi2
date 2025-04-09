import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import { ToastContainer } from 'react-toastify';
import Script from 'next/script'; // Import the Script component

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'রূপশী',
  description: 'রূপশী অ্যাপ্লিকেশন',
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/icon-192x192.png',
  },
};

// Your Google Tag Manager ID
const GTM_ID = 'GTM-K8FG9RCH';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="light">
      {/*
        Google Tag Manager Script
        - Placed here to load early as recommended by Google and Next.js.
        - `strategy="afterInteractive"` is recommended for GTM by Next.js.
          It loads the script after the page becomes interactive but before main hydration.
      */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      {/* Note: The <head> tag is managed by Next.js via the `metadata` export and `Head` component (if used).
          The `next/script` component handles placing the script appropriately based on the strategy.
          While Google says "as high in the <head>", placing the next/script component here in the layout
          with the correct strategy achieves the desired loading behaviour in Next.js.
      */}
      <body
        className={`${inter.className} bg-white text-gray-900 overflow-x-hidden flex flex-col min-h-screen`}
      >
        {/* Google Tag Manager (noscript) - Fallback for users with JavaScript disabled */}
        {/* Placed immediately after the opening <body> tag as recommended */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Your Existing Components */}
        <TopBar />
        <main className="flex-grow ">{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
