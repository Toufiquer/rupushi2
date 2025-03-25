/*
|-----------------------------------------
| setting up NewArrival for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi-2.0, March, 2025
|-----------------------------------------
*/

'use client';

import { useEffect, useState } from 'react';
import ProductCard, { IProduct } from './ProductsCard';

const NewArrival = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [showAllProducts, setShowAllProducts] = useState<IProduct[]>([]);

  const productsPerPage = 4;

  // Fetch products on component mount
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.data.length > 0) {
          setAllProducts(data.data);
          // Initially show first 8 products
          setShowAllProducts(
            data.data.filter((i: IProduct) => i.isArrival).slice(0, productsPerPage),
          );
        }
      });
  }, []);

  // Calculate total number of pages
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const onClick = () => {};
  let renderProducts = (
    <div className="text-center w-full h-screen flex items-center justify-center text-2xl">
      Loading...
    </div>
  );
  if (showAllProducts.length === 0) {
    renderProducts = (
      <div className="text-center w-full h-screen flex items-center justify-center text-2xl">
        No Products Found
      </div>
    );
  }
  if (showAllProducts.length > 0) {
    renderProducts = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 gap-2">
        {showAllProducts.map(product => (
          <div key={product['product-code']}>
            <ProductCard productData={product} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <main className="w-full flex flex-col py-12">
      <div className="w-full flex items-center justify-between mb-6 py-3">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight w-full justify-center ">
          New Arrival
        </h2>
        <div className="w-full flex items-center justify-end">
          <button
            onClick={onClick}
            className={`px-4 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200 cursor-pointer`}
          >
            See More
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full">{renderProducts}</div>
      </div>
    </main>
  );
};
export default NewArrival;
