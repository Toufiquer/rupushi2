'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import UploadImg from './upload-img';

const AddProduct = ({ onSuccess }: { onSuccess: () => void }) => {
  const { toast } = useToast();
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
  const [images, setImages] = useState<{ id: string; url: string; display_url: string }[]>([]);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    'product-code': '',
    img: 'https://i.ibb.co/ZfzRN83/product.png',
    realPrice: '',
    discountedPrice: '',
    offer: '0',
    stock: '',
    'description-top': '',
    'description-bottom': '',
    material: '',
    design: '',
    color: '',
    weight: '',
    category: '',
    greenBox: '',
    isArrival: true,
    'chain length': '',
    style: '',
  });
  const [selectedImage, setSelectedImage] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      toast({
        title: 'Success',
        description: 'Product created successfully',
      });

      // Reset form
      setFormData({
        name: '',
        'product-code': '',
        img: 'https://i.ibb.co/ZfzRN83/product.png',
        realPrice: '',
        discountedPrice: '',
        offer: '0',
        stock: '',
        'description-top': '',
        'description-bottom': '',
        material: '',
        design: '',
        color: '',
        greenBox: '',
        category: '',
        isArrival: true,
        weight: '',
        'chain length': '',
        style: '',
      });

      // Notify parent component
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: 'Error',
        description: 'Failed to create product',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setFormData({ ...formData, img: imageUrl });
    setProductData({ ...productData, img: imageUrl });
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
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      {/* Image Selection Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-gray-700 font-medium">Product Image:</label>
          <Button
            onClick={() => setShowMediaModal(true)}
            className="bg-blue-500 cursor-pointer text-white hover:bg-blue-600"
          >
            Select Image
          </Button>
        </div>
        {selectedImage ? (
          <div className="relative w-full h-48 border rounded-md overflow-hidden">
            <Image src={selectedImage} alt="Selected product" layout="fill" objectFit="contain" />
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
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20  rounded-md left-0">
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-code">Product Code *</Label>
            <Input
              id="product-code"
              name="product-code"
              value={formData['product-code']}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="realPrice">Price (£) *</Label>
            <Input
              id="realPrice"
              name="realPrice"
              type="text"
              value={formData.realPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discountedPrice">Discounted Price (£)</Label>
            <Input
              id="discountedPrice"
              name="discountedPrice"
              type="text"
              value={formData.discountedPrice}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="offer">Offer %</Label>
            <Input
              id="offer"
              name="offer"
              type="text"
              value={formData.offer}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock *</Label>
            <Input
              id="stock"
              name="stock"
              type="text"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="material">Material</Label>
            <Input
              id="material"
              name="material"
              value={formData.material}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="design">Design</Label>
            <Input id="design" name="design" value={formData.design} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <Input id="color" name="color" value={formData.color} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight</Label>
            <Input id="weight" name="weight" value={formData.weight} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chain length">Chain Length</Label>
            <Input
              id="chain length"
              name="chain length"
              value={formData['chain length']}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="style">Style</Label>
            <Input id="style" name="style" value={formData.style} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="greenBox">Green Box</Label>
            <Input
              id="greenBox"
              name="greenBox"
              value={formData.greenBox}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2 col-span-2">
          <div className="w-full flex justify-between items-center mb-2">
            <Label htmlFor="description-top">New Arrival</Label>
            <div className="flex items-center justify-end">
              <p className="text-xs text-gray-800 pr-2">{isNewArrival ? 'ON' : 'OFF'}</p>
              <Switch
                className="border-2 border-slate-200 cursor-pointer"
                checked={isNewArrival}
                onCheckedChange={() => setIsNewArrival(!isNewArrival)}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2 col-span-2">
          <Label htmlFor="description-top">Top Description *</Label>
          <Textarea
            id="description-top"
            name="description-top"
            value={formData['description-top']}
            onChange={handleChange}
            required
            rows={3}
          />
        </div>

        <div className="space-y-2 col-span-2">
          <Label htmlFor="description-bottom">Bottom Description</Label>
          <Textarea
            id="description-bottom"
            name="description-bottom"
            value={formData['description-bottom']}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="flex cursor-pointer items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md transition-all hover:shadow-lg"
          >
            {loading ? 'Creating...' : 'Add Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
