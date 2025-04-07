/*
|-----------------------------------------
| setting up Checkout for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

'use client';

import React, { useState } from 'react';
import { IProduct } from '../components/ProductsCard';
import FormComponent from './FormComponent';
import ShoppingCart from './ShoppingCart';
const Checkout = ({ products }: { products: IProduct[] }) => {
  const cartProducts = products[0];
  console.log('cardProducts : ', cartProducts);
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl flex bg-white rounded-lg shadow-md p-8 container">
        <FormComponent />

        <div className="w-full pl-4">
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
};
export default Checkout;
