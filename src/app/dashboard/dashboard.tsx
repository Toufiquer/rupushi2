'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import AllUsers from './users/all-users';
import AddNewUser from './users/add-new-user';
import UsersTrash from './users/users-trash';
import TrashProducts from './products/trash-products';
import AllProducts from './products/all-products';
import AddNewProduct from './products/add-new-product';
import AllOrders from './orders/all-orders';
import AddNewOrder from './orders/add-new-order';
import TrashOrders from './orders/trash-orders';
import AllPictures from './media/all-pictures';
import TrashPictures from './media/trash-pictures';

const lstItemStyle = 'w-full ml-4 font-semibold py-1 hover:text-pink-500 cursor-pointer';
const accordionData = {
  users: [
    { title: 'All Users', componentName: 'all-users' },
    { title: 'Add User', componentName: 'add-user' },
    { title: 'Trash', componentName: 'trash-user' },
  ],
  products: [
    { title: 'All Products', componentName: 'all-products' },
    { title: 'Add Product', componentName: 'add-product' },
    { title: 'Trash', componentName: 'trash-product' },
  ],
  orders: [
    { title: 'All Orders', componentName: 'all-orders' },
    { title: 'Add order', componentName: 'add-order' },
    { title: 'Trash', componentName: 'trash-orders' },
  ],
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
      </aside>

      {/* মূল কন্টেন্ট */}
      <main className="w-full md:min-h-screen p-4">
        {statusMessage}
        {statusMessage === 'all-users' && <AllUsers />}
        {statusMessage === 'add-user' && <AddNewUser />}
        {statusMessage === 'trash-user' && <UsersTrash />}
        {statusMessage === 'all-products' && <AllProducts />}
        {statusMessage === 'add-product' && <AddNewProduct />}
        {statusMessage === 'trash-product' && <TrashProducts />}
        {statusMessage === 'all-orders' && <AllOrders />}
        {statusMessage === 'add-order' && <AddNewOrder />}
        {statusMessage === 'trash-orders' && <TrashOrders />}
        {statusMessage === 'all-pictures' && <AllPictures />}
        {statusMessage === 'trash-pictures' && <TrashPictures />}
      </main>
    </div>
  );
};

export default Dashboard;
