'use client';

import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

export function Slider() {
  const slidersImg = [
    'https://i.ibb.co.com/qM0tdtXk/banner-1.jpg',
    'https://i.ibb.co.com/qM0tdtXk/banner-1.jpg',
    'https://i.ibb.co.com/qM0tdtXk/banner-1.jpg',
    'https://i.ibb.co.com/qM0tdtXk/banner-1.jpg',
    'https://i.ibb.co.com/qM0tdtXk/banner-1.jpg',
  ];

  return (
    <div className="w-full mx-auto max-w-screen-2xl md:px-4">
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            jump: false,
            playOnInit: true,
          }),
        ]}
        className="w-full"
        opts={{
          loop: true,
          align: 'center',
        }}
      >
        <CarouselContent className=" ">
          {slidersImg.map((imgSrc, index) => (
            <CarouselItem key={index}>
              <div className="w-full flex items-center justify-center">
                <div className="relative w-full h-auto">
                  {/* Fixed height container that adjusts by screen size */}
                  <div className="mt-2 md:mt-0 xs:h-[140px] md:h-[260px] lg:h-96 w-full flex items-center justify-center">
                    <Image
                      src={imgSrc}
                      alt={`Slide ${index + 1}`}
                      width={1300}
                      height={500}
                      className="object-contain max-h-full max-w-full"
                      priority={index < 2}
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
