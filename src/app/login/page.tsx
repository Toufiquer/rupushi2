import Link from 'next/link';
import React from 'react';

const Login = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">লগইন করুন</h2>
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            ইমেইল
          </label>
          <input type="email" id="email" className="border rounded w-full py-2 px-3" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            পাসওয়ার্ড
          </label>
          <input
            type="password"
            id="password"
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <Link href="/dashboard">
          <button
            type="submit"
            className="cursor-pointer bg-blue-500 w-full text-white py-2 px-4 rounded"
          >
            লগইন
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
