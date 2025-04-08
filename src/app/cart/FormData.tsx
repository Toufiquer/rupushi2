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

// Define interfaces for form data and product
interface FormData {
  name: string;
  mobile: string;
  address: string;
  note: string;
  deliveryOption: string;
}

const FormData = () => {
  const { cart, deliveryCharge, setDeliveryCharge } = useStore();
  // State for form inputs with type
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    address: '',
    note: '',
    deliveryOption: deliveryCharge + '',
  });

  const [loading, setLoading] = useState<boolean>(false);

  // Handle form input changes with type
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log({ name, value });
  };

  interface OrderData {
    customerInfo: {
      customerName: string;
      orderId: number;
      deliveryCharge: number;
      totalPrice: number;
      address: string;
      phone: string;
      shippingArea: 'inside Dhaka' | 'outside Dhaka';
      note?: string;
      orderStatus?: string;
    };
    productInfo: IProduct[];
  }
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
    function generateOrder(formData: FormData, productData: IProduct[]): OrderData {
      // Generate a simple order ID (you might want to use a more robust method in production)
      const orderId = getMillisecondsSince2000();

      // Determine delivery charge and shipping area based on delivery option
      const deliveryCharge = formData.deliveryOption === '130' ? 130 : 60;
      const shippingArea = deliveryCharge === 130 ? 'inside Dhaka' : 'outside Dhaka';

      const totalPrice = 0;

      return {
        customerInfo: {
          customerName: formData.name,
          orderId: orderId,
          deliveryCharge: deliveryCharge,
          totalPrice: totalPrice,
          address: formData.address,
          phone: formData.mobile,
          shippingArea,
          note: formData.note || '',
          orderStatus: 'pending', // Default initial status
        },
        productInfo: productData,
      };
    }
    console.log('generateOrder', generateOrder(formData, cart));
  };
  const handleDeliveryCharge = (cost: number) => {};
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-red-600 mb-4">
        আপনার তথ্যাদি কনফার্ম করতে আপনার নাম, ঠিকানা, (মোবাইল নাম্বার) এবং কনফার্ম করুন
        <br />
        বাটনে ক্লিক করুন
      </h2>
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
          <label className="block text-sm font-medium text-gray-700">Note</label>
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
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                name="deliveryOption"
                value="130"
                checked={formData.deliveryOption === '130'}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <label
                className="ml-2 text-sm text-gray-700 cursor-pointer"
                onClick={() => {
                  setFormData({ ...formData, deliveryOption: '130' });
                  setDeliveryCharge(Number(130));
                }}
              >
                ঢাকার বাইরে ১৩০ টাকা
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="deliveryOption"
                value="60"
                checked={formData.deliveryOption === '60'}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <label
                className="ml-2 text-sm text-gray-700 cursor-pointer"
                onClick={() => {
                  setFormData({ ...formData, deliveryOption: '60' });
                  setDeliveryCharge(Number(60));
                }}
              >
                ঢাকার ভিতরে ৬০ টাকা
              </label>
            </div>
          </div>
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
