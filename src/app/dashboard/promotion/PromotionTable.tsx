'use client';
// components/PromotionTable.tsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import UpdatePromotion from './UpdatePromotion';
import ViewPromotion from './VeiwPromotion';

// Define the interface for a single promotion item
interface Promotion {
  _id: string;
  mainPageTitle: string;
  mainPageImage1: string;
  mainPageImage2: string;
  mainPagePriceText: string;
  mainPageText1: string;
  mainPageText2: string;
  productPageBannerImage1?: string; // Optional property
  productPageBannerImage2?: string; // Optional property
  productPageTitle1?: string; // Optional property
  productPageTitle2?: string; // Optional property
  productPageText1?: string; // Optional property
  productPageText2?: string; // Optional property
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

// Define the interface for the API response structure
interface ApiResponse {
  data: Promotion[];
  message: string;
}

const PromotionTable: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/promotion');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: ApiResponse = await response.json();
        setPromotions(result.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        Error fetching promotions: {error}
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
        Promotions
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-400 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Main Page Title</th>
              <th className="py-3 px-6 text-left">Price Text</th>
              <th className="py-3 px-6 text-left">Text 1</th>
              <th className="py-3 px-6 text-left">Text 2</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {promotions.length > 0 ? (
              promotions.map((promotion, index) => (
                <motion.tr
                  key={promotion.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-6 text-left">
                    <div className="font-medium">{promotion.mainPageTitle}</div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs font-medium">
                      {promotion.mainPagePriceText}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left max-w-xs truncate">
                    {promotion.mainPageText1}
                  </td>
                  <td className="py-3 px-6 text-left max-w-xs truncate">
                    {promotion.mainPageText2}
                  </td>
                  <td className="flex items-center justify-end gap-4 pt-2 pr-1">
                    <Dialog>
                      <DialogTrigger>
                        <div className="cursor-pointer hover:bg-slate-300 border-1 rounded px-2">
                          View
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-7xl w-full border">
                        <DialogHeader>
                          <DialogTitle></DialogTitle>
                          <div className="w-full border p-2">
                            <ViewPromotion id={promotion._id} />
                          </div>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger>
                        <div className="cursor-pointer hover:bg-slate-300 border-1 rounded px-2">
                          Update
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-7xl w-full border">
                        <DialogHeader>
                          <DialogTitle>Update Promotion</DialogTitle>
                          <div className="w-full border p-2">
                            <UpdatePromotion id={promotion._id} />
                          </div>
                          <DialogDescription>
                            You can update the promotion details above
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No promotions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PromotionTable;
