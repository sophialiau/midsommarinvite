'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import WelcomeModal from './components/WelcomeModal';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check if user info exists in localStorage
    const savedUserInfo = localStorage.getItem('userInfo');
    if (!savedUserInfo) {
      setShowModal(true);
    } else {
      setUserInfo(JSON.parse(savedUserInfo));
    }
  }, []);

  const handleModalSubmit = (data: { name: string; email: string }) => {
    setUserInfo(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    setShowModal(false);
  };

  return (
    <main className="min-h-screen p-6 md:p-12 bg-[url('/floral-bg.png')] bg-cover bg-fixed">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-display text-blush-600 mb-4 drop-shadow-md">
          Midsommar Dinner Party
        </h1>
        <p className="text-lg md:text-xl text-blush-800 italic mb-8">
          Another dinner party @ S&S's
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <Link href="/rsvp" className="btn-primary">RSVP</Link>
          <Link href="/vote" className="btn-secondary">Vote</Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <h2 className="text-2xl font-display text-blush-600 mb-2">🌿 When</h2>
            <p>June 20th or 21st, 2024<br />(To be chosen by vote)</p>
          </div>
          <div className="card">
            <h2 className="text-2xl font-display text-blush-600 mb-2">🌼 What to Bring</h2>
            <p>Flowers & something to sip<br />Soph will take care of the rest</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="card">
            <h3 className="text-xl font-display text-blush-500 mb-2">🌸 RSVP</h3>
            <p>Will you join us?</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-display text-blush-500 mb-2">🗳️ Vote</h3>
            <p>Help choose the perfect evening</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-display text-blush-500 mb-2">💐 Bring Something</h3>
            <p>Sign up for blooms & bubbles</p>
          </div>
        </div>
      </div>

      <WelcomeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleModalSubmit}
      />
    </main>
  );
}
