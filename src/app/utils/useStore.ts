import { IProduct } from '@/app/components/ProductsCard';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  textMessage: { isFirst: boolean; message: string };
  isFetchingCartComplete: boolean;
  cart: IProduct[];
  deliveryCharge: number;
  setDeliveryCharge: (payload: number) => void;
  setIsFetchingCartComplete: (payload: boolean) => void;
  updateCart: (payload: IProduct[]) => void;
  setTextMessage: (payload: { isFirst: boolean; message: string }) => void;
};

export const useStore = create<Store>()(
  persist(
    set => ({
      isFetchingCartComplete: false,
      setIsFetchingCartComplete: (payload: boolean) =>
        set(store => ({ ...store, isFetchingCart: payload })),
      textMessage: {
        isFirst: true,
        message: 'আপনার তথ্যাদি কনফার্ম করতে আপনার নাম, ঠিকানা, (মোবাইল নাম্বার) এবং কনফার্ম করুন',
      },
      deliveryCharge: 130,
      setDeliveryCharge: (payload: number) => set(store => ({ ...store, deliveryCharge: payload })),
      setTextMessage: (payload: { isFirst: boolean; message: string }) =>
        set(store => ({ ...store, textMessage: payload })),
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
