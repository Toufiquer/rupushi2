'use client';

import React from 'react';
import ProductList from './ProductList';

// নমুনা পণ্য ডাটা
const sampleProducts = [
  {
    id: 1,
    name: 'ডায়মন্ড কাট ইয়াররিং গোল্ড',
    price: 850,
    discountPrice: 699,
    image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
    isNew: true,
    inStock: true,
    slug: 'diamond-cut-earrings-gold',
  },
  {
    id: 2,
    name: 'জারকন স্টোন ইয়াররিং সিলভার',
    price: 750,
    discountPrice: 650,
    image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
    isNew: false,
    inStock: true,
    slug: 'zircon-stone-earrings-silver',
  },
  {
    id: 3,
    name: 'ভাইরাল ইয়াররিং সেট',
    price: 1200,
    image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
    isNew: false,
    inStock: true,
    slug: 'viral-earrings-set',
  },
  {
    id: 4,
    name: 'ট্রেন্ডি ইয়াররিং',
    price: 950,
    discountPrice: 799,
    image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
    isNew: true,
    inStock: true,
    slug: 'trendy-earrings',
  },
  {
    id: 5,
    name: 'পেন্ডেন্ট নেকলেস গোল্ড প্লেটেড',
    price: 1500,
    discountPrice: 1299,
    image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
    isNew: false,
    inStock: true,
    slug: 'pendant-necklace-gold-plated',
  },
  {
    id: 6,
    name: 'নেকলেস সেট ডায়মন্ড কাট',
    price: 2500,
    image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
    isNew: false,
    inStock: false,
    slug: 'necklace-set-diamond-cut',
  },
  {
    id: 7,
    name: 'প্রিমিয়াম ইয়াররিং কালেকশন',
    price: 1800,
    discountPrice: 1550,
    image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
    isNew: true,
    inStock: true,
    slug: 'premium-earrings-collection',
  },
  {
    id: 8,
    name: 'জারকন স্টোন নেকলেস',
    price: 2200,
    image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
    isNew: false,
    inStock: true,
    slug: 'zircon-stone-necklace',
  },
  {
    id: 9,
    name: 'চকলেট কালার ইয়াররিং',
    price: 750,
    discountPrice: 650,
    image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
    isNew: false,
    inStock: true,
    slug: 'chocolate-color-earrings',
  },
  {
    id: 10,
    name: 'সিলভার প্লেটেড ব্রেসলেট',
    price: 1100,
    discountPrice: 950,
    image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
    isNew: true,
    inStock: true,
    slug: 'silver-plated-bracelet',
  },
  {
    id: 11,
    name: 'প্রিমিয়াম পেন্ডেন্ট নেকলেস',
    price: 1900,
    image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
    isNew: false,
    inStock: true,
    slug: 'premium-pendant-necklace',
  },
  {
    id: 12,
    name: 'ডায়মন্ড কাট সেট পিস',
    price: 3500,
    discountPrice: 2999,
    image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
    isNew: true,
    inStock: true,
    slug: 'diamond-cut-set-piece',
  },
  {
    id: 13,
    name: 'কানের দুল সেট - ৬ পিস',
    price: 1500,
    discountPrice: 1200,
    image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
    isNew: false,
    inStock: true,
    slug: 'earrings-set-6-pieces',
  },
  {
    id: 14,
    name: 'নেকলেস এবং ইয়াররিং সেট',
    price: 2800,
    image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
    isNew: true,
    inStock: true,
    slug: 'necklace-and-earrings-set',
  },
  {
    id: 15,
    name: 'প্রিমিয়াম স্টোন সেট',
    price: 4500,
    discountPrice: 3999,
    image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
    isNew: false,
    inStock: true,
    slug: 'premium-stone-set',
  },
  {
    id: 16,
    name: 'সিলভার প্লেটেড ডায়মন্ড কাট সেট',
    price: 3200,
    discountPrice: 2899,
    image: 'https://kanerdul.com/public/product/67667ef225627.jpg',
    isNew: true,
    inStock: true,
    slug: 'silver-plated-diamond-cut-set',
  },
];

export default function ProductListExample() {
  return (
    <div className="py-4">
      <ProductList
        products={sampleProducts}
        title="আমাদের বেস্ট সেলিং পণ্যসমূহ"
        productsPerPage={8}
        baseUrl="/products"
      />
    </div>
  );
}
