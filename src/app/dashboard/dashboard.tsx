'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import AllUsers from './users/all-users';
import AllProducts from './products/all-products';
import AllOrders from './orders/page';
import AllPictures from './media/all-pictures';
import TrashPictures from './media/trash-pictures';
import { useRouter } from 'next/navigation';
import PromotionPage from './promotion/page';
import WinnerPage from './winner/page';

const lstItemStyle = 'w-full ml-4 font-semibold py-1 hover:text-pink-500 cursor-pointer';
const accordionData = {
  users: [{ title: 'All Users', componentName: 'all-users' }],
  products: [{ title: 'All Products', componentName: 'all-products' }],
  orders: [{ title: 'All Orders', componentName: 'all-orders' }],
  promotion: [{ title: 'All Promotions', componentName: 'all-promotion' }],
  winner: [{ title: 'All Winners', componentName: 'all-winner' }],
  media: [
    { title: 'All Pictures', componentName: 'all-pictures' },
    { title: 'Trash', componentName: 'trash-pictures' },
  ],
};

const Dashboard = () => {
  const [statusMessage, setStatusMessage] = useState<string>('all-users');

  const handleRoute = (componentName: string) => {
    setStatusMessage(componentName);
  };
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row border-t-1">
      {/* সাইডবার */}
      <aside className="w-full md:max-w-[200px] bg-gray-50 p-4 md:min-h-screen relative border-r-1 border-r-slate-600">
        <h2 className="text-lg font-bold mb-4">ড্যাশবোর্ড</h2>
        <ul>
          <li>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div
                    className={`hover:text-pink-500 ${accordionData.users.map(i => i.componentName).includes(statusMessage) ? ' text-pink-500 ' : ' text-slate-500 '}`}
                  >
                    Users
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {accordionData.users.map(i => (
                    <div
                      key={i.componentName}
                      onClick={() => handleRoute(i.componentName)}
                      className={`${lstItemStyle} ${statusMessage === i.componentName ? ' text-pink-500 ' : ' text-slate-500 '}`}
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
                    className={`hover:text-pink-500 ${accordionData.products.map(i => i.componentName).includes(statusMessage) ? ' text-pink-500 ' : ' text-slate-500 '}`}
                  >
                    Products
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {accordionData.products.map(i => (
                    <div
                      key={i.componentName}
                      onClick={() => handleRoute(i.componentName)}
                      className={`${lstItemStyle} ${statusMessage === i.componentName ? ' text-pink-500 ' : ' text-slate-500 '}`}
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
                    className={`hover:text-pink-500 ${accordionData.orders.map(i => i.componentName).includes(statusMessage) ? ' text-pink-500 ' : ' text-slate-500 '}`}
                  >
                    Orders
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {accordionData.orders.map(i => (
                    <div
                      key={i.componentName}
                      onClick={() => handleRoute(i.componentName)}
                      className={`${lstItemStyle} ${statusMessage === i.componentName ? ' text-pink-500 ' : ' text-slate-500 '}`}
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
                    className={`hover:text-pink-500 ${accordionData.promotion.map(i => i.componentName).includes(statusMessage) ? ' text-pink-500 ' : ' text-slate-500 '}`}
                  >
                    Promotions
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {accordionData.promotion.map(i => (
                    <div
                      key={i.componentName}
                      onClick={() => handleRoute(i.componentName)}
                      className={`${lstItemStyle} ${statusMessage === i.componentName ? ' text-pink-500 ' : ' text-slate-500 '}`}
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
                    className={`hover:text-pink-500 ${accordionData.winner.map(i => i.componentName).includes(statusMessage) ? ' text-pink-500 ' : ' text-slate-500 '}`}
                  >
                    Winner
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {accordionData.winner.map(i => (
                    <div
                      key={i.componentName}
                      onClick={() => handleRoute(i.componentName)}
                      className={`${lstItemStyle} ${statusMessage === i.componentName ? ' text-pink-500 ' : ' text-slate-500 '}`}
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
                    className={`hover:text-pink-500 ${accordionData.media.map(i => i.componentName).includes(statusMessage) ? ' text-pink-500 ' : ' text-slate-500 '}`}
                  >
                    Media
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {accordionData.media.map(i => (
                    <div
                      key={i.componentName}
                      onClick={() => handleRoute(i.componentName)}
                      className={`${lstItemStyle} ${statusMessage === i.componentName ? ' text-pink-500 ' : ' text-slate-500 '}`}
                    >
                      {i.title}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        </ul>
        <button
          className="cursor-pointer bottom-4 right-4 bg-rose-400 hover:bg-rose-500 rounded-full absolute left-0 text-white px-4 py-2 m-4"
          onClick={() => {
            localStorage.removeItem('token'); // Clear localStorage on logout
            router.push('/login'); // Redirect to login page
          }}
        >
          Logout
        </button>
      </aside>

      {/* মূল কন্টেন্ট */}
      <main className="w-full md:min-h-screen p-4">
        {statusMessage}
        {statusMessage === 'all-users' && <AllUsers />}
        {statusMessage === 'all-products' && <AllProducts />}
        {statusMessage === 'all-orders' && <AllOrders />}
        {statusMessage === 'all-pictures' && <AllPictures />}
        {statusMessage === 'trash-pictures' && <TrashPictures />}
        {statusMessage === 'all-promotion' && <PromotionPage />}
        {statusMessage === 'all-winner' && <WinnerPage />}
      </main>
    </div>
  );
};

export default Dashboard;
