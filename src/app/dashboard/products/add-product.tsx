'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const AddProduct = ({ onSuccess }: { onSuccess: () => void }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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
    'chain length': '',
    style: '',
  });

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

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

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
            <Label htmlFor="img">Image URL</Label>
            <Input id="img" name="img" value={formData.img} onChange={handleChange} />
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
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Add Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
