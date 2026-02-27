import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLifeOSStore } from '../../store/lifeOsStore'
import { DailyQuests } from '../Quests/DailyQuests'

interface WorkZoneProps {
  onBack: () => void
}

export function WorkZone({ onBack }: WorkZoneProps) {
  const { awardXP, awardToken } = useLifeOSStore()
  
  // Pomodoro State
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25)
  const [pomodoroSeconds, setPomodoroSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isRunning) {
      interval = setInterval(() => {
        if (pomodoroSeconds === 0) {
          if (pomodoroMinutes === 0) {
            // Pomodoro finished
            setIsRunning(false)
            
            if (!isBreak) {
              // Work session complete
              setCompletedPomodoros(prev => prev + 1)
              awardXP('quest_daily', 50, 'Ukończono sesję Pomodoro!')
              awardToken('focus', 1)
              
              // Start break
              setIsBreak(true)
              setPomodoroMinutes(5)
              setPomodoroSeconds(0)
            } else {
              // Break complete
              setIsBreak(false)
              setPomodoroMinutes(25)
              setPomodoroSeconds(0)
            }
          } else {
            setPomodoroMinutes(prev => prev - 1)
            setPomodoroSeconds(59)
          }
        } else {
          setPomodoroSeconds(prev => prev - 1)
        }
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, pomodoroMinutes, pomodoroSeconds, isBreak, awardXP, awardToken])
  
  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }
  
  const handleReset = () => {
    setIsRunning(false)
    setIsBreak(false)
    setPomodoroMinutes(25)
    setPomodoroSeconds(0)
  }
  
  const timePercent = isBreak 
    ? ((5 * 60 - (pomodoroMinutes * 60 + pomodoroSeconds)) / (5 * 60)) * 100
    : ((25 * 60 - (pomodoroMinutes * 60 + pomodoroSeconds)) / (25 * 60)) * 100
  
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
              <span className="text-3xl">💼</span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Work Zone
              </h1>
            </div>
            <p className="text-xs text-gray-400">Praca, fokus, produktywność</p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Pomodoro Timer */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              🍅 Pomodoro Timer
            </h2>
            <div className="text-xs bg-cosmic-purple/20 px-2 py-1 rounded-full text-cosmic-purple">
              {completedPomodoros} sesji dziś
            </div>
          </div>
          
          {/* Timer Display */}
          <div className="text-center space-y-2">
            <div className={`text-6xl font-mono font-bold ${isBreak ? 'text-green-400' : 'text-cosmic-cyan'} text-glow-cyan`}>
              {String(pomodoroMinutes).padStart(2, '0')}:{String(pomodoroSeconds).padStart(2, '0')}
            </div>
            <p className="text-sm text-gray-500">
              {isBreak ? '☕ Przerwa' : '💼 Praca'}
            </p>
          </div>
          
          {/* Progress Ring */}
          <div className="progress-bar h-2">
            <div 
              className={`progress-fill ${isBreak ? 'bg-green-500' : 'bg-cosmic-cyan'} transition-all duration-1000`}
              style={{ width: `${timePercent}%` }}
            />
          </div>
          
          {/* Controls */}
          <div className="flex gap-2">
            <button
              onClick={handleStartPause}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? 'Pauza' : 'Start'}
            </button>
            <button
              onClick={handleReset}
              className="btn-secondary px-4"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
          
          {/* Info */}
          <div className="text-xs text-center text-gray-500">
            Każda ukończona sesja = +50 XP + 🎯 Focus Token
          </div>
        </div>
        
        {/* Daily Quests */}
        <DailyQuests />
      </div>
    </div>
  )
}
