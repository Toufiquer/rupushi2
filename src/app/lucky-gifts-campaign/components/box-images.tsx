/*
|-----------------------------------------
| setting up BoxImagesComponent for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, June, 2025
|-----------------------------------------
*/

import Image from 'next/image';

const BoxImagesComponent = () => {
  const boxStyle = ' w-full h-[420px] md:h-[380px] lg:h-[510px] relative overflow-hidden';
  return (
    <main className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-3">
      <div className={boxStyle}>
        <div className="absolute top-0 left-0">
          <Image
            src="/3.jpg" // Replace with your actual logo path
            alt="Rupush main products"
            width={1400}
            height={1400}
          />
        </div>
      </div>
      <div className={boxStyle}>
        <div className="absolute top-0 left-0">
          <Image
            src="/4.jpg" // Replace with your actual logo path
            alt="Rupush main products"
            width={1400}
            height={1400}
          />
        </div>
      </div>
      <div className={boxStyle}>
        <div className="absolute top-0 left-0">
          <Image
            src="/5.jpg" // Replace with your actual logo path
            alt="Rupush main products"
            width={1400}
            height={1400}
          />
        </div>
      </div>
      <div className={boxStyle}>
        <div className="absolute top-0 left-0">
          <Image
            src="/6.jpg" // Replace with your actual logo path
            alt="Rupush main products"
            width={1400}
            height={1400}
          />
        </div>
      </div>
    </main>
  );
};
export default BoxImagesComponent;
