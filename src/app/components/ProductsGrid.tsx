'use client';

import { useState, useEffect } from 'react';
import ProductCard, { IProduct } from './ProductsCard';
import LoadingComponent from '@/components/common/Loading';

// Client Component - handles display and pagination
interface ProductsGridProps {
  products: IProduct[];
  productsPerPage: number;
}

const ProductsGrid = ({ products, productsPerPage }: ProductsGridProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayedProducts, setDisplayedProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Generate page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Update displayed products when page changes or products prop changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setDisplayedProducts(products.slice(startIndex, endIndex));
    setIsLoading(false);
  }, [currentPage, products, productsPerPage]);

  // Pagination handler
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes (optional)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-xl text-slate-400 min-h-[40vh] flex items-center justify-center">
        Nothing was found.
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-4 gap-2">
          {displayedProducts.map(product => (
            <div key={product['product-code']}>
              <ProductCard productData={product} />
            </div>
          ))}
        </div>
      </div>

      {pageNumbers.length > 1 && (
        <div className="w-full">
          <div className="container mx-auto p-4">
            <div className="flex justify-center items-center mt-6 space-x-2">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:text-green-600 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Page number buttons */}
              {pageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`px-4 py-2 ${currentPage === number ? 'text-green-600 cursor-text' : 'cursor-pointer hover:text-green-600'}`}
                >
                  {number}
                </button>
              ))}

              {/* Next button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed hover:text-green-600 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsGrid;
