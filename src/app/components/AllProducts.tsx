'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// প্রোডাক্ট টাইপের জন্য ইন্টারফেস ডিফাইন করা
interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  slug: string;
}

export default function AllProducts() {
  // সকল পণ্যের তালিকা
  const products: Product[] = [
    {
      id: 414,
      title: 'Pearl Heart Pendant 18k Gold Plated Necklace-414',
      image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
      price: 650,
      originalPrice: 990,
      discount: 34,
      slug: 'pearl-heart-pendant-414',
    },
    {
      id: 413,
      title: 'Geometric Tassel Pendant 18k Gold Plated Necklace-413',
      image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
      price: 590,
      originalPrice: 890,
      discount: 34,
      slug: 'geometric-tassel-pendant-413',
    },
    {
      id: 412,
      title: 'Pearl Shell Pendant 18k Gold Plated Necklace-412',
      image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
      price: 590,
      originalPrice: 890,
      discount: 34,
      slug: 'pearl-shell-pendant-412',
    },
    {
      id: 411,
      title: 'Moonstone Crescent 18k Gold Plated Necklace-411',
      image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
      price: 550,
      originalPrice: 890,
      discount: 38,
      slug: 'moonstone-crescent-411',
    },
    {
      id: 410,
      title: 'Four Love Heart Shape 18k Gold Plated Necklace-410',
      image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
      price: 550,
      originalPrice: 890,
      discount: 38,
      slug: 'four-love-heart-410',
    },
  ];

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        {/* শিরোনাম এবং "See More" বাটন */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="text-gray-800">All</span>{' '}
            <span className="text-yellow-500">Products</span>
          </h2>
          <Link
            href="/products"
            className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition duration-200"
          >
            See More
          </Link>
        </div>

        {/* প্রোডাক্ট গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* ডিসকাউন্ট লেবেল */}
              <div className="relative">
                <span className="absolute top-2 left-2 bg-pink-600 text-white text-sm font-bold px-2 py-1 rounded-sm">
                  -{product.discount}%
                </span>
                <div className="aspect-square relative">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover w-full h-full"
                    priority={index === 0}
                  />
                </div>
              </div>

              {/* প্রোডাক্ট বিবরণ */}
              <div className="p-4">
                <Link href={`/product/${product.slug}`}>
                  <h3 className="text-sm font-semibold text-gray-800 mb-2 hover:text-pink-600 line-clamp-2 h-10">
                    {product.title}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-pink-600 font-bold">৳ {product.price}</span>
                  <span className="text-gray-500 line-through text-sm">
                    ৳ {product.originalPrice}
                  </span>
                </div>

                <Link
                  href={`/product/${product.slug}`}
                  className="block text-center w-full py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600 transition duration-200"
                >
                  অর্ডার করুন
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
