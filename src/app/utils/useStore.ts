import { IProduct } from '@/app/components/ProductsCard';

import { create } from 'zustand';

type Store = {
  cart: IProduct[];
  deliveryCharge: number;
  setDeliveryCharge: (payload: number) => void;
  updateCart: (payload: IProduct[]) => void;
};

export const useStore = create<Store>()(set => ({
  deliveryCharge: 130,
  setDeliveryCharge: (updateCharge: number) =>
    set(store => ({ ...store, deliveryCharge: updateCharge })),
  cart: [],
  updateCart: (updatedCart: IProduct[]) => set(store => ({ ...store, cart: updatedCart })),
}));

// function Counter() {
//   const { cart, updateCart } = useStore()
//   return (
//     <div>
//       <span>{count}</span>
//       <button onClick={inc}>one up</button>
//     </div>
//   )
// }
