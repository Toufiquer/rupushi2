/*
|-----------------------------------------
| setting up AllProductsHome for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi-2.0, March, 2025
|-----------------------------------------
*/

// This file: app/components/AllProductsHome.tsx (Server Component)
import { IProduct } from './ProductsCard';
import ProductsGrid from './ProductsGrid'; // We'll create this client component
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Server Component - handles data fetching
const AllProductsHome = async () => {
  const productsPerPage = 20;

  // Server-side data fetching
  const getAllPosts = async (): Promise<IProduct[]> => {
    const backendUrl = 'https://www.rupushi.com/api/products';
    try {
      const res = await fetch(backendUrl, { next: { revalidate: 3600 } }); // 60 minutes (3600 seconds)
      const responseData: { data: IProduct[] } = await res.json();
      const data = responseData.data;
      if (!data) notFound();
      return data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return [];
    }
  };

  // Get data server-side
  const allProducts = await getAllPosts();

  return (
    <main className="w-full flex flex-col pb-12 md:px-4 lg:mx-0">
      <div className="w-full flex items-center justify-between mb-6 py-3">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight w-full justify-center">
          All Products
        </h2>
        <div className="w-full flex items-center justify-end">
          <Link href="/all-products">
            <button className="px-4 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200 cursor-pointer">
              See More
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <ProductsGrid products={allProducts} productsPerPage={productsPerPage} />
      </div>
    </main>
  );
};

export default AllProductsHome;
