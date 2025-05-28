'use client';

import Link from 'next/link';

export default function MenuPage() {
  return (
    <main className="min-h-screen p-6 md:p-12 bg-[url('/floral-bg.png')] bg-cover bg-fixed">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blush-600 hover:text-blush-700 mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="bg-white bg-opacity-95 rounded-lg p-8 shadow-lg">
          <h1 className="text-4xl font-display text-blush-600 mb-6">🍽️ Menu</h1>
          <p className="text-gray-600 mb-8">
            A summer feast featuring fresh, seasonal ingredients.
          </p>

          <div className="space-y-8">
            <div className="bg-blush-50 border-2 border-blush-200 rounded-lg p-6">
              <h2 className="text-2xl font-display text-blush-600 mb-4">Starters & Salads</h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="text-gray-800">Feta Watermelon Salad</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-800">Radishes with Butter and Salt</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-800">Arugula and Walnut Salad</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-800">Peach Burrata and Prosciutto Salad</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-800">Homemade Focaccia with Dipping Oil</span>
                </li>
              </ul>
            </div>

            <div className="bg-blush-50 border-2 border-blush-200 rounded-lg p-6">
              <h2 className="text-2xl font-display text-blush-600 mb-4">Main Courses</h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="text-gray-800">Flank Steak with Chimichurri</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-800">Baked Salmon with Chimichurri</span>
                </li>
              </ul>
            </div>

            <div className="bg-blush-50 border-2 border-blush-200 rounded-lg p-6">
              <h2 className="text-2xl font-display text-blush-600 mb-4">Desserts</h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="text-gray-800">Olive Oil Cake</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-800">Banana Pudding</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 