'use client'

import { useState, useEffect } from 'react'

interface Feature {
  id: string
  title: string
  description: string
  column_name: string
}

export default function MVP() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newCol, setNewCol] = useState('mvp')

  // Load features on mount and poll for updates
  useEffect(() => {
    loadFeatures()
    const interval = setInterval(loadFeatures, 3000)
    return () => clearInterval(interval)
  }, [])

  const loadFeatures = async () => {
    try {
      const res = await fetch('/api/features')
      const data = await res.json()
      setFeatures(data)
    } catch (error) {
      console.error('Failed to load features', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteFeature = async (id: string) => {
    try {
      const res = await fetch('/api/features', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id }),
      })
      const data = await res.json()
      setFeatures(data)
    } catch (error) {
      console.error('Failed to delete feature', error)
    }
  }

  const moveFeature = async (id: string, column_name: string) => {
    try {
      const res = await fetch('/api/features', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'move', id, column_name }),
      })
      const data = await res.json()
      setFeatures(data)
    } catch (error) {
      console.error('Failed to move feature', error)
    }
  }

  const addFeature = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    try {
      const res = await fetch('/api/features', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add',
          feature: {
            title: newTitle,
            description: newDesc,
            column_name: newCol,
          },
        }),
      })
      const data = await res.json()
      setFeatures(data)
      setNewTitle('')
      setNewDesc('')
      setNewCol('mvp')
    } catch (error) {
      console.error('Failed to add feature', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 p-4 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white">🌳 Gumtree MVP Board</h1>
        <p className="text-gray-400 text-sm mt-1">Collaborative feature planning • {features.length} items</p>
      </header>

      <main className="p-6">
        {/* Add Feature Form */}
        <form onSubmit={addFeature} className="mb-6 bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Feature title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:outline-none"
            />
            <textarea
              placeholder="Description (optional)"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:outline-none"
              rows={2}
            />
            <div className="flex gap-2">
              <select
                value={newCol}
                onChange={(e) => setNewCol(e.target.value)}
                className="bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:outline-none"
              >
                <option value="mvp">MVP</option>
                <option value="v1.1">V1.1</option>
                <option value="v2">V2</option>
                <option value="backburner">Backburner</option>
              </select>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold ml-auto"
              >
                ➕ Add Feature
              </button>
            </div>
          </div>
        </form>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['mvp', 'v1.1', 'v2', 'backburner'].map((col) => (
            <div key={col} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <h2 className="font-bold text-white mb-4 text-lg capitalize">
                {col === 'mvp' && '🔴 MVP'}
                {col === 'v1.1' && '🟡 V1.1'}
                {col === 'v2' && '🟢 V2'}
                {col === 'backburner' && '⚫ Backburner'}
              </h2>
              <div className="space-y-2">
                {features.filter((f) => f.column_name === col).map((f) => (
                  <div key={f.id} className="bg-slate-700 p-3 rounded text-white text-sm border border-slate-600 hover:border-slate-500 transition">
                    <p className="font-semibold">{f.title}</p>
                    {f.description && <p className="text-xs opacity-75 mt-1">{f.description}</p>}
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {col !== 'mvp' && (
                        <button
                          onClick={() => moveFeature(f.id, 'mvp')}
                          className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                        >
                          ← MVP
                        </button>
                      )}
                      {col !== 'v1.1' && (
                        <button
                          onClick={() => moveFeature(f.id, 'v1.1')}
                          className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                        >
                          → V1.1
                        </button>
                      )}
                      {col !== 'v2' && (
                        <button
                          onClick={() => moveFeature(f.id, 'v2')}
                          className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                        >
                          → V2
                        </button>
                      )}
                      <button
                        onClick={() => deleteFeature(f.id)}
                        className="text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded ml-auto"
                      >
                        🗑️ Delete
                      </button>
                    </div>
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
