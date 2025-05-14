import { IProduct } from '@/app/components/ProductsCard';
import { notFound } from 'next/navigation';
import ProductDetailPage from './ProductDetailPage';
import AllProductsHome from '@/app/components/AllProductsHome';
import { Promotion } from '@/app/components/Giveaway';
import { Slider } from '@/app/components/Slider';
import CountdownTimer from './CountdownTimerComponent';

const backendUrl = 'https://www.rupushi.com/api/products';
async function getPost(id: string) {
  const res = await fetch(backendUrl, { next: { revalidate: 60 } });
  const allProducts: { data: IProduct[] } = await res.json();
  console.log('allProducts', allProducts.data.length);
  const post = allProducts.data.filter((p: IProduct) => {
    return p.id === id;
  })[0];
  console.log(' -- post : ', post?.name);
  if (!post) notFound();
  return post;
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
    <div className="py-12 flex flex-col w-full">
      {isCurrentProductInPromotion && <Slider />}
      <ProductDetailPage product={post} />
      {isCurrentProductInPromotion && <CountdownTimer />}

      <div className="w-full flex items-center justify-center md:px-0">
        <div className="container max-w-7xl flex flex-col gap-8 ">
          <AllProductsHome />
        </div>
      </div>
    </div>
  );
}
