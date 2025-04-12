/*
|-----------------------------------------
| setting up AllProducts for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi-2.0, March, 2025
|-----------------------------------------
*/

'use client';

import Checkout from './Checkout';
import Link from 'next/link';
import { useStore } from '@/app/utils/useStore';
import LoadingComponent from '@/components/common/Loading';
import { useState } from 'react';
import { Check } from 'lucide-react';

const AllProducts = () => {
  const { cart, textMessage } = useStore();

  let renderProducts = <LoadingComponent />;
  const textFirstStyle = 'bg-green-400 text-black';
  const textConfirmStyle = 'bg-green-600 text-white';
  if (cart.length > 0) {
    renderProducts = (
      <div className="w-full flex flex-col gap-4">
        <h2
          className={`text-lg text-center font-semibold p-3 rounded ${textMessage.isFirst ? textFirstStyle : textConfirmStyle}`}
        >
          <span className="flex items-center justify-center gap-2">
            {!textMessage.isFirst && <Check className="font-bold" />}
            {textMessage.message}
          </span>
        </h2>
        <Checkout allProducts={cart} />
        <Link href="/">
          <button className="w-full cursor-pointer mt-12 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition">
            আরো প্রোডাক্ট দেখুন
          </button>
        </Link>
      </div>
    );
  }
  return (
    <main className="w-full flex flex-col py-12 items-center justify-center">
      <div className="w-full flex flex-col max-w-7xl">
        <div className="w-full">{renderProducts}</div>
      </div>
    </main>
  );
};
export default AllProducts;
