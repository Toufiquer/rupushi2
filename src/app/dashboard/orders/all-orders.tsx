'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '../table/data-table';
import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { IProduct } from '@/app/components/ProductsCard';
import ProductOrderDisplay from './display-order-product';

// Order type definition
export type Order = {
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
  phone: string;
  updatedAt: string;
  orderStatus: string; // Added orderStatus field
  customerName: string;
  price: number;
  quantity: string;
  productName: string;
  totalPrice: number;
  orderId: string;
};

interface ImageType {
  id: string;
  url: string;
  display_url: string;
}

const AllOrders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDialogOpen, setViewDialogOpen] = useState<boolean>(false);
  const [orderToView, setOrderToView] = useState<Order | null>(null);
  const [, setImages] = useState<ImageType[]>([]);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [filterProduct, setFilterProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.data.length > 0) {
          setAllProducts(data.data);
        }
      });
  }, []);
  // Function to fetch orders
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.data);
    } catch (error: unknown) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch orders',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Handle update order status
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: orderId, orderStatus: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      toast({
        title: 'Success',
        description: 'Order status updated successfully',
      });

      // Update the local state
      setOrders(
        orders.map(order => (order._id === orderId ? { ...order, orderStatus: newStatus } : order)),
      );
    } catch (error: unknown) {
      console.error('Error updating order status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update order status',
        variant: 'destructive',
      });
    }
  };

  const handleOrderDetails = (orderId: string) => {
    const findOrder = orders.find(order => order.orderId === orderId);
    const productCode = findOrder ? findOrder['product-code'] : '';
    const findProduct = allProducts.find(product => product['product-code'] === productCode);
    if (findProduct) {
      setFilterProduct(findProduct);
    }
    if (findOrder) {
      setOrderToView(findOrder);
    }
    if (findOrder && findProduct) {
      setViewDialogOpen(true);
    }
  };

  // Column definitions
  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'customerInfo.orderId',
      header: 'Order Id',
      cell: info => (
        <span className="flex min-w-[80px] items-center"> {info.getValue() as string}</span>
      ),
    },
    {
      accessorKey: 'customerInfo.customerName',
      header: 'Customer Name',
      cell: info => {
        const name = info.getValue() as string;
        return (
          <div className="inline-block min-w-[180px] font-semibold">
            {name.length > 30 ? `${name.slice(0, 30)}...` : name}
          </div>
        );
      },
    },
    {
      accessorKey: 'customerInfo.phone',
      header: 'Mobile Nnmber',
      cell: info => {
        const name = info.getValue() as string;
        return (
          <div className="inline-block min-w-[180px] font-semibold">
            {name.length > 30 ? `${name.slice(0, 30)}...` : name}
          </div>
        );
      },
    },

    {
      accessorKey: 'customerInfo.totalPrice',
      header: 'Total Price',
      cell: info => (
        <span className="flex min-w-[80px] items-center">
          ৳ {(info.getValue() as number)?.toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: 'customerInfo.orderStatus',
      header: 'Order Status',
      cell: info => (
        <span className="flex min-w-[80px] items-center">{info.getValue() as string}</span>
      ),
    },
    {
      accessorKey: '_id',
      header: 'View',
      cell: info => (
        <Button
          className="hover:bg-slate-300 cursor-pointer"
          onClick={() => handleOrderDetails(info.getValue() as string)}
        >
          View
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    // Fetch images from the media API when component mounts
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/media');
        const data = await response.json();
        if (data.data) {
          setImages(data.data);
        }
      } catch (error: unknown) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Orders</h2>
      </div>
      {/* Orders Table */}
      <div className=" rounded-lg  ">
        <DataTable columns={columns} data={orders} loading={loading} searchKey="_id" />
      </div>
      {/* View Order Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>View Order</DialogTitle>
          </DialogHeader>

          {orderToView && filterProduct && (
            <ProductOrderDisplay order={orderToView} product={filterProduct} />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllOrders;
