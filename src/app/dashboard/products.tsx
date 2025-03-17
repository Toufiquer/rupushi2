import React from 'react';
import DemoTable from './table/table';

const Products = () => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold mb-4">
        <DemoTable viewTotalCount={true} />
      </h2>
    </div>
  );
};

export default Products;
