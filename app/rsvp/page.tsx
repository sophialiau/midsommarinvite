'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RSVPPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);
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
    if (attending === null) return;

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

      alert('Thank you for your RSVP!');
      router.push('/');
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

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-4">Will you be attending?</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`flex-1 py-3 px-6 rounded-lg border-2 transition-colors ${
                      attending === true
                        ? 'border-blush-500 bg-blush-50 text-blush-600'
                        : 'border-gray-200 hover:border-blush-300'
                    }`}
                  >
                    Yes, I'll be there!
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`flex-1 py-3 px-6 rounded-lg border-2 transition-colors ${
                      attending === false
                        ? 'border-blush-500 bg-blush-50 text-blush-600'
                        : 'border-gray-200 hover:border-blush-300'
                    }`}
                  >
                    Sorry, I can't make it
                  </button>
                </div>
              </div>

              {attending && (
                <>
                  <div>
                    <label htmlFor="guests" className="block text-gray-700 mb-2">
                      Number of Guests (including yourself)
                    </label>
                    <input
                      type="number"
                      id="guests"
                      min="1"
                      max="4"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="dietary" className="block text-gray-700 mb-2">
                      Dietary Restrictions
                    </label>
                    <textarea
                      id="dietary"
                      value={dietaryRestrictions}
                      onChange={(e) => setDietaryRestrictions(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-transparent"
                      rows={3}
                      placeholder="Please let us know if you have any dietary restrictions or allergies..."
                    />
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={attending === null || isSubmitting}
              className={`w-full py-3 px-6 rounded-lg text-white transition-colors ${
                attending === null || isSubmitting
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