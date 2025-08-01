/*
|-----------------------------------------
| setting up FormData for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/
// components/Checkout.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { IProduct } from '@/app/components/ProductsCard';
import { useStore } from '@/app/utils/useStore';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// Define interfaces for form data and product
interface FormData {
  name: string;
  mobile: string;
  address: string;
  note: string;
  deliveryOption: string;
}
export interface IDBOrderData {
  totalProduct: number;
  orderId: number;
  totalPrice: number;
  deliveryCharge: number;
  shippingArea: string;
  orderStatus?: string;
  customerInfo: {
    customerName: string;
    address: string;
    phone: string;
    note?: string;
  };
  productInfo: IProduct[];
}

const FormData = () => {
  const [customShippingArea, setCustomShippingArea] = useState('outside Dhaka');
  const { cart, deliveryCharge, setDeliveryCharge, setTextMessage } = useStore();

  // State for form inputs with type
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    address: '',
    note: '',
    deliveryOption: deliveryCharge + '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  // Handle form input changes with type
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFreeDelivery = () => (cart.find(i => i['product-code'] === 'LUCKY001') ? true : false);

  // Form submission handler with type
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const getMillisecondsSince2000 = () => {
      const now = new Date();
      const midnightJan12000 = new Date(2000, 0, 1, 0, 0, 0, 0);

      // Calculate milliseconds since midnight on January 1st, 2000
      const millisecondsSince2000 = now.getTime() - midnightJan12000.getTime();

      return millisecondsSince2000;
    };
    function generateOrder(formData: FormData, productData: IProduct[]): IDBOrderData {
      // Generate a simple order ID (you might want to use a more robust method in production)
      const orderId = getMillisecondsSince2000();

      // Determine delivery charge and shipping area based on delivery option
      const deliveryCharge = formData.deliveryOption === '130' ? 130 : 60;
      const shippingArea: string = deliveryCharge === 60 ? 'inside Dhaka' : 'outside Dhaka';

      const totalPrice =
        deliveryCharge +
        cart.reduce((acc, curr) => {
          let oldTotal = acc;
          const price = curr.discountedPrice || curr.realPrice;
          const quantity = curr.quantity || 1;
          oldTotal = oldTotal + Number(price) * quantity;
          return oldTotal;
        }, 0);
      const totalProduct = productData.length;
      const result: IDBOrderData = {
        totalProduct,
        orderId: orderId,
        totalPrice: totalPrice,
        deliveryCharge: deliveryCharge,
        shippingArea: shippingArea,
        orderStatus: 'pending', // Default initial status
        customerInfo: {
          customerName: formData.name,
          address: formData.address,
          phone: formData.mobile,
          note: formData.note || '',
        },
        productInfo: productData,
      };
      return result;
    }

    const newOrderData = generateOrder(formData, cart);
    if (isFreeDelivery()) {
      newOrderData.deliveryCharge = 0;
      newOrderData.shippingArea = customShippingArea || 'outside Dhaka';
      newOrderData.totalPrice = 999;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      toast.success('Order Create successful');
      setTextMessage({
        isFirst: false,
        message: `Your order has been confirm, Thank you. Order id: ${newOrderData.orderId}`,
      });
      //
      // Reset form on success
      setFormData({
        name: '',
        mobile: '',
        address: '',
        note: '',
        deliveryOption: '130',
      });

      // Redirect to the receipt page with the orderId
      router.push(`/receipt/${newOrderData.orderId}`);
      const receiptUrl = `/receipt/${newOrderData.orderId}`;
      window.open(receiptUrl, '_blank');
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">আপনার নাম *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="আপনার নাম"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">আপনার মোবাইল নাম্বার *</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="আপনার মোবাইল নাম্বার"
            required
            pattern="^\+?[0-9\s\-\(\)]{6,20}$"
            title="Please enter a valid phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">আপনার সম্পূর্ণ ঠিকানা</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="আপনার সম্পূর্ণ ঠিকানা"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Order Note (Optional)</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Writ a note, if needed"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ডেলিভারি</label>
          {isFreeDelivery() ? (
            <div className="mt-2 space-y-2">
              <div
                className={`flex items-center w-full p-2 rounded ${formData.deliveryOption === '0' ? ' bg-green-500 ' : 'bg-slate-200 '}`}
              >
                <input
                  type="radio"
                  name="deliveryOption"
                  value="0"
                  checked={formData.deliveryOption === '0'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <label
                  className="ml-2 text-sm text-gray-700 cursor-pointer"
                  onClick={() => {
                    setFormData({ ...formData, deliveryOption: '0' });
                    setDeliveryCharge(Number(0));
                    setCustomShippingArea('ঢাকার বাইরে');
                  }}
                >
                  ঢাকার বাইরে ডেলিভারি চার্জ ফ্রি
                </label>
              </div>
              <div
                className={`flex items-center w-full p-2 rounded ${formData.deliveryOption === '0.0' ? ' bg-green-500 ' : 'bg-slate-200 '}`}
              >
                <input
                  type="radio"
                  name="deliveryOption"
                  value="0.0"
                  checked={formData.deliveryOption === '0.0'}
                  onChange={handleInputChange}
                  className={`h-4 w-4 focus:ring-green-500 border-gray-300 `}
                />
                <label
                  className="ml-2 text-sm text-gray-700 cursor-pointer"
                  onClick={() => {
                    setFormData({ ...formData, deliveryOption: '0.0' });
                    setDeliveryCharge(Number(0.0));
                    setCustomShippingArea('ঢাকার ভিতরে');
                  }}
                >
                  ঢাকার ভিতরে ডেলিভারি চার্জ ফ্রি
                </label>
              </div>
            </div>
          ) : (
            <div className="mt-2 space-y-2">
              <div
                onClick={() => {
                  setFormData({ ...formData, deliveryOption: '130' });
                  setDeliveryCharge(Number(130));
                  setCustomShippingArea('ঢাকার বাইরে');
                }}
                className={`flex cursor-pointer items-center w-full p-2 rounded ${formData.deliveryOption === '130' ? ' bg-green-500 ' : 'bg-slate-200 '}`}
              >
                <input
                  type="radio"
                  name="deliveryOption"
                  value="130"
                  checked={formData.deliveryOption === '130'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-700 cursor-pointer">
                  ঢাকার বাইরে ১৩০ টাকা
                </label>
              </div>
              <div
                onClick={() => {
                  setFormData({ ...formData, deliveryOption: '60' });
                  setDeliveryCharge(Number(60));
                  setCustomShippingArea('ঢাকার ভিতরে');
                }}
                className={`flex cursor-pointer items-center w-full p-2 rounded ${formData.deliveryOption === '60' ? ' bg-green-500 ' : 'bg-slate-200 '}`}
              >
                <input
                  type="radio"
                  name="deliveryOption"
                  value="60"
                  checked={formData.deliveryOption === '60'}
                  onChange={handleInputChange}
                  className={`h-4 w-4 focus:ring-green-500 border-gray-300 `}
                />
                <label className="ml-2 text-sm text-gray-700 cursor-pointer">
                  ঢাকার ভিতরে ৬০ টাকা
                </label>
              </div>
            </div>
          )}
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full cursor-pointer bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
        >
          অর্ডার কনফার্ম করুন
        </button>
      </form>
    </div>
  );
};
export default FormData;
