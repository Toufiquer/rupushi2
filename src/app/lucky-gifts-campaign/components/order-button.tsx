/*
|-----------------------------------------
| setting up OrderButton for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, June, 2025
|-----------------------------------------
*/

'use client';

import { IProduct } from '@/app/components/ProductsCard';
import { sendGTMEvent } from '@next/third-parties/google';
import Link from 'next/link';

const OrderButton = () => {
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
  const scrollToOrderForm = () => {
    const element = document.getElementById('order-form');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
    fireGTMEvent(productData);
  };
  return (
    <main className="w-full flex items-center justify-center p-4">
      <Link
        onClick={scrollToOrderForm} // Use a button for the action
        href="#order-form"
        className="text-black bg-slate-50 p-4 rounded-lg my-kalpurush-text font-bold text-3xl hover:bg-slate-200 duration-200"
      >
        অর্ডার করতে চাই
      </Link>
    </main>
  );
};
export default OrderButton;
