import { ArrowLeft } from 'lucide-react'
import { useLifeOSStore } from '../../store/lifeOsStore'
import { AttributesPanel } from '../Hero/AttributesPanel'
import { TokensPanel } from '../Stats/TokensPanel'

interface SanctuaryZoneProps {
  onBack: () => void
}

export function SanctuaryZone({ onBack }: SanctuaryZoneProps) {
  const { profile, todayStats } = useLifeOSStore()
  
  return (
    <div className="min-h-screen bg-cosmic-bg pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-cosmic-card border-b border-cosmic-border p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="btn-secondary py-2 px-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🧘</span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Sanctuary Zone
              </h1>
            </div>
            <p className="text-xs text-gray-400">Odpoczynek i regeneracja</p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Hero Stats */}
        <div className="card p-4">
          <div className="text-center mb-4">
            <div className="text-6xl mb-2">🧙‍♂️</div>
            <h2 className="text-2xl font-bold text-glow-purple">{profile?.heroName}</h2>
            <p className="text-sm text-gray-400">
              Poziom {profile?.level} {profile?.heroClass}
            </p>
          </div>
          
          {/* Streak */}
          <div className="bg-cosmic-card/50 rounded-lg p-3 text-center">
            <div className="text-3xl font-bold text-amber-400">
              🔥 {profile?.masterStreak || 0}
            </div>
            <p className="text-xs text-gray-500">dni streaku</p>
          </div>
        </div>
        
        {/* Attributes */}
        <AttributesPanel />
        
        {/* Rest Stats */}
        <div className="card p-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            💤 Odpoczynek
          </h3>
          <div className="space-y-3">
            <div className="bg-cosmic-card/50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Sen dziś</span>
                <span className="text-xl font-bold text-purple-400">
                  {todayStats?.sleepHours || 0}h
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                cel: {profile?.sleepGoal}h
              </div>
            </div>
            
            <div className="bg-cosmic-card/50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Medytacja</span>
                <span className="text-xl font-bold text-indigo-400">
                  {todayStats?.meditationMinutes || 0} min
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tokens */}
        <TokensPanel />
      </div>
    </div>
  )
}
