import React from 'react';

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">আমাদের সম্পর্কে</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          রূপশী ২.০ - আপনার বিশ্বস্ত অনলাইন শপিং প্লাটফর্ম
        </h2>

        <p className="mb-4">
          রূপশী ২.০ একটি প্রিমিয়াম অনলাইন শপিং প্লাটফর্ম যা ২০২৪ সালে যাত্রা শুরু করে। আমরা
          বাংলাদেশের গ্রাহকদের জন্য উচ্চমানের পণ্য সহজ এবং নিরাপদ উপায়ে পৌঁছে দেওয়ার লক্ষ্য নিয়ে
          কাজ করছি।
        </p>

        <p className="mb-4">
          আমাদের লক্ষ্য হল আপনাকে একটি নিরাপদ, বিশ্বস্ত এবং আনন্দদায়ক শপিং অভিজ্ঞতা প্রদান করা।
          আমরা সর্বদা আমাদের গ্রাহকদের সন্তুষ্টি নিশ্চিত করার জন্য কাজ করি এবং তাদের প্রতিক্রিয়া
          গ্রহণ করি।
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">আমাদের মূল্যবোধ</h3>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">গ্রাহক সন্তুষ্টি আমাদের প্রথম অগ্রাধিকার</li>
          <li className="mb-2">১০০% অরিজিনাল পণ্য গ্যারান্টি</li>
          <li className="mb-2">দ্রুত এবং নিরাপদ ডেলিভারি</li>
          <li className="mb-2">সহজ রিটার্ন এবং রিফান্ড পলিসি</li>
          <li>২৪/৭ গ্রাহক সেবা</li>
        </ul>

        <h3 className="text-lg font-semibold mt-6 mb-3">যোগাযোগ করুন</h3>
        <p className="mb-2">ফোন: ০১৭৫৫-৫৫৫৫৫৫</p>
        <p className="mb-2">ইমেইল: info@rupushi.com</p>
        <p>ঠিকানা: মিরপুর-১০, ঢাকা-১২১৬, বাংলাদেশ</p>
      </div>
    </div>
  );
}
