import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

const AddNewUser = () => {
  const [productData, setProductData] = useState({
    name: '',
    color: '',
    price: '',
    size: '',
    img: '',
    productUrl: '',
    width: '',
    quantity: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // এখানে পণ্য যোগ করার লজিক যুক্ত করুন
  };

  return (
    <div className="w-full h-screen">
      <ScrollArea className="h-[90vh] w-full rounded-md border p-4">
        <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">নতুন পণ্য যোগ করুন</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">নাম:</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">রঙ:</label>
              <input
                type="text"
                name="color"
                value={productData.color}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">দাম:</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">আকার:</label>
              <input
                type="text"
                name="size"
                value={productData.size}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">ইমেজ URL:</label>
              <input
                type="text"
                name="img"
                value={productData.img}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">পণ্য URL:</label>
              <input
                type="text"
                name="productUrl"
                value={productData.productUrl}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">প্রস্থ:</label>
              <input
                type="text"
                name="width"
                value={productData.width}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">পরিমাণ:</label>
              <input
                type="number"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              যোগ করুন
            </button>
          </form>
        </div>
        <div className="pb-12" />
      </ScrollArea>
    </div>
  );
};

export default AddNewUser;
