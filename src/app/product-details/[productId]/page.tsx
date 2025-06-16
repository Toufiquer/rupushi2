import { IProduct } from '@/app/components/ProductsCard';
import { notFound } from 'next/navigation';
import ProductDetailPage from './ProductDetailPage';
import AllProductsHome from '@/app/components/AllProductsHome';
import { Promotion } from '@/app/components/Giveaway';
import CountdownTimer from './CountdownTimerComponent';
import Image from 'next/image';
import DataLayerNextComponentCartPage from './data-layer';

const backendUrl = 'https://www.rupushi.com/api/products';
async function getPost(id: string) {
  const res = await fetch(backendUrl, { next: { revalidate: 60 } });
  const allProducts: { data: IProduct[] } = await res.json();
  const post = allProducts.data.filter((p: IProduct) => {
    return p.id === id || p._id === id;
  })[0];
  if (!post) notFound();
  return post;
}

async function getAllPromotions(): Promise<Promotion[]> {
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
export async function generateMetadata({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const post = await getPost(productId);

  return {
    name: post.name,
  };
}

export default async function Page({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const post = await getPost(productId);

  let allPromotions = await getAllPromotions();
  allPromotions = allPromotions.filter(p => p.activeStatus);

  const isCurrentProductInPromotion = allPromotions.some(
    p => p.productCode === post['product-code'],
  );
  return (
    <div className="py-2 flex flex-col w-full">
      {/* <DataLayerNextComponentProductDetails id={productId} /> */}
      <DataLayerNextComponentCartPage key={Math.random()} product={post} />
      {isCurrentProductInPromotion && (
        <div className="w-full flex items-center justify-center">
          <div
            className={`relative w-full px-2 xl:px-0 h-[80px] md:h-[120px] lg:h-[155px] xl:h-[200px] max-w-[1275px] max-h-[400px] overflow-hidden rounded-md`}
          >
            <Image
              src={allPromotions[0].productPageBannerImage1 || '/placeholder.jpg'}
              alt={'promotion banner'}
              width={1400}
              height={600}
              style={{ objectFit: 'contain' }}
              className="block"
            />
          </div>
        </div>
      )}
      <ProductDetailPage product={post} />
      {isCurrentProductInPromotion ? (
        <CountdownTimer />
      ) : (
        <div className="w-full flex items-center justify-center md:px-0">
          <div className="container max-w-7xl flex flex-col gap-8 ">
            <AllProductsHome />
          </div>
        </div>
      )}
    </div>
  );
}
