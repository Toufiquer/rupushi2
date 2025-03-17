'use client';

import React, { useState } from 'react';
import Users from './users/all-users';
import Products from './products/page';
import Orders from './orders/page';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const lstItemStyle = 'w-full ml-4 font-semibold py-1 hover:text-pink-500 cursor-pointer';

const Dashboard = () => {
  const [statusMessage, setStatusMessage] = useState<string>('users');

  const handleRoute = (componentName: string) => {
    setStatusMessage(componentName);
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
                    { title: 'All Users', componentName: 'all-users' },
                    { title: 'Add User', componentName: 'add-user' },
                    { title: 'Trash', componentName: 'trash-user' },
                  ].map(i => (
                    <div onClick={() => handleRoute(i.componentName)} className={lstItemStyle}>
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
                    { title: 'All Products', componentName: 'all-products' },
                    { title: 'Add Product', componentName: 'add-product' },
                    { title: 'Trash', componentName: 'trash-product' },
                  ].map(i => (
                    <div onClick={() => handleRoute(i.componentName)} className={lstItemStyle}>
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
                    { title: 'All Orders', componentName: 'all-orders' },
                    { title: 'Add order', componentName: 'add-order' },
                    { title: 'Trash', componentName: 'trash-orders' },
                  ].map(i => (
                    <div onClick={() => handleRoute(i.componentName)} className={lstItemStyle}>
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
        {statusMessage}
        {statusMessage === 'users' && <Users />}
        {statusMessage === 'products' && <Products />}
        {statusMessage === 'orders' && <Orders />}
      </main>
    </div>
  );
};

export default Dashboard;
