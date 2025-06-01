'use client';

import React from 'react';
import { ShoppingCart, PhoneCall } from 'lucide-react';
import { IProduct } from '@/app/components/ProductsCard';
import { useRouter } from 'next/navigation';
import { useStore } from '@/app/utils/useStore';
import { toast } from 'react-toastify';
import ImageNextComponents from './ImageNextComponents';
import Image from 'next/image';
import { sendGTMEvent } from '@next/third-parties/google';

const ProductDetailPage = ({ product }: { product: IProduct }) => {
  const productsCods = ['RJ110', 'RJ111'];
  const productPromoCods = ['LUCKY001'];
  const isPromotionCode = productPromoCods.includes(product['product-code']);
  console.log('isDisabled ; :', isPromotionCode);
  const router = useRouter();
  const { cart, updateCart, setIsFetchingCartComplete } = useStore();
  const handleAddToCart = () => {
    const fireGTMEvent = (currentCartValue: IProduct) => {
      console.log('Calling sendGTMEvent with cart:', currentCartValue);
      sendGTMEvent({
        event: 'add_to_cart',
        currency: 'BDT',
        product: { ...currentCartValue },
      });
    };
    fireGTMEvent(product);
    if (productsCods.includes(product['product-code'])) {
      toast.warn('Product is not available at this moment, please order later.');
      return;
    }
    // Convert IProduct to CartItem format
    const cartItem: IProduct = product;

    // ! update cart
    let newUpdateCart: typeof cart = [];
    if (cart?.length === 0) {
      cartItem.quantity = !cartItem.quantity ? 1 : cartItem.quantity + 1;
      newUpdateCart = [cartItem];
    } else {
      const isExist = cart.filter(curr => curr.id === product.id);
      if (isExist) {
        // ! update quantity
        const newCartItem = { ...cartItem };
        newCartItem.quantity = !newCartItem.quantity ? 1 : newCartItem.quantity + 1;
        const filteredCart = cart.filter(curr => curr.id !== newCartItem.id);
        newUpdateCart = [...filteredCart, newCartItem];
      } else {
        newUpdateCart = [...cart, cartItem];
      }
    }
    updateCart(newUpdateCart);
    setIsFetchingCartComplete(true);
    // Add item to Zustand store
    // addItem(cartItem);
    router.push('/cart');
  };
  const handleCall = () => {
    if (productsCods.includes(product['product-code'])) {
      toast.warn('Product is not available at this moment, please order later.');
      return;
    }
    window.location.href = `tel:01560006643`; // Replace spaces in number for dial pad compatibility
  };
  return (
    <div className="w-full flex items-center justify-center px-2 mt-[-10px]">
      <div className="container max-w-7xl flex flex-col gap-8 pt-4">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-2 md:gap-8">
          <div className="w-full lg:max-w-[440px] xl:pl-[2px]">
            {product.allImages?.length > 0 ? (
              <ImageNextComponents allImages={product.allImages} />
            ) : (
              <div className="relative aspect-square w-full mt-[20px]">
                <Image
                  src={product.img || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
          <div className="w-full">
            {/* Product Details */}
            <div className="space-y-4">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
                <span className="mt-2 lg:mt-[52px] xl:mt-[44px] block">{product.name}</span>
              </h1>

              {/* Product Code */}
              <p className="text-gray-600">Product Code: {product['product-code']}</p>

              {/* Pricing */}
              <div className="flex items-center space-x-4 lg:mt-8">
                <span className="text-2xl font-bold text-red-600">৳ {product.discountedPrice}</span>
                {!isPromotionCode && (
                  <span className="line-through text-gray-500">৳ {product.realPrice}</span>
                )}
                {product.offer && !isPromotionCode ? (
                  <span className="bg-green-100 text-green-800 px-2 lg:py-1 rounded-full text-sm">
                    Save {product.offer} %
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-800 px-2 lg:py-1 rounded-full text-sm">
                    In Stock
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-8">
                <div className="w-full flex flex-col gap-4">
                  <div className="w-full flex flex-row gap-4">
                    <div
                      onClick={handleAddToCart}
                      className="flex-1 cursor-pointer bg-[#e39366] font-semibold text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-[hsl(22,40%,59%)] transition"
                    >
                      <button
                        type="button"
                        className="flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <span className=" my-kalpurush-text text-xl font-normal">অর্ডার করুন</span>
                      </button>
                    </div>

                    <div className="flex-1 cursor-pointer bg-green-600 font-semibold text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-700 transition">
                      <button
                        onClick={handleAddToCart}
                        type="button"
                        className="flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <ShoppingCart />
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleCall}
                    type="button"
                    className="flex-1 cursor-pointer bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition"
                  >
                    <div className="flex flex-col items-center">
                      <span className=" my-kalpurush-text text-2xl font-normal">
                        অর্ডার করতে কল করুন
                      </span>
                      <span className="flex items-center justify-center gap-2 mt-1">
                        <PhoneCall />
                        <p>+88 01560006643</p>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            {isPromotionCode ? (
              <div className="font-semibold  my-kalpurush-text text-xl w-full bg-rose-600 text-white p-4 rounded-md mt-4 hidden lg:block">
                <p>পুরো বাংলাদেশে ডেলিভারি চার্জ ফ্রি</p>
              </div>
            ) : (
              <div className="space-y-4 mt-8 hidden lg:block">
                <div className="flex w-full gap-8 flex-col md:mt-12 mt-4 font-semibold text-slate-500">
                  <div className="w-full flex items-center justify-between border-b-1 border-slate-400">
                    <p className="font-normal my-kalpurush-text text-xl">ঢাকায় ডেলিভারি খরচ </p>
                    <p className="text-slate-700">৳ 60</p>
                  </div>
                  <div className="w-full flex items-center justify-between border-b-1 border-slate-400">
                    <p className="font-normal  my-kalpurush-text text-xl">
                      ঢাকার বাইরের ডেলিভারি খরচ
                    </p>
                    <p className="text-slate-700">৳ 130</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {isPromotionCode ? (
          <div className="font-semibold  my-kalpurush-text text-xl w-full bg-rose-600 text-white p-4 rounded-md -mt-4 block lg:hidden">
            <p>পুরো বাংলাদেশে ডেলিভারি চার্জ ফ্রি</p>
          </div>
        ) : (
          <div className="space-y-4 block lg:hidden">
            <div className="flex w-full gap-8 flex-col font-semibold text-slate-500">
              <div className="w-full flex items-center justify-between border-b-1 border-slate-400">
                <p className="font-normal  my-kalpurush-text text-xl">ঢাকায় ডেলিভারি খরচ </p>
                <p className="text-slate-700">৳ 60</p>
              </div>
              <div className="w-full flex items-center justify-between border-b-1 border-slate-400">
                <p className="font-normal  my-kalpurush-text text-xl">ঢাকার বাইরের ডেলিভারি খরচ</p>
                <p className="text-slate-700">৳ 130</p>
              </div>
            </div>
          </div>
        )}
        <div className="w-full">
          {/* Product Details */}
          <div className="pt-1">
            <h2 className="mb-2 bg-[#e39366] font-bold text-2xl text-slate-800 rounded-sm p-2">
              Product Details
            </h2>
            <ul className="space-y-2 text-gray-700">
              {product.material && (
                <li>
                  <strong>Material:</strong> {product.material}
                </li>
              )}
              {product.design && (
                <li>
                  <strong>Design:</strong> {product.design}
                </li>
              )}
              {product.color && (
                <li>
                  <strong>Color:</strong> {product.color}
                </li>
              )}
              {product.weight && (
                <li>
                  <strong>Weight:</strong> {product.weight}
                </li>
              )}
              {product['chain length'] && (
                <li>
                  <strong>Chain Length:</strong> {product['chain length']}
                </li>
              )}
              {product.style && (
                <li>
                  <strong>Style:</strong> {product.style}
                </li>
              )}
            </ul>
          </div>
          {/* Description */}
          {product.descriptionData ? (
            <main
              className="rich-text-content 
              [&_s]:line-through [&_del]:line-through 
              [&_u]:underline 
              [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:pl-2 
              [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:pl-2 
              [&_li]:mb-2 
              [&_mark]:bg-yellow-200 [&_mark]:px-0.5 [&_mark]:rounded-sm
              [&_.text-left]:text-left 
              [&_.text-center]:text-center 
              [&_.text-right]:text-right 
              [&_.text-justify]:text-justify"
              dangerouslySetInnerHTML={{ __html: product.descriptionData }}
            />
          ) : (
            <div className="border-t pt-4">
              <h2 className="font-semibold text-black">Description</h2>
              <p>{product['description-top']}</p>
              <p className="mt-2">{product['description-bottom']}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
