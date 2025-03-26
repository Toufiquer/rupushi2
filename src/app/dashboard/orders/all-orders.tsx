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
      accessorKey: 'orderId',
      header: 'Order ID',
      cell: info => <span className="font-mono text-xs">{info.getValue() as string}</span>,
    },
    {
      accessorKey: 'product-code',
      header: 'Product Code',
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
      accessorKey: 'customerName',
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
      accessorKey: 'price',
      header: 'Price',
      cell: info => (
        <span className="flex min-w-[80px] items-center">
          ৳ {(info.getValue() as number).toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: info => <span className="font-mono text-xs">{info.getValue() as string}</span>,
    },
    {
      accessorKey: 'orderStatus',
      header: 'Order Status',
      cell: ({ row }) => {
        const currentStatus = row.original.orderStatus || 'Pending';
        return (
          <select
            value={currentStatus}
            onChange={e => handleUpdateStatus(row.original._id, e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        );
      },
    },
    {
      accessorKey: 'productName',
      header: 'Product Name',
      cell: info => (
        <span className="font-mono text-xs">
          {(info.getValue() as string).length > 30
            ? `${(info.getValue() as string).slice(0, 30)}...`
            : (info.getValue() as string)}
        </span>
      ),
    },
    {
      accessorKey: 'totalPrice',
      header: 'Total Price',
      cell: info => (
        <span className="flex min-w-[80px] items-center">
          ৳ {(info.getValue() as number).toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: 'orderId',
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
        <DataTable columns={columns} data={orders} loading={loading} searchKey="productName" />
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
