'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Media = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [imgFile, setImgFiles] = useState<
    { delete_url: string; url: string; display_url: string }[]
  >([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/media');
      const data = await response.json();
      console.log('data : ', data);
      setImgFiles(data.data);
      setImages(
        data.data.map(
          (item: { delete_url: string; url: string; display_url: string }) => item.display_url,
        ),
      );
    };
    fetchImages();
  }, []);

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
        console.log('data : ', data);

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

        setImages(prev => [...prev, data.data.url]);
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
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">ইমেজ গ্যালারি</h2>
        <Button
          className="hover:bg-pink-500 border-1-pink-600 rounded-full bg-pink-400 text-white cursor-pointer"
          onClick={() => setShowUploadModal(true)}
        >
          ছবি আপলোড করুন
        </Button>
      </div>

      {showUploadModal ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <img
                src={imageUrl}
                alt={`Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Media;
