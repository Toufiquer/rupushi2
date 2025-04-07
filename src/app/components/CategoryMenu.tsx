'use client';

import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'; // Assuming this is your carousel component
import Autoplay from 'embla-carousel-autoplay';
import { categoryMenuItems } from './Footer';
import Link from 'next/link';

const CategoryMenu = () => {
  return (
    <div className="w-full flex items-center justify-center ">
      <div className="w-full flex items-center justify-center container max-w-7xl py-4">
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
            align: 'start',
            loop: true,
            slidesToScroll: 1,
            breakpoints: {
              '(min-width: 320px)': { slidesToScroll: 1 }, // IMPORTANT: Adjust slidesToScroll for different screen sizes
              '(min-width: 768px)': { slidesToScroll: 1 }, // IMPORTANT: Adjust slidesToScroll for different screen sizes
              '(min-width: 1024px)': { slidesToScroll: 1 }, // IMPORTANT: Adjust slidesToScroll for different screen sizes
            },
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {[
              ...categoryMenuItems,
              ...categoryMenuItems,
              ...categoryMenuItems,
              ...categoryMenuItems,
              ...categoryMenuItems,
              ...categoryMenuItems,
            ].map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <Link
                  href={item.href}
                  className="px-4 w-full text-center py-2 bg-gray-100 text-gray-800 rounded-md text-sm transition-colors hover:bg-gray-200 flex-shrink-0 block"
                >
                  {item.name}
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryMenu;
