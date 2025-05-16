'use client';

import { useState } from 'react';

const SearchBox = () => {
  const [searchText, setSearchText] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchText.trim()) {
      window.location.href = `/search/${searchText}`;
    }
  };

  return (
    <main className="w-full hidden md:block">
      <div className=" flex-grow mx-10">
        <div className="relative">
          <input
            type="text"
            value={searchText || ''}
            onChange={e => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="আপনার পছন্দের পণ্য খুঁজুন..."
            className=" my-kalpurush-text text-xl w-full text-gray-800 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            className="absolute right-0 top-0 h-full px-4 bg-[#f16514] text-white rounded-r-full hover:bg-[#f16514b0]"
            onClick={() => searchText.trim() && (window.location.href = `/search/${searchText}`)}
          >
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
    </main>
  );
};
export default SearchBox;
