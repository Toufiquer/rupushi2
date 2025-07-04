/*
|-----------------------------------------
| setting up Giveaway for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, May, 2025
|-----------------------------------------
*/
import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from './ProductsCard';
import OrderNowButton from './Order-Now-Button';

export interface Promotion {
  mainPageTitle: string;
  mainPageImage1: string;
  mainPageImage2: string;
  mainPagePriceText: string;
  mainPageText1: string;
  mainPageText2: string;
  createdAt: string;
  updatedAt: string;
  productPageBannerImage1: string;
  productPageBannerImage2: string;
  productPageText1: string;
  productPageText2: string;
  productPageTitle1: string;
  productPageTitle2: string;
  activeStatus: boolean;
  productCode: string;
  id: string;
  _id?: string;
}

async function getProductIdByCode(code: string): Promise<string> {
  const backendUrl = 'https://www.rupushi.com/api/products';
  try {
    const res = await fetch(backendUrl, { next: { revalidate: 3600 } }); // 60 minutes (3600 seconds)
    const responseData: { data: IProduct[] } = await res.json();
    const data = responseData.data;
    if (!data) return '';

    const product = data.find(p => {
      return p['product-code'] === code;
    });
    return product?.id || product?._id || '';
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return '';
  }
}

const MobileViewCampaignBox = ({ promotion }: { promotion: Promotion }) => {
  return (
    <div className="w-full flex items-center justify-start gap-4 flex-col bg-[#EEEAE7]">
      <div
        className={`relative h-[400px] min-w-[400px] w-[400px] overflow-hidden shadow-lg rounded-md`}
      >
        <Link href={`/lucky-gifts-campaign`}>
          <Image
            src={promotion.mainPageImage1}
            alt={promotion.mainPageTitle}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'contain' }}
            className="block"
          />
        </Link>
      </div>
      <div className="w-full flex items-start justify-start flex-col gap-2">
        <div className="w-full h-auto pb-10 pl-[10px] flex items-start justify-start text-center flex-col gap-2">
          <h2 className="text-[40px] font-bold text-gray-900 tracking-tight w-full justify-center lg:text-start">
            <span>Lucky Gifts </span>
            <span className="my-kalpurush-text font-extrabold">ক্যাম্পেইন</span>
          </h2>
          <h2 className="text-[22px] font-normal  my-kalpurush-text  text-gray-900 tracking-tight w-full justify-center lg:text-start">
            মোট ১০ লক্ষ টাকার ১১০ টি পুরস্কার জিতার সুযোগ!
          </h2>
          <h2 className="text-[38px] font-extrabold my-kalpurush-text  text-red-500 tracking-tight w-full justify-center lg:text-start">
            মাত্র ৬৯৯ টাকা
          </h2>
          {/* <p className="text-[21px] font-semibold mt-[-10px] my-kalpurush-text  text-rose-500 tracking-tight w-full justify-center lg:text-start ">
            পুরো বাংলাদেশে ডেলিভারি চার্জ ফ্রি
          </p> */}
          <Link href={`/lucky-gifts-campaign`} className="w-full">
            <OrderNowButton />
          </Link>
        </div>
      </div>
    </div>
  );
};
const TabletViewCampaignBox = ({ promotion }: { promotion: Promotion }) => {
  return (
    <div className="w-full flex items-center justify-start gap-4 flex-row bg-[#EEEAE7]">
      <div
        className={`relative h-[300px] min-w-[300px] w-[300px] overflow-hidden shadow-lg rounded-md`}
      >
        <Link href={`/lucky-gifts-campaign`}>
          <Image
            src={promotion.mainPageImage1}
            alt={promotion.mainPageTitle}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'contain' }}
            className="block"
          />
        </Link>
      </div>
      <div className="w-full flex items-start justify-start flex-col gap-2">
        <div className="w-full h-[300px] pl-[10px] flex items-start justify-start flex-col gap-2 pt-[15px]">
          <h2 className="text-[40px] font-bold text-gray-900 tracking-tight w-full justify-center lg:text-start">
            <span>Lucky Gifts </span>
            <span className="my-kalpurush-text font-extrabold">ক্যাম্পেইন</span>
          </h2>
          <h2 className="text-[22px] font-normal  my-kalpurush-text  text-gray-900 tracking-tight w-full justify-center lg:text-start">
            মোট ১০ লক্ষ টাকার ১১০ টি পুরস্কার জিতার সুযোগ!
          </h2>
          <h2 className="text-[38px] font-extrabold my-kalpurush-text  text-red-500 tracking-tight w-full justify-center lg:text-start">
            মাত্র ৬৯৯ টাকা
          </h2>
          {/* <p className="text-[20px] font-semibold mt-[-18px] my-kalpurush-text  text-rose-500 tracking-tight w-full justify-center lg:text-start ">
            পুরো বাংলাদেশে ডেলিভারি চার্জ ফ্রি
          </p> */}

          <Link href={`/lucky-gifts-campaign`} className="w-full">
            <OrderNowButton />
          </Link>
        </div>
      </div>
    </div>
  );
};
const DesktopViewCampaignBox = ({ promotion }: { promotion: Promotion }) => {
  return (
    <div className="w-full flex items-center justify-start gap-4 flex-row bg-[#EEEAE7]">
      <div
        className={`relative h-[400px] min-w-[400px] w-[400px] overflow-hidden shadow-lg rounded-md`}
      >
        <Link href={`/lucky-gifts-campaign`}>
          <Image
            src={promotion.mainPageImage1}
            alt={promotion.mainPageTitle}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'contain' }}
            className="block"
          />
        </Link>
      </div>
      <div className="w-full flex items-start justify-start flex-col gap-8">
        <div className="w-full h-[400px] pl-[100px] flex items-start justify-start flex-col gap-4 pt-8">
          <h2 className="text-[48px] font-bold text-gray-900 tracking-tight w-full justify-center lg:text-start">
            <span>Lucky Gifts </span>
            <span className="my-kalpurush-text font-extrabold">ক্যাম্পেইন</span>
          </h2>
          <h2 className="text-[26px] font-normal  my-kalpurush-text  text-gray-900 tracking-tight w-full justify-center lg:text-start">
            মোট ১০ লক্ষ টাকার ১১০ টি পুরস্কার জিতার সুযোগ!
          </h2>
          <h2 className="text-[48px] font-extrabold my-kalpurush-text  text-red-500 tracking-tight w-full justify-center lg:text-start">
            মাত্র ৬৯৯ টাকা
          </h2>
          {/* <p className="text-[21px] font-semibold mt-[-20px] my-kalpurush-text  text-rose-500 tracking-tight w-full justify-center lg:text-start ">
            পুরো বাংলাদেশে ডেলিভারি চার্জ ফ্রি
          </p> */}
          <Link href={`/lucky-gifts-campaign`} className="w-full">
            <OrderNowButton />
          </Link>
        </div>
      </div>
    </div>
  );
};

