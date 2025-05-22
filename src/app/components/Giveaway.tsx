/*
|-----------------------------------------
| setting up Giveaway for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, May, 2025
|-----------------------------------------
*/
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from './ProductsCard';

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
    return product?.id || '';
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return '';
  }
}

const MobileViewCampaignBox = ({
  promotion,
  productId,
}: {
  promotion: Promotion;
  productId: string;
}) => {
  return (
    <div className="w-full flex items-center justify-start gap-4 flex-col bg-[#EEEAE7]">
      <div
        className={`relative h-[400px] min-w-[400px] w-[400px] overflow-hidden shadow-lg rounded-md`}
      >
        <Image
          src={promotion.mainPageImage1}
          alt={promotion.mainPageTitle}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'contain' }}
          className="block"
        />
      </div>
      <div className="w-full flex items-start justify-start flex-col gap-2">
        <div className="w-full h-auto pb-10 pl-[10px] flex items-start justify-start text-center flex-col gap-2">
          <h2 className="text-[38px] font-extrabold text-gray-900 tracking-tight w-full justify-center lg:text-start">
            Lucky Gifts <span className="p-4 my-kalpurush-text font-extrabold">ক্যাম্পেইন</span>
          </h2>
          <h2 className="text-[18px] font-normal  my-kalpurush-text  text-gray-900 tracking-tight w-full justify-center lg:text-start">
            মোট দশ লক্ষ টাকার ১০ টি পুরষ্কার জিতুন
          </h2>
          <h2 className="text-[38px] font-extrabold my-kalpurush-text  text-red-500 tracking-tight w-full justify-center lg:text-start">
            মাত্র ৯৯৯ টাকা
          </h2>
          <Link href={`/product-details/${productId}`} className="w-full">
            <Button
              variant={'default'}
              className="bg-[#fbc79a] border-1 border-slate-300 hover:border-slate-400 shadow-lg hover:shadow-slate-900 shadow-slate-700 text-bold text-black h-[70px] text-3xl max-w-[250px] cursor-pointer w-full"
            >
              <span className="text-[20px] my-kalpurush-text font-extrabold">অর্ডার করুন</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
const TabletViewCampaignBox = ({
  promotion,
  productId,
}: {
  promotion: Promotion;
  productId: string;
}) => {
  return (
    <div className="w-full flex items-center justify-start gap-4 flex-row bg-[#EEEAE7]">
      <div
        className={`relative h-[300px] min-w-[300px] w-[300px] overflow-hidden shadow-lg rounded-md`}
      >
        <Image
          src={promotion.mainPageImage1}
          alt={promotion.mainPageTitle}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'contain' }}
          className="block"
        />
      </div>
      <div className="w-full flex items-start justify-start flex-col gap-2">
        <div className="w-full h-[300px] pl-[10px] flex items-start justify-start flex-col gap-2 pt-[15px]">
          <h2 className="text-[38px] font-extrabold text-gray-900 tracking-tight w-full justify-center lg:text-start">
            Lucky Gifts <span className="p-4 my-kalpurush-text font-extrabold">ক্যাম্পেইন</span>
          </h2>
          <h2 className="text-[18px] font-normal  my-kalpurush-text  text-gray-900 tracking-tight w-full justify-center lg:text-start">
            মোট দশ লক্ষ টাকার ১০ টি পুরষ্কার জিতুন
          </h2>
          <h2 className="text-[38px] font-extrabold my-kalpurush-text  text-red-500 tracking-tight w-full justify-center lg:text-start">
            মাত্র ৯৯৯ টাকা
          </h2>
          <Link href={`/product-details/${productId}`} className="w-full">
            <Button
              variant={'default'}
              className="bg-[#fbc79a] border-1 border-slate-300 hover:border-slate-400 shadow-lg hover:shadow-slate-900 shadow-slate-700 text-bold text-black h-[70px] text-3xl max-w-[250px] cursor-pointer w-full"
            >
              <span className="text-[20px] my-kalpurush-text font-extrabold">অর্ডার করুন</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
