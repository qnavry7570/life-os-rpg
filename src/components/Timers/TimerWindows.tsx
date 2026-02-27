import { useLifeOSStore } from '../../store/lifeOsStore'
import { Play, Check } from 'lucide-react'

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export function TimerWindows() {
  const { timerWindows, timerStates, hitTimer } = useLifeOSStore()
  
  return (
    <div className="card p-4 space-y-4">
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
        Okna Timerów
      </h2>
      
      <div className="grid grid-cols-1 gap-3">
        {timerWindows.map(timer => {
          const state = timerStates[timer.id]
          if (!state) return null
          
          const phaseColors = {
            counting_down: 'border-green-500 bg-green-500/10',
            warning: 'border-amber-500 bg-amber-500/10',
            expired: 'border-red-500 bg-red-500/10',
            completed: 'border-cyan-500 bg-cyan-500/10',
            cooldown: 'border-purple-500 bg-purple-500/10',
          }
          
          return (
            <div 
              key={timer.id}
              className={`p-4 rounded-xl border-2 ${phaseColors[state.phase]} transition-all`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{timer.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-sm">{timer.label}</h3>
                    <p className="text-xs text-gray-500">
                      {timer.completionsToday}/{Math.floor(14 / (timer.durationMinutes / 60))} dziś
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => hitTimer(timer.id)}
                  className="btn-primary py-1 px-3 text-sm flex items-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  Wykonano
                </button>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-cosmic-cyan">
                  {formatTime(state.secondsRemaining)}
                </div>
                {state.phase === 'warning' && (
                  <p className="text-xs text-amber-400 mt-1">⚠️ Pozostało mało czasu!</p>
                )}
                {state.phase === 'expired' && (
                  <p className="text-xs text-red-400 mt-1">❌ Czas minął</p>
                )}
              </div>
              
              <div className="mt-2 text-xs text-center text-gray-500">
                +{timer.xpOnHit} XP za trafienie
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
