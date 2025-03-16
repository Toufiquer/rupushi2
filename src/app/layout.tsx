import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "রূপশী ২.০",
  description: "রূপশী ২.০ অ্যাপ্লিকেশন",
  manifest: "/manifest.json",
  icons: {
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="light">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <main className="container mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
