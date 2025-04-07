/*
|-----------------------------------------
| setting up AllProducts for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi-2.0, March, 2025
|-----------------------------------------
*/

'use client';

import { useEffect, useState } from 'react';
import { IProduct } from '../../components/ProductsCard';
import Checkout from '../../cart/Checkout';
import Link from 'next/link';

const AllProducts = () => {
  const [showFilterProducts, setShowFilterProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get product from localStorage on component mount
  useEffect(() => {
    const cartItem = localStorage.getItem('selectedProduct');
    if (cartItem) {
      const product = JSON.parse(cartItem);
      setShowFilterProducts([product]);
    }
    setIsLoading(false);
  }, []);

  let renderProducts = (
    <div className="text-center w-full h-screen flex items-center justify-center text-2xl">
      Loading...
    </div>
  );

  if (!isLoading && showFilterProducts.length === 0) {
    renderProducts = (
      <div className="text-center w-full h-screen flex items-center justify-center text-2xl">
        No Product Selected
      </div>
    );
  }

  if (showFilterProducts.length > 0) {
    renderProducts = (
      <div className="w-full flex flex-col gap-4">
        <Checkout products={showFilterProducts} />
        <Link href="/">
          <button className="w-full cursor-pointer mt-12 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition">
            আরো প্রোডাক্ট দেখুন
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="container max-w-7xl">
        <main className="w-full flex flex-col py-12">
          <div className="w-full flex flex-col">
            <div className="w-full">{renderProducts}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllProducts;
