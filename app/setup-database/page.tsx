'use client';

import { useState } from 'react';

export default function SetupDatabasePage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');

  async function setupDatabase() {
    setLoading(true);
    setStatus('Initializing database setup...');
    setError('');

    try {
      const response = await fetch('/api/setup-database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Setup failed');
      }

      setStatus(data.message || 'Database setup completed successfully!');
      console.log('Setup result:', data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('Setup error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-black/50 border border-white/10 rounded-2xl p-8 backdrop-blur">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">🌱 Database Setup</h1>
            <p className="text-gray-400">
              Initialize Supabase and seed MVP features
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={setupDatabase}
              disabled={loading}
              className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Setting up...' : '✨ Create Table & Seed Features'}
            </button>

            {status && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-sm">{status}</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {!loading && status && !error && (
              <p className="text-center text-gray-400 text-sm">
                ✅ Ready! Go to{' '}
                <a href="/" className="text-blue-400 hover:underline">
                  MVP Board
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
