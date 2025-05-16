'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

import Link from 'next/link';
import TopMarquee from './TopMarquee';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import SearchBox from './SearchBox';
import { categoryMenuItems } from './Footer';
import { useStore } from '@/app/utils/useStore';
import SearchBoxMobile from './SearchBoxMobile';

// Add this above your component

export default function TopBar() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [autoplayInterval, setAutoplayInterval] = useState<NodeJS.Timeout | null>(null);
  const [cartProductLength, setCartProductLength] = useState(0);
  const { cart } = useStore();
  console.log(autoplayInterval);
  useEffect(() => {
    const cartItem = localStorage.getItem('cart');
    if (cartItem) {
      const products = JSON.parse(cartItem);
      setCartProductLength(products.length);
    }
  }, [setCartProductLength]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // অটোপ্লে স্লাইডার ফাংশন
  const startAutoplay = useCallback(() => {
    setAutoplayInterval(prevInterval => {
      if (prevInterval) clearInterval(prevInterval);

      const interval = setInterval(() => {
        if (sliderRef.current) {
          if (
            sliderRef.current.scrollLeft >=
            sliderRef.current.scrollWidth - sliderRef.current.clientWidth
          ) {
            // যদি শেষে পৌঁছায় তবে শুরুতে ফিরে যাবে
            sliderRef.current.scrollLeft = 0;
          } else {
            // অন্যথায় ধীরে ধীরে স্ক্রল করবে
            sliderRef.current.scrollLeft += 1;
          }
        }
      }, 20); // স্ক্রল স্পিড নিয়ন্ত্রণ করার জন্য

      return interval;
    });
  }, []);

  const stopAutoplay = useCallback(() => {
    setAutoplayInterval(prevInterval => {
      if (prevInterval) {
        clearInterval(prevInterval);
      }
      return null;
    });
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd);

    // অটোপ্লে শুরু
    startAutoplay();

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
      // ক্লিয়ার ইন্টারভাল
      stopAutoplay();
    };
  }, [startAutoplay, stopAutoplay]);

  // যখন ম্যানুয়ালি ড্র্যাগ করা হয় তখন অটোপ্লে বন্ধ করুন
  useEffect(() => {
    if (isDragging) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }, [isDragging, startAutoplay, stopAutoplay]);

  const RenderTopMarquee = () => (
    <div className="bg-[#f16514] text-white py-2">
      <div className=" container max-w-7xl mx-auto flex justify-between items-center px-2">
        {/* TopMarquee - visible on all devices */}
        <div className="flex-grow md:flex-grow-0 md:w-2/4">
          <TopMarquee />
        </div>

        {/* Desktop Navigation Links - hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4 md:pl-1">
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

  return (
    <>
      {/* Desktop navigation with TopMarquee */}
      {!['receipt', 'receipt-print', 'login', 'dashboard'].includes(pathname.split('/')[1]) && (
        <RenderTopMarquee />
      )}

      {/* Search Bar - visible on all devices */}
      {!['receipt', 'receipt-print', 'login', 'dashboard'].includes(pathname.split('/')[1]) && (
        <div className="bg-white shadow-md py-3 md:px-4 px-1">
          <div className=" container max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#f16514]">
                <div className="w-[160px] h-[30px] relative">
                  <div className="absolute top-[-15px] left-[-20px] md:left-0 w-full h-auto mb-4 pl-2 md:pl-0">
                    <Image
                      src="/rupushi-crop.png" // Replace with your actual logo path
                      alt="Rupush Logo"
                      width={200}
                      height={100}
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Search Box */}
            <SearchBox />
            <SearchBoxMobile />
            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              {isMenuOpen ? (
                <button onClick={toggleMenu} className="text-[rgb(245,112,35)] focus:outline-none">
                  {/* ক্রস আইকন */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              ) : (
                <button onClick={toggleMenu} className="text-[#f16514] focus:outline-none">
                  {/* হ্যামবার্গার আইকন */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              )}
            </div>
            {/* Desktop User Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/cart" className="text-gray-700 hover:text-[#f16514] relative">
                <span className="absolute -top-2 -right-2 bg-[#f16514] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {`${cart.length || 0}`}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="w-full h-screen fixed bg-slate-50 z-40">
          <div className="w-full flex items-center justify-end p-2">
            <button onClick={toggleMenu} className="text-[#f16514] focus:outline-none">
              {/* ক্রস আইকন */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="md:hidden bg-white shadow-lg transition-transform transform duration-300 ease-in-out translate-y-0">
            <div className="px-4 py-3 border-b">
              <input
                type="text"
                placeholder="আপনার পছন্দের পণ্য খুঁজুন..."
                className="w-full text-gray-800 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <div className="pt-2">
                <div className="px-4 text-center py-2 rounded-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition duration-200">
                  খুঁজুন...
                </div>
              </div>
            </div>
            <nav className="px-4 py-2">
              <Link href="/" className="block py-2 text-gray-800 hover:text-[#f16514]">
                Home
              </Link>
              <Link href="/about-us" className="block py-2 text-gray-800 hover:text-[#f16514]">
                About Us
              </Link>
              <Link
                href="/terms-condition"
                className="block py-2 text-gray-800 hover:text-[#f16514]"
              >
                Terms & Condition
              </Link>
              <Link
                href="/privacy-policy"
                className="block py-2 text-gray-800 hover:text-[#f16514]"
              >
                Privacy Policy
              </Link>

              {/* Category links added to mobile menu */}
              <div className="mt-2 pt-2 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">ক্যাটাগরি</h3>
                {categoryMenuItems.map((item, index) => (
                  <Link
                    href={item.href}
                    key={index}
                    className="block py-2 text-gray-800 hover:text-[#f16514]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="flex justify-around py-3 border-t">
              <Link href="/login" className="text-gray-700 hover:text-[#f16514]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
              <Link href="/wishlist" className="text-gray-700 hover:text-[#f16514]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-[#f16514] relative">
                <span className="absolute -top-2 -right-2 bg-[#f16514] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartProductLength}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
