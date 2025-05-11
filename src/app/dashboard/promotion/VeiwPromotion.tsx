'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
/* |----------------------------------------- 
| setting up ViewPromotion for the App 
| @author: Toufiquer Rahman<toufiquer.0@gmail.com> 
| @copyright: rupushi2, May, 2025 
|----------------------------------------- */

import { useState, useEffect } from 'react';
import Image from 'next/image';

// interfaces
interface PromotionData {
  mainPageTitle: string;
  mainPageImage1: string;
  mainPageImage2: string;
  mainPagePriceText: string;
  mainPageText1: string;
  mainPageText2: string;
  productPageBannerImage1: string;
  productPageBannerImage2: string;
  productPageTitle1: string;
  productPageTitle2: string;
  productPageEndTime: string;
  productPageText1: string;
  productPageText2: string;
  productCode: string;
  activeStatus: boolean;
}

interface Promotion extends PromotionData {
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  data: Promotion[];
  message: string;
}

const API_URL = 'http://localhost:3000/api/v1/promotion';

const ViewPromotion = ({ id }: { id: string }) => {
  const [promotionData, setPromotionData] = useState<PromotionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch promotion data based on ID
  useEffect(() => {
    const fetchPromotion = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();
        const promotion = result.data.find(p => p.id === id || p._id === id);

        if (promotion) {
          setPromotionData({
            mainPageTitle: promotion.mainPageTitle || '',
            mainPageImage1: promotion.mainPageImage1 || '',
            mainPageImage2: promotion.mainPageImage2 || '',
            mainPagePriceText: promotion.mainPagePriceText || '',
            mainPageText1: promotion.mainPageText1 || '',
            mainPageText2: promotion.mainPageText2 || '',
            productPageBannerImage1: promotion.productPageBannerImage1 || '',
            productPageBannerImage2: promotion.productPageBannerImage2 || '',
            productPageTitle1: promotion.productPageTitle1 || '',
            productPageTitle2: promotion.productPageTitle2 || '',
            productPageEndTime: promotion.productPageEndTime || '',
            productPageText1: promotion.productPageText1 || '',
            productPageText2: promotion.productPageText2 || '',
            productCode: promotion.productCode || '',
            activeStatus: promotion.activeStatus || false,
          });
        } else {
          setError(`Promotion with ID ${id} not found`);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPromotion();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !promotionData) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">
            {error || `Promotion with ID ${id} not found. Please check the ID and try again.`}
          </p>
        </div>
      </div>
    );
  }

  const ImageDisplay = ({ url, alt }: { url: string; alt: string }) => {
    return url ? (
      <div className="w-full h-48 border rounded-md overflow-hidden bg-gray-50">
        <div className="relative w-full h-full">
          <Image src={url} alt={alt} layout="fill" objectFit="contain" />
        </div>
      </div>
    ) : (
      <div className="w-full h-48 border rounded-md flex items-center justify-center bg-gray-100">
        <p className="text-gray-400">No image available</p>
      </div>
    );
  };

  const InfoItem = ({ label, value }: { label: string; value: unknown }) => {
    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">{label}:</h3>
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">{value as string}</div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Promotion Details</h1>
        <p className="text-gray-600">ID: {id}</p>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Promotion Status</h1>
        <p className="text-gray-600">{promotionData.activeStatus ? 'Active' : 'Inactive'}</p>
      </div>

      <ScrollArea className="w-full p-4 h-[600px] pr-4">
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-600 border-b pb-2">
              Main Page Information
            </h2>

            <InfoItem label="Main Page Title" value={promotionData.mainPageTitle} />

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Main Page Image 1:</h3>
              <ImageDisplay url={promotionData.mainPageImage1} alt="Main page first image" />
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Main Page Image 2:</h3>
              <ImageDisplay url={promotionData.mainPageImage2} alt="Main page second image" />
            </div>

            <InfoItem label="Main Page Price Text" value={promotionData.mainPagePriceText} />

            <InfoItem
              label="Main Page Text 1"
              value={<p className="whitespace-pre-line">{promotionData.mainPageText1}</p>}
            />

            <InfoItem
              label="Main Page Text 2"
              value={<p className="whitespace-pre-line">{promotionData.mainPageText2}</p>}
            />
            <InfoItem
              label="Main Page Text 2"
              value={<p className="whitespace-pre-line">{promotionData.productCode}</p>}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-600 border-b pb-2">
              Product Page Information
            </h2>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Product Page Banner Image 1:
              </h3>
              <ImageDisplay
                url={promotionData.productPageBannerImage1}
                alt="Product page first banner"
              />
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Product Page Banner Image 2:
              </h3>
              <ImageDisplay
                url={promotionData.productPageBannerImage2}
                alt="Product page second banner"
              />
            </div>

            <InfoItem label="Product Page Title 1" value={promotionData.productPageTitle1} />

            <InfoItem label="Product Page Title 2" value={promotionData.productPageTitle2} />

            <InfoItem label="Product Page End Time" value={promotionData.productPageEndTime} />

            <InfoItem
              label="Product Page Text 1"
              value={<p className="whitespace-pre-line">{promotionData.productPageText1}</p>}
            />

            <InfoItem
              label="Product Page Text 2"
              value={<p className="whitespace-pre-line">{promotionData.productPageText2}</p>}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ViewPromotion;
