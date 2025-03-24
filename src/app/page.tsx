import AllProducts from './components/AllProducts';
import { Slider } from './components/Slider';

export default function Home() {
  return (
    <main>
      <div className="container mx-auto px-4">
        <Slider />
        <AllProducts />
      </div>
    </main>
  );
}
