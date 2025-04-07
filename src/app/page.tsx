import AllProducts from './components/AllProducts';
import NewArrival from './components/NewArrival';
import { Slider } from './components/Slider';

export default function Home() {
  return (
    <main className="w-full flex items-center justify-center">
      <div className="container mx-auto max-w-7xl">
        <Slider />
        <NewArrival />
        <AllProducts />
      </div>
    </main>
  );
}
