'use client';

import React, { useState, useEffect } from 'react';

export default function TopMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const firstText = 'ফ্রি ডেলিভারি ৯৯৯ টাকা পারচেজ থেকে!';

  useEffect(() => {
    // Mark as loaded after component mounts
    setIsLoaded(true);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div className="marquee-container h-6">
        <div
          className={`marquee-content ${isPaused ? 'paused' : ''} ${isLoaded ? 'initial-visible' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          title="হোভার করলে থামবে"
        >
          <span className="mx-4 hover:text-yellow-200 transition-colors duration-300 first-text">
            {firstText}
          </span>
          <span className="mx-4 hover:text-yellow-200 transition-colors duration-300">
            ৩০ দিনের রিটার্ন পলিসি
          </span>
          <span className="mx-4 hover:text-yellow-200 transition-colors duration-300">
            ১০০% অরিজিনাল পণ্য গ্যারান্টি
          </span>
          <span className="mx-4 hover:text-yellow-200 transition-colors duration-300">
            কাস্টমার সার্ভিস: ০১৭৫৫-৫৫৫৫৫৫
          </span>
          <span className="mx-4 hover:text-yellow-200 transition-colors duration-300">
            {firstText}
          </span>
          <span className="mx-4 hover:text-yellow-200 transition-colors duration-300">
            ৩০ দিনের রিটার্ন পলিসি
          </span>
          <span className="mx-4 hover:text-yellow-200 transition-colors duration-300">
            ১০০% অরিজিনাল পণ্য গ্যারান্টি
          </span>
          <span className="mx-4 hover:text-yellow-200 transition-colors duration-300">
            কাস্টমার সার্ভিস: ০১৭৫৫-৫৫৫৫৫৫
          </span>
        </div>
      </div>
    </div>
  );
}
