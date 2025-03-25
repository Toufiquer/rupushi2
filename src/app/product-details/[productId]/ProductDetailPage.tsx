import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, PhoneCall } from 'lucide-react';
import { IProduct } from '@/app/components/ProductsCard';

const ProductDetailPage = ({ product }: { product: IProduct }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleCreateOrder = () => {};
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">
        <div className="w-full">
          {/* Product Image */}
          <div className="relative aspect-square w-full">
            <Image
              src={product.img || '/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className="w-full">
          {/* Product Details */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>

            {/* Product Code */}
            <p className="text-gray-600">Product Code: {product['product-code']}</p>

            {/* Pricing */}
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-red-600">৳ {product.discountedPrice}</span>
              <span className="line-through text-gray-500">৳ {product.realPrice}</span>
              {product.offer && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  Save {product.offer} %
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span>Quantity:</span>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-1 bg-gray-100 cursor-pointer"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-1 bg-gray-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-row gap-4">
                  {' '}
                  <button
                    onClick={handleCreateOrder}
                    type="button"
                    className="flex-1 cursor-pointer bg-[#e39366] font-semibold text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-[hsl(22,40%,59%)] transition"
                  >
                    <span>অর্ডার করুন</span>
                  </button>
                  <button
                    onClick={handleCreateOrder}
                    type="button"
                    className="flex-1 cursor-pointer bg-green-600 font-semibold text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-700 transition"
                  >
                    <ShoppingCart />
                    <span>Buy Now</span>
                  </button>
                </div>
                <button
                  onClick={handleCreateOrder}
                  type="button"
                  className="flex-1 cursor-pointer bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition"
                >
                  <div className="flex flex-col items-center">
                    <span>অর্ডার করতে কল করুন</span>
                    <span className="flex items-center justify-center gap-2 mt-1">
                      <PhoneCall />
                      <p>+880 111 1015 125</p>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-4 mt-8">
            <div className="flex w-full gap-8 flex-col md:mt-12 mt-4 font-semibold text-slate-500">
              <div className="w-full flex items-center justify-between border-b-1 border-slate-400">
                <p className="font-normal">ঢাকায় ডেলিভারি খরচ </p>
                <p className="text-slate-700">৳ 60</p>
              </div>
              <div className="w-full flex items-center justify-between border-b-1 border-slate-400">
                <p className="font-normal">ঢাকার বাইরের ডেলিভারি খরচ</p>
                <p className="text-slate-700">৳ 130</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        {' '}
        {/* Product Details */}
        <div className="border-t pt-4">
          <h2 className="mb-2 bg-[#e39366] font-bold text-3xl text-slate-100 rounded-sm p-2">
            Product Details
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Material:</strong> {product.material}
            </li>
            <li>
              <strong>Design:</strong> {product.design}
            </li>
            <li>
              <strong>Color:</strong> {product.color}
            </li>
            <li>
              <strong>Weight:</strong> {product.weight}
            </li>
            <li>
              <strong>Chain Length:</strong> {product['chain length']}
            </li>
            <li>
              <strong>Style:</strong> {product.style}
            </li>
          </ul>
        </div>
        {/* Description */}
        <div className="border-t pt-4">
          <h2 className="font-semibold mb-2">Description</h2>
          <p>{product['description-top']}</p>
          <p className="mt-2">{product['description-bottom']}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
