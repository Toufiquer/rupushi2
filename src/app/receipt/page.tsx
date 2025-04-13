/*
|-----------------------------------------
| setting up Pagte for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

'use client';

import React from 'react';
import { Printer } from 'lucide-react';

interface OrderConfirmationProps {
  orderNumber: string;
  date: string;
  total: string;
  paymentMethod: string;
  products: Array<{
    name: string;
    details?: string;
    price: string;
  }>;
  subtotal: string;
  shipping: {
    cost: string;
    method: string;
  };
  note?: string;
  billingAddress: {
    name: string;
    address: string;
    city: string;
    phone: string;
  };
}

export default function OrderConfirmation({
  orderNumber = '6989',
  date = 'April 12, 2025',
  total = '700৳',
  paymentMethod = 'Cash on delivery',
  products = [
    {
      name: "EID SPECIAL MEN'S PREMIUM PAJAMA - M × 1",
      details: 'Select Pajama Size: M',
      price: '580৳',
    },
  ],
  subtotal = '580৳',
  shipping = {
    cost: '120৳',
    method: 'via Outside Dhaka',
  },
  note = '',
  billingAddress = {
    name: 'Arafat Sunny',
    address: 'Jafarganj, Debidwar',
    city: 'Cumilla',
    phone: '01560006643',
  },
}: OrderConfirmationProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-md w-full max-w-3xl">
        {/* Order Confirmation Header */}
        <div className="border border-green-700 border-dashed rounded-lg p-4 m-4 text-center">
          <h2 className="text-green-700 text-xl">Thank you. Your order has been received.</h2>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 text-sm border-b border-gray-200">
          <div>
            <p className="text-gray-500 mb-1">Order number:</p>
            <p className="font-medium">{orderNumber}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Date:</p>
            <p className="font-medium">{date}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Total:</p>
            <p className="font-medium">{total}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Payment method:</p>
            <p className="font-medium">{paymentMethod}</p>
          </div>
        </div>

        <div className="p-4">
          <p className="text-gray-700">Pay with cash upon delivery.</p>
        </div>

        {/* Order Details */}
        <div className="p-4">
          <h3 className="font-bold text-lg pb-4 border-b border-gray-200">ORDER DETAILS</h3>

          <div className="mt-4 border-b border-gray-200">
            <div className="flex justify-between font-semibold pb-2">
              <span>PRODUCT</span>
              <span>TOTAL</span>
            </div>

            {products.map((product, index) => (
              <div key={index} className="py-4 border-t border-gray-100">
                <div className="flex justify-between">
                  <div>
                    <p>{product.name}</p>
                    {product.details && <p className="text-sm text-gray-500">{product.details}</p>}
                  </div>
                  <p>{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="flex items-center">
                {shipping.cost}{' '}
                <span className="text-xs text-gray-500 ml-1">{shipping.method}</span>
              </span>
            </div>

            <div className="flex justify-between">
              <span>Payment method:</span>
              <span>{paymentMethod}</span>
            </div>

            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
              <span>Total:</span>
              <span>{total}</span>
            </div>
          </div>

          {note && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h3 className="font-bold mb-2">NOTE:</h3>
              <p className="text-gray-700">{note}</p>
            </div>
          )}
        </div>

        {/* Billing Address */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="font-bold text-lg mb-4">BILLING ADDRESS</h3>
          <p>{billingAddress.name}</p>
          <p>{billingAddress.address}</p>
          <p>{billingAddress.city}</p>
          <p>{billingAddress.phone}</p>
        </div>

        {/* Print Button */}
        <div className="p-4 flex justify-center">
          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center transition duration-200"
          >
            <Printer className="mr-2 h-5 w-5" />
            Print Order
          </button>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
