'use client';

import React, { useState } from 'react';
import Users from './user';
import Products from './products';
import Orders from './orders';

const Dashboard = () => {
  const [statusMessage, setStatusMessage] = useState<string>('users');
  return (
    <div className="flex flex-col md:flex-row">
      {/* সাইডবার */}
      <aside className="w-full max-w-[200px] bg-gray-200 p-4 md:min-h-screen">
        <h2 className="text-lg font-bold mb-4">ড্যাশবোর্ড</h2>
        <ul>
          <li className="mb-2">
            <div
              onClick={() => setStatusMessage('users')}
              className={`hover:text-pink-500 cursor-pointer ${statusMessage === 'users' ? ' text-pink-500 ' : ' text-slate-500 '}`}
            >
              Users
            </div>
          </li>
          <li className="mb-2">
            <div
              onClick={() => setStatusMessage('products')}
              className={`hover:text-pink-500 cursor-pointer ${statusMessage === 'products' ? ' text-pink-500 ' : ' text-slate-500 '}`}
            >
              Products
            </div>
          </li>
          <li className="mb-2">
            <div
              onClick={() => setStatusMessage('orders')}
              className={`hover:text-pink-500 cursor-pointer ${statusMessage === 'orders' ? ' text-pink-500 ' : ' text-slate-500 '}`}
            >
              Orders
            </div>
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
