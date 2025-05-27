'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RSVPPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);
  const [guests, setGuests] = useState(0);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (!savedUserInfo) {
      router.push('/');
    } else {
      setUserInfo(JSON.parse(savedUserInfo));
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userInfo?.name,
          email: userInfo?.email,
          attending,
          guests,
          dietaryRestrictions,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit RSVP');
      }

      router.push('/vote');
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Failed to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userInfo) {
    return null;
  }

  return (
    <main className="min-h-screen p-6 md:p-12 bg-[url('/floral-bg.png')] bg-cover bg-fixed">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blush-600 hover:text-blush-700 mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="bg-white bg-opacity-95 rounded-lg p-8 shadow-lg">
          <h1 className="text-4xl font-display text-blush-600 mb-6">RSVP</h1>
          <p className="text-gray-600 mb-8">
            Hi {userInfo.name}! Please let us know if you can join us for our Midsommar celebration.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-4">Will you be attending?</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`flex-1 py-3 px-6 rounded-lg border-2 transition-colors ${
                    attending === 'yes'
                      ? 'bg-blush-500 text-white border-blush-500'
                      : 'border-gray-300 hover:border-blush-500'
                  }`}
                >
                  Yes, I'll be there!
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`flex-1 py-3 px-6 rounded-lg border-2 transition-colors ${
                    attending === 'no'
                      ? 'bg-gray-500 text-white border-gray-500'
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                >
                  Sorry, can't make it
                </button>
              </div>
            </div>

            {attending === 'yes' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Number of additional guests (including yourself)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="4"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Dietary restrictions or allergies
                  </label>
                  <textarea
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-transparent"
                    rows={3}
                    placeholder="Please let us know if you have any dietary restrictions or allergies"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={!attending || isSubmitting}
              className={`w-full py-3 px-6 rounded-lg text-white transition-colors ${
                !attending || isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blush-500 hover:bg-blush-600'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
} 