'use client'

import { useState, useEffect } from 'react'

type Person = 'pedro' | 'betine' | 'damian' | 'don'
type Column = 'mvp' | 'v1.1' | 'v2' | 'backburner'
type Stage = 'login' | 'board'

interface Feature {
  id: string
  title: string
  description: string
  person: Person
  column: Column
  timestamp: number
}

interface User {
  name: string
  username: string
  password: string
}

const USERS: Record<Person, User> = {
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
  'v1.1': '🟡 V1.1 Post Launch',
  'v2': '🟢 V2 Future',
  'backburner': '⚫ Backburner',
}

const columnColors: Record<Column, string> = {
  mvp: 'border-red-500/30 bg-red-500/5',
  'v1.1': 'border-yellow-500/30 bg-yellow-500/5',
  'v2': 'border-green-500/30 bg-green-500/5',
  'backburner': 'border-gray-500/30 bg-gray-500/5',
}

export default function MVPLockdownPage() {
  const [stage, setStage] = useState<Stage>('login')
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null)
  const [features, setFeatures] = useState<Feature[]>([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [input, setInput] = useState('')
  const [selectedColumn, setSelectedColumn] = useState<Column>('mvp')

  // Default MVP features (B2C Scope + Account Management)
  const DEFAULT_FEATURES: Feature[] = [
    {
      id: 'mvp-1',
      title: 'User Registration & Authentication',
      description: 'Email signup, login, password reset, OAuth support',
      person: 'don',
      column: 'mvp',
      timestamp: Date.now() - 3600000,
    },
    {
      id: 'mvp-2',
      title: 'Seller Profile Management',
      description: 'Profile creation, business info, bank details, payout settings',
      person: 'don',
      column: 'mvp',
      timestamp: Date.now() - 3600000,
    },
    {
      id: 'mvp-3',
      title: 'Buyer Account Dashboard',
      description: 'Order history, saved items, purchases, account settings',
      person: 'don',
      column: 'mvp',
      timestamp: Date.now() - 3600000,
    },
    {
      id: 'mvp-4',
      title: 'Product Listing Management',
      description: 'Create, edit, delete listings with photos, categories, pricing',
      person: 'don',
      column: 'mvp',
      timestamp: Date.now() - 3600000,
    },
    {
      id: 'mvp-5',
      title: 'Search & Discovery',
      description: 'Full-text search, filters (category, price, location), sorting',
      person: 'don',
      column: 'mvp',
      timestamp: Date.now() - 3600000,
    },
    {
      id: 'mvp-6',
      title: 'Secure Checkout & Payment',
      description: 'Card payments, escrow system, payment confirmation',
      person: 'don',
      column: 'mvp',
      timestamp: Date.now() - 3600000,
    },
    {
      id: 'mvp-7',
      title: 'Order Tracking & Delivery',
      description: 'Courier integration, tracking links, delivery confirmation',
      person: 'don',
      column: 'mvp',
      timestamp: Date.now() - 3600000,
    },
    {
      id: 'mvp-8',
      title: 'Seller Wallet & Payouts',
      description: 'Earnings tracking, EFT payouts, transaction history',
      person: 'don',
      column: 'mvp',
      timestamp: Date.now() - 3600000,
    },
    {
      id: 'mvp-9',
      title: 'Messaging System',
      description: 'Buyer-seller in-app messaging for pre-purchase questions',
      person: 'don',
      column: 'mvp',
      timestamp: Date.now() - 3600000,
    },
    {
      id: 'mvp-10',
      title: 'Buyer Protection & Disputes',
      description: 'Dispute resolution, refunds, item protection policy',
      person: 'don',
      column: 'mvp',
      timestamp: Date.now() - 3600000,
    },
  ]

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gumtree_mvp_features')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setFeatures(data.features || DEFAULT_FEATURES)
      } catch (e) {
        setFeatures(DEFAULT_FEATURES)
      }
    } else {
      setFeatures(DEFAULT_FEATURES)
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('gumtree_mvp_features', JSON.stringify({ features }))
  }, [features])

  const handleLogin = () => {
    setLoginError('')
    
    // Find matching user
    const user = Object.entries(USERS).find(
      ([_, u]) => u.username === username && u.password === password
    )
    
    if (!user) {
      setLoginError('Invalid username or password')
      return
    }
    
    setCurrentPerson(user[0] as Person)
    setStage('board')
    setUsername('')
    setPassword('')
  }

  const handleAddFeature = () => {
    if (!input.trim() || !currentPerson) return
    const feature: Feature = {
      id: Math.random().toString(36).substr(2, 9),
      title: input.split('\n')[0],
      description: input.includes('\n') ? input.split('\n').slice(1).join('\n') : '',
      person: currentPerson,
      column: selectedColumn,
      timestamp: Date.now(),
    }
    setFeatures([...features, feature])
    setInput('')
  }

  const handleMoveFeature = (id: string, newColumn: Column) => {
    setFeatures(features.map(f => f.id === id ? { ...f, column: newColumn } : f))
  }

  const handleRemoveFeature = (id: string) => {
    setFeatures(features.filter(f => f.id !== id))
  }

  const handleLogout = () => {
    setCurrentPerson(null)
    setStage('login')
    setUsername('')
    setPassword('')
    setLoginError('')
  }

  const getFeaturesInColumn = (column: Column) => {
    return features.filter(f => f.column === column)
  }

  const getPersonFeatures = (person: Person) => {
    return features.filter(f => f.person === person)
  }

  // ============ LOGIN SCREEN ============
  if (stage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-black/50 border border-white/10 rounded-2xl p-8 backdrop-blur">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
                <img src="/gumtree-logo.jpg" alt="Gumtree" className="w-full h-full object-contain" />
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
                  placeholder="e.g., pedro"
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

              {loginError && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-red-300">
                  {loginError}
                </div>
              )}

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

  // ============ KANBAN BOARD ============
  if (stage === 'board') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur">
          <div className="max-w-full mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex-shrink-0">
                <img src="/gumtree-logo.jpg" alt="Gumtree" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">GUMTREE MVP</h1>
                <p className="text-xs text-gray-500">MVP • V1.1 • V2 • Backburner</p>
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
          {/* Add Feature Input - Compact */}
          <div className="mb-6 bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleAddFeature()}
                placeholder="Add new feature..."
                className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/30"
              />
              <select
                value={selectedColumn}
                onChange={e => setSelectedColumn(e.target.value as Column)}
                className="bg-black/40 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white/30"
              >
                {(Object.keys(columnLabels) as Column[]).map(col => (
                  <option key={col} value={col}>{columnLabels[col]}</option>
                ))}
              </select>
              <button
                onClick={handleAddFeature}
                className={`px-4 py-2 rounded font-semibold text-sm ${personColors[currentPerson!].bg} ${personColors[currentPerson!].text} hover:opacity-90 transition`}
              >
                Add
              </button>
            </div>
          </div>

          {/* Kanban Board - 4 Columns - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(Object.keys(columnLabels) as Column[]).map(column => (
              <div key={column} className={`border rounded-lg overflow-hidden flex flex-col ${columnColors[column]}`}>
                {/* Column Header - Compact */}
                <div className="px-4 py-3 border-b border-white/10 bg-black/40 flex-shrink-0">
                  <h2 className="text-base font-bold text-white">{columnLabels[column]}</h2>
                  <p className="text-xs text-gray-400">{getFeaturesInColumn(column).length} items</p>
                </div>

                {/* Features - Scrollable */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-96">
                  {getFeaturesInColumn(column).map(feature => (
                    <div
                      key={feature.id}
                      className={`${personColors[feature.person].light} border border-white/10 rounded p-2.5 group relative hover:border-white/20 transition text-xs`}
                    >
                      {/* Person Badge - Compact */}
                      <div className={`inline-block mb-1 px-1.5 py-0.5 rounded text-xs font-semibold ${personColors[feature.person].bg} ${personColors[feature.person].text}`}>
                        {USERS[feature.person].name}
                      </div>

                      {/* Title - Tight */}
                      <h3 className="text-white font-semibold text-xs leading-tight mb-1">{feature.title}</h3>

                      {/* Description - Optional, collapsed */}
                      {feature.description && (
                        <p className="text-gray-400 text-xs leading-tight mb-1 line-clamp-2">{feature.description}</p>
                      )}

                      {/* Time - Minimal */}
                      <div className="text-xs text-gray-500 mb-1">
                        {new Date(feature.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>

                      {/* Move Buttons - Compact */}
                      <div className="flex gap-0.5 flex-wrap">
                        {(Object.keys(columnLabels) as Column[]).map(col => 
                          col !== column && (
                            <button
                              key={col}
                              onClick={() => handleMoveFeature(feature.id, col)}
                              title={columnLabels[col]}
                              className="text-xs px-1.5 py-0.5 bg-white/10 hover:bg-white/20 text-gray-300 rounded transition"
                            >
                              {columnLabels[col].split(' ')[0]}
                            </button>
                          )
                        )}
                      </div>

                      {/* Delete Button */}
                      {currentPerson === feature.person && (
                        <button
                          onClick={() => handleRemoveFeature(feature.id)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition bg-red-500/80 hover:bg-red-600 text-white rounded px-1 py-0.5 text-xs leading-none"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  {getFeaturesInColumn(column).length === 0 && (
                    <div className="text-gray-600 text-xs italic py-4 text-center">No items</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary by Person - Compact */}
          <div className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(Object.keys(USERS) as Person[]).map(person => (
                <div key={person} className={`${personColors[person].light} border ${personColors[person].border} rounded-lg p-3 text-center`}>
                  <div className={`text-2xl font-bold ${personColors[person].text}`}>
                    {getPersonFeatures(person).length}
                  </div>
                  <div className="text-xs text-gray-300">{USERS[person].name}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return null
}
