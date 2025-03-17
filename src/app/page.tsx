import AllProducts from './components/AllProducts';
import ProductListExample from './components/ProductListExample';

export default function Home() {
  return (
    <main>
      <div className="container mx-auto px-4">
        {/* প্রোডাক্ট সেকশন যোগ করা হয়েছে */}
        <AllProducts />

        {/* নমুনা পণ্য তালিকা সহ পেজিনেশন প্রদর্শন */}
        <ProductListExample />
      </div>
    </main>
  );
}
