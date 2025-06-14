/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, June, 2025
|-----------------------------------------
*/

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

const Page = () => {
  return (
    <main className="w-full flex flex-col max-w-5xl mx-auto p-2">
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
