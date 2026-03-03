'use client'

import { useState, useEffect } from 'react'

type Person = 'product' | 'engineering' | 'business'
type Stage = 'login' | 'prep' | 'locked'

interface Sticky {
  id: string
  text: string
  person: Person
  timestamp: number
  stage: 'prep' | 'final'
}

const personColors: Record<Person, { bg: string; text: string; border: string; light: string }> = {
  product: { bg: 'bg-blue-600', text: 'text-blue-50', border: 'border-blue-400', light: 'bg-blue-500/10' },
  engineering: { bg: 'bg-orange-600', text: 'text-orange-50', border: 'border-orange-400', light: 'bg-orange-500/10' },
  business: { bg: 'bg-green-600', text: 'text-green-50', border: 'border-green-400', light: 'bg-green-500/10' },
}

const personLabels: Record<Person, string> = {
  product: '🎯 Head of Product',
  engineering: '⚙️ Head of Engineering',
  business: '💼 Head of Business',
}

export default function MVPLockdownPage() {
  const [stage, setStage] = useState<Stage>('login')
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null)
  const [stickies, setStickies] = useState<Sticky[]>([])
  const [input, setInput] = useState('')
  const [meeting_started, setMeetingStarted] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mvp_lockdown')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setStickies(data.stickies || [])
        setMeetingStarted(data.meeting_started || false)
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('mvp_lockdown', JSON.stringify({ stickies, meeting_started }))
  }, [stickies, meeting_started])

  const handleLogin = (person: Person) => {
    setCurrentPerson(person)
    setStage(meeting_started ? 'locked' : 'prep')
  }

  const handleAddSticky = () => {
    if (!input.trim() || !currentPerson) return
    const sticky: Sticky = {
      id: Math.random().toString(36).substr(2, 9),
      text: input.trim(),
      person: currentPerson,
      timestamp: Date.now(),
      stage: meeting_started ? 'final' : 'prep',
    }
    setStickies([...stickies, sticky])
    setInput('')
  }

  const handleRemoveSticky = (id: string) => {
    setStickies(stickies.filter(s => s.id !== id))
  }

  const handleStartMeeting = () => {
    setMeetingStarted(true)
    setStage('locked')
  }

  const handleLogout = () => {
    setCurrentPerson(null)
    setStage('login')
  }

  const getPersonStickies = (person: Person, stage: 'prep' | 'final') => {
    return stickies.filter(s => s.person === person && s.stage === stage)
  }

  const getAllFinalStickies = () => {
    return stickies.filter(s => s.stage === 'final')
  }

  // ============ LOGIN SCREEN ============
  if (stage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">🎯 MVP Lockdown Board</h1>
              <p className="text-gray-400">Today's MVP scope meeting · 2pm SAST</p>
            </div>

            <div className="space-y-3">
              {(Object.keys(personLabels) as Person[]).map(person => (
                <button
                  key={person}
                  onClick={() => handleLogin(person)}
                  className={`w-full py-6 px-4 rounded-lg border-2 transition ${personColors[person].border} ${personColors[person].light} hover:${personColors[person].bg} hover:${personColors[person].text} font-semibold text-lg`}
                >
                  {personLabels[person]}
                </button>
              ))}
            </div>

            <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-sm text-amber-300">
              💡 <strong>First time here?</strong> Click your role to enter the board. You can prep stickies before the meeting starts.
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ============ PREP STAGE ============
  if (stage === 'prep' && !meeting_started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">📋 MVP Prep Space</h1>
              <p className="text-sm text-gray-400">Add your items before the meeting starts</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleStartMeeting}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-sm"
              >
                🚀 Start Meeting
              </button>
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
          <div className="mb-8">
            <div className={`inline-block px-4 py-2 rounded-lg font-semibold ${personColors[currentPerson!].bg} ${personColors[currentPerson!].text}`}>
              {personLabels[currentPerson!]}
            </div>
          </div>

          <div className="mb-8 bg-white/5 border border-white/10 rounded-xl p-6">
            <label className="block text-sm font-semibold text-gray-300 mb-3">Add your MVP item:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleAddSticky()}
                placeholder="e.g., Escrow system must support multiple currencies"
                className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <button
                onClick={handleAddSticky}
                className={`px-6 py-3 rounded-lg font-semibold ${personColors[currentPerson!].bg} ${personColors[currentPerson!].text} hover:opacity-90 transition`}
              >
                ➕ Add
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">
              Your Items ({getPersonStickies(currentPerson!, 'prep').length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getPersonStickies(currentPerson!, 'prep').map(sticky => (
                <div
                  key={sticky.id}
                  className={`${personColors[sticky.person].light} border-l-4 ${personColors[sticky.person].border} rounded-lg p-4 relative group`}
                >
                  <p className="text-white text-sm leading-relaxed">{sticky.text}</p>
                  <button
                    onClick={() => handleRemoveSticky(sticky.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-red-500 text-white rounded px-2 py-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-lg font-bold text-gray-300 mb-4">Other Prep Items (Real-time)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(Object.keys(personLabels).filter(p => p !== currentPerson) as Person[]).map(person => (
                <div key={person}>
                  <h3 className={`font-semibold mb-3 ${personColors[person].text}`}>
                    {personLabels[person]} ({getPersonStickies(person, 'prep').length})
                  </h3>
                  <div className="space-y-2">
                    {getPersonStickies(person, 'prep').map(sticky => (
                      <div
                        key={sticky.id}
                        className={`${personColors[sticky.person].light} border-l-4 ${personColors[sticky.person].border} rounded p-3 text-sm text-gray-300`}
                      >
                        {sticky.text}
                      </div>
                    ))}
                    {getPersonStickies(person, 'prep').length === 0 && (
                      <div className="text-gray-500 text-sm italic">Waiting for items...</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // ============ LOCKED STAGE (MEETING IN PROGRESS) ============
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">🔒 MVP Locked In (Meeting In Progress)</h1>
            <p className="text-sm text-gray-400">3 hours to debate, decide, and finalize</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className={`inline-block px-4 py-2 rounded-lg font-semibold ${personColors[currentPerson!].bg} ${personColors[currentPerson!].text}`}>
            {personLabels[currentPerson!]}
          </div>
        </div>

        <div className="mb-8 bg-white/5 border border-white/10 rounded-xl p-6">
          <label className="block text-sm font-semibold text-gray-300 mb-3">Add debate items:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleAddSticky()}
              placeholder="e.g., Buyer protection fee should be 4.5%, not 5%"
              className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button
              onClick={handleAddSticky}
              className={`px-6 py-3 rounded-lg font-semibold ${personColors[currentPerson!].bg} ${personColors[currentPerson!].text} hover:opacity-90 transition`}
            >
              ➕ Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {(Object.keys(personLabels) as Person[]).map(person => (
            <div key={person}>
              <div className={`font-bold mb-4 pb-3 border-b-2 ${personColors[person].border} ${personColors[person].text} text-lg`}>
                {personLabels[person]}
              </div>
              <div className="space-y-3 min-h-96">
                {getAllFinalStickies()
                  .filter(s => s.person === person)
                  .map(sticky => (
                    <div
                      key={sticky.id}
                      className={`${personColors[sticky.person].light} border-l-4 ${personColors[sticky.person].border} rounded-lg p-4 group relative`}
                    >
                      <p className="text-white text-sm leading-relaxed mb-2">{sticky.text}</p>
                      <div className="text-xs text-gray-400">
                        {new Date(sticky.timestamp).toLocaleTimeString()}
                      </div>
                      {currentPerson === person && (
                        <button
                          onClick={() => handleRemoveSticky(sticky.id)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-red-500 text-white rounded px-2 py-1 text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                {getAllFinalStickies().filter(s => s.person === person).length === 0 && (
                  <div className="text-gray-500 text-sm italic py-8 text-center">Waiting for items...</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(personLabels) as Person[]).map(person => (
            <div key={person} className={`${personColors[person].light} border ${personColors[person].border} rounded-lg p-4 text-center`}>
              <div className={`text-3xl font-bold ${personColors[person].text}`}>
                {getAllFinalStickies().filter(s => s.person === person).length}
              </div>
              <div className="text-sm text-gray-300">{personLabels[person].split(' ')[1]} Items</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
