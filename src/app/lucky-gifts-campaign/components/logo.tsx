/*
|-----------------------------------------
| setting up LogoComponent for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, June, 2025
|-----------------------------------------
*/

import Image from 'next/image';

const LogoComponent = () => {
  return (
    <div className="w-sm h-40 relative mx-auto my-4">
      <div className="absolute top-0 left-0">
        <Image
          src="/rupushi-logo-white.png" // Replace with your actual logo path
          alt="Rupush Logo"
          width={1200}
          height={1000}
        />
      </div>
    </div>
  );
};
export default LogoComponent;
