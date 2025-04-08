import { IProduct } from '@/app/components/ProductsCard';

import { create } from 'zustand';

type Store = {
  cart: IProduct[];
  updateCart: (payload: IProduct[]) => void;
};

export const useStore = create<Store>()(set => ({
  cart: [],
  updateCart: (updatedCart: IProduct[]) => set(() => ({ cart: updatedCart })),
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
