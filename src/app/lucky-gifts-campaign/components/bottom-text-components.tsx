/*
|-----------------------------------------
| setting up BottomTextComponents for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, June, 2025
|-----------------------------------------
*/
const BottomTextComponents = () => {
  const textRed = ' text-rose-500 ';
  return (
    <main className="mt-4">
      <div className="w-full bg-slate-50 rounded-lg">
        <h2 className="my-kalpurush-text font-normal text-xl p-4 text-center leading-10">
          পুরস্কার তালিকা:
          <br />
          <span className={textRed}>প্রথম ১০ টি পুরস্কার:</span> ১টি AC | ২টি ফ্রিজ । ২টি Android TV
          | ১টি স্মার্টফোন । ১টি ওয়াশিং মেশিন । ১টি Oven | ২টি Blender <br /> আরও থাকছে নগদ টাকার
          পুরস্কার! <br /> পরবর্তী {'  '}
          <span className={textRed}> ১০০ জন বিজয়ী</span>
          পাবেন {'  '} <span className={textRed}> প্রতি জনে ৫&#44;০০০ টাকা</span>
          {'  '}
          করে ক্যাশ!
        </h2>
      </div>
    </main>
  );
};
export default BottomTextComponents;
