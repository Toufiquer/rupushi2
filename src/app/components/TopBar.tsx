'use client';

import React from 'react';
import Link from 'next/link';

export default function TopBar() {
  return (
    <div className="bg-pink-600 text-white py-2 hidden md:block">
      <div className="container mx-auto flex justify-end items-center">
        <div className="flex items-center space-x-4">
          <Link href="/about-us" className="hover:underline">
            About Us
          </Link>
          <span>|</span>
          <Link href="/terms-condition" className="hover:underline">
            Terms & Condition
          </Link>
          <span>|</span>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link href="/return-policy" className="hover:underline">
            Return Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
