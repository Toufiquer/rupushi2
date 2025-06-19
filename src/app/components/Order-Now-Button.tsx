/*
|-----------------------------------------
| setting up OrderNowButton for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, June, 2025
|-----------------------------------------
*/

'use client';

import { Button } from '@/components/ui/button';
import { IProduct } from './ProductsCard';
import { sendGTMEvent } from '@next/third-parties/google';

const OrderNowButton = () => {
  const productData: IProduct = {
    name: 'Luxurious Pendant & Earring Set',
    'product-code': 'LUCKY001',
    img: 'https://i.ibb.co/jkSRXfDN/O1-CN01bq-KKK21t-Vut-VO951u-2216839565908-0-cib.jpg',
    realPrice: '699',
    price: 699,
    discountedPrice: '699',
    offer: '15',
    stock: '500',
    'description-top': '',
    'description-bottom': '',
    material: '',
    design: '',
    color: '',
    category: '',
    weight: '',
    'chain length': '',
    style: '',
    quantity: 1,
    id: '',
    status: '',
    allImages: [],
    descriptionData: '',
  };
  const fireGTMEvent = (data: IProduct) => {
    sendGTMEvent({
      event: 'add_to_cart',
      currency: 'BDT',
      product: { ...data },
    });
  };
  return (
    <Button
      onClick={() => fireGTMEvent(productData)}
      variant={'default'}
      className="bg-[#fbc79a] border-1 border-slate-300 hover:border-slate-400 shadow-lg hover:shadow-slate-900 shadow-slate-700 text-bold text-black h-[70px] text-3xl max-w-[250px] cursor-pointer w-full"
    >
      <span className="text-[20px] my-kalpurush-text font-extrabold">অর্ডার করুন</span>
    </Button>
  );
};
export default OrderNowButton;
