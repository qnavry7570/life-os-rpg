import { ArrowLeft, Plus } from 'lucide-react'
import { useState } from 'react'
import { useLifeOSStore } from '../../store/lifeOsStore'
import { CalorieEngine } from '../Calories/CalorieEngine'

interface HealthZoneProps {
  onBack: () => void
}

export function HealthZone({ onBack }: HealthZoneProps) {
  const { todayStats, profile, updateTodayStats } = useLifeOSStore()
  const [showStepsDialog, setShowStepsDialog] = useState(false)
  const [newSteps, setNewSteps] = useState('')
  
  const handleAddSteps = async () => {
    const steps = parseInt(newSteps)
    if (isNaN(steps) || steps <= 0 || !todayStats) return
    
    await updateTodayStats({
      steps: todayStats.steps + steps,
    })
    setNewSteps('')
    setShowStepsDialog(false)
  }
  
  const stepsPercent = profile ? Math.min(100, (todayStats?.steps || 0) / profile.stepGoal * 100) : 0
  
  return (
    <div className="min-h-screen bg-cosmic-bg">
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
              <span className="text-3xl">❤️</span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Health Zone
              </h1>
            </div>
            <p className="text-xs text-gray-400">Zdrowie i ruch</p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Steps Card */}
        <div className="card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              🚶 Kroki Dziś
            </h2>
            <button
              onClick={() => setShowStepsDialog(!showStepsDialog)}
              className="btn-secondary text-sm py-1 px-3 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Dodaj
            </button>
          </div>
          
          {/* Steps Dialog */}
          {showStepsDialog && (
            <div className="bg-cosmic-card/50 rounded-lg p-4 space-y-3 border border-cosmic-border">
              <input
                type="number"
                placeholder="Liczba kroków (np. 1000)"
                value={newSteps}
                onChange={(e) => setNewSteps(e.target.value)}
                className="w-full bg-cosmic-bg border border-cosmic-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cosmic-purple"
              />
              <button
                onClick={handleAddSteps}
                className="btn-primary w-full"
              >
                Dodaj Kroki
              </button>
            </div>
          )}
          
          {/* Current Steps */}
          <div className="text-center">
            <div className="text-5xl font-bold text-green-400 text-glow-green">
              {todayStats?.steps.toLocaleString() || 0}
            </div>
            <p className="text-sm text-gray-500">
              cel: {profile?.stepGoal.toLocaleString() || 8000}
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="progress-bar h-3">
            <div 
              className="progress-fill bg-gradient-to-r from-green-500 to-emerald-500 shadow-glow-green"
              style={{ width: `${stepsPercent}%` }}
            />
          </div>
          
          <div className="text-center text-xs text-gray-400">
            {stepsPercent.toFixed(0)}% dziennego celu
          </div>
        </div>
        
        {/* Calorie Engine */}
        <CalorieEngine />
        
        {/* Quick Stats */}
        <div className="card p-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            Statystyki Zdrowia
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-cosmic-card/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-400">
                {todayStats?.activeMinutes || 0}
              </div>
              <p className="text-xs text-gray-500">minut aktywności</p>
            </div>
            <div className="bg-cosmic-card/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {todayStats?.waterGlasses || 0}/{profile?.waterGoal || 8}
              </div>
              <p className="text-xs text-gray-500">szklanek wody</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
