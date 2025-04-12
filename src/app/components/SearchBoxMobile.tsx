/* |----------------------------------------- 
| setting up SearchBarMobile for the App 
| @author: Toufiquer Rahman<toufiquer.0@gmail.com> 
| @copyright: Toufiquer, April, 2025 
|----------------------------------------- */
'use client';

import { useState } from 'react';

const SearchBoxMobile = () => {
  const [searchText, setSearchText] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearch = () => {
    if (searchText.trim()) {
      window.location.href = `/search/${searchText}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSearchText('');
  };

  return (
    <main className="w-full block md:hidden">
      {/* Search Button */}
      {!isDialogOpen && (
        <button
          onClick={openDialog}
          className="flex items-center justify-center px-4 py-2 bg-[#f16514] text-white rounded-full hover:bg-[#f16514b0] w-full max-w-[200px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
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
          Search
        </button>
      )}

      {/* Search Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 backdrop-blur-3xl bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Search</h3>
              <button onClick={closeDialog} className="text-gray-500 hover:text-gray-700">
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

            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="আপনার পছন্দের পণ্য খুঁজুন..."
                className="w-full text-gray-800 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                autoFocus
              />
              <button
                className="absolute right-0 top-0 h-full px-4 bg-[#f16514] text-white rounded-r-full hover:bg-[#f16514b0]"
                onClick={handleSearch}
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
        </div>
      )}
    </main>
  );
};

export default SearchBoxMobile;
