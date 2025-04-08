import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { OrderData } from '@/app/cart/FormData';
import { SingleProduct } from './SingleProduct';

interface ProductOrderDisplayProps {
  order: OrderData;
}

const ProductOrderDisplay: React.FC<ProductOrderDisplayProps> = ({ order }) => {
  console.log('product', order);

  const renderOrderDetails = () =>
    order && (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart size={20} />
            Order Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Order ID</p>
              <p>{order.customerInfo.orderId || 'N/A'}</p>
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
              <p>{order.customerInfo.totalPrice ? `$${order.customerInfo.totalPrice}` : 'N/A'}</p>
            </div>
            <div>
              <p className="font-semibold">Order Status</p>
              <Badge variant={'outline'}>{order.customerInfo.orderStatus || 'N/A'}</Badge>
            </div>
            <div>
              <p className="font-semibold">Ordered On</p>
              <p>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
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
