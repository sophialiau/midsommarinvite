'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userInfo = { name, email };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      setShowModal(false);
    } catch (error) {
      console.error('Error saving user info:', error);
      alert('Failed to save information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[url('/floral-bg.png')] bg-cover bg-fixed">
      {/* Welcome Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-display text-blush-600 mb-4">🌸 Welcome to Our Midsummer Dinner Party 🌸</h2>
            <p className="text-gray-600 mb-6">
              Please enter your name and email to join the festivities!
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg text-white transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blush-500 hover:bg-blush-600'
                }`}
              >
                {isSubmitting ? 'Saving...' : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display text-blush-600 mb-4">
            Midsummer Dinner Party 🌸
          </h1>
          <p className="text-xl text-gray-600">
            Another magical evening @ S&S's
          </p>
        </div>

        {/* Main Image */}
        <div className="relative w-full max-w-4xl mx-auto mb-12">
          <div className="aspect-w-16 aspect-h-9">
            <Image
              src="/midsommar-table.jpg"
              alt="Midsummer celebration table"
              fill
              className="object-cover rounded-lg shadow-xl"
              priority
            />
          </div>
        </div>

        {/* Event Details */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white bg-opacity-95 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-display text-blush-600 mb-4">🌸 RSVP</h2>
            <p className="text-gray-600 mb-4">
              Will you join us for this special celebration?
            </p>
            <Link
              href="/rsvp"
              className="inline-block py-2 px-4 bg-blush-500 text-white rounded-lg hover:bg-blush-600 transition-colors"
            >
              RSVP Now
            </Link>
          </div>

          <div className="bg-white bg-opacity-95 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-display text-blush-600 mb-4">🗳️ Vote</h2>
            <p className="text-gray-600 mb-4">
              Help choose the perfect evening for our gathering
            </p>
            <Link
              href="/vote"
              className="inline-block py-2 px-4 bg-blush-500 text-white rounded-lg hover:bg-blush-600 transition-colors"
            >
              Vote Now
            </Link>
          </div>

          <div className="bg-white bg-opacity-95 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-display text-blush-600 mb-4">💐 Bring Something</h2>
            <p className="text-gray-600 mb-4">
              Sign up for blooms & bubbles to share
            </p>
            <Link
              href="/contribute"
              className="inline-block py-2 px-4 bg-blush-500 text-white rounded-lg hover:bg-blush-600 transition-colors"
            >
              Contribute
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-600">
          <p>We can't wait to celebrate with you! 🌸</p>
        </footer>
      </div>
    </main>
  );
}
