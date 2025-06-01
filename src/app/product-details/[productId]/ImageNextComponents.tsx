/*
|-----------------------------------------
| setting up ImageNextComponents for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, May, 2025
|-----------------------------------------
*/

'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const SLIDESHOW_INTERVAL = 1800; // 800ms

const ImageNextComponents = ({ allImages }: { allImages: string[] }) => {
  // Ensure allImages is not empty to prevent errors with initial state
  const initialImage = allImages && allImages.length > 0 ? allImages[0] : '';
  const [selectImage, setSelectImage] = useState<string>(initialImage);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Effect to update the main selected image when activeIndex changes
  useEffect(() => {
    if (allImages && allImages.length > 0) {
      setSelectImage(allImages[activeIndex]);
    }
  }, [activeIndex, allImages]);

  // Effect for the automatic slideshow
  useEffect(() => {
    if (!allImages || allImages.length <= 1) {
      return; // No slideshow if 0 or 1 image
    }

    // Set a timer to advance to the next image
    const timerId = setTimeout(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % allImages.length);
    }, SLIDESHOW_INTERVAL);

    // Cleanup function: clear the timeout when the component unmounts
    // or when activeIndex or allImages changes (which re-runs this effect)
    return () => clearTimeout(timerId);
  }, [activeIndex, allImages]); // Re-run effect if activeIndex or allImages changes

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index); // This will trigger the useEffects above
    // to update selectImage and reset the slideshow timer.
  };

  if (!allImages || allImages.length === 0) {
    return <div className="w-full text-center p-4">No images to display.</div>;
  }

  return (
    <main className="w-full flex flex-col gap-4 pb-2 md:pb-0">
      <div className="w-full">
        <div className="relative w-full h-[400px] border border-slate-300 shadow-xl hover:shadow-2xl cursor-pointer hover:border-slate-600 flex items-center justify-center rounded-lg overflow-hidden">
          {selectImage ? (
            <Image
              src={selectImage}
              alt="Selected Media"
              layout="fill" // 'fill' is preferred over 'objectFit' directly on Image for Next.js 13+
              objectFit="cover" // 'cover' ensures the image covers the area, might crop
              priority={true} // Consider adding priority for the main image (LCP)
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
              Image loading...
            </div>
          )}
        </div>
      </div>
      {allImages.length > 1 && ( // Only show carousel if there's more than one image
        <div className="w-full min-h-[10vh] rounded-lg flex items-center justify-center px-12">
          <Carousel
            className="w-full"
            opts={{
              align: 'start',
              loop: true, // Optional: make the carousel loop
            }}
          >
            <CarouselContent className="-ml-1">
              {allImages.map((imgSrc, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1
                    basis-1/4       // Mobile: 4 items per view
                    md:basis-1/6    // Tablet: 6 items per view (adjusted from 1/8 for better visibility)
                    lg:basis-1/6    // Desktop: 8 items per view (adjusted from 1/5 to show more)
                  "
                  onClick={() => handleThumbnailClick(index)}
                >
                  <div className="p-1 flex items-center justify-center">
                    <div
                      className={`relative w-[60px] h-[60px] border-2 cursor-pointer rounded overflow-hidden
                        ${activeIndex === index ? 'border-blue-500 ring-2 ring-blue-500' : 'border-slate-300 hover:border-slate-600'}
                      `}
                    >
                      <Image
                        src={imgSrc}
                        alt={`Thumbnail ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </main>
  );
};
export default ImageNextComponents;
