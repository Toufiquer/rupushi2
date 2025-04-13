/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

'use client';

import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();
  const orderId = params?.orderId;

  return (
    <main className="bg-slate-800 text-white flex items-center justify-center w-full h-screen">
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
