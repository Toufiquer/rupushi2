import AllProducts from './components/AllProducts';
import NewArrival from './components/NewArrival';
import { Slider } from './components/Slider';
import PageCategory from './components/PageCategory';

export default function Home() {
  return (
    <main className="w-full flex items-center justify-center">
      <div className="container mx-auto max-w-7xl">
        <Slider />
        <PageCategory />
        <NewArrival />
        <AllProducts />
      </div>
    </main>
  );
}