function PromotionItem({ promotion }: { promotion: Promotion }) {
  return (
    <main className="w-full max-w-7xl md:px-4">
      <div className="w-full flex lg:flex-row flex-col justify-between border-slate-200 h-full gap-4 items-stretch">
        <div className="w-full md:hidden block">
          <MobileViewCampaignBox promotion={promotion} />
        </div>
        <div className="w-full hidden md:block lg:hidden">
          <TabletViewCampaignBox promotion={promotion} />
        </div>
        <div className="w-full hidden lg:block">
          <DesktopViewCampaignBox promotion={promotion} />
        </div>
      </div>
    </main>
  );
}

export async function getAllPromotions(): Promise<Promotion[]> {
  const backendUrl = 'https://www.rupushi.com/api/v1/promotion';
  try {
    const res = await fetch(backendUrl, { next: { revalidate: 3600 } }); // 60 minutes (3600 seconds)
    const responseData: { data: Promotion[] } = await res.json();
    const data = responseData.data;
    if (!data) return [];
    return data;
  } catch (error) {
    console.error('Failed to fetch promotions:', error);
    return [];
  }
}

async function Giveaway() {
  // Server-side data fetching
  let allPromotions = await getAllPromotions();
  allPromotions = allPromotions.filter(p => p.activeStatus);

  if (allPromotions.length === 0) {
    return <div></div>;
  }

  // Pre-fetch all product IDs needed for links
  const promotionsWithProductIds = await Promise.all(
    allPromotions.map(async promotion => {
      const productId = await getProductIdByCode(promotion.productCode);
      return { promotion, productId };
    }),
  );

  return (
    <div className="w-full flex flex-col gap-2 px-1 md:-px-0">
      {/* {promotionsWithProductIds.length > 0 && (
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight w-full justify-center md:px-4 lg:text-start">
          Lucky Gifts Campaign
        </h2>
      )} */}
      {promotionsWithProductIds.map(({ promotion }) => (
        <PromotionItem key={promotion.id} promotion={promotion} />
      ))}
    </div>
  );
}

export default Giveaway;
