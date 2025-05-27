'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const DATES = [
  { id: 1, date: 'June 20th, 2024', day: 'Thursday' },
  { id: 2, date: 'June 21st, 2024', day: 'Friday' },
];

export default function VotePage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voteResults, setVoteResults] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (!savedUserInfo) {
      router.push('/');
    } else {
      setUserInfo(JSON.parse(savedUserInfo));
    }

    // Fetch current vote results
    fetchVoteResults();
  }, [router]);

  const fetchVoteResults = async () => {
    try {
      const response = await fetch('/api/votes');
      if (response.ok) {
        const data = await response.json();
        setVoteResults(data);
      }
    } catch (error) {
      console.error('Error fetching vote results:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userInfo?.name,
          email: userInfo?.email,
          dateId: selectedDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }

      await fetchVoteResults();
      router.push('/contribute');
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('Failed to submit vote. Please try again.');
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
          <h1 className="text-4xl font-display text-blush-600 mb-6">Vote for the Date</h1>
          <p className="text-gray-600 mb-8">
            Hi {userInfo.name}! Help us choose the perfect evening for our Midsommar celebration.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              {DATES.map((date) => (
                <div
                  key={date.id}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedDate === date.id
                      ? 'border-blush-500 bg-blush-50'
                      : 'border-gray-200 hover:border-blush-300'
                  }`}
                  onClick={() => setSelectedDate(date.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">{date.date}</h3>
                      <p className="text-gray-600">{date.day}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-medium text-blush-600">
                        {voteResults[date.id] || 0}
                      </p>
                      <p className="text-sm text-gray-500">votes</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={!selectedDate || isSubmitting}
              className={`w-full py-3 px-6 rounded-lg text-white transition-colors ${
                !selectedDate || isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blush-500 hover:bg-blush-600'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Vote'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
} 