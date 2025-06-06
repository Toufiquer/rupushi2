import { IProduct } from '@/app/components/ProductsCard';
import FormData from './FormData';
import ShoppingCart from './ShoppingCart';

const Checkout = ({ allProducts }: { allProducts: IProduct[] }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Left Section: Form */}
      <FormData />
      {/* Right Section: Cart Summary */}
      <ShoppingCart initialCartItems={allProducts} />
    </div>
  );
};

export default Checkout;
