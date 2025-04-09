'use client';

import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

export function Slider() {
  const slidersImg = [
    'https://i.ibb.co.com/qM0tdtXk/banner-1.jpg',
    'https://i.ibb.co.com/VcP5bBLL/banner-2.jpg',
    'https://i.ibb.co.com/qM0tdtXk/banner-1.jpg',
    'https://i.ibb.co.com/VcP5bBLL/banner-2.jpg',
    'https://i.ibb.co.com/qM0tdtXk/banner-1.jpg',
    'https://i.ibb.co.com/VcP5bBLL/banner-2.jpg',
    'https://i.ibb.co.com/qM0tdtXk/banner-1.jpg',
    'https://i.ibb.co.com/VcP5bBLL/banner-2.jpg',
    'https://i.ibb.co.com/qM0tdtXk/banner-1.jpg',
    'https://i.ibb.co.com/VcP5bBLL/banner-2.jpg',
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
            <div className="p-1 w-full flex items-center justify-center h-[260px]">
              <Image
                width={1300}
                height={260}
                src={imgSrc}
                alt={`Slide ${index + 1}`}
                className="h-full w-full object-fill"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
