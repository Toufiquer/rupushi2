/*
|-----------------------------------------
| setting up ImageNextComponents for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, May, 2025
|-----------------------------------------
*/

'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const ImageNextComponents = ({ allImages }: { allImages: string[] }) => {
  const [selectImage, setSelectImage] = useState(allImages[0]);
  const onHoverActive = (img: string) => {
    setSelectImage(img);
  };
  return (
    <main className="w-full flex flex-col gap-4 pb-2 md:pb-0">
      <div className="w-full">
        <div className="relative w-full h-[400px] border-1 border-slate-300 shadow-xl hover:shadow-2xl cursor-pointer hover:border-slate-600 flex items-center justify-center rounded-lg overflow-hidden">
          <Image src={selectImage} alt="Media" objectFit="cover" fill />
        </div>
      </div>
      <div className="w-full min-h-[10vh] rounded-lg flex items-center justify-center px-12">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {allImages.map((i, index) => (
              <CarouselItem
                key={index}
                className="pl-1
              basis-1/4       // Mobile: 4 items per view (100% / 4 = 25%)
              md:basis-1/8    // Tablet: 8 items per view (100% / 8 = 12.5%)
              lg:basis-1/5   // Desktop: 12 items per view (100% / 12 = 8.33%)
            "
              >
                <div className="p-1 flex items-center justify-center">
                  <div
                    onClick={() => onHoverActive(i)}
                    onTouchMove={() => onHoverActive(i)}
                    className={`relative w-[60px] h-[60px] border-slate-600 cursor-pointer hover:border-slate-600 `}
                  >
                    <Image src={i} alt="Media" objectFit="cover" fill />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  );
};
export default ImageNextComponents;
