/*
|-----------------------------------------
| setting up AllProducts for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi-2.0, March, 2025
|-----------------------------------------
*/

'use client';

import { useEffect, useState } from 'react';
import ProductCard, { IProduct } from '../../components/ProductsCard';
import { useParams } from 'next/navigation';
import ProductDetailPage from './ProductDetailPage';
import LoadingComponent from '@/components/common/Loading';

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [showAllProducts, setShowAllProducts] = useState<IProduct[]>([]);
  const [showFilterProducts, setShowFilterProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8;

  // Get the productId from the URL
  const params = useParams();
  const productId = params?.productId as string;

  // Fetch products on component mount
  useEffect(() => {
    try {
      fetch('/api/products')
        .then(res => res.json())
        .then(data => {
          if (data.data.length > 0) {
            // Filter products by category
            const filteredProducts = data.data.filter((product: IProduct) =>
              product.id ? product.id.toLowerCase() === productId.toLowerCase() : false,
            );
            setShowFilterProducts(filteredProducts);
            setAllProducts(data.data);
            // Initially show first 8 products
            setShowAllProducts(data.data.slice(0, productsPerPage));
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [productId]);

  // Pagination handler
  const handlePageChange = (pageNumber: number) => {
    // Calculate start and end indices for the current page
    const startIndex = (pageNumber - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Slice the products for the current page
    const pageProducts = allProducts.slice(startIndex, endIndex);

    // Update state
    setCurrentPage(pageNumber);
    setShowAllProducts(pageProducts);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  let renderProducts = <LoadingComponent />;

  if (showAllProducts.length > 0) {
    renderProducts = (
      <div className="w-full flex flex-col gap-4">
        <ProductDetailPage product={showFilterProducts[0]} />
        <div className="w-full flex items-center justify-center">
          <div className="container max-w-7xl">
            <div className="w-full flex flex-col gap-4 mt-12">
              <div className="border-b-2 border-gray-200 pb-4 w-full flex items-center justify-between mb-6 py-3">
                <h2 className=" text-xl md:text-3xl font-bold text-gray-900 tracking-tight w-full justify-center ">
                  Related Products
                </h2>
                <div className="w-full flex items-center justify-end"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 gap-2">
                {showAllProducts.map(product => (
                  <div key={product['product-code']}>
                    <ProductCard productData={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex items-center justify-center">
      <div className="container max-w-7xl">
        <main className="w-full flex flex-col py-12">
          <div className="w-full flex flex-col">
            <div className="w-full">{renderProducts}</div>
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
                        className={`px-4 py-2 ${currentPage === number ? ' text-green-600 cursor-text' : 'cursor-pointer hover:text-green-600'}`}
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
          </div>
        </main>
      </div>
    </div>
  );
};
export default AllProducts;
