/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, June, 2025
|-----------------------------------------
*/

import LogoComponent from './components/logo';
import MainProductImages from './components/main-product-images';
import OrderButton from './components/order-button';
import TopTextComponents from './components/top-text-components';

const Page = () => {
  return (
    <main className="w-full flex flex-col max-w-5xl mx-auto p-2 md:p-0">
      <LogoComponent />
      <TopTextComponents />
      <OrderButton />
      <MainProductImages />
      <div className="w-full h-screen border"></div>
      <div className="w-full h-screen border"></div>
      <div className="w-full h-screen border"></div>
      <div className="w-full h-screen border text-white" id="order-form">
        order form
      </div>
    </main>
  );
};
export default Page;
