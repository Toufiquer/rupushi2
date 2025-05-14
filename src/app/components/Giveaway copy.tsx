import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/router';
import { IProduct } from './ProductsCard';

/*
|-----------------------------------------
| setting up Giveaway for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, May, 2025
|-----------------------------------------
*/

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

const CustomComponent = async ({ allPromotions }: { allPromotions: Promotion[] }) => {
  const getIdByProductCode = async (code: string) => {
    const getAllPosts = async (): Promise<IProduct[]> => {
      const backendUrl = 'https://www.rupushi.com/api/products';
      try {
        const res = await fetch(backendUrl, { next: { revalidate: 3600 } }); // 60 minutes (3600 seconds)
        const responseData: { data: IProduct[] } = await res.json();
        const data = responseData.data;
        if (!data) notFound();
        return data;
      } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
      }
    };

    const allProducts = await getAllPosts();
    const result = allProducts.filter(p => p['product-code'] === code);
    return result[0].id || '';
    // Get data server-side
  };
  const router = useRouter();
  const handleLink = (productCode: string) => {
    const id = getIdByProductCode(productCode);
    router.push(`/product-details/${id}`);
  };
  return allPromotions.map(curr => {
    return (
      <main className="w-full max-w-7xl md:px-4 max-h-[400px] h-[300px] my-2">
        <div className="w-full flex items-center justify-between border-slate-200 h-full gap-4">
          <div className="w-3/5 border-1 border-slate-200 shadow hover:shadow-2xl">
            <div className="w-full flex items-center justify-center">
              <div className="w-full flex items-center justify-center">
                <div className="w-full flex items-center justify-between relative max-h-[400px] h-[300px]  shadow-lg border-1 border-slate-200">
                  <Image fill src={curr.mainPageImage1} alt={curr.mainPageTitle} />
                </div>
              </div>
              <div className="w-full flex items-center justify-center flex-col gap-4">
                {/* Red button */}
                <Button
                  onClick={() => handleLink(curr.productCode)}
                  variant={'default'}
                  className="bg-rose-500 h-[80px] hover:bg-rose-600 text-bold text-white text-4xl cursor-pointer"
                >
                  <span className="p-4">{curr.mainPagePriceText}</span>
                </Button>
                {/* Red button */}
                <Button
                  onClick={() => handleLink(curr.productCode)}
                  variant={'default'}
                  className=" bg-[#fbc79a] hover:bg-[#e39366] text-bold text-black min-h-[80px] text-4xl cursor-pointer"
                >
                  <span className="p-4">{curr.mainPageText2}</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-2/5 border-1 border-slate-200 h-full flex flex-col items-center justify-center p-4 shadow hover:shadow-2xl">
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight w-full justify-center md:px-4">
                {curr.mainPageTitle}
              </h2>

              <div className="w-full flex items-center justify-between relative max-h-[300px] h-[200px]  shadow-lg border-slate-200">
                <div className="w-full flex items-center justify-center">
                  <div className="w-full flex items-center justify-between relative max-h-[300px] h-[200px]  shadow-lg  border-slate-200">
                    <Image fill src={curr.mainPageImage2} alt={curr.mainPageTitle} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  });
};

const Giveaway = async () => {
  // Server-side data fetching
  const getAllPromotions = async (): Promise<Promotion[]> => {
    const backendUrl = 'http://localhost:3000/api/v1/promotion';
    try {
      const res = await fetch(backendUrl, { next: { revalidate: 3600 } }); // 60 minutes (3600 seconds)
      const responseData: { data: Promotion[] } = await res.json();
      const data = responseData.data;
      if (!data) notFound();
      return data;
    } catch (error) {
      console.error('Failed to fetch promotions:', error);
      return [];
    }
  };
  let allPromotions = await getAllPromotions();
  allPromotions = allPromotions.filter(p => p.activeStatus);
  if (allPromotions.length === 0) {
    return <div></div>;
  }
  if (allPromotions.length > 0) {
  }
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight w-full justify-center md:px-4">
        Giveaway Campaign - Win Big
      </h2>
      <CustomComponent allPromotions={allPromotions} />
    </div>
  );
};
export default Giveaway;
