import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import UploadImg from './upload-img';

interface ImageItem {
  id: string;
  url: string;
  display_url: string;
}

const SimpleImageUpload = ({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: string;
  setSelectedImage: Dispatch<SetStateAction<string>>;
}) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [showMediaModal, setShowMediaModal] = useState(false);

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowMediaModal(false);
  };

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

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Image Upload</h2>

      {/* Image Selection Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-gray-700 font-medium">Image:</label>
          <Button
            onClick={() => setShowMediaModal(true)}
            className="bg-blue-500 cursor-pointer text-white hover:bg-blue-600"
          >
            Select Image
          </Button>
        </div>
        {selectedImage ? (
          <div className="relative w-full h-48 border rounded-md overflow-hidden">
            <Image src={selectedImage} alt="Selected image" layout="fill" objectFit="contain" />
            <Button
              onClick={() => {
                setSelectedImage('');
              }}
              className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600 p-1 rounded-full w-8 h-8"
            >
              ✕
            </Button>
          </div>
        ) : (
          <div className="w-full h-48 border rounded-md flex items-center justify-center bg-gray-100">
            <Button
              onClick={() => setShowMediaModal(true)}
              className="bg-blue-500 cursor-pointer text-white hover:bg-blue-600"
            >
              Select Image
            </Button>
          </div>
        )}
      </div>

      {/* Media Selection Modal */}
      {showMediaModal && (
        <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b-1 pb-2">
              <h3 className="text-lg font-semibold w-full">Select an Image</h3>
              <div className="w-full flex items-center justify-end gap-2">
                <UploadImg images={images} setImages={setImages} />
                <Button
                  onClick={() => setShowMediaModal(false)}
                  className="bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
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
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 rounded-md left-0">
                      <Button className="opacity-0 group-hover:opacity-100 backdrop-blur-lg text-white">
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
    </div>
  );
};

export default SimpleImageUpload;
