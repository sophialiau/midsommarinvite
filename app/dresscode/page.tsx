'use client';

import Link from 'next/link';

export default function DressCodePage() {
  return (
    <main className="min-h-screen p-6 md:p-12 bg-[url('/floral-bg.png')] bg-cover bg-fixed">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blush-600 hover:text-blush-700 mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="bg-white bg-opacity-95 rounded-lg p-8 shadow-lg">
          <h1 className="text-4xl font-display text-blush-600 mb-6">👗 Dress Code</h1>
          <p className="text-gray-600 mb-8">
            Embrace the summer vibes with our Midsommar dress code.
          </p>

          <div className="space-y-6">
            <div className="bg-blush-50 border-2 border-blush-200 rounded-lg p-6">
              <h2 className="text-2xl font-display text-blush-600 mb-4">Summer Elegance</h2>
              <p className="text-gray-600 mb-4">
                Think light, airy, and comfortable for our outdoor celebration.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Linen dresses and shirts</li>
                <li>Flowy maxi skirts</li>
                <li>Light cotton fabrics</li>
                <li>Pastel and floral patterns</li>
                <li>Comfortable sandals or flats</li>
              </ul>
            </div>

            <div className="bg-blush-50 border-2 border-blush-200 rounded-lg p-6">
              <h2 className="text-2xl font-display text-blush-600 mb-4">Accessories</h2>
              <p className="text-gray-600 mb-4">
                Complete your look with these summer essentials.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Straw hats or sun hats</li>
                <li>Light scarves</li>
                <li>Floral hair accessories</li>
                <li>Minimal jewelry</li>
              </ul>
            </div>

            <div className="bg-blush-50 border-2 border-blush-200 rounded-lg p-6">
              <h2 className="text-2xl font-display text-blush-600 mb-4">What to Avoid</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Heavy fabrics</li>
                <li>Dark colors</li>
                <li>Formal business attire</li>
                <li>Clothing referencing physics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 