/*
|-----------------------------------------
| setting up ViewItemDataLayerComponent for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, June, 2025
|-----------------------------------------
*/

'use client';

import { IProduct } from '@/app/components/ProductsCard';
import { sendGTMEvent } from '@next/third-parties/google';
import { useEffect } from 'react';

const ViewItemDataLayerComponent = () => {
  const product: IProduct = {
    name: 'Luxurious Pendant & Earring Set',
    'product-code': 'LUCKY001',
    img: 'https://i.ibb.co/jkSRXfDN/O1-CN01bq-KKK21t-Vut-VO951u-2216839565908-0-cib.jpg',
    realPrice: '1175',
    discountedPrice: '699',
    offer: '15',
    stock: '500',
    'description-top': '',
    'description-bottom': '',
    material: '',
    design: '',
    color: '',
    category: '',
    weight: '',
    'chain length': '',
    style: '',
    quantity: 1,
    id: '',
    status: '',
    allImages: [],
    descriptionData: '',
  };
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    console.log('DataLayerNextComponentCartPage useEffect triggered. Current cart prop:', product);

    const fireGTMEvent = (currentCartValue: IProduct) => {
      console.log('Calling sendGTMEvent with cart:', currentCartValue);
      sendGTMEvent({
        event: 'view_item',
        currency: 'BDT',

        product: { ...currentCartValue },
        gtm: null,
        newHistoryState: null,
      });
    };
    fireGTMEvent(product);
  }, [product]);
  return null;
};
export default ViewItemDataLayerComponent;
