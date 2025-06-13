/*
|-----------------------------------------
| setting up OrderButton for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, June, 2025
|-----------------------------------------
*/

'use client';

import Link from 'next/link';

const OrderButton = () => {
  const scrollToOrderForm = () => {
    const element = document.getElementById('order-form');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
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
