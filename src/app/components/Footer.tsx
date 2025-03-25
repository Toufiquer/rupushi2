import Image from 'next/image';
import Link from 'next/link';
import { Truck, Clock, Shield, Facebook, Instagram, Twitter } from 'lucide-react';

const MobileLogoFooter = () => (
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
    <div className="text-center md:text-left">
      <div className="space-y-2 text-gray-700">
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
    <div className="text-center md:text-left">
      <div className="space-y-2 text-gray-700">
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
      <div className="h-[200px] w-full flex items-center justify-center mt-[-40px] mb-[60px]">
        <MobileLogoFooter />
      </div>
    </div>
  </div>
);
const InformationSection = () => (
  <div>
    <h4 className="font-bold text-lg mb-4 text-center md:text-left">Information</h4>
    <ul className="text-gray-700 text-center md:text-left space-y-2">
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
  const categoryMenuItems = [
    { name: 'Diamond Cut Earrings', href: '/category/diamond-cut-earrings' },
    { name: 'Zircon Stone Earrings', href: '/category/zircon-stone-earrings' },
    { name: 'Viral Errings', href: '/category/viral-earrings' },
    { name: 'Trendy Earrings', href: '/category/trendy-earrings' },
    { name: 'Pendant Necklace', href: '/category/pendant-necklace' },
    { name: 'Necklace Set', href: '/category/necklace-set' },
    { name: 'Offer Products', href: '/category/offer-products' },
    { name: 'All Earrings Collection', href: '/category/all-earrings-collection' },
    { name: 'Premium Collection', href: '/category/premium-collection' },
    { name: 'Premium Earrings', href: '/category/premium-earrings' },
  ];
  return (
    <div>
      <h4 className="font-bold text-lg mb-4 text-center md:text-left">Top Categories</h4>
      <ul className="text-gray-700 text-center md:text-left space-y-2">
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
    <h4 className="font-bold text-lg mb-4 text-center md:text-left">Customer Care</h4>
    <div className="text-gray-700 text-center md:text-left space-y-2">
      <p>📞 Call: +1234567890</p>
      <p>✉️ Email: support@rupush.com</p>
      <div className="flex justify-center md:justify-start space-x-4 mt-4">
        <Link
          href="https://facebook.com/rupush"
          className="text-blue-600 hover:scale-110 transition"
        >
          <Facebook size={24} />
        </Link>
        <Link
          href="https://instagram.com/rupush"
          className="text-pink-600 hover:scale-110 transition"
        >
          <Instagram size={24} />
        </Link>
        <Link
          href="https://twitter.com/rupush"
          className="text-blue-400 hover:scale-110 transition"
        >
          <Twitter size={24} />
        </Link>
      </div>
    </div>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg border-t-2 border-rose-500 shadow-stone-200">
      <div className="w-full flex flex-col">
        <div className="md:hidden block">
          <div className="w-full grid grid-cols-1 py-8">
            <LogoSection />
            <InformationSection />
            <TopCategoriesSection />
            <CustomerCareSection />
          </div>
        </div>
        <div className="hidden md:block lg:hidden">
          <div className="w-full grid grid-cols-3 py-8">
            <div className="w-full">
              <div className="w-full mb-8 pb-8">
                <LogoSection />
              </div>
              <div className="w-full pl-6 mt-12 pt-4">
                <InformationSection />
              </div>
            </div>
            <div className="w-full">
              <TopCategoriesSection />
            </div>
            <div className="w-full">
              <CustomerCareSection />
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="w-full grid grid-cols-4 py-8">
            <LogoSection />
            <InformationSection />
            <TopCategoriesSection />
            <CustomerCareSection />
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="bg-red-500 text-white text-center py-4">
          <p>&copy; 2025 Rupush. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
