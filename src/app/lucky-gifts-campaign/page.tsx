/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, June, 2025
|-----------------------------------------
*/

import LogoComponent from './components/logo';
import TopTextComponents from './components/top-text-components';

const Page = () => {
  return (
    <main className="w-full flex flex-col max-w-6xl mx-auto">
      <LogoComponent />
      <TopTextComponents />
    </main>
  );
};
export default Page;
