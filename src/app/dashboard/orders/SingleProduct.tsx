import Image from 'next/image';
import { IProduct } from '@/app/components/ProductsCard';
import { useStore } from '@/app/utils/useStore';

// Cart item component props
interface CartItemComponentProps {
  product: IProduct;
}
// CartItem component
export const SingleProduct: React.FC<CartItemComponentProps> = ({
  product: item,
}: {
  product: IProduct;
}) => {
  console.log('item : ', item);
  const price = item.discountedPrice || item.realPrice;
  const { cart } = useStore();
  let quantity = cart.filter(i => i.id === item.id)[0]?.quantity || 1;

  return (
    <div className="flex items-center justify-between p-4 shadow-lg my-2 w-full">
      <div className="flex items-center w-full">
        <div className="relative h-16 w-full mr-4  max-w-[100px]">
          <Image src={item.img || ''} alt={item.name} layout="fill" objectFit="cover" />
        </div>
        <div className="w-full">
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-gray-500">
            ৳{price} x {quantity} = {Number(price) * quantity}
          </p>
        </div>
        <div className="w-full text-end">Quantity: {quantity}</div>
      </div>
    </div>
  );
};
