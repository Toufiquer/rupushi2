'use client';

// interfaces.ts
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

import { useState, useEffect, FormEvent } from 'react';

const API_URL = 'http://localhost:3000/api/v1/promotion';

const PromotionForm: React.FC = () => {
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

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [dataExists, setDataExists] = useState(false); // To determine if we should PUT or POST

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);
        if (response.ok) {
          const data: PromotionData = await response.json();
          setFormData(data);
          setDataExists(true);
        } else if (response.status === 404) {
          // Data doesn't exist yet, form will be for adding
          setDataExists(false);
        } else {
          setError(`Error fetching data: ${response.statusText}`);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Error ${dataExists ? 'updating' : 'adding'} data: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dataExists]);

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

    const method = dataExists ? 'PUT' : 'POST';

    try {
      const response = await fetch(API_URL, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(`Data successfully ${dataExists ? 'updated' : 'added'}!`);
        // If adding, the server might return the newly created data,
        // which could potentially include an ID if the API supported it.
        // For this specific API structure, we'll just acknowledge success.
        setDataExists(true); // After a successful POST, data now exists for future PUTs
      } else {
        const errorData = await response.json();
        setError(
          `Error ${dataExists ? 'updating' : 'adding'} data: ${errorData.message || response.statusText}`,
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Error ${dataExists ? 'updating' : 'adding'} data: ${err.message}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div>Loading form...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {dataExists ? 'Edit Promotion Data' : 'Add Promotion Data'}
      </h1>
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
          <input
            type="text"
            id="mainPageImage1"
            name="mainPageImage1"
            value={formData.mainPageImage1}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="mainPageImage2" className="block text-sm font-medium text-gray-700">
            Main Page Image 2 URL:
          </label>
          <input
            type="text"
            id="mainPageImage2"
            name="mainPageImage2"
            value={formData.mainPageImage2}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
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
          <input
            type="text"
            id="productPageBannerImage1"
            name="productPageBannerImage1"
            value={formData.productPageBannerImage1}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="productPageBannerImage2"
            className="block text-sm font-medium text-gray-700"
          >
            Product Page Banner Image 2 URL:
          </label>
          <input
            type="text"
            id="productPageBannerImage2"
            name="productPageBannerImage2"
            value={formData.productPageBannerImage2}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
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
            type="text" // Consider using type="date" or a datetime picker for better UX
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
            isSaving ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          disabled={isSaving}
        >
          {isSaving
            ? dataExists
              ? 'Updating...'
              : 'Adding...'
            : dataExists
              ? 'Update Promotion'
              : 'Add Promotion'}
        </button>
      </form>

      {error && <div className="mt-4 text-red-600">{error}</div>}
      {success && <div className="mt-4 text-green-600">{success}</div>}
    </div>
  );
};

export default PromotionForm;
