/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, June, 2025
|-----------------------------------------
*/

import { IProduct } from '../components/ProductsCard';
import DataLayerNextComponentCartPage from '../product-details/[productId]/data-layer';
import BottomHeadingComponent from './components/bottom-heading';
import BottomTextComponents from './components/bottom-text-components';
import BoxImagesComponent from './components/box-images';
import CampagnImagesComponent from './components/campagn-images';
import FooterTextComponent from './components/footer-text';
import FormDataComponent from './components/FormData';
import LogoComponent from './components/logo';
import MainProductImages from './components/main-product-images';
import OrderButton from './components/order-button';
import TopTextComponents from './components/top-text-components';
import ViewItemDataLayerComponent from './components/view-item-data-layer-component';

const Page = () => {
  const post: IProduct = {
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
  return (
    <main className="w-full flex flex-col max-w-5xl mx-auto p-2">
      <DataLayerNextComponentCartPage product={post} />
      <ViewItemDataLayerComponent />
      <LogoComponent />
      <TopTextComponents />
      <OrderButton />
      <MainProductImages />
      <div className="w-full md:mt-[-45px] lg:mt-[-10px]">
        <CampagnImagesComponent />
      </div>
      <div className="w-full mt-[-35px] md:mt-[-65px] lg:mt-[-35px]">
        <OrderButton />
      </div>
      <BoxImagesComponent />
      <BottomTextComponents />
      <BottomHeadingComponent />
      <div id="order-form" className="w-full flex justify-between items-stretch">
        <FormDataComponent />
      </div>
      <FooterTextComponent />
    </main>
  );
};
export default Page;
