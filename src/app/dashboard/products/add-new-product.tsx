import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const AddNewProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    realPrice: '',
    discountedPrice: '',
    offer: '',
    stock: '',
    'description-top': '',
    'description-bottom': '',
    img: '',
    'product-code': '',
    material: '',
    design: '',
    color: '',
    weight: '',
    'chain-length': '',
    style: '',
  });
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [images, setImages] = useState<{ id: string; url: string; display_url: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    // Fetch images from the media API when component mounts
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/media');
        const data = await response.json();
        if (data.data) {
          setImages(data.data);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setProductData({ ...productData, img: imageUrl });
    setShowMediaModal(false);
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({
      show: true,
      message,
      type,
    });

    // Auto hide notification after 5 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const result = await response.json();
      console.log('result : ', result);

      // Show success notification
      showNotification('Product added successfully!', 'success');

      // Reset form data
      setProductData({
        name: '',
        realPrice: '',
        discountedPrice: '',
        offer: '',
        stock: '',
        'description-top': '',
        'description-bottom': '',
        img: '',
        'product-code': '',
        material: '',
        design: '',
        color: '',
        weight: '',
        'chain-length': '',
        style: '',
      });

      // Clear selected image
      setSelectedImage('');
    } catch (error) {
      console.error('Error adding product:', error);
      handleError(error);
    }
  };

  const handleError = async (error: unknown) => {
    let errorMessage = 'Failed to add product. Please try again.';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    if (error instanceof Response) {
      try {
        const errorData = await error.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch {
        // Default message if parsing fails
      }
    }

    showNotification(`Error: ${errorMessage}`, 'error');
  };

  return (
    <div className="w-full h-screen">
      {/* Custom Notification Popup */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md shadow-lg max-w-md z-50 transition-all duration-300 flex items-center ${
            notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          } text-white`}
        >
          <div className="mr-3">
            {notification.type === 'success' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
          <p>{notification.message}</p>
          <button
            onClick={() => setNotification(prev => ({ ...prev, show: false }))}
            className="ml-auto text-white hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}

      <ScrollArea className="h-[90vh] w-full rounded-md border p-4">
        <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Add New Product</h2>

          {/* Image Selection Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 font-medium">Product Image:</label>
              <Button
                onClick={() => setShowMediaModal(true)}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Select Image
              </Button>
            </div>
            {selectedImage ? (
              <div className="relative w-full h-48 border rounded-md overflow-hidden">
                <Image
                  src={selectedImage}
                  alt="Selected product"
                  layout="fill"
                  objectFit="contain"
                />
                <Button
                  onClick={() => {
                    setSelectedImage('');
                    setProductData({ ...productData, img: '' });
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600 p-1 rounded-full w-8 h-8"
                >
                  ✕
                </Button>
              </div>
            ) : (
              <div className="w-full h-48 border rounded-md flex items-center justify-center bg-gray-100">
                <p className="text-gray-500">No image selected</p>
              </div>
            )}
          </div>

          {/* Media Selection Modal */}
          {showMediaModal && (
            <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Select an Image</h3>
                  <Button
                    onClick={() => setShowMediaModal(false)}
                    className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Cancel
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.length === 0 ? (
                    <div className="col-span-full flex justify-center items-center h-32">
                      <p className="text-gray-500">No images available</p>
                    </div>
                  ) : (
                    images.map(image => (
                      <div
                        key={image.id}
                        className="relative cursor-pointer group"
                        onClick={() => handleSelectImage(image.url)}
                      >
                        <Image
                          src={image.url}
                          alt="Media"
                          width={128}
                          height={128}
                          className="rounded-md border hover:border-blue-500 hover:shadow-lg"
                        />
                        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center rounded-md">
                          <Button className="opacity-0 group-hover:opacity-100 bg-blue-500 text-white">
                            Select
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name:</label>
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
              <label className="block text-gray-700">Real Price:</label>
              <input
                type="text"
                name="realPrice"
                value={productData.realPrice}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Discounted Price:</label>
              <input
                type="text"
                name="discountedPrice"
                value={productData.discountedPrice}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Offer:</label>
              <input
                type="text"
                name="offer"
                value={productData.offer}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Stock:</label>
              <input
                type="text"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Top Description:</label>
              <textarea
                name="description-top"
                value={productData['description-top']}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Bottom Description:</label>
              <textarea
                name="description-bottom"
                value={productData['description-bottom']}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Product Code:</label>
              <input
                type="text"
                name="product-code"
                value={productData['product-code']}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Material:</label>
              <input
                type="text"
                name="material"
                value={productData.material}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Design:</label>
              <input
                type="text"
                name="design"
                value={productData.design}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Color:</label>
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
              <label className="block text-gray-700">Weight:</label>
              <input
                type="text"
                name="weight"
                value={productData.weight}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Chain Length:</label>
              <input
                type="text"
                name="chain-length"
                value={productData['chain-length']}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Style:</label>
              <input
                type="text"
                name="style"
                value={productData.style}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Add Product
            </button>
          </form>
        </div>
        <div className="pb-12" />
      </ScrollArea>
    </div>
  );
};

export default AddNewProduct;
