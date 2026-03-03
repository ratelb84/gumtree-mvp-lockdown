'use client'

import { useState, useEffect } from 'react'

type Person = 'pedro' | 'betine' | 'damian' | 'don'
type Column = 'mvp' | 'v1.1' | 'v2'
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
}

const columnColors: Record<Column, string> = {
  mvp: 'border-red-500/30 bg-red-500/5',
  'v1.1': 'border-yellow-500/30 bg-yellow-500/5',
  'v2': 'border-green-500/30 bg-green-500/5',
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

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gumtree_mvp_features')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setFeatures(data.features || [])
      } catch (e) {
        // Ignore parse errors
      }
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
              <h1 className="text-3xl font-bold text-white mb-2">🎯 Gumtree MVP Board</h1>
              <p className="text-gray-400 text-sm">Collaborative feature planning</p>
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

            <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300">
              <strong className="block mb-2">Demo Credentials:</strong>
              <div className="space-y-1 font-mono text-xs">
                <div>Pedro: pedro / Pedro123!</div>
                <div>Betine: betine / Betine123!</div>
                <div>Damian: damian / Damian123!</div>
                <div>Don: don / Don123!</div>
              </div>
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
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">🎯 Gumtree MVP Kanban Board</h1>
              <p className="text-sm text-gray-400">Real-time feature planning · 3 release phases</p>
            </div>
            <div className="flex gap-3 items-center">
              <div className={`px-4 py-2 rounded-lg font-semibold ${personColors[currentPerson!].bg} ${personColors[currentPerson!].text}`}>
                {USERS[currentPerson!].name}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Add Feature Input */}
          <div className="mb-8 bg-white/5 border border-white/10 rounded-xl p-6">
            <label className="block text-sm font-semibold text-gray-300 mb-3">Add new feature:</label>
            <div className="space-y-3">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Feature title&#10;Optional: Add description (one per line)"
                rows={3}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
              />
              <div className="flex gap-2">
                <select
                  value={selectedColumn}
                  onChange={e => setSelectedColumn(e.target.value as Column)}
                  className="bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  {(Object.keys(columnLabels) as Column[]).map(col => (
                    <option key={col} value={col}>{columnLabels[col]}</option>
                  ))}
                </select>
                <button
                  onClick={handleAddFeature}
                  className={`px-6 py-2 rounded-lg font-semibold ${personColors[currentPerson!].bg} ${personColors[currentPerson!].text} hover:opacity-90 transition`}
                >
                  ➕ Add Feature
                </button>
              </div>
            </div>
          </div>

          {/* Kanban Board - 3 Release Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {(Object.keys(columnLabels) as Column[]).map(column => (
              <div key={column} className={`border rounded-xl overflow-hidden ${columnColors[column]}`}>
                {/* Column Header */}
                <div className="px-6 py-4 border-b border-white/10 bg-black/30">
                  <h2 className="text-lg font-bold text-white">{columnLabels[column]}</h2>
                  <p className="text-sm text-gray-400">{getFeaturesInColumn(column).length} items</p>
                </div>

                {/* Features */}
                <div className="p-4 space-y-3 min-h-96">
                  {getFeaturesInColumn(column).map(feature => (
                    <div
                      key={feature.id}
                      className={`${personColors[feature.person].light} border border-white/10 rounded-lg p-4 group relative hover:bg-white/10 transition`}
                    >
                      {/* Person Badge */}
                      <div className={`inline-block mb-2 px-2 py-1 rounded text-xs font-semibold ${personColors[feature.person].bg} ${personColors[feature.person].text}`}>
                        {USERS[feature.person].name}
                      </div>

                      <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
                      {feature.description && (
                        <p className="text-gray-300 text-xs mb-2">{feature.description}</p>
                      )}

                      <div className="text-xs text-gray-400 mb-3">
                        {new Date(feature.timestamp).toLocaleTimeString()}
                      </div>

                      {/* Move & Delete Buttons */}
                      <div className="flex gap-1 flex-wrap">
                        {(Object.keys(columnLabels) as Column[]).map(col => 
                          col !== column && (
                            <button
                              key={col}
                              onClick={() => handleMoveFeature(feature.id, col)}
                              className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 text-gray-300 rounded transition"
                            >
                              → {columnLabels[col].split(' ')[1]}
                            </button>
                          )
                        )}
                      </div>

                      {currentPerson === feature.person && (
                        <button
                          onClick={() => handleRemoveFeature(feature.id)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-red-500/80 hover:bg-red-600 text-white rounded px-2 py-1 text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  {getFeaturesInColumn(column).length === 0 && (
                    <div className="text-gray-500 text-sm italic py-8 text-center">No features yet...</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary by Person */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-4">📊 Contributions by Person</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(Object.keys(USERS) as Person[]).map(person => (
                <div key={person} className={`${personColors[person].light} border ${personColors[person].border} rounded-lg p-4`}>
                  <div className={`text-3xl font-bold ${personColors[person].text} mb-1`}>
                    {getPersonFeatures(person).length}
                  </div>
                  <div className="text-sm text-gray-300">{USERS[person].name}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    {getPersonFeatures(person).map(f => columnLabels[f.column]).join(', ') || 'No items'}
                  </div>
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