const DesktopViewCampaignBox = ({
  promotion,
  productId,
}: {
  promotion: Promotion;
  productId: string;
}) => {
  return (
    <div className="w-full flex items-center justify-start gap-4 flex-row bg-[#EEEAE7]">
      <div
        className={`relative h-[400px] min-w-[400px] w-[400px] overflow-hidden shadow-lg rounded-md`}
      >
        <Image
          src={promotion.mainPageImage1}
          alt={promotion.mainPageTitle}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'contain' }}
          className="block"
        />
      </div>
      <div className="w-full flex items-start justify-start flex-col gap-8">
        <div className="w-full h-[400px] pl-[100px] flex items-start justify-start flex-col gap-4 pt-8">
          <h2 className="text-[48px] font-extrabold text-gray-900 tracking-tight w-full justify-center lg:text-start">
            Lucky Gifts <span className="p-4 my-kalpurush-text font-extrabold">ক্যাম্পেইন</span>
          </h2>
          <h2 className="text-[28px] font-normal  my-kalpurush-text  text-gray-900 tracking-tight w-full justify-center lg:text-start">
            মোট দশ লক্ষ টাকার ১০ টি পুরষ্কার জিতুন
          </h2>
          <h2 className="text-[48px] font-extrabold my-kalpurush-text  text-red-500 tracking-tight w-full justify-center lg:text-start">
            মাত্র ৯৯৯ টাকা
          </h2>
          <Link href={`/product-details/${productId}`} className="w-full">
            <Button
              variant={'default'}
              className="bg-[#fbc79a] border-1 border-slate-300 hover:border-slate-400 shadow-lg hover:shadow-slate-900 shadow-slate-700 text-bold text-black h-[70px] text-3xl max-w-[250px] cursor-pointer w-full"
            >
              <span className="text-[30px] my-kalpurush-text font-extrabold">অর্ডার করুন</span>
            </Button>
          </Link>
        </div>
        {/* Red button */}
        {/* <Link href={`/product-details/${productId}`} className="w-full">
          <Button
            variant={'default'}
            className="bg-rose-500 h-[60px] md:h-[60px] hover:bg-rose-600 text-bold text-white text-3xl cursor-pointer w-full"
          >
            <span className="p-4 my-kalpurush-text">মাত্র ৯৯৯ টাকা!</span>
          </Button>
        </Link> */}
        {/* Orange button */}
        {/* <Link href={`/product-details/${productId}`} className="w-full">
          <Button
            variant={'default'}
            className="bg-[#fbc79a] hover:bg-[#e39366] text-bold text-black h-[90px] md:h-[90px] text-3xl cursor-pointer w-full"
          >
            <span className="p-4 my-kalpurush-text">
              অর্ডার করুন <br /> পুরস্কার জিতুন
            </span>
          </Button>
        </Link> */}
      </div>
    </div>
  );
};

function PromotionItem({ promotion, productId }: { promotion: Promotion; productId: string }) {
  return (
    <main className="w-full max-w-7xl md:px-4">
      <div className="w-full flex lg:flex-row flex-col justify-between border-slate-200 h-full gap-4 items-stretch">
        <div className="w-full md:hidden block">
          <MobileViewCampaignBox productId={productId} promotion={promotion} />
        </div>
        <div className="w-full hidden md:block lg:hidden">
          <TabletViewCampaignBox productId={productId} promotion={promotion} />
        </div>
        <div className="w-full hidden lg:block">
          <DesktopViewCampaignBox productId={productId} promotion={promotion} />
        </div>
        {/* <div
          className={`relative w-full md:w-2/5 h-[300px] max-w-[900px] max-h-[400px] overflow-hidden shadow-lg rounded-md block md:hidden lg:block`}
        >
          <Image
            src={promotion.mainPageImage2 || '/placeholder.jpg'}
            alt={promotion.mainPageTitle}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'contain' }}
            className="block"
          />
        </div> */}
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
      {promotionsWithProductIds.map(({ promotion, productId }) => (
        <PromotionItem key={promotion.id} promotion={promotion} productId={productId} />
      ))}
    </div>
  );
}

export default Giveaway;
