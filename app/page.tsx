'use client'

import { useState, useEffect } from 'react'

interface Feature {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  person: string;
  column_name: string;
  timestamp: number;
}

const MVP_FEATURES: Feature[] = [
  { id: 'mvp-1', title: 'Post Listing with Photos', description: 'Title, description, price, category, location, up to 6 photos, condition selector', category: 'listings', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-2', title: 'Edit/Delete/Pause Listings', description: 'Owner can modify or remove listings anytime', category: 'listings', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-3', title: 'Browse Listings Grid', description: 'Category browsing, pagination, responsive layout, grid view', category: 'listings', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-4', title: 'Listing Detail Page', description: 'Gallery, seller info, delivery options, Buy Now button, ratings', category: 'listings', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-5', title: 'Top 10 Categories', description: 'Cars, Property, Jobs, Electronics, Home, Services, Furniture, Fashion, Pets, Sports', category: 'listings', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-6', title: 'Full-Text Search', description: 'Search across title + description, instant results', category: 'search', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-7', title: 'Advanced Filters', description: 'Category, location (province/city), price range, condition', category: 'search', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-8', title: 'Sort & Browse', description: 'Sort by newest, price (asc/desc), relevance', category: 'search', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-9', title: 'Favourites & Saved Items', description: 'Heart icon, saved items page, wishlist notifications', category: 'search', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-10', title: 'User Registration & Auth', description: 'Email signup, login, password reset, remember me', category: 'auth', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-11', title: 'Seller Profile Management', description: 'Profile creation, business info, bank details for payouts, verification', category: 'auth', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-12', title: 'Buyer Account Dashboard', description: 'Order history, saved items, active purchases, account settings', category: 'auth', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-13', title: 'Seller Ratings & Reviews', description: 'Star ratings, review text, transaction history visibility', category: 'auth', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-14', title: 'Buy Now Checkout', description: 'One-click purchase, delivery selection, payment gateway', category: 'checkout', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-15', title: 'Payment Integration', description: 'Payfast/Peach integration, card payments in ZAR, split payments API', category: 'checkout', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-16', title: 'Escrow System', description: 'Secure payment hold until buyer confirms receipt, auto-release timer (7 days)', category: 'checkout', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-17', title: 'Courier Integration', description: 'Pargo, Paxi, The Courier Guy - automated label generation', category: 'delivery', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-18', title: 'Delivery Cost Calculator', description: 'Auto-calculate based on weight/size and destination, display at checkout', category: 'delivery', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-19', title: 'Order Tracking', description: 'Track status: Paid → Shipped → Delivered → Complete, courier links', category: 'delivery', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-20', title: 'Local Pickup Option', description: 'Allow face-to-face meetups, in-person payment, address sharing', category: 'delivery', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-21', title: 'Buyer-Seller Messaging', description: 'In-app chat for pre-purchase questions, real-time notifications', category: 'messaging', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-22', title: 'Message Notifications', description: 'Push/email notifications for new messages, badge counters', category: 'messaging', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-23', title: 'Seller Wallet', description: 'Track earnings from completed sales, balance display, transaction history', category: 'seller-tools', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-24', title: 'EFT Payouts', description: 'Request payout to linked bank account, settlement within 3-5 business days', category: 'seller-tools', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-25', title: 'Platform Fee Structure', description: 'Zero seller fees, 3-5% buyer protection fee, optional boost/promotion fees', category: 'seller-tools', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-26', title: 'Buyer Protection Policy', description: 'All purchases covered - item not as described = refund', category: 'buyer-protection', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-27', title: 'Dispute Resolution', description: 'Buyer raises issue → admin reviews → refund or release funds', category: 'buyer-protection', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-28', title: '"Item Received" Confirmation', description: 'Buyer confirms delivery, triggers seller payout, auto-release timer', category: 'buyer-protection', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-29', title: '"Make an Offer" Feature', description: 'Buyers can negotiate price, sellers counter-offer, drives engagement', category: 'other', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-30', title: 'Mobile-First Design', description: 'Responsive layout, optimized for mobile (~70% traffic), touch-friendly', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-31', title: 'Tech Stack Setup', description: 'Next.js 15, PostgreSQL, Prisma, Vercel deployment, CI/CD', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-32', title: 'Database Schema', description: 'Users, listings, orders, wallets, messages, disputes, ratings', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-33', title: 'Image Pipeline', description: 'S3/R2 upload, auto-resize, WebP conversion, CDN delivery', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
  { id: 'mvp-34', title: 'Admin Dashboard (Basic)', description: 'User management, dispute resolution, fee configuration', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
]

type Person = 'pedro' | 'betine' | 'damian' | 'don'
type Column = 'mvp' | 'v1.1' | 'v2' | 'backburner'
type Stage = 'login' | 'board'
type Category = 'listings' | 'search' | 'auth' | 'checkout' | 'delivery' | 'messaging' | 'seller-tools' | 'buyer-protection' | 'infrastructure' | 'subscription' | 'advertising' | 'other'

const USERS = {
  pedro: { name: 'Pedro', username: 'pedro', password: 'Pedro123!' },
  betine: { name: 'Betine', username: 'betine', password: 'Betine123!' },
  damian: { name: 'Damian', username: 'damian', password: 'Damian123!' },
  don: { name: 'Don', username: 'don', password: 'Don123!' },
}

const personColors: Record<Person, { bg: string; text: string; border: string; light: string }> = {
  pedro: { bg: 'bg-blue-600', text: 'text-blue-50', border: 'border-blue-400', light: 'bg-blue-500/10' },
  betine: { bg: 'bg-purple-600', text: 'text-purple-50', border: 'border-purple-400', light: 'bg-purple-500/10' },
  damian: { bg: 'bg-green-600', text: 'text-green-50', border: 'border-green-400', light: 'bg-green-500/10' },
  don: { bg: 'bg-orange-600', text: 'text-orange-50', border: 'border-orange-400', light: 'bg-orange-500/10' },
}

const columnLabels: Record<Column, string> = {
  mvp: '🔴 MVP',
  'v1.1': '🟡 V1.1 - Post MVP Launch',
  'v2': '🟢 V2 - Post V1.1 Launch',
  'backburner': '⚫ Backburner',
}

const columnColors: Record<Column, string> = {
  mvp: 'border-red-500/30 bg-red-500/5',
  'v1.1': 'border-yellow-500/30 bg-yellow-500/5',
  'v2': 'border-green-500/30 bg-green-500/5',
  'backburner': 'border-gray-500/30 bg-gray-500/5',
}

const categoryLabels: Record<Category, string> = {
  listings: '📦 Listings & Browsing',
  search: '🔍 Search & Discovery',
  auth: '🔐 Account Management',
  checkout: '🛒 Checkout & Payments',
  delivery: '🚚 Delivery & Logistics',
  messaging: '💬 Messaging & Support',
  'seller-tools': '💰 Seller Tools',
  'buyer-protection': '🛡️ Buyer Protection',
  infrastructure: '🏗️ Infrastructure',
  subscription: '💳 Subscription Revenue',
  advertising: '📢 Advertising',
  other: '📌 Other',
}

export default function MVPLockdownPage() {
  const [stage, setStage] = useState<Stage>('login')
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null)
  const [features, setFeatures] = useState<Feature[]>(MVP_FEATURES)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [input, setInput] = useState('')
  const [selectedColumn, setSelectedColumn] = useState<Column>('mvp')
  const [selectedCategory, setSelectedCategory] = useState<Category>('listings')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDesc, setEditDesc] = useState('')

  // One-time setup on mount
  useEffect(() => {
    // Check if already logged in
    const savedPerson = localStorage.getItem('gumtree_mvp_person')
    if (savedPerson) {
      setCurrentPerson(savedPerson as Person)
      setStage('board')
    }
    
    // Load features
    const stored = localStorage.getItem('gumtree_mvp_features')
    if (stored) {
      try {
        setFeatures(JSON.parse(stored))
      } catch (e) {
        setFeatures(MVP_FEATURES)
      }
    }
  }, [])

  const handleLogin = () => {
    setLoginError('')
    const user = Object.entries(USERS).find(
      ([_, u]) => u.username === username && u.password === password
    )
    
    if (!user) {
      setLoginError('Invalid username or password')
      return
    }
    
    const person = user[0] as Person
    localStorage.setItem('gumtree_mvp_person', person)
    if (rememberMe) {
      localStorage.setItem('gumtree_mvp_creds', JSON.stringify({ username, password }))
    }
    
    setCurrentPerson(person)
    setStage('board')
  }

  const handleLogout = () => {
    localStorage.removeItem('gumtree_mvp_person')
    setCurrentPerson(null)
    setStage('login')
    setUsername('')
    setPassword('')
  }

  const saveFeatures = (data: Feature[]) => {
    setFeatures(data)
    localStorage.setItem('gumtree_mvp_features', JSON.stringify(data))
  }

  const handleAddFeature = () => {
    if (!input.trim() || !currentPerson) return
    const newFeature: Feature = {
      id: `custom-${Date.now()}`,
      title: input.split('\n')[0],
      description: input.includes('\n') ? input.split('\n').slice(1).join('\n') : '',
      category: selectedCategory,
      person: currentPerson,
      column_name: selectedColumn,
      timestamp: Date.now(),
    }
    saveFeatures([...features, newFeature])
    setInput('')
  }

  const handleDeleteFeature = (id: string) => {
    saveFeatures(features.filter(f => f.id !== id))
  }

  const handleMoveFeature = (id: string, newColumn: Column) => {
    saveFeatures(features.map(f => f.id === id ? { ...f, column_name: newColumn } : f))
  }

  const handleSaveEdit = (id: string) => {
    saveFeatures(features.map(f => f.id === id ? { ...f, title: editTitle, description: editDesc } : f))
    setEditingId(null)
  }

  const getFeaturesInColumn = (column: Column) =>
    features.filter(f => f.column_name === column)

  if (stage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-black/50 border border-white/10 rounded-2xl p-8 backdrop-blur">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-1">GUMTREE</h1>
              <p className="text-lg font-semibold text-green-400 mb-3">MVP Board</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-black/30 cursor-pointer"
                />
                <label htmlFor="remember" className="text-sm text-gray-300">Remember me</label>
              </div>
              {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
              <button
                onClick={handleLogin}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Board view
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-white/10 bg-black/20">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-white">🌳 Gumtree MVP</h1>
          <div className="flex gap-2 items-center">
            <div className={`px-3 py-1.5 rounded text-sm font-semibold ${personColors[currentPerson!].bg} ${personColors[currentPerson!].text}`}>
              {USERS[currentPerson!].name}
            </div>
            <button onClick={handleLogout} className="px-3 py-1.5 bg-gray-700 text-white rounded text-sm hover:bg-gray-600">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-full px-4 py-6">
        <div className="mb-6 bg-white/5 border border-white/10 rounded-lg p-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new feature (title on first line, description on next)"
            className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-white placeholder-gray-500 mb-3"
            rows={3}
          />
          <div className="flex gap-2 flex-wrap">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as Category)} className="bg-black/30 border border-white/10 rounded px-3 py-2 text-white text-sm">
              {Object.entries(categoryLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <select value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value as Column)} className="bg-black/30 border border-white/10 rounded px-3 py-2 text-white text-sm">
              {Object.entries(columnLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <button onClick={handleAddFeature} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold ml-auto">
              ➕ Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(columnLabels) as Column[]).map(column => (
            <div key={column} className={`border rounded-lg p-4 ${columnColors[column]}`}>
              <h2 className="text-lg font-bold text-white mb-3">{columnLabels[column]}</h2>
              <div className="space-y-2">
                {getFeaturesInColumn(column).map(feature => (
                  <div key={feature.id} className={`border rounded p-2 text-white text-sm ${personColors[feature.person as Person].light}`}>
                    {editingId === feature.id ? (
                      <div className="space-y-1">
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded px-2 py-1 text-white text-xs"
                        />
                        <textarea
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded px-2 py-1 text-white text-xs"
                          rows={2}
                        />
                        <button
                          onClick={() => handleSaveEdit(feature.id)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="font-semibold">{feature.title}</p>
                        {feature.description && <p className="text-xs opacity-75">{feature.description}</p>}
                        <div className="flex gap-1 mt-2 flex-wrap">
                          <button
                            onClick={() => { setEditingId(feature.id); setEditTitle(feature.title); setEditDesc(feature.description || ''); }}
                            className="text-xs bg-blue-600/50 hover:bg-blue-600 px-2 py-0.5 rounded"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteFeature(feature.id)}
                            className="text-xs bg-red-600/50 hover:bg-red-600 px-2 py-0.5 rounded"
                          >
                            🗑️
                          </button>
                          {column !== 'mvp' && (
                            <button
                              onClick={() => handleMoveFeature(feature.id, 'mvp')}
                              className="text-xs bg-purple-600/50 hover:bg-purple-600 px-2 py-0.5 rounded ml-auto"
                            >
                              ←
                            </button>
                          )}
                          {column !== 'v1.1' && (
                            <button
                              onClick={() => handleMoveFeature(feature.id, 'v1.1')}
                              className="text-xs bg-purple-600/50 hover:bg-purple-600 px-2 py-0.5 rounded"
                            >
                              →
                            </button>
                          )}
                        </div>
                      </>
                    )}
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
