'use client';

import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

export function Slider() {
  const slidersImg = [
    'https://kanerdul.com/public/664e5dc7d437f.jpg',
    'https://kanerdul.com/public/664e5dc7d437f.jpg',
    'https://kanerdul.com/public/664e5dc7d437f.jpg',
    'https://kanerdul.com/public/664e5dc7d437f.jpg',
  ];
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000, // Change slide every 3 seconds
          stopOnInteraction: false, // Continue autoplay even when user interacts
          jump: false, // Smoothly transition between slides
          playOnInit: true,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {[
          ...slidersImg,
          ...slidersImg,
          ...slidersImg,
          ...slidersImg,
          ...slidersImg,
          ...slidersImg,
          ...slidersImg,
          ...slidersImg,
          ...slidersImg,
        ].map((imgSrc, index) => (
          <CarouselItem key={index}>
            <div className="p-1 w-full flex items-center justify-center h-[200px]">
              <Image
                width={1920}
                height={200}
                src={imgSrc}
                alt={`Slide ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
