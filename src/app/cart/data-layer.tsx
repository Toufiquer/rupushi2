/*
|-----------------------------------------
| setting up DataLayerNextComponentCartPage for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, May, 2025
|-----------------------------------------
*/

import { sendGTMEvent } from '@next/third-parties/google';
import { IProduct } from '../components/ProductsCard';

export const fireGTMEvent = (currentCartValue: IProduct[]) => {
  console.log('Calling sendGTMEvent with cart:', currentCartValue);
  sendGTMEvent({
    event: 'begin_checkout',
    currency: 'BDT',
    product: { ...currentCartValue },
  });
};
