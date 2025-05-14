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

interface Promotion {
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
      console.log(' ---         ---------- -          -----------', p['product-code'], code);
      return p['product-code'] === code;
    });
    return product?.id || '';
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return '';
  }
}

function PromotionItem({ promotion, productId }: { promotion: Promotion; productId: string }) {
  return (
    <main className="w-full max-w-7xl md:px-4 lg:max-h-[400px] lg:h-[300px] my-2">
      <div className="w-full flex lg:flex-row flex-col justify-between border-slate-200 h-full gap-4 items-stretch">
        <div className="w-full lg:w-3/5 md:border-1 border-slate-200 md:shadow hover:shadow-2xl md:p-4">
          <div className="w-full flex items-center justify-center gap-4 md:flex-row flex-col ">
            <div className="w-full mx-auto max-w-sm overflow-hidden shadow-lg rounded-lg py-0 border-0 hover:shadow-2xl duration-200">
              <div className="relative w-full aspect-square">
                <Image
                  fill
                  src={promotion.mainPageImage1}
                  alt={promotion.mainPageTitle}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-center flex-col gap-4">
              {/* Red button */}
              <Link href={`/product-details/${productId}`} className="w-full">
                <Button
                  variant={'default'}
                  className="bg-rose-500 h-[60px] md:h-[80px] hover:bg-rose-600 text-bold text-white text-3xl md:text-4xl cursor-pointer w-full"
                >
                  <span className="p-4">{promotion.mainPagePriceText}</span>
                </Button>
              </Link>
              {/* Orange button */}
              <Link href={`/product-details/${productId}`} className="w-full">
                <Button
                  variant={'default'}
                  className="bg-[#fbc79a] hover:bg-[#e39366] text-bold text-black h-[60px] md:h-[80px] text-3xl md:text-4xl cursor-pointer w-full"
                >
                  <span className="p-4">{promotion.mainPageText2}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 md:border-1 border-slate-200 h-full flex flex-col items-center justify-center md:p-4 md:shadow hover:shadow-2xl">
          <div className="w-full flex flex-col gap-2">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight w-full justify-center md:px-4 px-2 py-2 text-center lg:text-start">
              {promotion.mainPageTitle}
            </h2>

            <div className="w-full mx-auto max-w-sm overflow-hidden shadow-lg rounded-lg py-0 border-0 hover:shadow-2xl duration-200 lg:max-h-[300px]">
              <div className="relative w-full lg:max-h-[260px] aspect-square">
                <Image
                  src={promotion.mainPageImage2 || '/placeholder.jpg'}
                  alt={promotion.mainPageTitle}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

async function getAllPromotions(): Promise<Promotion[]> {
  const backendUrl = 'http://localhost:3000/api/v1/promotion';
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
      {promotionsWithProductIds.length > 0 && (
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight w-full justify-center md:px-4 text-center lg:text-start">
          Giveaway Campaign - Win Big
        </h2>
      )}
      {promotionsWithProductIds.map(({ promotion, productId }) => (
        <PromotionItem key={promotion.id} promotion={promotion} productId={productId} />
      ))}
    </div>
  );
}

export default Giveaway;
