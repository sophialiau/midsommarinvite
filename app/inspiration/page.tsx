'use client';

import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';

export default function InspirationPage() {
  useEffect(() => {
    // Rebuild Pinterest widgets after component mounts
    if ((window as any).PinUtils) {
      (window as any).PinUtils.build();
    }
  }, []);

  return (
    <>
      <Head>
        <script async defer src="https://assets.pinterest.com/js/pinit.js"></script>
      </Head>

      <main className="min-h-screen p-6 md:p-12 bg-[url('/floral-bg.png')] bg-cover bg-fixed">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-blush-600 hover:text-blush-700 mb-8 inline-block">
            ← Back to Home
          </Link>

          <div className="bg-white bg-opacity-95 rounded-lg p-8 shadow-lg">
            <h1 className="text-4xl font-display text-blush-600 mb-6">📌 Inspiration</h1>
            <p className="text-gray-600 mb-8">
              Get inspired for our Midsommar with none other than a Pinterest board.
            </p>

            <div className="w-full">
              <a
                data-pin-do="embedBoard"
                data-pin-board-width="800"
                data-pin-scale-height="240"
                data-pin-scale-width="80"
                href="https://ca.pinterest.com/sophsoph910/june-20th21st/"
              >
                {/* Pinterest widget will replace this */}
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
