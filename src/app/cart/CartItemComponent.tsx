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
  console.log('item : ', item);
  const price = item.discountedPrice || item.realPrice;
  const { cart, updateCart } = useStore();
  let quantity = cart.filter(i => i.id === item.id)[0]?.quantity || 1;
  const handleRemove = (itemId: string) => {
    console.log(itemId);
    const othersCart = cart.filter(curr => curr.id !== itemId);
    updateCart(othersCart);
  };
  const handleIncrease = () => {
    const newUpdateCart = cart.map(mainItem => {
      let i = mainItem;
      if (i.id === item.id) {
        i.quantity = quantity + 1;
      }
      return i;
    });
    updateCart(newUpdateCart);
  };
  const handleDecrease = () => {
    const newUpdateCart = cart.map(mainItem => {
      let i = mainItem;
      if (i.id === item.id) {
        if (quantity > 0) {
          i.quantity = quantity - 1;
        }
      }
      return i;
    });
    updateCart(newUpdateCart);
  };
  return (
    <div className="flex items-center justify-between p-4 border-b w-full">
      <div className="flex items-center">
        <div className="relative h-16 w-16 mr-4">
          <Image src={item.img || ''} alt={item.name} layout="fill" objectFit="cover" />
        </div>
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-gray-500">
            ৳{price} x {quantity} = {Number(price) * quantity}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <button
          className="cursor-pointer"
          onClick={handleDecrease}
          disabled={quantity ? quantity <= 1 : false}
        >
          <MinusCircle size={20} />
        </button>
        <input
          type="number"
          value={quantity}
          className="w-12 text-center mx-2"
          onChange={e => {
            const newQuantity = parseInt(e.target.value) || 0;
            const newUpdateCart = cart.map(mainItem => {
              let i = mainItem;
              if (i.id === item.id) {
                i.quantity = newQuantity;
              }
              return i;
            });
            updateCart(newUpdateCart);
          }}
        />
        <button className="cursor-pointer" onClick={handleIncrease}>
          <PlusCircle size={20} />
        </button>
        <button onClick={() => handleRemove(item.id)} className="ml-4 text-red-500 cursor-pointer">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
