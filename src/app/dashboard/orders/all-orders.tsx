'use client';

import { useCallback, useEffect, useState } from 'react';

/*
|-----------------------------------------
| setting up AllOrders for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/
const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setAllOrders(data.data);
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
    <main className="bg-slate-800 text-white flex items-center flex-col justify-center w-full h-screen">
      <h2>Coming soon</h2>
      <p>Total Orders: {loading ? 'Loading...' : allOrders.length}</p>
    </main>
  );
};
export default AllOrders;
