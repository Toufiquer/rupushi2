/*
|-----------------------------------------
| setting up CampagnImagesComponent for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, June, 2025
|-----------------------------------------
*/

import Image from 'next/image';

const CampagnImagesComponent = () => {
  return (
    <div className="w-full h-[430px] md:h-[800px] lg:h-[1024px] xl:h-[1024px] relative mx-auto my-4">
      <div className="absolute top-0 left-0">
        <Image src="/1.jpg" alt="Campagn Logo" width={1600} height={1400} />
      </div>
    </div>
  );
};
export default CampagnImagesComponent;
