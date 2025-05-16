'use client';

import React from 'react';
import { Printer } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ProductInfo {
  name: string;
  'product-code': string;
  img: string;
  realPrice: number;
  discountedPrice: number;
  offer: string;
  stock: number;
  'description-top': string;
  'description-bottom': string;
  material: string;
  design: string;
  color: string;
  category: string;
  weight: string;
  'chain length': string;
  style: string;
  quantity: number;
}

interface OrderData {
  customerInfo: {
    customerName: string;
    address: string;
    phone: string;
    note: string;
  };
  _id: string;
  orderId: number;
  totalProduct: number;
  deliveryCharge: number;
  orderStatus: string;
  totalPrice: number;
  shippingArea: string;
  productInfo: ProductInfo[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const OrderReceipt = () => {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const orderId = params?.orderId;

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      fetch(`/api/v1/orders/receipt/${orderId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch order data');
          }
          return response.json();
        })
        .then(data => {
          setOrder(data.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching order:', err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-lg">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p>{error || "Couldn't load order details"}</p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-md w-full max-w-3xl">
        {/* Order Confirmation Header */}
        <div className="border border-green-700 border-dashed rounded-lg p-4 m-4 text-center">
          <h2 className="text-green-700 text-xl font-semibold">
            Thank you. Your order has been received.
          </h2>
          <p className="text-gray-600 mt-2">
            Order Status: <span className="font-medium capitalize">{order.orderStatus}</span>
          </p>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 text-sm border-b border-gray-200">
          <div>
            <p className="text-gray-500 mb-1">Order number:</p>
            <p className="font-medium">{order.orderId}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Date:</p>
            <p className="font-medium">{formattedDate}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Total:</p>
            <p className="font-medium">{order.totalPrice}৳</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Payment method:</p>
            <p className="font-medium">Cash on delivery</p>
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

            {order.productInfo.map((product, index) => (
              <div key={index} className="py-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500 pl-2">
                      ( {product.quantity} × {product.discountedPrice}৳)
                    </p>
                  </div>
                  <p className="font-medium">{product.quantity * product.discountedPrice}৳</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{order.totalPrice - order.deliveryCharge}৳</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="flex items-center">{order.deliveryCharge}৳ </span>
            </div>

            <div className="flex justify-between">
              <span>Payment method:</span>
              <span>Cash on delivery</span>
            </div>

            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
              <span>Total:</span>
              <span>{order.totalPrice}৳</span>
            </div>
          </div>

          {order.customerInfo.note && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h3 className="font-bold mb-2">NOTE:</h3>
              <p className="text-gray-700">{order.customerInfo.note}</p>
            </div>
          )}
        </div>

        {/* Billing Address */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="font-bold text-lg mb-4">BILLING ADDRESS</h3>
          <p>{order.customerInfo.customerName}</p>
          <p>{order.customerInfo.address}</p>
          <p>{order.shippingArea}</p>
          <p>{order.customerInfo.phone}</p>
        </div>

        {/* Print Button */}
        <div className="w-full flex items-center justify-end gap-2 pr-4">
          <div className="p-4 flex justify-center">
            <button
              onClick={handlePrint}
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center transition duration-200"
            >
              <Printer className="mr-2 h-5 w-5" />
              Print
            </button>
          </div>
          {/* Print sort button */}
          <div className="flex justify-center">
            <Link
              target="_blank"
              href={`/receipt-print/${orderId}`}
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center transition duration-200"
            >
              Short Receipt
            </Link>
          </div>
          {/* Print sort button */}
          <div className="flex justify-center">
            <Link
              target="_blank"
              href={`/receipt-memo/${orderId}`}
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center transition duration-200"
            >
              Memo
            </Link>
          </div>
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
};

export default OrderReceipt;
