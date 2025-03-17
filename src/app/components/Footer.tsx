'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-pink-600 text-white w-full">
      <div className="container mx-auto py-6 px-4">
        {/* Policy Links */}
        <div className="md:hidden block">
          <div className="flex flex-wrap justify-center items-center border-b border-pink-500 pb-4 mb-4">
            <Link href="/about-us" className="mx-3 my-2 hover:underline text-lg font-medium">
              About Us
            </Link>
            <span className="hidden md:inline">|</span>

            <Link href="/terms-condition" className="mx-3 my-2 hover:underline text-lg font-medium">
              Terms & Condition
            </Link>
            <span className="hidden md:inline">|</span>

            <Link href="/privacy-policy" className="mx-3 my-2 hover:underline text-lg font-medium">
              Privacy Policy
            </Link>
            <span className="hidden md:inline">|</span>

            <Link href="/return-policy" className="mx-3 my-2 hover:underline text-lg font-medium">
              Return Policy
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} রূপশী - সমস্ত অধিকার সংরক্ষিত</p>
        </div>
      </div>
    </footer>
  );
}
