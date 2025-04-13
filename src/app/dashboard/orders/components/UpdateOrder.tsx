import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { OrderItem } from './OrderTable';
import { useUpdateOrderMutation } from '@/redux/features/orders/ordersApi';

const orderStatus = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'failed'];

/*
|-----------------------------------------
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/
const UpdateOrder = ({ order }: { order: OrderItem }) => {
  const [statusFilter, setStatusFilter] = useState<string>(orderStatus[0]);
  const [updateOrder, { isLoading, isSuccess }] = useUpdateOrderMutation();
  const handleUpdate = () => {
    const newOrder = { ...order };
    newOrder.orderStatus = statusFilter;
    console.log('new Order : ', newOrder);
    updateOrder({ id: order._id, ...newOrder }); 
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger className="border-1 border-slate-400 rounded-lg px-4 py-1 text-sm cursor-pointer">
          Update
        </DialogTrigger>
        <DialogContent>
          <AlertDialogHeader>
            <DialogTitle>
              <span className="w-full block text-slate-800 text-xl">
                Order ID : {order.orderId}
              </span>
              <span className="w-full block text-green-600 text-xl">
                {isSuccess && 'Success: Order status updated'}
              </span>
            </DialogTitle>
            <DialogDescription>
              <div className="w-full flex flex-col gap-4 mt-8">
                <h2>Customer Name : {order.customerInfo.customerName}</h2>
                <h2>Mobile Number : {order.customerInfo.phone}</h2>
                <div className="w-full flex items-center justify-between">
                  <p>Order Status : </p>
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value as string)}
                    className="p-2 border rounded-md"
                  >
                    <option value="all">All Statuses</option>
                    {orderStatus.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full mt-4 flex items-center justify-end">
                  <Button
                    disabled={isLoading}
                    onClick={handleUpdate}
                    type="button"
                    className="cursor-pointer"
                    variant={'outline'}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </AlertDialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default UpdateOrder;
