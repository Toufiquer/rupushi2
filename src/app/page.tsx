// import AllProducts from './components/AllProducts';
// import NewArrival from './components/NewArrival';
import { Slider } from './components/Slider';
import PageCategory from './components/PageCategory';
import NewArrivalHome from './components/NewArrivalHome';
import AllProductsHome from './components/AllProductsHome';
import Giveaway from './components/Giveaway';

export default function Home() {
  return (
    <main className="w-full flex items-center justify-center">
      <div className="container mx-auto max-w-7xl px-1 lg:px-0">
        <Slider />
        <PageCategory />
        <Giveaway />
        {/* <NewArrival /> */}
        {/* <AllProducts /> */}
        <NewArrivalHome />
        <AllProductsHome />
      </div>
    </main>
  );
}
