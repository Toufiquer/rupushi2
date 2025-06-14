/*
|-----------------------------------------
| setting up TopTextComponents for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, June, 2025
|-----------------------------------------
*/
const TopTextComponents = () => {
  const textRed = ' text-rose-500 ';
  return (
    <main className="">
      <div className="w-full bg-slate-50 rounded-lg">
        <h2 className="my-kalpurush-text font-normal text-2xl p-4 text-center leading-10 md:leading-13">
          মাত্র ৬৯৯ টাকায় দারুন ডিজাইনের <span className={textRed}>জুয়েলারি সেট! </span> অর্ডার
          করলেই
          <span className={textRed}> ১০ লক্ষ টাকা পুরস্কার</span> জেতার সুযোগ! <br />
          <span className={textRed}> প্রথম ১০ জন পাচ্ছেন ১০ টি আকর্ষণীয় গিফট!</span> বাকি
          <span className={textRed}> ১০০ জন পাচ্ছেন </span> প্রতি জনে
          <span className={textRed}>
            {' '}
            ৫০০০ টাকা করে ক্যাশ! <br /> সর্বমোট বিজয়ী হবেন ১১০ জন!
          </span>
        </h2>
      </div>
    </main>
  );
};
export default TopTextComponents;
