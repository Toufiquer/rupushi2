/*
|-----------------------------------------
| setting up AllProducts for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi-2.0, March, 2025
|-----------------------------------------
*/

'use client';

import { useEffect, useState } from 'react';
import { IProduct } from '../components/ProductsCard';
import Checkout from './Checkout';
import Link from 'next/link';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { useStore } from '@/app/utils/useStore';

const AllProducts = () => {
  const [showFilterProducts, setShowFilterProducts] = useState<IProduct[]>([]);
  const { cart, updateCart } = useStore();
  useEffect(() => {
    if (cart.length > 0) {
      setShowFilterProducts(cart);
    }
  }, []);

  let renderProducts = (
    <div className="text-center w-full h-screen flex items-center justify-center text-2xl">
      Loading...
    </div>
  );
  if (showFilterProducts.length === 0) {
    renderProducts = (
      <div className="text-center w-full h-screen flex items-center justify-center text-2xl">
        No Products Found
      </div>
    );
  }
  if (showFilterProducts.length > 0) {
    renderProducts = (
      <div className="w-full flex flex-col gap-4">
        <Checkout product={showFilterProducts[0]} />
        <Link href="/">
          <button className="w-full cursor-pointer mt-12 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition">
            আরো প্রোডাক্ট দেখুন
          </button>
        </Link>
      </div>
    );
  }
  return (
    <main className="w-full flex flex-col py-12 p-12">
      <div className="w-full flex flex-col">
        <div className="w-full">{renderProducts}</div>
      </div>
    </main>
  );
};
export default AllProducts;
