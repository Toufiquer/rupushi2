'use client';

import React, { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '../table/data-table';
import Image from 'next/image';
import { FaTrashRestore, FaTrashAlt } from 'react-icons/fa';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
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

// Product type definition
type Product = {
  _id: string;
  name: string;
  'product-code': string;
  img: string;
  realPrice: string;
  deletedAt: string;
};

const TrashProducts = () => {
  const { toast } = useToast();
  const [deletedProducts, setDeletedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [permanentDeleteDialogOpen, setPermanentDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Function to fetch deleted products
  const fetchDeletedProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products/trash');
      if (!response.ok) {
        throw new Error('Failed to fetch deleted products');
      }
      const data = await response.json();
      setDeletedProducts(data.data || []);
    } catch (error) {
      console.error('Error fetching deleted products:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch deleted products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle restore product
  const handleRestore = async (product: Product) => {
    try {
      const response = await fetch(`/api/products/restore/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: product._id }),
      });

      if (!response.ok) {
        throw new Error('Failed to restore product');
      }

      toast({
        title: 'Success',
        description: 'Product restored successfully',
      });

      // Remove from local state
      setDeletedProducts(deletedProducts.filter(p => p._id !== product._id));
    } catch (error) {
      console.error('Error restoring product:', error);
      toast({
        title: 'Error',
        description: 'Failed to restore product',
        variant: 'destructive',
      });
    }
  };

  // Handle permanent delete
  const handlePermanentDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setPermanentDeleteDialogOpen(true);
  };

  // Confirm permanent delete
  const confirmPermanentDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`/api/products/permanent-delete/${productToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productToDelete._id }),
      });

      if (!response.ok) {
        throw new Error('Failed to permanently delete product');
      }

      toast({
        title: 'Success',
        description: 'Product permanently deleted',
      });

      // Remove from local state
      setDeletedProducts(deletedProducts.filter(p => p._id !== productToDelete._id));
      setPermanentDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error permanently deleting product:', error);
      toast({
        title: 'Error',
        description: 'Failed to permanently delete product',
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
      cell: info => (
        <Image
          className="h-[80px] min-h-[80px] w-[80px] min-w-[80px] object-cover rounded"
          width={80}
          height={80}
          src={(info.getValue() as string) || 'https://i.ibb.co/ZfzRN83/product.png'}
          alt="product"
        />
      ),
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
      accessorKey: 'deletedAt',
      header: 'Deleted At',
      cell: info => {
        const date = new Date(info.getValue() as string);
        return <span className="text-xs">{date.toLocaleString()}</span>;
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
                  className="text-green-600 hover:text-green-800 cursor-pointer"
                  onClick={() => handleRestore(row.original)}
                >
                  <FaTrashRestore size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Restore</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  onClick={() => handlePermanentDeleteClick(row.original)}
                >
                  <FaTrashAlt size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Permanently Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchDeletedProducts();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Deleted Products</h2>
        <Button
          variant="outline"
          onClick={() => fetchDeletedProducts()}
          className="flex items-center gap-2"
        >
          Refresh
        </Button>
      </div>

      {/* Deleted Products Table */}
      <div className="bg-white rounded-lg shadow">
        <DataTable
          columns={columns}
          data={deletedProducts}
          loading={loading}
          searchKey="name"
          emptyMessage="No deleted products found"
        />
      </div>

      {/* Permanent Delete Confirmation Dialog */}
      <AlertDialog open={permanentDeleteDialogOpen} onOpenChange={setPermanentDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Permanently Delete?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product "{productToDelete?.name}". This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmPermanentDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Permanently Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TrashProducts;
