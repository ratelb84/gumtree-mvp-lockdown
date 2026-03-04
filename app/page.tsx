'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState('')

  useEffect(() => {
    // Only run once on mount
    const saved = localStorage.getItem('mvp_user')
    if (saved) {
      setUser(saved)
      setIsLoggedIn(true)
    }
  }, [])

  if (!isLoggedIn) {
    return <LoginPage onLogin={(username) => {
      localStorage.setItem('mvp_user', username)
      setUser(username)
      setIsLoggedIn(true)
    }} />
  }

  return <Board user={user} onLogout={() => {
    localStorage.removeItem('mvp_user')
    setIsLoggedIn(false)
    setUser('')
  }} />
}

function LoginPage({ onLogin }: { onLogin: (user: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const users = { don: 'Don123!', pedro: 'Pedro123!', betine: 'Betine123!', damian: 'Damian123!' }
    if (users[username as keyof typeof users] === password) {
      onLogin(username)
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-lg w-80">
        <h1 className="text-2xl font-bold text-white mb-6">Gumtree MVP</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-slate-700 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-slate-700 text-white"
        />
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  )
}

function Board({ user, onLogout }: { user: string; onLogout: () => void }) {
  const [features, setFeatures] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('mvp_features')
    if (saved) {
      setFeatures(JSON.parse(saved))
    } else {
      setFeatures(DEFAULT_FEATURES)
      localStorage.setItem('mvp_features', JSON.stringify(DEFAULT_FEATURES))
    }
  }, [])

  const saveFeatures = (f: any[]) => {
    setFeatures(f)
    localStorage.setItem('mvp_features', JSON.stringify(f))
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Gumtree MVP Board</h1>
        <div className="flex gap-4">
          <span className="text-white">{user}</span>
          <button onClick={onLogout} className="bg-red-600 px-4 py-2 rounded text-white">Logout</button>
        </div>
      </header>

      <main className="p-6">
        <div className="grid grid-cols-4 gap-4">
          {['mvp', 'v1.1', 'v2', 'backburner'].map(col => (
            <div key={col} className="bg-slate-800 rounded-lg p-4">
              <h2 className="font-bold text-white mb-4 capitalize">{col}</h2>
              <div className="space-y-2">
                {features
                  .filter(f => f.column_name === col)
                  .map(f => (
                    <div key={f.id} className="bg-slate-700 p-3 rounded text-white text-sm">
                      <p className="font-semibold">{f.title}</p>
                      <p className="text-xs opacity-75 mt-1">{f.description}</p>
                      <button
                        onClick={() => saveFeatures(features.filter(x => x.id !== f.id))}
                        className="mt-2 text-xs bg-red-600 px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

const DEFAULT_FEATURES = [
  { id: 'mvp-1', title: 'Post Listing with Photos', description: 'Title, description, price, category, location, up to 6 photos, condition selector', category: 'listings', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-2', title: 'Edit/Delete/Pause Listings', description: 'Owner can modify or remove listings anytime', category: 'listings', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-3', title: 'Browse Listings Grid', description: 'Category browsing, pagination, responsive layout, grid view', category: 'listings', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-4', title: 'Listing Detail Page', description: 'Gallery, seller info, delivery options, Buy Now button, ratings', category: 'listings', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-5', title: 'Top 10 Categories', description: 'Cars, Property, Jobs, Electronics, Home, Services, Furniture, Fashion, Pets, Sports', category: 'listings', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-6', title: 'Full-Text Search', description: 'Search across title + description, instant results', category: 'search', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-7', title: 'Advanced Filters', description: 'Category, location (province/city), price range, condition', category: 'search', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-8', title: 'Sort & Browse', description: 'Sort by newest, price (asc/desc), relevance', category: 'search', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-9', title: 'Favourites & Saved Items', description: 'Heart icon, saved items page, wishlist notifications', category: 'search', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-10', title: 'User Registration & Auth', description: 'Email signup, login, password reset, remember me', category: 'auth', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-11', title: 'Seller Profile Management', description: 'Profile creation, business info, bank details for payouts, verification', category: 'auth', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-12', title: 'Buyer Account Dashboard', description: 'Order history, saved items, active purchases, account settings', category: 'auth', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-13', title: 'Seller Ratings & Reviews', description: 'Star ratings, review text, transaction history visibility', category: 'auth', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-14', title: 'Buy Now Checkout', description: 'One-click purchase, delivery selection, payment gateway', category: 'checkout', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-15', title: 'Payment Integration', description: 'Payfast/Peach integration, card payments in ZAR, split payments API', category: 'checkout', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-16', title: 'Escrow System', description: 'Secure payment hold until buyer confirms receipt, auto-release timer (7 days)', category: 'checkout', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-17', title: 'Courier Integration', description: 'Pargo, Paxi, The Courier Guy - automated label generation', category: 'delivery', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-18', title: 'Delivery Cost Calculator', description: 'Auto-calculate based on weight/size and destination, display at checkout', category: 'delivery', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-19', title: 'Order Tracking', description: 'Track status: Paid → Shipped → Delivered → Complete, courier links', category: 'delivery', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-20', title: 'Local Pickup Option', description: 'Allow face-to-face meetups, in-person payment, address sharing', category: 'delivery', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-21', title: 'Buyer-Seller Messaging', description: 'In-app chat for pre-purchase questions, real-time notifications', category: 'messaging', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-22', title: 'Message Notifications', description: 'Push/email notifications for new messages, badge counters', category: 'messaging', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-23', title: 'Seller Wallet', description: 'Track earnings from completed sales, balance display, transaction history', category: 'seller-tools', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-24', title: 'EFT Payouts', description: 'Request payout to linked bank account, settlement within 3-5 business days', category: 'seller-tools', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-25', title: 'Platform Fee Structure', description: 'Zero seller fees, 3-5% buyer protection fee, optional boost/promotion fees', category: 'seller-tools', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-26', title: 'Buyer Protection Policy', description: 'All purchases covered - item not as described = refund', category: 'buyer-protection', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-27', title: 'Dispute Resolution', description: 'Buyer raises issue → admin reviews → refund or release funds', category: 'buyer-protection', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-28', title: '"Item Received" Confirmation', description: 'Buyer confirms delivery, triggers seller payout, auto-release timer', category: 'buyer-protection', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-29', title: '"Make an Offer" Feature', description: 'Buyers can negotiate price, sellers counter-offer, drives engagement', category: 'other', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-30', title: 'Mobile-First Design', description: 'Responsive layout, optimized for mobile (~70% traffic), touch-friendly', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-31', title: 'Tech Stack Setup', description: 'Next.js 15, PostgreSQL, Prisma, Vercel deployment, CI/CD', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-32', title: 'Database Schema', description: 'Users, listings, orders, wallets, messages, disputes, ratings', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-33', title: 'Image Pipeline', description: 'S3/R2 upload, auto-resize, WebP conversion, CDN delivery', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() },
  { id: 'mvp-34', title: 'Admin Dashboard (Basic)', description: 'User management, dispute resolution, fee configuration', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() },
]
