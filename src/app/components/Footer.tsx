import Image from 'next/image';
import Link from 'next/link';
import { Truck, Clock, Shield, Facebook, Instagram, Twitter } from 'lucide-react';
export const categoryMenuItems = [
  { name: 'Special Offer', href: '/category/special-offer' },
  { name: 'Earrings', href: '/category/earrings' },
  { name: 'Necklace', href: '/category/necklace' },
  { name: 'Anklet', href: '/category/anklet' },
];
const MobileLogoFooter = () => (
  <div className="relative flex flex-col w-[200px] h-[100px] items-start p-4 justify-start">
    <div className="absolute top-0 left-[-20px] w-[200px] h-[100px] mb-4 ">
      <Image
        src="/rupushi-crop.png" // Replace with your actual logo path
        alt="Rupush Logo"
        width={200}
        height={100}
      />
    </div>
    <div className="mt-[50px] mb-[20px] relative" />
    <div className=" md:text-left left-0 absolute top-[80px]">
      <div className="space-y-2 text-gray-200">
        <div className="flex items-center justify-start md:justify-start gap-2">
          <Truck className="text-red-500" size={20} />
          <span>Faster Delivery</span>
        </div>
        <div className="flex items-center justify-start md:justify-start gap-2">
          <Clock className="text-red-500" size={20} />
          <span>24/7 Support</span>
        </div>
        <div className="flex items-center justify-start md:justify-start gap-2">
          <Shield className="text-red-500" size={20} />
          <span>Trusted & Secure</span>
        </div>
      </div>
    </div>
  </div>
);
const TabletLogoFooter = () => (
  <div className="relative flex flex-col w-[200px] h-[100px] items-start p-4 justify-start">
    <div className="absolute top-0 left-0 w-[200px] h-[100px] mb-4">
      <Image
        src="/rupushi-crop.png" // Replace with your actual logo path
        alt="Rupush Logo"
        width={200}
        height={100}
      />
    </div>
    <div className="mt-[50px] mb-[20px]" />
    <div className=" md:text-left">
      <div className="space-y-2 text-gray-200">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <Truck className="text-red-500" size={20} />
          <span>Faster Delivery</span>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-2">
          <Clock className="text-red-500" size={20} />
          <span>24/7 Support</span>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-2">
          <Shield className="text-red-500" size={20} />
          <span>Trusted & Secure</span>
        </div>
      </div>
    </div>
  </div>
);
const LogoSection = () => (
  <div className="w-full">
    <div className="hidden md:flex">
      <TabletLogoFooter />
    </div>
    <div className="md:hidden flex">
      <div className="h-[200px] w-full flex items-center justify-start md:justify-center mt-[-40px] mb-[30px] md:mb-[60px]">
        <MobileLogoFooter />
      </div>
    </div>
  </div>
);
const InformationSection = () => (
  <div>
    <h4 className="font-bold text-lg pb-1 md:mt-8 md:text-left">Information</h4>
    <ul className="text-gray-200  md:text-left space-y-2">
      <li>
        <Link href="/about" className="hover:text-red-500 transition">
          About Us
        </Link>
      </li>
      <li>
        <Link href="/contact" className="hover:text-red-500 transition">
          Contact
        </Link>
      </li>
      <li>
        <Link href="/terms" className="hover:text-red-500 transition">
          Terms & Conditions
        </Link>
      </li>
      <li>
        <Link href="/privacy" className="hover:text-red-500 transition">
          Privacy Policy
        </Link>
      </li>
    </ul>
  </div>
);
const TopCategoriesSection = () => {
  return (
    <div className="md:px-4 md:mt-8">
      <h4 className="font-bold text-lg pb-1  md:text-left">Top Categories</h4>
      <ul className="text-gray-200  md:text-left space-y-2">
        {categoryMenuItems.map((item, index) => (
          <li key={index}>
            <Link href={item.href} className="hover:text-red-500 transition">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
const CustomerCareSection = () => (
  <div>
    <h4 className="font-bold text-lg pb-1 md:mt-8 md:text-left">Customer Care</h4>
    <div className="text-gray-200  md:text-left space-y-2">
      <p>📞 Call: +88 01560006643</p>
      <p>✉️ Email: support@rupush.com</p>
      <div className="flex justify-start space-x-4 items-center mt-8">
        <Link
          href=" https://www.facebook.com/RupushiJewels"
          className="text-blue-600 hover:scale-110 transition"
        >
          <Facebook size={24} />
        </Link>
        <Link
          href="https://www.instagram.com/rupushijewels"
          className="text-pink-600 hover:scale-110 transition"
        >
          <Instagram size={24} />
        </Link>
      </div>
    </div>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white pt-12 shadow-lg border-t-2 border-slate-900 shadow-stone-200 flex flex-col items-center justify-center">
      <div className="w-full flex flex-col container max-w-7xl">
        <div className="md:hidden block">
          <div className="w-full grid grid-cols-1 py-8 px-4 md:px-0 gap-8">
            <LogoSection />
            <InformationSection />
            <TopCategoriesSection />
            <CustomerCareSection />
          </div>
        </div>
        <div className="hidden md:block">
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 py-8 px-4 md:px-0 gap-8">
            <LogoSection />
            <InformationSection />
            <TopCategoriesSection />
            <CustomerCareSection />
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t-1 mt-12 text-center border-slate-900 text-white  py-4 w-full">
        <p> Rupushi - All Rights Reserved &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
