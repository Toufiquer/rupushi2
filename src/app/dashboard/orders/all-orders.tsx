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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

// Order type definition
type Order = {
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
  orderStatus?: string; // Added orderStatus field
  customerName?: string;
  price?: number;
  quantity?: string;
  productName?: string;
  totalPrice?: number;
  orderId?: string;
};

interface ImageType {
  id: string;
  url: string;
  display_url: string;
}

interface OrderDataState {
  name: string;
  realPrice: string;
  discountedPrice: string;
  offer: string;
  stock: string;
  'description-top': string;
  'description-bottom': string;
  img: string;
  'product-code': string;
  material: string;
  design: string;
  color: string;
  weight: string;
  'chain-length': string;
  style: string;
}

const AllOrders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDialogOpen, setViewDialogOpen] = useState<boolean>(false);
  const [, setOrderToView] = useState<Order | null>(null);
  const [, setImages] = useState<ImageType[]>([]);
  const [orderData, setOrderData] = useState<OrderDataState>({
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

  const handleViewOrder = (order: Order) => {
    setOrderToView(order);
    setOrderData({
      name: order.name,
      'product-code': order['product-code'],
      img: order.img,
      realPrice: order.realPrice,
      discountedPrice: order.discountedPrice || '',
      offer: order.offer,
      stock: order.stock,
      'description-top': order['description-top'],
      'description-bottom': order['description-bottom'] || '',
      material: order.material || '',
      design: order.design || '',
      color: order.color || '',
      weight: order.weight || '',
      'chain-length': order['chain length'] || '',
      style: order.style || '',
    });
    setViewDialogOpen(true);
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
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Button
          className="hover:bg-slate-300 cursor-pointer"
          onClick={() => handleViewOrder(row.original)}
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

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 font-medium">Product Image:</label>
            </div>
            {orderData.img ? (
              <div className="relative w-full h-48 border rounded-md overflow-hidden">
                <Image src={orderData.img} alt="Product" layout="fill" objectFit="contain" />
              </div>
            ) : (
              <div className="w-full h-48 border rounded-md flex items-center justify-center bg-gray-100">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                value={orderData.name}
                readOnly // Make it read-only
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-code">Product Code *</Label>
              <Input
                id="product-code"
                name="product-code"
                value={orderData['product-code']}
                readOnly // Make it read-only
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="realPrice">Price (৳ ) *</Label>
              <Input
                id="realPrice"
                name="realPrice"
                type="text"
                value={orderData.realPrice}
                readOnly // Make it read-only
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountedPrice">Discounted Price (৳ )</Label>
              <Input
                id="discountedPrice"
                name="discountedPrice"
                type="text"
                value={orderData.discountedPrice}
                readOnly // Make it read-only
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="offer">Offer %</Label>
              <Input
                id="offer"
                name="offer"
                type="text"
                value={orderData.offer}
                readOnly // Make it read-only
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock *</Label>
              <Input
                id="stock"
                name="stock"
                type="text"
                value={orderData.stock}
                readOnly // Make it read-only
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="material">Material</Label>
              <Input
                id="material"
                name="material"
                value={orderData.material}
                readOnly // Make it read-only
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="design">Design</Label>
              <Input
                id="design"
                name="design"
                value={orderData.design}
                readOnly // Make it read-only
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input id="color" name="color" value={orderData.color} readOnly />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                name="weight"
                value={orderData.weight}
                readOnly // Make it read-only
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chain length">Chain Length</Label>
              <Input
                id="chain length"
                name="chain length"
                value={orderData['chain-length']}
                readOnly // Make it read-only
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Style</Label>
              <Input id="style" name="style" value={orderData.style} readOnly />
            </div>

            <div className="space-y-2 col-span-full">
              <Label htmlFor="description-top">Top Description *</Label>
              <Textarea
                id="description-top"
                name="description-top"
                value={orderData['description-top']}
                readOnly // Make it read-only
                rows={3}
              />
            </div>

            <div className="space-y-2 col-span-full">
              <Label htmlFor="description-bottom">Bottom Description</Label>
              <Textarea
                id="description-bottom"
                name="description-bottom"
                value={orderData['description-bottom']}
                readOnly // Make it read-only
                rows={3}
              />
            </div>
          </div>

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
