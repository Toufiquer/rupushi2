'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import TopMarquee from './TopMarquee';

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPosition, setScrollLeftPosition] = useState(0);
  const [autoplayInterval, setAutoplayInterval] = useState<NodeJS.Timeout | null>(null);

  console.log(autoplayInterval);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftPosition(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeftPosition - walk;
  };

  // টাচ ইভেন্ট হ্যান্ডলারস
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeftPosition(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeftPosition - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // স্লাইডার নেভিগেশন ফাংশন
  const scrollLeftHandler = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };

  const scrollRightHandler = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
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

  const categoryMenuItems = [
    { name: 'Diamond Cut Earrings', href: '/category/diamond-cut-earrings' },
    { name: 'Zircon Stone Earrings', href: '/category/zircon-stone-earrings' },
    { name: 'Viral Errings', href: '/category/viral-earrings' },
    { name: 'Trendy Earrings', href: '/category/trendy-earrings' },
    { name: 'Pendant Necklace', href: '/category/pendant-necklace' },
    { name: 'Necklace Set', href: '/category/necklace-set' },
    { name: 'Offer Products', href: '/category/offer-products' },
    { name: 'All Earrings Collection', href: '/category/all-earrings-collection' },
    { name: 'Premium Collection', href: '/category/premium-collection' },
    { name: 'Premium Earrings', href: '/category/premium-earrings' },
  ];

  return (
    <>
      {/* Desktop navigation with TopMarquee */}
      <div className="bg-pink-600 text-white py-2">
        <div className="container mx-auto flex justify-between items-center px-2">
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

      {/* Search Bar - visible on all devices */}
      <div className="bg-white shadow-md py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-pink-600">
              RUPUSHI
            </Link>
          </div>

          {/* Search Box */}
          <div className="hidden md:block flex-grow mx-10">
            <div className="relative">
              <input
                type="text"
                placeholder="আপনার পছন্দের পণ্য খুঁজুন..."
                className="w-full text-gray-800 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-pink-600 text-white rounded-r-full hover:bg-pink-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            {isMenuOpen ? (
              <button onClick={toggleMenu} className="text-pink-600 focus:outline-none">
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
              <button onClick={toggleMenu} className="text-pink-600 focus:outline-none">
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
            <Link href="/account" className="text-gray-700 hover:text-pink-600">
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
            <Link href="/wishlist" className="text-gray-700 hover:text-pink-600">
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
            <Link href="/cart" className="text-gray-700 hover:text-pink-600">
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

      {/* Category Slider Menu - visible on all devices */}
      <div className="bg-gray-100 py-3 overflow-hidden relative">
        {/* বাম নেভিগেশন বাটন */}
        <button
          onClick={scrollLeftHandler}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-r-md p-2 shadow-md z-10 text-pink-600 hover:text-pink-700 focus:outline-none"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="container mx-auto px-4">
          <div
            ref={sliderRef}
            className="flex items-center space-x-4 overflow-x-auto no-scrollbar scroll-smooth px-8"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth',
              padding: '0.75rem 0',
            }}
          >
            {categoryMenuItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="whitespace-nowrap px-6 py-2 bg-white rounded-md shadow-sm text-gray-700 hover:text-pink-600 hover:shadow-md transition-all duration-200 flex-shrink-0"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* ডান নেভিগেশন বাটন */}
        <button
          onClick={scrollRightHandler}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-l-md p-2 shadow-md z-10 text-pink-600 hover:text-pink-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
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
            <Link href="/" className="block py-2 text-gray-800 hover:text-pink-600">
              Home
            </Link>
            <Link href="/about-us" className="block py-2 text-gray-800 hover:text-pink-600">
              About Us
            </Link>
            <Link href="/terms-condition" className="block py-2 text-gray-800 hover:text-pink-600">
              Terms & Condition
            </Link>
            <Link href="/privacy-policy" className="block py-2 text-gray-800 hover:text-pink-600">
              Privacy Policy
            </Link>

            {/* Category links added to mobile menu */}
            <div className="mt-2 pt-2 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">ক্যাটাগরি</h3>
              {categoryMenuItems.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className="block py-2 text-gray-800 hover:text-pink-600"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
          <div className="flex justify-around py-3 border-t">
            <Link href="/account" className="text-gray-700 hover:text-pink-600">
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
            <Link href="/wishlist" className="text-gray-700 hover:text-pink-600">
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
            <Link href="/cart" className="text-gray-700 hover:text-pink-600">
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
      )}
    </>
  );
}
