import { IProduct } from '@/app/components/ProductsCard';
import { notFound } from 'next/navigation';
import ProductDetailPage from './ProductDetailPage';
import AllProductsHome from '@/app/components/AllProductsHome';

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

  return (
    <div className="py-12 flex flex-col w-full">
      <ProductDetailPage product={post} />

      <div className="w-full flex items-center justify-center md:px-0">
        <div className="container max-w-7xl flex flex-col gap-8 ">
          <AllProductsHome />
        </div>
      </div>
    </div>
  );
}
