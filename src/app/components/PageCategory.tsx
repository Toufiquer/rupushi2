/*
|-----------------------------------------
| setting up PageCategory for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

'use client';

import CategoryMenu from '@/app/components/CategoryMenu';
import { usePathname } from 'next/navigation';

const PageCategory = () => {
  const pathname = usePathname();
  return (
    <div className="md:px-4 lg:mx-0">
      {/* Category Slider Menu - visible on all devices */}
      {!['/dashboard', '/login'].includes(pathname) && <CategoryMenu />}
    </div>
  );
};
export default PageCategory;
