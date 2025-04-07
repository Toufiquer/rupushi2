import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface IProduct extends Document {
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
}
const ProductCard = ({ productData }: { productData: IProduct }) => {
  const router = useRouter();

  const handleAddToCart = () => {
    // Get existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Check if item already exists in cart
    const isExistingIndex = existingCart.findIndex((item: IProduct) => item.id === productData.id);

    let newCart: (IProduct & { quantity: number })[] = [...existingCart];

    if (isExistingIndex > -1) {
      // Item exists, increment quantity
      newCart = newCart.map((item, index) =>
        index === isExistingIndex ? { ...item, quantity: item.quantity + 1 } : item,
      );
    } else {
      // Item doesn't exist, add it with quantity 1
      newCart = [...existingCart, { ...productData, quantity: 1 }];
    }

    console.log('storage cart : ', newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    console.log('handle log cart');
    // router.push('/cart');
    console.log('handle log cart');
    router.push('/cart');
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden shadow-lg rounded-lg py-0 border-0">
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
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{productData.name}</h2>

          {/* Price Section */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-semibold text-gray-900">
              ৳{productData.discountedPrice}
            </span>
            <span className="text-sm text-gray-500 line-through">৳{productData.realPrice}</span>
          </div>

          {/* Order Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full font-semibold bg-[#fbc79a] hover:bg-[#e39366] text-black cursor-pointer"
          >
            অর্ডার করুন
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
