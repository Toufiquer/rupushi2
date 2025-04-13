/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const [order, setOrder] = useState({});
  const params = useParams();
  const orderId = params?.orderId;
  useEffect(() => {
    if (orderId) {
      fetch(`/api/v1/orders/receipt/${orderId}`)
        .then(d => d.json())
        .then(data => {
          console.log('data : ', data.data);
          setOrder(data.data);
        });
    }
  }, [orderId]);
  const handlePrint = () => {
    console.log('order : ', order);
  };
  return (
    <main className="bg-slate-800 flex-col text-white flex items-center justify-center w-full h-screen">
      <button className="" onClick={handlePrint}>
        Print
      </button>
      {orderId && (
        <div>
          <h1>Receipt for Order: {Array.isArray(orderId) ? orderId.join('/') : orderId}</h1>
          {/* You can now use the orderId to fetch and display the receipt details */}
        </div>
      )}
      {!orderId && <h1>No Order ID provided</h1>}
    </main>
  );
};
export default Page;
