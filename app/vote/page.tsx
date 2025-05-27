'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const DATES = [
  { id: 1, date: 'June 20th, 2025', description: 'Friday evening' },
  { id: 2, date: 'June 21st, 2025', description: 'Saturday evening' },
];

export default function VotePage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [votes, setVotes] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (!savedUserInfo) {
      router.push('/');
    } else {
      setUserInfo(JSON.parse(savedUserInfo));
    }

    // Fetch current votes
    fetchVotes();
  }, [router]);

  const fetchVotes = async () => {
    try {
      const response = await fetch('/api/votes');
      if (response.ok) {
        const data = await response.json();
        setVotes(data);
      }
    } catch (error) {
      console.error('Error fetching votes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate === null) return;

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

      await fetchVotes();
      alert('Thank you for your vote!');
      router.push('/');
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
          <h1 className="text-4xl font-display text-blush-600 mb-6">Vote for Date</h1>
          <p className="text-gray-600 mb-8">
            Hi {userInfo.name}! Please help us choose the perfect date for our Midsommar celebration.
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
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">{date.date}</h3>
                      <p className="text-gray-600">{date.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {votes[date.id] || 0} votes
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={selectedDate === null || isSubmitting}
              className={`w-full py-3 px-6 rounded-lg text-white transition-colors ${
                selectedDate === null || isSubmitting
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