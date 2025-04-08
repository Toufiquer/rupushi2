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
import ShoppingCart from '../cart/ShoppingCart';
const Checkout = ({ products }: { products: IProduct[] }) => {
  const cartProducts = products[0];
  console.log('cardProducts : ', cartProducts);
  return (
    <div className=" min-h-screen flex items-center justify-center ">
      <div className="max-w-7xl flex container">
        <div className="flex bg-white rounded-lg shadow-md w-full">
          <FormComponent />
        </div>
        <div className="w-full pl-4">
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
};
export default Checkout;
