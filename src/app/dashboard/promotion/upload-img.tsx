/*
|-----------------------------------------
| setting up UploadImg for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const UploadImg = ({
  images,
  setImages,
}: {
  images: {
    id: string;
    url: string;
    display_url: string;
  }[];
  setImages: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        url: string;
        display_url: string;
      }[]
    >
  >;
}) => {
  const [loading, setLoading] = useState(false);

  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await response.json();
      if (data.success) {

        // Save image data to our server
        const saveResponse = await fetch('/api/media', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            delete_url: data.data.delete_url,
            url: data.data.url,
            display_url: data.data.display_url,
          }),
        });

        if (!saveResponse.ok) {
          throw new Error('সার্ভারে ছবি সেভ করতে সমস্যা হয়েছে');
        }
        const newImage = { id: data.data?.id, url: data.data?.url, display_url: data.data?.url };
        setImages([newImage, ...images]);
        toast.success('ছবি সফলভাবে আপলোড হয়েছে!');
        setShowUploadModal(false);
      } else {
        toast.error('ছবি আপলোড করতে সমস্যা হয়েছে!');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('ছবি আপলোড করতে সমস্যা হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setShowUploadModal(true)}
        className="bg-green-200 text-slate-800 hover:bg-green-300 cursor-pointer"
      >
        Upload
      </Button>
      {showUploadModal && (
        <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">ছবি আপলোড করুন</h3>
            <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={loading} />
            {loading && <p className="text-blue-500 mt-2">আপলোড হচ্ছে...</p>}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => setShowUploadModal(false)}
              >
                বাতিল
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default UploadImg;
