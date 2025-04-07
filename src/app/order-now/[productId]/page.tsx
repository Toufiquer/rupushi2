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
import { useParams } from 'next/navigation';
import Checkout from './Checkout';
import Link from 'next/link';

const AllProducts = () => {
  const [showAllProducts, setShowAllProducts] = useState<IProduct[]>([]);
  const [showFilterProducts, setShowFilterProducts] = useState<IProduct[]>([]);
  const productsPerPage = 8;

  // Get the productId from the URL
  const params = useParams();
  const productId = params?.productId as string;

  // Fetch products on component mount
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.data.length > 0) {
          // Filter products by category
          const filteredProducts = data.data.filter((product: IProduct) =>
            product.id ? product.id.toLowerCase() === productId.toLowerCase() : false,
          );
          setShowFilterProducts(filteredProducts);
          // Initially show first 8 products
          setShowAllProducts(data.data.slice(0, productsPerPage));
        }
      });
  }, [productId]);

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
