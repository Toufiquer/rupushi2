import React from 'react';
import { motion } from 'framer-motion';
import { useGetOrderByIdQuery } from '@/redux/features/orders/ordersApi';
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

interface OrderDetailsProps {
  orderIdToFetch: string; // Or number, depending on your API
}

const OrderDetailsPage: React.FC<OrderDetailsProps> = ({ orderIdToFetch }) => {
  const {
    data: orderData,
    error,
    isLoading,
  } = useGetOrderByIdQuery(orderIdToFetch, {
    skip: !orderIdToFetch,
  });

  // Framer Motion variants for animation
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } },
  };

  // User satisfaction features
  const renderOrderStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="text-yellow-500 font-semibold">{status?.toUpperCase()}</span>;
      case 'processing':
        return <span className="text-blue-500 font-semibold">{status?.toUpperCase()}</span>;
      case 'shipped':
        return <span className="text-indigo-500 font-semibold">{status?.toUpperCase()}</span>;
      case 'delivered':
        return <span className="text-green-500 font-semibold">{status?.toUpperCase()}</span>;
      case 'cancelled':
        return <span className="text-red-500 font-semibold">{status?.toUpperCase()}</span>;
      default:
        return <span className="font-semibold">{status?.toUpperCase()}</span>;
    }
  };

  const renderProductList = (products: ProductInfo[]) => (
    <ul>
      {products.map((product, index) => (
        <motion.li key={index} variants={itemVariants} className="py-2 border-b last:border-b-0">
          <div className="flex items-center space-x-4">
            <Image
              src={product.img}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h6 className="font-semibold">{product.name}</h6>
              <span className="text-sm text-gray-500">Code: {product['product-code']}</span>
              <div className="flex items-center space-x-2">
                {product.discountedPrice < product.realPrice && (
                  <>
                    <span className="text-sm line-through text-gray-400">${product.realPrice}</span>
                    <span className="text-sm text-green-600 font-semibold">
                      ${product.discountedPrice}
                    </span>
                    {product.offer && (
                      <span className="text-xs bg-yellow-200 text-yellow-700 rounded-full px-2 py-0.5">
                        {product.offer}% off
                      </span>
                    )}
                  </>
                )}
                {product.discountedPrice === product.realPrice && (
                  <span className="text-sm font-semibold">${product.realPrice}</span>
                )}
                <span className="text-sm text-gray-600">Qty: {product.quantity}</span>
              </div>
            </div>
          </div>
        </motion.li>
      ))}
    </ul>
  );

  if (isLoading) {
    return (
      <motion.div
        className="p-6 rounded-md shadow-md bg-white"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <span className="text-center text-gray-600">Loading order details...</span>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="p-6 rounded-md shadow-md bg-red-100 border border-red-400 text-red-700"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <h5 className="font-semibold">Error!</h5>
        {error && <span>Some thing wrong please try again.</span>}
        <span className="text-sm text-gray-600 mt-2">Please try again later.</span>
      </motion.div>
    );
  }

  if (!orderData) {
    return (
      <motion.div
        className="p-6 rounded-md shadow-md bg-gray-100"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <span className="text-center text-gray-600">No order details found.</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="p-6 rounded-md shadow-md bg-white"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Details</h2>
      {orderData.customerInfo && (
        <motion.div variants={itemVariants} className="mb-4">
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Customer Information</h3>
          <span>
            <span className="font-medium">Name:</span> {orderData.customerInfo?.customerName}
          </span>
          <span>
            <span className="font-medium">Address:</span> {orderData.customerInfo.address}
          </span>
          <span>
            <span className="font-medium">Phone:</span> {orderData.customerInfo.phone}
          </span>
          {orderData.customerInfo.note && (
            <span>
              <span className="font-medium">Note:</span> {orderData.customerInfo.note}
            </span>
          )}
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="mb-4">
        <h3 className="font-semibold text-lg text-gray-700 mb-2">Order Summary</h3>
        <span>
          <span className="font-medium">Order ID:</span> {orderData.orderId}
        </span>
        <span>
          <span className="font-medium">Status:</span> {renderOrderStatus(orderData.orderStatus)}
        </span>
        <span>
          <span className="font-medium">Total Products:</span> {orderData.totalProduct}
        </span>
        <span>
          <span className="font-medium">Delivery Charge:</span> ${orderData.deliveryCharge}
        </span>
        <span>
          <span className="font-medium">Shipping Area:</span> {orderData.shippingArea}
        </span>
        <span className="text-green-600 font-semibold">
          <span className="font-medium">Total Price:</span> ${orderData.totalPrice}
        </span>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="font-semibold text-lg text-gray-700 mb-2">Products</h3>
        {orderData.productInfo?.length > 0 ? (
          renderProductList(orderData.productInfo)
        ) : (
          <span className="text-gray-500">No products in this order.</span>
        )}
      </motion.div>

      {/* User Satisfaction Features - Subtle Feedback */}
      {orderData.orderStatus === 'delivered' && (
        <motion.div
          variants={itemVariants}
          className="mt-6 p-4 bg-green-50 rounded-md border border-green-200 text-green-700"
        >
          <span className="text-sm">
            Thank you for your order! We hope you enjoyed your purchase.
          </span>
        </motion.div>
      )}

      {orderData.note && (
        <motion.div
          variants={itemVariants}
          className="mt-4 p-4 bg-yellow-50 rounded-md border border-yellow-200 text-yellow-700"
        >
          <span className="text-sm">
            <span className="font-semibold">Note:</span> {orderData.note}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OrderDetailsPage;
