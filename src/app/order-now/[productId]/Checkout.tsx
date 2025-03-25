// components/Checkout.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { IProduct } from '@/app/components/ProductsCard';

// Define interfaces for form data and product
interface FormData {
  name: string;
  mobile: string;
  address: string;
  deliveryOption: string;
}

const Checkout = ({ product }: { product: IProduct }) => {
  console.log('product : ', product);
  // State for form inputs with type
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    address: '',
    deliveryOption: '130',
  });

  // State for cart item quantity with type
  const [quantity, setQuantity] = useState<number>(1);

  // Calculate totals
  const subtotal: number = product?.discountedPrice
    ? Number(product.discountedPrice) * quantity
    : Number(product.realPrice) * quantity;
  const deliveryCharge: number = parseInt(formData.deliveryOption);
  const total: number = subtotal + deliveryCharge;

  // Handle form input changes with type
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle quantity changes with type
  const handleQuantityChange = (change: number): void => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  // Form submission handler with type
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('formData', formData);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Left Section: Form */}
      <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
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
            <label className="block text-sm font-medium text-gray-700">
              আপনার মোবাইল নাম্বার *
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="আপনার মোবাইল নাম্বার"
              required
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
                  onClick={() => setFormData({ ...formData, deliveryOption: '130' })}
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
                  onClick={() => setFormData({ ...formData, deliveryOption: '60' })}
                >
                  ঢাকার ভিতরে ৬০ টাকা
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
          >
            অর্ডার কনফার্ম করুন
          </button>
        </form>
      </div>

      {/* Right Section: Cart Summary */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <div className="border-b pb-4">
          <div className="flex items-center justify-between flex-col gap-4 mb-2">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-start max-h-[100px] justify-start ">
                <Image
                  src={product.img || '/placeholder.jpg'}
                  alt={product.name || 'Product Image'}
                  width={100}
                  height={100}
                  className="object-cover rounded"
                />
              </div>
              <div className="ml-4 w-full flex flex-col items-start self-start">
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-sm text-gray-500 pt-2">
                  {product.discountedPrice || product.realPrice} টাকা
                </p>
              </div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center border-slate-200 border-2 rounded overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className=" px-2 py-1 cursor-pointer hover:text-slate-50 hover:bg-slate-300 duration-200"
                >
                  {' '}
                  -{' '}
                </button>
                <span className="border-r border-l border-slate-200 px-2 py-1">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className=" px-2 py-1 cursor-pointer hover:text-slate-50 hover:bg-slate-300 duration-200"
                >
                  {' '}
                  +{' '}
                </button>
              </div>
              <p className="text-sm font-medium">
                {product.discountedPrice
                  ? Number(product.discountedPrice) * quantity
                  : Number(product.realPrice) * quantity}{' '}
                টাকা
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <p className="text-sm">SUB-TOTAL</p>
            <p className="text-sm font-medium">{subtotal} টাকা</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">DELIVERY CHARGES</p>
            <p className="text-sm font-medium">{deliveryCharge} টাকা</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-semibold">TOTAL</p>
            <p className="text-lg font-bold text-red-600">{total} টাকা</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
