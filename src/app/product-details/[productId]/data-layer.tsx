/*
|-----------------------------------------
| setting up DataLayerNextComponentProductDetails for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, May, 2025
|-----------------------------------------
*/

'use client';

import { IProduct } from '@/app/components/ProductsCard';
import { sendGTMEvent } from '@next/third-parties/google';
import { useEffect } from 'react';

const DataLayerNextComponentCartPage = ({ product }: { product: IProduct }) => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const fireGTMEvent = (currentCartValue: IProduct) => {
      sendGTMEvent({
        event: 'view_item',
        currency: 'BDT',

        product: { ...currentCartValue },
        gtm: null,
        newHistoryState: null,
      });
    };
    if (product) {
      fireGTMEvent(product);
    }
  }, [product]);

  return null;
};

export default DataLayerNextComponentCartPage;
