'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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

const CompactReceipt = () => {
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
          setError(err.message);
          setLoading(false);
        });
    }
  }, [orderId]);

  const handlePrint = () => {
    // Use a custom print function to isolate the receipt
    const printContent = document.querySelector('.receipt-container');

    if (printContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Receipt</title>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  font-family: Arial, sans-serif;
                  background-color: white;
                }
                .print-container {
                  width: 50mm;
                  padding: 1mm;
                  box-sizing: border-box;
                  font-size: 10px;
                  line-height: 1;
                }
                .receipt-header {
                  text-align: center;
                  margin-bottom: 1mm;
                }
                .receipt-header h1 {
                  font-size: 14px;
                  margin: 0;
                  padding: 0;
                }
                .barcode-section {
                  text-align: center;
                  border-top: 1px solid #ddd;
                  border-bottom: 1px solid #ddd;
                  padding: 1mm 0;
                  margin-bottom: 1mm;
                }
                .customer-details {
                  text-align: left;
                  border-bottom: 1px dashed #ddd;
                  padding-bottom: 1mm;
                  margin-bottom: 1mm;
                }
                .product-item {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 1mm;
                }
                .product-name {
                  white-space: nowrap;
                  white-space: initial;
                  max-width: 32mm;
                }
                .product-section {
                  border-bottom: 1px dashed #ddd;
                  padding-bottom: 1mm;
                  margin-bottom: 1mm;
                }
                .totals-section {
                  text-align: left;
                }
                .total-row {
                  display: flex;
                  justify-content: space-between;
                }
                .final-total {
                  font-weight: bold;
                  border-top: 1px dashed #ddd;
                  padding-top: 1mm;
                  margin-top: 1mm;
                }
                @page {
                  size: 58mm 80mm; /* slightly larger than content to avoid cutoffs */
                  margin: 0;
                }
              </style>
            </head>
            <body>
              <div class="print-container">
                ${printContent.innerHTML}
              </div>
              <script>
                window.onload = function() {
                  setTimeout(function() {
                    window.print();
                    window.onafterprint = function() {
                      window.close();
                    };
                  }, 500); // Small delay to ensure styles are applied
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        // Fallback if popup is blocked
        window.print();
      }
    } else {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-sm">Loading receipt...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-sm text-red-600">{error || "Couldn't load receipt"}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4">
      {/* Receipt Container - Fixed dimensions */}
      <div className="receipt-container bg-white border border-gray-300 rounded shadow w-[50mm] overflow-hidden relative">
        <div className="p-2 text-center">
          {/* Logo */}
          {/* <div className="receipt-header mb-1">
            <h1 className="font-bold text-base">RUPUSHI</h1>
          </div> */}
          <div className="w-[100px] h-[20px] relative mt-2 mx-auto">
            <div className="absolute top-[-15px] left-[-20px] md:left-0 w-full h-auto mb-4 pl-2 md:pl-0">
              <Image
                src="/rupushi-crop.png" // Replace with your actual logo path
                alt="Rupush Logo"
                width={200}
                height={100}
              />
            </div>
          </div>
          {/* Barcode (placeholder) */}
          <div className="barcode-section mb-1">
            <div className="text-xs text-center">
              {/* Barcode representation */}
              {/* <div className="flex justify-center items-center">
                <svg className="w-32 h-4" viewBox="0 0 100 20">
                  {[...Array(20)].map((_, i) => (
                    <rect
                      key={i}
                      x={i * 5}
                      y="0"
                      width={Math.random() * 2 + 1}
                      height="12"
                      fill="black"
                    />
                  ))}
                </svg>
              </div> */}
              <div className="text-xs mt-1">Order id: {order.orderId}</div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="customer-details text-left text-xs border-b border-dashed border-gray-300 pb-1 mb-1">
            <p>Name: {order.customerInfo.customerName}</p>
            <p>Phone: {order.customerInfo.phone}</p>
            <p>Address: {order.customerInfo.address}</p>
          </div>

          {/* Order Items */}
          <div className="product-section border-b border-dashed border-gray-300 pb-1 mb-1">
            {order.productInfo.map((product: ProductInfo, idx: number) => (
              <div key={idx} className="product-item text-xs flex justify-between">
                <div className="product-name max-w-[28mm]">
                  {product.name} ({product.quantity} * {product.discountedPrice}৳)
                </div>
                <div className="text-right">{product.quantity * product.discountedPrice}৳</div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="totals-section text-xs">
            <div className="total-row flex justify-between">
              <span>Subtotal:</span>
              <span>{order.totalPrice - order.deliveryCharge}৳</span>
            </div>
            <div className="total-row flex justify-between">
              <span>Shipping:</span>
              <span>{order.deliveryCharge}৳</span>
            </div>
            <div className="final-total total-row flex justify-between font-bold border-t border-dashed border-gray-300 pt-1 mt-1">
              <span>COD</span>
              <span>{order.totalPrice}৳</span>
            </div>
          </div>
        </div>
      </div>

      {/* Print Button - Outside receipt */}
      <button
        onClick={handlePrint}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm"
      >
        Print Receipt
      </button>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          /* Hide everything by default */
          body * {
            visibility: hidden;
          }

          /* Then only show the receipt */
          .receipt-container,
          .receipt-container * {
            visibility: visible;
          }

          /* Position the receipt at the beginning of the page */
          .receipt-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 50mm !important;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Hide the print button */
          button {
            display: none;
          }

          /* Set page size */
          @page {
            size: 58mm 80mm; // slightly larger than content to avoid cutoffs
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CompactReceipt;
