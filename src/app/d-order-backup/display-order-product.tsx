import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { IDBOrderData } from '@/app/cart/FormData';
import { SingleProduct } from '@/app/d-order-backup/SingleProduct';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { orderStatus } from '@/app/api/orders/orderModel';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

interface ProductOrderDisplayProps {
  order: IDBOrderData;
}

const ProductOrderDisplay: React.FC<ProductOrderDisplayProps> = ({ order }) => {
  const [isLoading, setLoading] = useState(false);
  console.log('--==--product', order);
  const [status, setStatus] = useState('');
  useEffect(() => {
    setStatus(order.orderStatus || '');
  }, [order]);
  console.log('status', status);
  const handleUpdate = async () => {
    const newOrderData = order;
    newOrderData.orderStatus = status;
    setLoading(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrderData),
      });

      if (!response.ok) {
        throw new Error('Failed to Update order');
      }
      toast.success('Order Update successful');
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };
  const renderOrderDetails = () =>
    order && (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className=" w-full flex flex-col">
            <div className="flex items-center gap-2 justify-between w-full">
              <h2 className="flex items-center justify-end gap-2">
                <ShoppingCart size={20} />
                Order Details
              </h2>
              <div className="flex items-center justify-end gap-2">
                <Select onValueChange={setStatus} value={status}>
                  <SelectTrigger className="w-[180px] bg-slate-100">
                    <SelectValue placeholder={order.orderStatus || 'N/A'} />
                  </SelectTrigger>
                  <SelectContent className="bt-slate-100">
                    {orderStatus.map(i => (
                      <SelectItem
                        onSelect={() => setStatus(i)}
                        key={i}
                        value={i}
                        className="cursor-pointer hover:bg-slate-200"
                      >
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={handleUpdate}
                  className={`${status.toLowerCase() === order.orderStatus?.toLowerCase() ? ' text-slate-100 cursor-text ' : ' cursor-pointer test-slate-500 '}`}
                  disabled={status.toLowerCase() === order.orderStatus?.toLowerCase() || isLoading}
                  variant={'outline'}
                >
                  Update
                </Button>
              </div>
            </div>
            <div className="w-full pt-4 shadow-2xl p-2">
              <div className="flex items-center justify-start gap-2">
                <p className="font-semibold"> Delivery Charge</p>
                <p className="text-xm font-normal">
                  ৳ {order.deliveryCharge || 'N/A'} (
                  {order.deliveryCharge === 130 ? 'ঢাকার বাইরে' : ' ঢাকার ভিতরে'})
                </p>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-col">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold">Order ID</p>
                <p>{order.orderId || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold">Customer</p>
                <p>{order.customerInfo.customerName || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold">Mobile</p>
                <p>{order.customerInfo.phone || 'N/A'}</p>
              </div>

              <div>
                <p className="font-semibold">Total Price</p>
                <p>{order.totalPrice ? `$${order.totalPrice}` : 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold">address</p>
                <p>{order.customerInfo.address || 'N/A'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );

  return (
    <div className="w-full mx-auto p-4 md:p-8 bg-white shadow-lg rounded-xl mb-12">
      {/* Optional Order Details */}
      <div className="pb-12">{order && renderOrderDetails()}</div>
      <div className="w-full flex flex-col items-center justify">
        <div className="w-full text-xl">Total Product : {order.productInfo.length}</div>
        {order.productInfo.map((curr, idx) => (
          <div className="w-full" key={idx}>
            <SingleProduct product={curr} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductOrderDisplay;
