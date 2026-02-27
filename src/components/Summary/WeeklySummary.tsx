import { ArrowLeft, TrendingUp, Award, Target } from 'lucide-react'
import { useLifeOSStore } from '../../store/lifeOsStore'

interface WeeklySummaryProps {
  onBack: () => void
}

export function WeeklySummary({ onBack }: WeeklySummaryProps) {
  const { profile, todayStats } = useLifeOSStore()
  
  // Mock data for weekly stats (w przyszłości to będzie z DB)
  const weeklyStats = {
    totalXP: 450,
    totalSteps: 42500,
    totalPomodoros: 18,
    totalQuests: 12,
    avgSleep: 7.2,
    streakDays: profile?.masterStreak || 0,
  }
  
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
              <span className="text-3xl">📊</span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cosmic-purple to-cosmic-cyan bg-clip-text text-transparent">
                Podsumowanie Tygodnia
              </h1>
            </div>
            <p className="text-xs text-gray-400">Twoje osiągnięcia z ostatnich 7 dni</p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* XP Progress */}
        <div className="card p-6 text-center">
          <TrendingUp className="w-12 h-12 text-cosmic-cyan mx-auto mb-3" />
          <div className="text-5xl font-bold text-cosmic-cyan text-glow-cyan mb-2">
            +{weeklyStats.totalXP}
          </div>
          <p className="text-sm text-gray-400">XP zdobyte w tym tygodniu</p>
          
          {profile && (
            <div className="mt-4 text-xs text-gray-500">
              Aktualny poziom: <span className="text-cosmic-purple font-bold">{profile.level}</span>
            </div>
          )}
        </div>
        
        {/* Achievements Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4 text-center">
            <div className="text-3xl mb-2">🚶</div>
            <div className="text-2xl font-bold text-green-400">
              {weeklyStats.totalSteps.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">kroków</p>
          </div>
          
          <div className="card p-4 text-center">
            <div className="text-3xl mb-2">🍅</div>
            <div className="text-2xl font-bold text-red-400">
              {weeklyStats.totalPomodoros}
            </div>
            <p className="text-xs text-gray-500">pomodoro</p>
          </div>
          
          <div className="card p-4 text-center">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-blue-400">
              {weeklyStats.totalQuests}
            </div>
            <p className="text-xs text-gray-500">questów</p>
          </div>
          
          <div className="card p-4 text-center">
            <div className="text-3xl mb-2">💤</div>
            <div className="text-2xl font-bold text-purple-400">
              {weeklyStats.avgSleep.toFixed(1)}h
            </div>
            <p className="text-xs text-gray-500">śr. sen</p>
          </div>
        </div>
        
        {/* Streak */}
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="text-6xl">🔥</div>
            <div className="flex-1">
              <div className="text-3xl font-bold text-amber-400 mb-1">
                {weeklyStats.streakDays} dni
              </div>
              <p className="text-sm text-gray-400">Nieprzerwanego streaku!</p>
              {weeklyStats.streakDays >= 7 && (
                <p className="text-xs text-green-400 mt-2">
                  🎉 Gratulacje! Pełny tydzień!
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Badges */}
        <div className="card p-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Award className="w-4 h-4" />
            Odznaki Tygodnia
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {weeklyStats.totalSteps >= 50000 && (
              <div className="bg-cosmic-card/50 rounded-lg p-3 text-center">
                <div className="text-3xl mb-1">🏃</div>
                <p className="text-xs text-gray-400">Walker</p>
              </div>
            )}
            
            {weeklyStats.totalPomodoros >= 15 && (
              <div className="bg-cosmic-card/50 rounded-lg p-3 text-center">
                <div className="text-3xl mb-1">🎯</div>
                <p className="text-xs text-gray-400">Focused</p>
              </div>
            )}
            
            {weeklyStats.streakDays >= 7 && (
              <div className="bg-cosmic-card/50 rounded-lg p-3 text-center">
                <div className="text-3xl mb-1">⭐</div>
                <p className="text-xs text-gray-400">Consistent</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Next Week Goals */}
        <div className="card p-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Cele Na Następny Tydzień
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-green-400">→</span>
              <span>60,000 kroków łącznie</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-blue-400">→</span>
              <span>20 sesji pomodoro</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-purple-400">→</span>
              <span>Utrzymać 14-dniowy streak</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
