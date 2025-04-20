'use client';

import { useState, useEffect } from 'react';
import ProductCard, { IProduct } from './ProductsCard';
import LoadingComponent from '@/components/common/Loading';

// Client Component - handles display and interactivity
interface ProductsListProps {
  products: IProduct[];
}

const ProductsList = ({ products }: ProductsListProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading state (optional)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-xl text-slate-400 min-h-[40vh] flex items-center justify-center">
        Nothing was found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-4 gap-2">
      {products.map(product => (
        <div key={product['product-code']}>
          <ProductCard productData={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
