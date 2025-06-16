/*
|-----------------------------------------
| setting up DataLayerNextComponentCartPage for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, May, 2025
|-----------------------------------------
*/

'use client';

import { sendGTMEvent } from '@next/third-parties/google';
import { useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'data-layer-cart-item';

const DataLayerNextComponentCartPage = ({ data }: { data: string }) => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const fireGTMEvent = (currentCartValue: string) => {
      sendGTMEvent({
        event: 'begin_checkout',
        currency: 'BDT',
        value: 1000,
        product: { product: currentCartValue || '654654' },
        gtm: null,
        newHistoryState: null,
      });
    };

    try {
      const storedCartData = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (storedCartData !== null) {
        console.log('Found in localStorage:', storedCartData);
        if (storedCartData === data) {
          console.log('LocalStorage data matches cart prop. No action needed.');
        } else {
          localStorage.setItem(LOCAL_STORAGE_KEY, data);
          fireGTMEvent(data);
        }
      } else {
        console.log('No data found in localStorage. Saving cart prop and sending GTM event.');
        localStorage.setItem(LOCAL_STORAGE_KEY, data);
        fireGTMEvent(data);
      }
    } catch (error) {
      console.error('Error interacting with localStorage or sending GTM event:', error);
    }
  }, [data]);

  return null;
};

export default DataLayerNextComponentCartPage;
