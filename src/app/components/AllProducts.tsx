/*
|-----------------------------------------
| setting up AllProducts for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi-2.0, March, 2025
|-----------------------------------------
*/

'use client';

import { useEffect, useState } from 'react';
import ProductCard, { Product } from '../components/ProductsCard';

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        console.log(' all products data : ', data.data);
        setAllProducts(data.data);
      });
  }, []);
  const onClick = () => {};
  let renderProducts = (
    <div className="text-center w-full h-screen flex items-center justify-center text-2xl">
      Loading...
    </div>
  );
  if (allProducts.length === 0) {
    renderProducts = (
      <div className="text-center w-full h-screen flex items-center justify-center text-2xl">
        No Products Found
      </div>
    );
  }
  if (allProducts.length > 0) {
    renderProducts = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allProducts.map(product => (
          <div key={product['product-code']}>
            <ProductCard productData={product} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <main className="w-full flex flex-col py-12">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 py-3 tracking-tight w-full">
          All Products
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
      <div className="">{renderProducts}</div>
    </main>
  );
};
export default AllProducts;
