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
  const [features, setFeatures] = useState<Feature[]>([])
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
  const [loading, setLoading] = useState(false)

  // Load features from Supabase and poll for updates
  useEffect(() => {
    loadFeatures()
    
    // Poll for changes every 2 seconds for real-time feel
    const interval = setInterval(() => {
      loadFeatures()
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  // Load saved credentials
  useEffect(() => {
    const savedCreds = localStorage.getItem('gumtree_mvp_creds')
    if (savedCreds) {
      try {
        const creds = JSON.parse(savedCreds)
        setUsername(creds.username)
        setPassword(creds.password)
        setRememberMe(true)
      } catch (e) {
        // Ignore
      }
    }
  }, [])

  function loadFeatures() {
    setLoading(true)
    const stored = localStorage.getItem('gumtree_mvp_features')
    const data = stored ? JSON.parse(stored) : MVP_FEATURES
    setFeatures(data)
    setLoading(false)
  }

  function saveFeatures(data: Feature[]) {
    localStorage.setItem('gumtree_mvp_features', JSON.stringify(data))
  }

  const handleLogin = () => {
    setLoginError('')
    
    const user = Object.entries(USERS).find(
      ([_, u]) => u.username === username && u.password === password
    )
    
    if (!user) {
      setLoginError('Invalid username or password')
      return
    }
    
    if (rememberMe) {
      localStorage.setItem('gumtree_mvp_creds', JSON.stringify({ username, password }))
    } else {
      localStorage.removeItem('gumtree_mvp_creds')
    }
    
    setCurrentPerson(user[0] as Person)
    setStage('board')
  }

  const handleAddFeature = () => {
    if (!input.trim() || !currentPerson) return
    
    setLoading(true)
    const newFeature: Feature = {
      id: `custom-${Date.now()}`,
      title: input.split('\n')[0],
      description: input.includes('\n') ? input.split('\n').slice(1).join('\n') : '',
      category: selectedCategory,
      person: currentPerson,
      column_name: selectedColumn,
      timestamp: Date.now(),
    }
    const updated = [...features, newFeature]
    saveFeatures(updated)
    setFeatures(updated)
    setInput('')
    setLoading(false)
  }

  const handleRemoveFeature = (id: string) => {
    setLoading(true)
    const updated = features.filter(f => f.id !== id)
    saveFeatures(updated)
    setFeatures(updated)
    setLoading(false)
  }

  const handleMoveFeature = (id: string, newColumn: Column) => {
    setLoading(true)
    const updated = features.map(f => f.id === id ? { ...f, column_name: newColumn } : f)
    saveFeatures(updated)
    setFeatures(updated)
    setLoading(false)
  }

  const handleStartEdit = (feature: Feature) => {
    setEditingId(feature.id)
    setEditTitle(feature.title)
    setEditDesc(feature.description || '')
  }

  const handleSaveEdit = (id: string) => {
    setLoading(true)
    const updated = features.map(f => f.id === id ? { ...f, title: editTitle, description: editDesc } : f)
    saveFeatures(updated)
    setFeatures(updated)
    setEditingId(null)
    setLoading(false)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  const handleLogout = () => {
    setCurrentPerson(null)
    setStage('login')
    if (!rememberMe) {
      setPassword('')
    }
    setLoginError('')
  }

  const getFeaturesInColumn = (column: Column) => {
    return features.filter(f => f.column_name === column)
  }

  // LOGIN SCREEN
  if (stage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-black/50 border border-white/10 rounded-2xl p-8 backdrop-blur">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center mb-4">
                <img src="/gumtree-logo.jpg" alt="Gumtree" className="w-16 h-16 object-contain" style={{mixBlendMode: 'screen'}} />
              </div>
              <h1 className="text-3xl font-bold text-white mb-1">GUMTREE</h1>
              <p className="text-lg font-semibold text-green-400 mb-3">MVP Board</p>
              <p className="text-gray-400 text-sm">Collaborative feature planning · 4 phases</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                  onKeyPress={e => e.key === 'Enter' && handleLogin()}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                  onKeyPress={e => e.key === 'Enter' && handleLogin()}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-black/30 cursor-pointer"
                />
                <label htmlFor="remember" className="text-sm text-gray-300 cursor-pointer">
                  Remember me
                </label>
              </div>

              {loginError && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-red-300">
                  {loginError}
                </div>
              )}

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // BOARD SCREEN
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="max-w-full mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/gumtree-logo.jpg" alt="Gumtree" className="w-8 h-8 object-contain flex-shrink-0" style={{mixBlendMode: 'screen'}} />
            <div>
              <h1 className="text-xl font-bold text-white">GUMTREE MVP</h1>
              <p className="text-xs text-gray-500">MVP • V1.1 • V2 • Backburner • ({features.length} features)</p>
            </div>
          </div>
          <div className="flex gap-2 items-center ml-auto">
            <div className={`px-3 py-1.5 rounded text-sm font-semibold ${personColors[currentPerson!].bg} ${personColors[currentPerson!].text}`}>
              {USERS[currentPerson!].name}
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-gray-700 text-white rounded text-sm hover:bg-gray-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-full px-4 py-6">
        {/* Add Feature Input */}
        <div className="mb-6 bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleAddFeature()}
              placeholder="Add new feature..."
              disabled={loading}
              className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/30 disabled:opacity-50"
            />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value as Category)}
              disabled={loading}
              className="bg-black/40 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white/30 disabled:opacity-50"
            >
              {(Object.keys(categoryLabels) as Category[]).map(cat => (
                <option key={cat} value={cat}>{categoryLabels[cat]}</option>
              ))}
            </select>
            <select
              value={selectedColumn}
              onChange={e => setSelectedColumn(e.target.value as Column)}
              disabled={loading}
              className="bg-black/40 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white/30 disabled:opacity-50"
            >
              {(Object.keys(columnLabels) as Column[]).map(col => (
                <option key={col} value={col}>{columnLabels[col]}</option>
              ))}
            </select>
            <button
              onClick={handleAddFeature}
              disabled={loading}
              className={`px-4 py-2 rounded font-semibold text-sm ${personColors[currentPerson!].bg} ${personColors[currentPerson!].text} hover:opacity-90 transition disabled:opacity-50`}
            >
              {loading ? '...' : 'Add'}
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(columnLabels) as Column[]).map(column => (
            <div key={column} className={`border rounded-lg overflow-hidden flex flex-col ${columnColors[column]}`}>
              {/* Column Header */}
              <div className="px-4 py-3 border-b border-white/10 bg-black/40 flex-shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  {column === 'mvp' && <span className="text-lg">🔴</span>}
                  {column === 'v1.1' && <span className="text-lg">🟡</span>}
                  {column === 'v2' && <span className="text-lg">🟢</span>}
                  {column === 'backburner' && <span className="text-lg">⚫</span>}
                  <span className="text-sm font-bold px-3 py-1 rounded-md bg-white/10 text-white">
                    {column === 'mvp' ? 'MVP' : column === 'v1.1' ? 'V1.1' : column === 'v2' ? 'V2' : 'Backburner'}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{getFeaturesInColumn(column).length} items</p>
              </div>

              {/* Features */}
              <div className="flex-1 overflow-y-auto p-3 min-h-96">
                {(Object.keys(categoryLabels) as Category[]).map(cat => {
                  const catFeatures = getFeaturesInColumn(column).filter(f => f.category === cat)
                  if (catFeatures.length === 0) return null
                  
                  return (
                    <div key={cat} className="mb-4">
                      <div className="text-xs font-bold text-gray-300 mb-2 px-1">{categoryLabels[cat]}</div>
                      <div className="space-y-2">
                        {catFeatures.map(feature => (
                          <div key={feature.id}>
                            {editingId === feature.id && currentPerson === feature.person ? (
                              // EDIT MODE
                              <div className={`${personColors[feature.person as Person].light} border border-white/20 rounded p-2 space-y-1`}>
                                <input
                                  type="text"
                                  value={editTitle}
                                  onChange={e => setEditTitle(e.target.value)}
                                  disabled={loading}
                                  className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none disabled:opacity-50"
                                />
                                <textarea
                                  value={editDesc}
                                  onChange={e => setEditDesc(e.target.value)}
                                  rows={2}
                                  disabled={loading}
                                  className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none resize-none disabled:opacity-50"
                                />
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => handleSaveEdit(feature.id)}
                                    disabled={loading}
                                    className="text-xs px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition disabled:opacity-50"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    disabled={loading}
                                    className="text-xs px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded transition disabled:opacity-50"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              // VIEW MODE
                              <div
                                className={`${personColors[feature.person as Person].light} border border-white/10 rounded p-2.5 group relative hover:border-white/20 transition text-xs`}
                              >
                                {/* Person Badge */}
                                <div className={`inline-block mb-1 px-1.5 py-0.5 rounded text-xs font-semibold ${personColors[feature.person as Person].bg} ${personColors[feature.person as Person].text}`}>
                                  {USERS[feature.person as Person].name}
                                </div>

                                {/* Title */}
                                <h3 className="text-white font-semibold text-xs leading-tight mb-1">{feature.title}</h3>

                                {/* Description */}
                                {feature.description && (
                                  <p className="text-gray-400 text-xs leading-tight mb-1 line-clamp-2">{feature.description}</p>
                                )}

                                {/* Time */}
                                <div className="text-xs text-gray-500 mb-1">
                                  {new Date(feature.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>

                                {/* Move Buttons */}
                                <div className="flex gap-1 flex-wrap mt-2">
                                  {(Object.keys(columnLabels) as Column[]).map(col => {
                                    const colLabel = col === 'mvp' ? 'MVP' : col === 'v1.1' ? 'V1.1' : col === 'v2' ? 'V2' : 'Backburner'
                                    const bgColor = col === 'mvp' ? 'bg-red-500/60' : col === 'v1.1' ? 'bg-yellow-500/60' : col === 'v2' ? 'bg-green-500/60' : 'bg-gray-500/60'
                                    
                                    return col !== column && (
                                      <button
                                        key={col}
                                        onClick={() => handleMoveFeature(feature.id, col)}
                                        disabled={loading}
                                        title={columnLabels[col]}
                                        className={`${bgColor} text-white text-xs px-2 py-1 rounded-full font-semibold hover:opacity-80 transition disabled:opacity-50`}
                                      >
                                        {colLabel}
                                      </button>
                                    )
                                  })}
                                </div>

                                {/* Edit & Delete Buttons */}
                                {currentPerson === feature.person && (
                                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition flex gap-1">
                                    <button
                                      onClick={() => handleStartEdit(feature)}
                                      disabled={loading}
                                      className="bg-blue-500/80 hover:bg-blue-600 text-white rounded px-1 py-0.5 text-xs disabled:opacity-50"
                                    >
                                      ✏️
                                    </button>
                                    <button
                                      onClick={() => handleRemoveFeature(feature.id)}
                                      disabled={loading}
                                      className="bg-red-500/80 hover:bg-red-600 text-white rounded px-1 py-0.5 text-xs disabled:opacity-50"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
                {getFeaturesInColumn(column).length === 0 && (
                  <div className="text-gray-600 text-xs italic py-4 text-center">No items</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
