import { IProduct } from '@/app/components/ProductsCard';
import Image from 'next/image';

/*
|-----------------------------------------
| setting up SingleProduct for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/
const SingleProduct = ({ product }: { product: IProduct }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="relative w-full aspect-square">
        <Image
          src={product.img || '/placeholder-image.png'}
          alt={product.name}
          fill
          className="object-cover rounded-xl"
          placeholder="blur"
          blurDataURL="/placeholder-image.png"
        />
      </div>

      {/* Product Details */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product['description-top']}</p>
      </div>
    </div>
  );
};
export default SingleProduct;
