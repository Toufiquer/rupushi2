'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '../table/data-table';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ProductOrderDisplay from './display-order-product';
import { OrderData } from '@/app/cart/FormData';

interface ImageType {
  id: string;
  url: string;
  display_url: string;
}

const AllOrders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDialogOpen, setViewDialogOpen] = useState<boolean>(false);
  const [orderToView, setOrderToView] = useState<OrderData | null>(null);
  const [, setImages] = useState<ImageType[]>([]);

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

  const handleOrderDetails = (orderId: string) => {
    const findOrder = orders.find(order => order._id === orderId);

    if (findOrder) {
      setOrderToView(findOrder);
      setViewDialogOpen(true);
    }
  };

  // Column definitions
  const columns: ColumnDef<OrderData>[] = [
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
        <DataTable
          columns={columns}
          data={orders.sort((a, b) =>
            a.createdAt && b.createdAt
              ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              : 0,
          )}
          loading={loading}
          searchKey="_id"
        />
      </div>
      {/* View Order Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>View Order</DialogTitle>
          </DialogHeader>

          {orderToView && <ProductOrderDisplay order={orderToView} />}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewDialogOpen(false)}
              className="cursor-pointer"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllOrders;
