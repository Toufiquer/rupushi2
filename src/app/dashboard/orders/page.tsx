/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

'use client';

import { useCallback, useEffect, useState } from 'react';
import OrderTable, { ApiResponse, apiResponseData } from './components/OrderTable';

const Page = () => {
  const [allOrders, setAllOrders] = useState<ApiResponse>(apiResponseData);
  const [loading, setLoading] = useState(false);
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      console.log('api data ; ', data);
      setAllOrders(data);
    } catch (error: unknown) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="w-full max-w-7xl">
        <OrderTable data={allOrders} isLoading={loading} />;
      </div>
    </div>
  );
};
export default Page;
