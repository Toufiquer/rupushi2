'use client';

import React, { useState, useEffect } from 'react';

export default function TopMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const othersText = [
    'ফ্রি ডেলিভারি ৯৯৯ টাকা পারচেজ থেকে!',
    ' ৩০ দিনের রিটার্ন পলিসি ',
    ' ১০০% অরিজিনাল পণ্য গ্যারান্টি',
    ' কাস্টমার সার্ভিস: ০১৭৫৫-৫৫৫৫৫৫ ',
  ];
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
          {[...othersText].map((text, index) => (
            <span
              key={index}
              className={`mx-4 hover:text-yellow-200 transition-colors duration-300 ${text.includes('ফ্রি ডেলিভারি ৯৯৯ ') && 'text-yellow-100'}`}
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
