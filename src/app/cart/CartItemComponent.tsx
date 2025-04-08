import { MinusCircle, PlusCircle, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { IProduct } from '../components/ProductsCard';
import { useStore } from '../utils/useStore';

// Cart item component props
interface CartItemComponentProps {
  item: IProduct;
}
// CartItem component
export const CartItemComponent: React.FC<CartItemComponentProps> = ({ item }) => {
  const { cart, updateCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const handleRemove = (itemId: string) => {
    console.log(itemId);
    const othersCart = cart.filter(curr => curr.id !== itemId);
    updateCart(othersCart);
  };
  return (
    <div className="flex items-center justify-between p-4 border-b w-full">
      <div className="flex items-center">
        <div className="relative h-16 w-16 mr-4">
          <Image src={item.img || ''} alt={item.name} layout="fill" objectFit="cover" />
        </div>
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-gray-500">৳{item.price?.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center">
        <button
          className="cursor-pointer"
          onClick={() => quantity > 0 && setQuantity(pre => pre - 1)}
          disabled={quantity ? quantity <= 1 : false}
        >
          <MinusCircle size={20} />
        </button>
        <input type="number" value={quantity} className="w-12 text-center mx-2" />
        <button className="cursor-pointer" onClick={() => setQuantity(pre => pre + 1)}>
          <PlusCircle size={20} />
        </button>
        <button onClick={() => handleRemove(item.id)} className="ml-4 text-red-500 cursor-pointer">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
