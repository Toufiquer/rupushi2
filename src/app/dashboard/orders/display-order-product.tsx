import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Box, Palette, Weight, Ruler, DollarSign } from 'lucide-react';
import { IProduct } from '@/app/components/ProductsCard';
import { Order } from './all-orders';

interface ProductOrderDisplayProps {
  product: IProduct;
  order?: Order;
}

const ProductOrderDisplay: React.FC<ProductOrderDisplayProps> = ({ product, order }) => {
  const calculateDiscount = () => {
    if (product.discountedPrice && product.realPrice) {
      const original = parseFloat(product.realPrice.replace('$', ''));
      const discounted = parseFloat(product.discountedPrice.replace('$', ''));
      return Math.round(((original - discounted) / original) * 100);
    }
    return 0;
  };

  const renderProductBadges = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      {product.isNew && <Badge variant="secondary">New Arrival</Badge>}
      {product.status === 'active' && <Badge variant="outline">In Stock</Badge>}
      {product.offer && <Badge variant="destructive">{product.offer}</Badge>}
      {calculateDiscount() > 0 && <Badge variant="outline">{calculateDiscount()}% OFF</Badge>}
    </div>
  );

  const renderProductDetails = () => (
    <div className="grid grid-cols-2 gap-4 text-sm">
      {product.material && (
        <div className="flex items-center gap-2">
          <Palette size={16} className="text-gray-500" />
          <span>{product.material}</span>
        </div>
      )}
      {product.color && (
        <div className="flex items-center gap-2">
          <Palette size={16} className="text-gray-500" />
          <span>{product.color}</span>
        </div>
      )}
      {product.weight && (
        <div className="flex items-center gap-2">
          <Weight size={16} className="text-gray-500" />
          <span>{product.weight}</span>
        </div>
      )}
      {product['chain length'] && (
        <div className="flex items-center gap-2">
          <Ruler size={16} className="text-gray-500" />
          <span>{product['chain length']}</span>
        </div>
      )}
    </div>
  );

  const renderPricing = () => (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2">
        <DollarSign size={20} className="text-green-600" />
        {product.discountedPrice ? (
          <>
            <span className="text-xl font-bold text-green-600">{product.discountedPrice}</span>
            <span className="text-sm line-through text-gray-500">{product.realPrice}</span>
          </>
        ) : (
          <span className="text-xl font-bold text-green-600">{product.realPrice}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Box size={16} className="text-gray-500" />
        <span>{product.stock} in stock</span>
      </div>
    </div>
  );

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
              <p>{order.orderId || 'N/A'}</p>
            </div>
            <div>
              <p className="font-semibold">Customer</p>
              <p>{order.customerName || 'N/A'}</p>
            </div>
            <div>
              <p className="font-semibold">Mobile</p>
              <p>{order.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="font-semibold">Quantity</p>
              <p>{order.quantity || 'N/A'}</p>
            </div>
            <div>
              <p className="font-semibold">Total Price</p>
              <p>{order.totalPrice ? `$${order.totalPrice}` : 'N/A'}</p>
            </div>
            <div>
              <p className="font-semibold">Order Status</p>
              <Badge variant={'outline'}>{order.orderStatus || 'N/A'}</Badge>
            </div>
            <div>
              <p className="font-semibold">Ordered On</p>
              <p>{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-xl">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative w-full aspect-square">
          <Image
            src={product.img || '/placeholder-image.png'}
            alt={product.name}
            fill
            className="object-cover rounded-xl"
            placeholder="blur"
            blurDataURL="/placeholder-image.png"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product['description-top']}</p>

          {renderProductBadges()}
          {renderProductDetails()}
          {renderPricing()}
        </div>
      </div>

      {/* Optional Order Details */}
      {order && renderOrderDetails()}
    </div>
  );
};

export default ProductOrderDisplay;
