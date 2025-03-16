'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from './Pagination';

// প্রডাক্ট এর টাইপ ডেফিনিশন
interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  isNew?: boolean;
  inStock: boolean;
  slug: string;
}

interface ProductListProps {
  products: Product[];
  title?: string;
  initialPage?: number;
  productsPerPage?: number;
  baseUrl?: string;
}

export default function ProductList({
  products,
  title = 'আমাদের পণ্যসমূহ',
  initialPage = 1,
  productsPerPage = 12,
  baseUrl = '/products',
}: ProductListProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  console.log(setCurrentPage);
  // পেজিনেশন লজিক
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {title && <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{title}</h2>}

      {/* পণ্য গ্রিড */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {currentProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <Link href={`/product/${product.slug}`}>
              <div className="relative pt-[100%]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
                    নতুন
                  </span>
                )}
                {product.discountPrice && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                    ছাড়
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-2">
                  {product.discountPrice ? (
                    <>
                      <span className="text-pink-600 font-bold">৳{product.discountPrice}</span>
                      <span className="text-gray-500 text-sm line-through">৳{product.price}</span>
                    </>
                  ) : (
                    <span className="text-pink-600 font-bold">৳{product.price}</span>
                  )}
                </div>
                {!product.inStock && (
                  <span className="text-red-500 text-xs block mt-1">স্টক শেষ</span>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* পেজিনেশন */}
      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={baseUrl} />
    </div>
  );
}
