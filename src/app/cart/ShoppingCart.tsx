// ShoppingCart.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ShoppingBag, X, AlertCircle, PlusCircle, MinusCircle } from 'lucide-react';
import { IProduct } from '../components/ProductsCard';
import { useStore } from '../utils/useStore';
import { CartItemComponent } from './CartItemComponent';

// Props interface for the ShoppingCart component
interface ShoppingCartProps {
  initialCartItems?: IProduct[];
}

// LoadingSpinner component
const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-4">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// EmptyCart component
const EmptyCart: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-12"
  >
    <ShoppingBag size={64} className="text-gray-300 mb-4" />
    <h3 className="text-xl font-medium text-gray-500 mb-2">Your cart is empty</h3>
    <p className="text-gray-400 mb-6">Looks like you haven't added anything to your cart yet</p>
    <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
      Start Shopping
    </button>
  </motion.div>
);

// Main ShoppingCart component
const ShoppingCart: React.FC<ShoppingCartProps> = ({ initialCartItems = [] }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { cart } = useStore();

  // Tax and shipping constants (could be fetched from an API)
  const TAX_RATE: number = 0.08;
  const SHIPPING_COST: number = 5.99;

  // Calculate subtotal
  const calculateSubtotal = (): number => {
    return 100;
    // return cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
  };

  // Calculate tax
  const calculateTax = (subtotal: number): number => {
    return subtotal * TAX_RATE;
  };

  // Calculate total
  const calculateTotal = (): number => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    // return subtotal + tax + (cartItems.length > 0 ? SHIPPING_COST : 0);
    return 100;
  };

  // Mock checkout function
  const handleCheckout = (): void => {
    setIsLoading(true);
    alert(`Proceeding to checkout with total: ৳${calculateTotal()?.toFixed(2)}`);
    // In a real application, you would navigate to a checkout page or trigger a checkout modal
    setIsLoading(false);
  };

  // Display loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
        <LoadingSpinner />
      </div>
    );
  }

  // Display empty cart
  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
        <EmptyCart />
      </div>
    );
  }

  // Calculate values for summary
  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xl"
    >
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-center">Your Cart</h2>
        <p className="text-gray-500">
          {cart.length} {cart.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        <AnimatePresence>
          {cart.map((item, idx: number) => (
            <CartItemComponent key={item.id + idx} item={item} />
          ))}
        </AnimatePresence>
      </div>

      <motion.div layout className="p-6 bg-gray-50">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <motion.span
              key={subtotal}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.3 }}
              className="font-medium"
            >
              ৳{subtotal?.toFixed(2)}
            </motion.span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Tax (8%)</span>
            <span>৳{tax?.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>৳{SHIPPING_COST.toFixed(2)}</span>
          </div>

          <div className="border-t border-gray-200 pt-3 flex justify-between">
            <span className="font-semibold text-lg">Total</span>
            <motion.span
              key={total}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.3 }}
              className="font-semibold text-lg"
            >
              ৳{total?.toFixed(2)}
            </motion.span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ShoppingCart;
