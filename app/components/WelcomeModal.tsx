'use client';

import { useState } from 'react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string }) => void;
}

export default function WelcomeModal({ isOpen, onClose, onSubmit }: WelcomeModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-display text-blush-600 mb-4">Welcome to Our Midsommar Celebration!</h2>
        <p className="text-gray-600 mb-6">
          Please share your details so we can keep you updated about the party.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
          <div className="mb-6">
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
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Skip
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blush-500 text-white rounded-lg hover:bg-blush-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 