'use client';

import Link from 'next/link';

export default function InspirationPage() {
  return (
    <main className="min-h-screen p-6 md:p-12 bg-[url('/floral-bg.png')] bg-cover bg-fixed">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blush-600 hover:text-blush-700 mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="bg-white bg-opacity-95 rounded-lg p-8 shadow-lg">
          <h1 className="text-4xl font-display text-blush-600 mb-6">📌 Inspiration</h1>
          <p className="text-gray-600 mb-8">
            Get inspired for our Midsommar with none other than a pinterest board.
          </p>

          <div className="aspect-[600/900] w-full">
            <iframe
              src="https://assets.pinterest.com/ext/embed.html?id=46I7QMiQm"
              height="900"
              width="600"
              frameBorder="0"
              scrolling="no"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
} 