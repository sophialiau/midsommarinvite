'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CONTRIBUTION_ITEMS = [
  { id: 'prosecco', label: 'Prosecco', description: '3 bottles needed', max: 3 },
  { id: 'white_wine', label: 'White Wine', description: '2 bottles needed', max: 2 },
  { id: 'red_wine', label: 'Red Wine', description: '2 bottles needed', max: 2 },
  { id: 'flowers', label: 'Flowers', description: '2 bouquets needed', max: 2 },
];

export default function ContributePage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contributions, setContributions] = useState<{ [key: string]: number }>({});

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

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: quantity
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(selectedItems).length === 0) return;

    setIsSubmitting(true);

    try {
      // Submit each item separately
      const promises = Object.entries(selectedItems).map(async ([item, quantity]) => {
        const response = await fetch('/api/contributions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userInfo?.name,
            email: userInfo?.email,
            item,
            quantity,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || `Failed to submit contribution for ${item}`);
        }

        return response.json();
      });

      await Promise.all(promises);
      await fetchContributions();
      alert('Thank you for your contribution!');
      router.push('/');
    } catch (error) {
      console.error('Error submitting contribution:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit contribution. Please try again.');
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
          <h1 className="text-4xl font-display text-blush-600 mb-6">💐 Bring Something</h1>
          <p className="text-gray-600 mb-8">
            Hi {userInfo.name}! Let's make this celebration extra special.
          </p>

          <div className="bg-blush-50 border-2 border-blush-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-display text-blush-600 mb-4">🌸 Flower Crown Activity</h2>
            <p className="text-gray-600">
              Each guest is asked to bring 2 bunches of grocery store flowers for our flower crown making activity! 
              We'll provide the supplies and guidance to create beautiful crowns together.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              {CONTRIBUTION_ITEMS.map((item) => {
                const remaining = item.max - (contributions[item.id] || 0);
                const selected = selectedItems[item.id] || 0;
                
                return (
                  <div key={item.id} className="p-6 rounded-lg border-2 border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-medium text-gray-900">{item.label}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {remaining} remaining
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, Math.max(0, selected - 1))}
                        className="w-8 h-8 rounded-full border-2 border-blush-500 text-blush-500 flex items-center justify-center hover:bg-blush-50"
                        disabled={selected === 0}
                      >
                        -
                      </button>
                      <span className="text-lg font-medium">{selected}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, Math.min(remaining, selected + 1))}
                        className="w-8 h-8 rounded-full border-2 border-blush-500 text-blush-500 flex items-center justify-center hover:bg-blush-50"
                        disabled={selected >= remaining}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={Object.keys(selectedItems).length === 0 || isSubmitting}
              className={`w-full py-3 px-6 rounded-lg text-white transition-colors ${
                Object.keys(selectedItems).length === 0 || isSubmitting
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