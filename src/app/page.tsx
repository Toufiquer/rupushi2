export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center mb-6">রূপশী ২.০</h1>
        <p className="text-lg text-center mb-8">
          আপনার নেক্সটজেএস + মঙ্গোডিবি + পিডাব্লিউএ অ্যাপ্লিকেশন
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">পিডাব্লিউএ (PWA) সাপোর্ট</h2>
            <p className="text-gray-600">
              এই অ্যাপ্লিকেশনে পিডাব্লিউএ (Progressive Web App) সাপোর্ট আছে। এটি ইনস্টল করা যায় এবং
              অফলাইনে ব্যবহার করা যায়।
            </p>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">মঙ্গোডিবি ডাটাবেস</h2>
            <p className="text-gray-600">
              মঙ্গোডিবি মঙ্গুস ব্যবহার করে সংযোগ স্থাপন করা হয়েছে। ডাটাবেস অপারেশন সহজেই করা যাবে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
