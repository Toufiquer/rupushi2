'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
/* |----------------------------------------- 
| setting up UpdatePromotion for the App 
| @author: Toufiquer Rahman<toufiquer.0@gmail.com> 
| @copyright: rupushi2, May, 2025 
|----------------------------------------- */

import { useState, useEffect, FormEvent } from 'react';
import SimpleImageUpload from './ImageSection';

// interfaces
export interface PromotionData {
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

const UpdatePromotion = ({ id }: { id: string }) => {
  const [selectedImage1, setSelectedImage1] = useState('');
  const [selectedImage2, setSelectedImage2] = useState('');
  const [selectedImage3, setSelectedImage3] = useState('');
  const [selectedImage4, setSelectedImage4] = useState('');
  const [formData, setFormData] = useState<PromotionData>({
    mainPageTitle: '',
    mainPageImage1: '',
    mainPageImage2: '',
    mainPagePriceText: '',
    mainPageText1: '',
    mainPageText2: '',
    productPageBannerImage1: '',
    productPageBannerImage2: '',
    productPageTitle1: '',
    productPageTitle2: '',
    productPageEndTime: '',
    productPageText1: '',
    productPageText2: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [promotionFound, setPromotionFound] = useState(false);

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
          setFormData({
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
          });
          setSelectedImage1(promotion.mainPageImage1 || '');
          setSelectedImage2(promotion.mainPageImage2 || '');
          setSelectedImage3(promotion.productPageBannerImage1);
          setSelectedImage4(promotion.productPageBannerImage2);
          setPromotionFound(true);
        } else {
          setError(`Promotion with ID ${id} not found`);
          setPromotionFound(false);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setPromotionFound(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPromotion();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear previous errors on input change
    setSuccess(null); // Clear previous success messages on input change
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    const updateData = { ...formData, id: id };

    if (selectedImage1) {
      updateData.mainPageImage1 = selectedImage1;
    }
    if (selectedImage2) {
      updateData.mainPageImage2 = selectedImage2;
    }
    if (selectedImage3) {
      updateData.productPageBannerImage1 = selectedImage3;
    }
    if (selectedImage4) {
      updateData.productPageBannerImage2 = selectedImage4;
    }
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'PUT', // Use PUT for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const result: ApiResponse = await response.json();
      if (result) {
        setSuccess('Promotion data successfully updated!');
      } else {
        const errorData = await response.json();
        setError(`Error updating data: ${errorData.message || response.statusText}`);
      }
    } catch (err: any) {
      setError(`Error updating data: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!promotionFound && !isLoading) {
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

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Promotion</h1>
      <p className="text-gray-600 mb-4">ID: {id}</p>
      <ScrollArea className="w-full p-4 h-[600px] pr-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="mainPageTitle" className="block text-sm font-medium text-gray-700">
              Main Page Title:
            </label>
            <input
              type="text"
              id="mainPageTitle"
              name="mainPageTitle"
              value={formData.mainPageTitle}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="mainPageImage1" className="block text-sm font-medium text-gray-700">
              Main Page Image 1 URL:
            </label>

            <SimpleImageUpload
              selectedImage={selectedImage1}
              setSelectedImage={setSelectedImage1}
            />
          </div>
          <div>
            <label htmlFor="mainPageImage2" className="block text-sm font-medium text-gray-700">
              Main Page Image 2 URL:
            </label>

            <SimpleImageUpload
              selectedImage={selectedImage2}
              setSelectedImage={setSelectedImage2}
            />
          </div>
          <div>
            <label htmlFor="mainPagePriceText" className="block text-sm font-medium text-gray-700">
              Main Page Price Text:
            </label>
            <input
              type="text"
              id="mainPagePriceText"
              name="mainPagePriceText"
              value={formData.mainPagePriceText}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="mainPageText1" className="block text-sm font-medium text-gray-700">
              Main Page Text 1:
            </label>
            <textarea
              id="mainPageText1"
              name="mainPageText1"
              value={formData.mainPageText1}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="mainPageText2" className="block text-sm font-medium text-gray-700">
              Main Page Text 2:
            </label>
            <textarea
              id="mainPageText2"
              name="mainPageText2"
              value={formData.mainPageText2}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="productPageBannerImage1"
              className="block text-sm font-medium text-gray-700"
            >
              Product Page Banner Image 1 URL:
            </label>

            <SimpleImageUpload
              selectedImage={selectedImage3}
              setSelectedImage={setSelectedImage3}
            />
          </div>
          <div>
            <label
              htmlFor="productPageBannerImage2"
              className="block text-sm font-medium text-gray-700"
            >
              Product Page Banner Image 2 URL:
            </label>

            <SimpleImageUpload
              selectedImage={selectedImage4}
              setSelectedImage={setSelectedImage4}
            />
          </div>
          <div>
            <label htmlFor="productPageTitle1" className="block text-sm font-medium text-gray-700">
              Product Page Title 1:
            </label>
            <input
              type="text"
              id="productPageTitle1"
              name="productPageTitle1"
              value={formData.productPageTitle1}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="productPageTitle2" className="block text-sm font-medium text-gray-700">
              Product Page Title 2:
            </label>
            <input
              type="text"
              id="productPageTitle2"
              name="productPageTitle2"
              value={formData.productPageTitle2}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="productPageEndTime" className="block text-sm font-medium text-gray-700">
              Product Page End Time:
            </label>
            <input
              type="text"
              id="productPageEndTime"
              name="productPageEndTime"
              value={formData.productPageEndTime}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="e.g., 31/12/2025"
              required
            />
          </div>
          <div>
            <label htmlFor="productPageText1" className="block text-sm font-medium text-gray-700">
              Product Page Text 1:
            </label>
            <textarea
              id="productPageText1"
              name="productPageText1"
              value={formData.productPageText1}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="productPageText2" className="block text-sm font-medium text-gray-700">
              Product Page Text 2:
            </label>
            <textarea
              id="productPageText2"
              name="productPageText2"
              value={formData.productPageText2}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSaving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            disabled={isSaving}
          >
            {isSaving ? 'Updating...' : 'Update Promotion'}
          </button>
        </form>
      </ScrollArea>
      {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">{error}</div>}
      {success && <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">{success}</div>}
    </div>
  );
};

export default UpdatePromotion;
