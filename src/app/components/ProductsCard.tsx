'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useStore } from '@/app/utils/useStore';
import { useRouter } from 'next/navigation';

export interface IProduct {
  id: string;
  name: string;
  'product-code': string;
  img?: string;
  realPrice: string;
  discountedPrice?: string;
  offer?: string;
  stock: string;
  'description-top'?: string;
  'description-bottom'?: string;
  material?: string;
  design?: string;
  color?: string;
  weight?: string;
  category?: string;
  'chain length'?: string;
  style?: string;
  isDeleted?: boolean;
  isArrival?: boolean;
  isNew?: string;
  greenBox?: string;
  status: 'active' | 'inactive' | string;
  quantity?: number;
  price?: number;
  allImages: string[];
  descriptionData: string;
}
export const defaultIProduct = {
  id: 'default-product-id-123',
  name: 'Sample Product Name',
  'product-code': 'SKU-DEFAULT-001',
  img: 'https://example.com/images/default-product.jpg', // Optional: Placeholder image URL
  realPrice: '0.00',
  discountedPrice: undefined, // Optional: Not set by default
  offer: undefined, // Optional: No offer by default
  stock: '0',
  'description-top': 'Default top description text.', // Optional
  'description-bottom': 'Default bottom description text.', // Optional
  material: undefined, // Optional
  design: undefined, // Optional
  color: undefined, // Optional
  weight: undefined, // Optional
  category: undefined, // Optional
  'chain length': undefined, // Optional
  style: undefined, // Optional
  isDeleted: false, // Optional: Assuming not deleted by default
  isArrival: false, // Optional: Assuming not a new arrival by default
  isNew: undefined, // Optional: String field, maybe "false" or empty?
  greenBox: undefined, // Optional
  status: 'active', // Required: Defaulting to 'active'
  quantity: 0, // Optional: Defaulting quantity to 0
};
const ProductCard = ({ productData }: { productData: IProduct }) => {
  const router = useRouter();
  const { cart, updateCart, setIsFetchingCartComplete } = useStore();
  const handleAddToCart = () => {
    // Convert IProduct to CartItem format
    const cartItem: IProduct = productData;

    // ! update cart
    let newUpdateCart: typeof cart = [];
    if (cart.length === 0) {
      cartItem.quantity = !cartItem.quantity ? 1 : cartItem.quantity + 1;
      newUpdateCart = [cartItem];
    } else {
      const isExist = cart.filter(curr => curr.id === productData.id);
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

  return (
    <Card className="w-full max-w-sm overflow-hidden shadow-lg rounded-lg py-0 border-0 hover:shadow-2xl duration-200">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative w-full  aspect-square">
          <Link href={`/product-details/${productData.id}`}>
            <Image
              src={productData.img || '/placeholder.jpg'}
              alt={productData.name}
              fill
              className="object-cover"
            />
          </Link>
          {/* Offer Badge */}
          {productData.offer && (
            <div className="absolute top-2 left-2 bg-rose-600 font-semibold text-white px-2 py-1 rounded-[6px] text-xs">
              -{productData.offer}%
            </div>
          )}
          {/* Offer Badge */}
          {productData.greenBox && (
            <div className="absolute top-2 right-2 bg-green-600 font-semibold text-white px-2 py-1 rounded-[6px] text-xs">
              {productData.greenBox}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 ">
          <div className=" ">
            <h2 className="text-[16px] font-bold mb-2 md:min-h-[80px] min-h-[80px]">
              {productData.name.length > 50
                ? productData.name.slice(0, 50) + '...'
                : productData.name}
            </h2>
            {/* Price Section */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-semibold text-rose-500">
                ৳{productData.discountedPrice}
              </span>
              <span className="text-sm text-gray-500 line-through">৳{productData.realPrice}</span>
            </div>
          </div>
          {/* Order Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full font-semibold bg-[#fbc79a] hover:bg-[#e39366] text-black cursor-pointer my-kalpurush-text text-xl"
          >
            অর্ডার করুন
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
