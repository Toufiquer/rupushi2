'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '../table/data-table';
import Image from 'next/image';
import { FaRegEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogContent,
  // AlertDialogHeader, (removed as it is not exported)
  AlertDialogTitle,
  AlertDialogDescription,
  // AlertDialogFooter, (removed as it is not exported)
  AlertDialogCancel,
  AlertDialogAction,
} from '@radix-ui/react-alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import AddProduct from './add-product';

// Product type definition
type Product = {
  _id: string;
  name: string;
  'product-code': string;
  img: string;
  realPrice: string;
  discountedPrice?: string;
  offer: string;
  stock: string;
  'description-top': string;
  'description-bottom'?: string;
  material?: string;
  design?: string;
  color?: string;
  weight?: string;
  'chain length'?: string;
  style?: string;
  createdAt: string;
  updatedAt: string;
};

const AllProducts = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    'product-code': '',
    img: '',
    realPrice: '',
    discountedPrice: '',
    offer: '',
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
  const [images, setImages] = useState<{ id: string; url: string; display_url: string }[]>([]);
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
  const [selectedImage, setSelectedImage] = useState('');
  const [showMediaModal, setShowMediaModal] = useState(false);
  // Function to fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Handle edit product
  const handleEditClick = (product: Product) => {
    setProductToEdit(product);
    setEditForm({
      name: product.name,
      'product-code': product['product-code'],
      img: product.img,
      realPrice: product.realPrice,
      discountedPrice: product.discountedPrice || '',
      offer: product.offer,
      stock: product.stock,
      'description-top': product['description-top'],
      'description-bottom': product['description-bottom'] || '',
      material: product.material || '',
      design: product.design || '',
      color: product.color || '',
      weight: product.weight || '',
      'chain length': product['chain length'] || '',
      style: product.style || '',
    });
    setSelectedImage(product.img);
    setEditDialogOpen(true);
  };

  // Handle delete product
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  // Handle input change for edit form
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
    console.log('');
    console.log(' -- name : ', name, value);
    console.log('');
    // setSelectedImage();
  };

  // Save edit changes
  const handleSaveEdit = async () => {
    if (!productToEdit) return;
    console.log('---productToEdit : ', productToEdit);
    editForm.img = selectedImage;
    try {
      const response = await fetch(`/api/products/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productToEdit._id,
          ...editForm,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      toast({
        title: 'Success',
        description: 'Product updated successfully',
      });

      // Update the local state
      setProducts(products.map(p => (p._id === productToEdit._id ? { ...p, ...editForm } : p)));
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: 'Error',
        description: 'Failed to update product',
        variant: 'destructive',
      });
    }
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`/api/products/${productToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productToDelete._id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      toast({
        title: 'Success',
        description: 'Product deleted successfully',
      });

      // Remove from local state
      setProducts(products.filter(p => p._id !== productToDelete._id));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete product',
        variant: 'destructive',
      });
    }
  };

  // Column definitions
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'product-code',
      header: 'Code',
      cell: info => <span className="font-mono text-xs">{info.getValue() as string}</span>,
    },
    {
      accessorKey: 'img',
      header: 'Image',
      cell: info => {
        const imgUrl = info.getValue() as string;
        const fallbackImg = 'https://i.ibb.co/ZfzRN83/product.png';

        // Function to validate URL
        const isValidUrl = (url: string) => {
          try {
            new URL(url);
            return true;
          } catch {
            return false;
          }
        };

        return (
          <Image
            className="h-[80px] min-h-[80px] w-[80px] min-w-[80px] object-cover rounded"
            width={80}
            height={80}
            src={imgUrl && isValidUrl(imgUrl) ? imgUrl : fallbackImg}
            alt="product"
          />
        );
      },
    },
    {
      accessorKey: 'name',
      header: 'Product Name',
      cell: info => {
        const name = (info.getValue() as string) || '';
        return (
          <div className="inline-block min-w-[180px] font-semibold">
            {name.length > 30 ? `${name.slice(0, 30)}...` : name}
          </div>
        );
      },
    },
    {
      accessorKey: 'realPrice',
      header: 'Price',
      cell: info => (
        <span className="flex min-w-[80px] items-center">&#163; {info.getValue() as string}</span>
      ),
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: info => <span className="font-mono text-xs">{info.getValue() as string}</span>,
    },
    {
      accessorKey: 'updatedAt',
      header: 'Last Updated',
      cell: info => {
        const date = new Date(info.getValue() as string);
        return <span className="text-xs">{date.toLocaleDateString()}</span>;
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  onClick={() => handleEditClick(row.original)}
                >
                  <FaRegEdit size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  onClick={() => handleDeleteClick(row.original)}
                >
                  <FaTrash size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];
  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setFormData({ ...formData, img: imageUrl });
    setProductData({ ...productData, img: imageUrl });
    setShowMediaModal(false);
  };
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
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
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <Button
          onClick={() => setAddDialogOpen(true)}
          className="flex cursor-pointer items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md transition-all hover:shadow-lg"
        >
          <FaPlus size={14} />
          Add New Product
        </Button>
      </div>

      {/* Products Table */}
      <div className=" rounded-lg  ">
        <DataTable columns={columns} data={products} loading={loading} searchKey="name" />
      </div>

      {/* Add Product Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <AddProduct
            onSuccess={() => {
              setAddDialogOpen(false);
              fetchProducts();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-code">Product Code *</Label>
              <Input
                id="product-code"
                name="product-code"
                value={editForm['product-code']}
                onChange={handleEditChange}
                required
              />
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="img">Image URL</Label>
              <Input id="img" name="img" value={editForm.img} onChange={handleEditChange} />
            </div> */}

            <div className="space-y-2">
              <Label htmlFor="realPrice">Price (£) *</Label>
              <Input
                id="realPrice"
                name="realPrice"
                type="text"
                value={editForm.realPrice}
                onChange={handleEditChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountedPrice">Discounted Price (£)</Label>
              <Input
                id="discountedPrice"
                name="discountedPrice"
                type="text"
                value={editForm.discountedPrice}
                onChange={handleEditChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="offer">Offer %</Label>
              <Input
                id="offer"
                name="offer"
                type="text"
                value={editForm.offer}
                onChange={handleEditChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock *</Label>
              <Input
                id="stock"
                name="stock"
                type="text"
                value={editForm.stock}
                onChange={handleEditChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="material">Material</Label>
              <Input
                id="material"
                name="material"
                value={editForm.material}
                onChange={handleEditChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="design">Design</Label>
              <Input
                id="design"
                name="design"
                value={editForm.design}
                onChange={handleEditChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input id="color" name="color" value={editForm.color} onChange={handleEditChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                name="weight"
                value={editForm.weight}
                onChange={handleEditChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chain length">Chain Length</Label>
              <Input
                id="chain length"
                name="chain length"
                value={editForm['chain length']}
                onChange={handleEditChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Style</Label>
              <Input id="style" name="style" value={editForm.style} onChange={handleEditChange} />
            </div>

            <div className="space-y-2 col-span-full">
              <Label htmlFor="description-top">Top Description *</Label>
              <Textarea
                id="description-top"
                name="description-top"
                value={editForm['description-top']}
                onChange={handleEditChange}
                required
                rows={3}
              />
            </div>

            <div className="space-y-2 col-span-full">
              <Label htmlFor="description-bottom">Bottom Description</Label>
              <Textarea
                id="description-bottom"
                name="description-bottom"
                value={editForm['description-bottom']}
                onChange={handleEditChange}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="flex cursor-pointer items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md transition-all hover:shadow-lg"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <div>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the product &quot;{productToDelete?.name}&quot;. This action cannot
              be undone.
            </AlertDialogDescription>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AllProducts;
