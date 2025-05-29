'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function InspirationPage() {
  useEffect(() => {
    // Load Pinterest script
    const script = document.createElement('script');
    script.src = '//assets.pinterest.com/js/pinit.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen p-6 md:p-12 bg-[url('/floral-bg.png')] bg-cover bg-fixed">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-blush-600 hover:text-blush-700 mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="bg-white bg-opacity-95 rounded-lg p-8 shadow-lg">
          <h1 className="text-4xl font-display text-blush-600 mb-6">📌 Inspiration</h1>
          <p className="text-gray-600 mb-8">
            Get inspired for our Midsommar with none other than a pinterest board.
          </p>

          <div className="w-full flex justify-center">
            <a 
              data-pin-do="embedBoard" 
              data-pin-board-width="900" 
              data-pin-scale-height="1200" 
              data-pin-scale-width="115" 
              href="https://ca.pinterest.com/sophsoph910/june-20th21st/"
              className="w-full max-w-4xl block"
            ></a>
          </div>
        </div>
      </div>
    </main>
  );
}
