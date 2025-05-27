'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CONTRIBUTION_TYPES = [
  { id: 'drinks', label: 'Drinks', description: 'Wine, beer, or non-alcoholic beverages' },
  { id: 'appetizers', label: 'Appetizers', description: 'Light bites to start the evening' },
  { id: 'dessert', label: 'Dessert', description: 'Sweet treats to end the night' },
  { id: 'flowers', label: 'Flowers', description: 'Fresh blooms for decoration' },
];

export default function ContributePage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [contributionDetails, setContributionDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contributions, setContributions] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (!savedUserInfo) {
      router.push('/');
    } else {
      setUserInfo(JSON.parse(savedUserInfo));
    }

    // Fetch current contributions
    fetchContributions();
  }, [router]);

  const fetchContributions = async () => {
    try {
      const response = await fetch('/api/contributions');
      if (response.ok) {
        const data = await response.json();
        setContributions(data);
      }
    } catch (error) {
      console.error('Error fetching contributions:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userInfo?.name,
          email: userInfo?.email,
          type: selectedType,
          details: contributionDetails,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contribution');
      }

      await fetchContributions();
      alert('Thank you for your contribution!');
      router.push('/');
    } catch (error) {
      console.error('Error submitting contribution:', error);
      alert('Failed to submit contribution. Please try again.');
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
          <h1 className="text-4xl font-display text-blush-600 mb-6">Contribute</h1>
          <p className="text-gray-600 mb-8">
            Hi {userInfo.name}! Let us know what you'd like to bring to our Midsommar celebration.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              {CONTRIBUTION_TYPES.map((type) => (
                <div
                  key={type.id}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedType === type.id
                      ? 'border-blush-500 bg-blush-50'
                      : 'border-gray-200 hover:border-blush-300'
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">{type.label}</h3>
                      <p className="text-gray-600">{type.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {contributions[type.id]?.length || 0} people bringing
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedType && (
              <div>
                <label className="block text-gray-700 mb-2">
                  What will you bring?
                </label>
                <textarea
                  value={contributionDetails}
                  onChange={(e) => setContributionDetails(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-transparent"
                  rows={3}
                  placeholder="Please describe what you plan to bring..."
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={!selectedType || !contributionDetails || isSubmitting}
              className={`w-full py-3 px-6 rounded-lg text-white transition-colors ${
                !selectedType || !contributionDetails || isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blush-500 hover:bg-blush-600'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Contribution'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
} 