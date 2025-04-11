'use client';
import Dashboard from './dashboard';
import Loading from './loading'; // Import the new Loading component
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect to login if token is not found
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch('/api/auth-check', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.message !== 'Token verified successfully') {
          localStorage.removeItem('token'); // Clear localStorage if token verification fails
          router.push('/login'); // Redirect to login if token verification fails
        } else {
          setIsLoading(true);
          router.push('/dashboard'); // Redirect to dashboard if token is valid
        }
      } catch {
        localStorage.removeItem('token'); // Clear localStorage on error
        router.push('/login'); // Redirect to login on error
      }
    };

    verifyToken();
  }, [router]);
  return (
    <div className="w-full bg-slate-50 min-h-screen">{isLoading ? <Dashboard /> : <Loading />}</div>
  );
};

export default DashboardPage;
