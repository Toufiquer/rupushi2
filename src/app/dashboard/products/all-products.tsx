'use client';

import React, { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '../table/data-table';
import Image from 'next/image';
import { FaRegEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { StatusBox } from '../table/status-box';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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

  // Function to fetch products
  const fetchProducts = async () => {
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
  };

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
  };

  // Save edit changes
  const handleSaveEdit = async () => {
    if (!productToEdit) return;

    try {
      const response = await fetch(`/api/products/${productToEdit._id}`, {
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
          } catch (e) {
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
      cell: info => (
        <span className="flex items-center">
          {parseInt(info.getValue() as string) > 0 ? (
            <StatusBox className="text-[12px]" text="In Stock" />
          ) : (
            <StatusBox className="text-[12px] bg-red-100 text-red-600" text="Out of Stock" />
          )}
        </span>
      ),
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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <Button onClick={() => setAddDialogOpen(true)} className="flex items-center gap-2">
          <FaPlus size={14} />
          Add New Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow">
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

            <div className="space-y-2">
              <Label htmlFor="img">Image URL</Label>
              <Input id="img" name="img" value={editForm.img} onChange={handleEditChange} />
            </div>

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
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the product "{productToDelete?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AllProducts;
