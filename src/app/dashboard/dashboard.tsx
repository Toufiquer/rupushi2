'use client';

import React, { useState } from 'react';
import Users from './user';
import Products from './products';
import Orders from './orders';

const Dashboard = () => {
  const [statusMessage, setStatusMessage] = useState<string>('users');
  return (
    <div className="flex">
      {/* সাইডবার */}
      <aside className="w-1/4 bg-gray-200 p-4 min-h-screen">
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
      <main className="flex-1 p-4">
        {statusMessage === 'users' && <Users />}
        {statusMessage === 'products' && <Products />}
        {statusMessage === 'orders' && <Orders />}
      </main>
    </div>
  );
};

export default Dashboard;
