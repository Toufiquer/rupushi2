'use client';

import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  // কোন পৃষ্ঠাগুলি দেখাতে হবে তা গণনা
  const getPagesToShow = () => {
    const pages = [];

    // সর্বদা প্রথম পৃষ্ঠা দেখান
    pages.push(1);

    // চলমান পৃষ্ঠার আশেপাশের পৃষ্ঠাগুলি
    const range = 2; // কতগুলি পৃষ্ঠা দেখাবে তা নির্ধারণ করে

    for (
      let i = Math.max(2, currentPage - range);
      i <= Math.min(totalPages - 1, currentPage + range);
      i++
    ) {
      pages.push(i);
    }

    // সর্বদা শেষ পৃষ্ঠা দেখান
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    // সাজানো এবং ডুপ্লিকেট অপসারণ
    return [...new Set(pages)].sort((a, b) => a - b);
  };

  const pages = getPagesToShow();

  // লিঙ্কের জন্য URL তৈরি করে
  const getPageUrl = (page: number) => {
    return `${baseUrl}${page === 1 ? '' : `?page=${page}`}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center my-8">
      <div className="flex items-center space-x-2">
        {/* পূর্ববর্তী পৃষ্ঠা বাটন */}
        {currentPage > 1 && (
          <Link href={getPageUrl(currentPage - 1)}>
            <div className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>
        )}

        {/* পৃষ্ঠা নম্বর */}
        {pages.map((page, index) => {
          // যদি পৃষ্ঠাগুলির মধ্যে ফাঁক থাকে, তবে এলিপসিস দেখান
          if (index > 0 && page > pages[index - 1] + 1) {
            return (
              <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-500">
                ...
              </span>
            );
          }

          // পৃষ্ঠা লিঙ্ক
          return (
            <Link key={page} href={getPageUrl(page)}>
              <div
                className={`px-4 py-2 rounded-md transition duration-200 ${
                  currentPage === page
                    ? 'bg-pink-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                {page}
              </div>
            </Link>
          );
        })}

        {/* পরবর্তী পৃষ্ঠা বাটন */}
        {currentPage < totalPages && (
          <Link href={getPageUrl(currentPage + 1)}>
            <div className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
