'use client';
import React, { useEffect, useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    alias: '',
    passCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/dashboard';
    }
  }, []);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.data) {
        localStorage.setItem('token', data.data);
        window.location.href = '/dashboard';
      } else {
        alert('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center flex-col w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center w-full">লগইন করুন</h2>
      <form className="max-w-md mx-auto w-full" onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            নাম
          </label>
          <input
            type="text"
            id="name"
            className="border rounded w-full py-2 px-3"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            ইমেইল
          </label>
          <input
            type="email"
            id="email"
            className="border rounded w-full py-2 px-3"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="alias">
            alias
          </label>
          <input
            type="text"
            id="alias"
            className="border rounded w-full py-2 px-3"
            value={formData.alias}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="passCode">
            পাসকোড
          </label>
          <input
            type="password"
            id="passCode"
            className="border rounded w-full py-2 px-3"
            value={formData.passCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer bg-blue-500 w-full text-white py-2 px-4 rounded"
        >
          লগইন
        </button>
      </form>
    </div>
  );
};

export default Login;
