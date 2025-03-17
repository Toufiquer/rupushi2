'use client';

import React, { useState } from 'react';
import Users from './users/page';
import Products from './products/page';
import Orders from './orders/page';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useRouter } from 'next/navigation';

const lstItemStyle = 'w-full ml-4 font-semibold py-1 hover:text-pink-500 cursor-pointer';

const Dashboard = () => {
  const [statusMessage, setStatusMessage] = useState<string>('users');
  const router = useRouter();

  const handleRoute = (route: string) => {
    router.push(route);
  };
  return (
    <div className="flex flex-col md:flex-row">
      {/* সাইডবার */}
      <aside className="w-full md:max-w-[200px] bg-gray-200 p-4 md:min-h-screen">
        <h2 className="text-lg font-bold mb-4">ড্যাশবোর্ড</h2>
        <ul>
          <li>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div
                    onClick={() => setStatusMessage('users')}
                    className={`hover:text-pink-500 ${statusMessage === 'users' ? ' text-pink-500 ' : ' text-slate-500 '}`}
                  >
                    Users
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {[
                    { title: 'All Users', link: 'all-users' },
                    { title: 'Add User', link: 'add-user' },
                    { title: 'Trash', link: 'trash-user' },
                  ].map(i => (
                    <div
                      onClick={() => handleRoute(`/dashboard/users/${i.link}`)}
                      className={lstItemStyle}
                    >
                      {i.title}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div
                    onClick={() => setStatusMessage('products')}
                    className={`hover:text-pink-500 ${statusMessage === 'products' ? ' text-pink-500 ' : ' text-slate-500 '}`}
                  >
                    Products
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {[
                    { title: 'All Products', link: 'all-products' },
                    { title: 'Add Product', link: 'add-product' },
                    { title: 'Trash', link: 'trash-product' },
                  ].map(i => (
                    <div
                      onClick={() => handleRoute(`/dashboard/product/${i.link}`)}
                      className={lstItemStyle}
                    >
                      {i.title}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div
                    onClick={() => setStatusMessage('orders')}
                    className={`hover:text-pink-500 ${statusMessage === 'orders' ? ' text-pink-500 ' : ' text-slate-500 '}`}
                  >
                    Orders
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {[
                    { title: 'All Orders', link: 'all-orders' },
                    { title: 'Add order', link: 'add-order' },
                    { title: 'Trash', link: 'trash-orders' },
                  ].map(i => (
                    <div
                      onClick={() => handleRoute(`/dashboard/orders/${i.link}`)}
                      className={lstItemStyle}
                    >
                      {i.title}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        </ul>
      </aside>

      {/* মূল কন্টেন্ট */}
      <main className="w-full min-h-screen p-4">
        {statusMessage === 'users' && <Users />}
        {statusMessage === 'products' && <Products />}
        {statusMessage === 'orders' && <Orders />}
      </main>
    </div>
  );
};

export default Dashboard;
