/*
|-----------------------------------------
| setting up BottomHeadingComponent for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, June, 2025
|-----------------------------------------
*/
const BottomHeadingComponent = () => {
  return (
    <main className="w-full flex flex-col gap-4 mt-8">
      <div>
        <h2 className="line-through my-kalpurush-text font-normal text-5xl text-center leading-10 text-slate-50">
          মূল্য ১৫০০ টাকা
        </h2>
      </div>
      <div>
        <h2 className="my-kalpurush-text font-normal text-5xl text-center leading-10 text-slate-800 bg-slate-50 rounded-lg p-4 max-w-[460px] mx-auto">
          অফার মূল্য ৬৯৯ টাকা
        </h2>
      </div>
      <div>
        <h2 className="my-kalpurush-text font-normal text-2xl md:text-5xl text-center leading-10 text-slate-50">
          অর্ডার করতে নিচের ফর্মটি সম্পূর্ণ পূরন করুন ।
        </h2>
      </div>
      <div className="w-full flex items-center justify-center gap-8 md:mt-2">
        <div className="w-[120px] h-[2px] bg-slate-50" />
        <div className="w-[120px] h-[2px] bg-slate-50" />
        <div className="w-[120px] h-[2px] bg-slate-50" />
      </div>
    </main>
  );
};
export default BottomHeadingComponent;
