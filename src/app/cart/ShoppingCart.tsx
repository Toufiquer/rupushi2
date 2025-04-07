// ShoppingCart.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ShoppingBag, X, AlertCircle, PlusCircle, MinusCircle } from 'lucide-react';

// Define the CartItem interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Props interface for the ShoppingCart component
interface ShoppingCartProps {
  initialCartItems?: CartItem[];
}

// Error message component props
interface ErrorMessageProps {
  message: string;
}

// Cart item component props
interface CartItemComponentProps {
  item: CartItem;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
}

// ErrorMessage component for displaying errors
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="flex items-center p-3 mb-4 bg-red-100 text-red-700 rounded-md border border-red-300"
  >
    <AlertCircle className="mr-2" size={18} />
    <span>{message}</span>
  </motion.div>
);

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

// CartItem component
const CartItemComponent: React.FC<CartItemComponentProps> = ({
  item,
  updateQuantity,
  removeItem,
}) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [localQuantity, setLocalQuantity] = useState<number>(item.quantity);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLocalQuantity(item.quantity);
  }, [item.quantity]);

  const handleQuantityChange = async (newQuantity: number): Promise<void> => {
    if (newQuantity < 1) return;

    setIsUpdating(true);
    setError(null);

    try {
      await updateQuantity(item.id, newQuantity);
      setLocalQuantity(newQuantity);
    } catch (error) {
      setError('Failed to update quantity. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async (): Promise<void> => {
    setIsUpdating(true);
    setError(null);

    try {
      await removeItem(item.id);
    } catch (error) {
      setError('Failed to remove item. Please try again.');
      setIsUpdating(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-gray-200 relative"
    >
      {error && <ErrorMessage message={error} />}

      <div className="flex items-center mb-4 sm:mb-0">
        <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 mr-4">
          <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
        </div>

        <div>
          <h3 className="font-medium text-gray-800">{item.name}</h3>
          <p className="text-gray-500 text-sm">Item #: {item.id}</p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="mr-6">
          <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
        </div>

        <div className="flex items-center mr-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-1 focus:outline-none text-blue-500 disabled:text-gray-300"
            onClick={() => handleQuantityChange(localQuantity - 1)}
            disabled={isUpdating || localQuantity <= 1}
          >
            <MinusCircle size={20} />
          </motion.button>

          <input
            type="number"
            min="1"
            value={localQuantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value > 0) {
                setLocalQuantity(value);
              }
            }}
            onBlur={() => {
              if (localQuantity !== item.quantity) {
                handleQuantityChange(localQuantity);
              }
            }}
            className="w-12 text-center mx-1 p-1 border rounded-md"
            disabled={isUpdating}
          />

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-1 focus:outline-none text-blue-500 disabled:text-gray-300"
            onClick={() => handleQuantityChange(localQuantity + 1)}
            disabled={isUpdating}
          >
            <PlusCircle size={20} />
          </motion.button>
        </div>

        <div className="w-20 text-right mr-6">
          <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-1 focus:outline-none text-red-500 hover:text-red-700 disabled:text-gray-300"
          onClick={handleRemove}
          disabled={isUpdating}
        >
          <X size={20} />
        </motion.button>
      </div>

      {isUpdating && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </motion.div>
  );
};

// Main ShoppingCart component
const ShoppingCart: React.FC<ShoppingCartProps> = ({ initialCartItems = [] }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Tax and shipping constants (could be fetched from an API)
  const TAX_RATE: number = 0.08;
  const SHIPPING_COST: number = 5.99;

  // Calculate subtotal
  const calculateSubtotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate tax
  const calculateTax = (subtotal: number): number => {
    return subtotal * TAX_RATE;
  };

  // Calculate total
  const calculateTotal = (): number => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax + (cartItems.length > 0 ? SHIPPING_COST : 0);
  };

  // Mock API call for updating quantity
  const updateQuantity = async (itemId: string, newQuantity: number): Promise<void> => {
    setError(null);

    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          // Update the cart items
          setCartItems(prevItems =>
            prevItems.map(item => (item.id === itemId ? { ...item, quantity: newQuantity } : item)),
          );
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 600); // Simulate network delay
    });
  };

  // Mock API call for removing an item
  const removeItem = async (itemId: string): Promise<void> => {
    setError(null);

    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          // Remove the item from cart
          setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 600); // Simulate network delay
    });
  };

  // Simulate fetching cart data from an API
  useEffect(() => {
    const fetchCartData = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For demo purposes, we're using initialCartItems
        // In a real application, you would fetch from an API
        // setCartItems(data from API);
      } catch (error) {
        setError('Failed to load cart items. Please refresh the page and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, []);

  // Mock checkout function
  const handleCheckout = (): void => {
    alert(`Proceeding to checkout with total: $${calculateTotal().toFixed(2)}`);
    // In a real application, you would navigate to a checkout page or trigger a checkout modal
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

  // Display error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center w-full flex items-center justify-center border-2 mb-6">
          Your Cart
        </h2>
        <ErrorMessage message={error} />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
    );
  }

  // Display empty cart
  if (cartItems.length === 0) {
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
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-center">Your Cart</h2>
        <p className="text-gray-500">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        <AnimatePresence>
          {cartItems.map(item => (
            <CartItemComponent
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
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
              ${subtotal.toFixed(2)}
            </motion.span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>${SHIPPING_COST.toFixed(2)}</span>
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
              ${total.toFixed(2)}
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
