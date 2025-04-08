import { IProduct } from '@/app/components/ProductsCard';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  cart: IProduct[];
  deliveryCharge: number;
  setDeliveryCharge: (payload: number) => void;
  updateCart: (payload: IProduct[]) => void;
};

export const useStore = create<Store>()(
  persist(
    set => ({
      deliveryCharge: 130,
      setDeliveryCharge: (updateCharge: number) =>
        set(store => ({ ...store, deliveryCharge: updateCharge })),
      cart: [],
      updateCart: (updatedCart: IProduct[]) => set(store => ({ ...store, cart: updatedCart })),
    }),
    {
      name: 'shopping-cart-storage', // unique name for localStorage key
      partialize: state => ({
        cart: state.cart,
        deliveryCharge: state.deliveryCharge,
      }),
    },
  ),
);
