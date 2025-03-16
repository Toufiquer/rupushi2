'use client';

import React from 'react';
import Link from 'next/link';

export default function TopBar() {
  return (
    <div className="bg-pink-600 text-white py-2 hidden md:block">
      <div className="container mx-auto flex justify-end items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:underline duration-200">
            Home
          </Link>
          <span>|</span>
          <Link href="/about-us" className="hover:underline duration-200">
            About Us
          </Link>
          <span>|</span>
          <Link href="/terms-condition" className="hover:underline duration-200">
            Terms & Condition
          </Link>
          <span>|</span>
          <Link href="/privacy-policy" className="hover:underline duration-200">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
