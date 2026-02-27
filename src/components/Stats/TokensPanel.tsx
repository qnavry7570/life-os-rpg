import { useLifeOSStore } from '../../store/lifeOsStore'

export function TokensPanel() {
  const tokens = useLifeOSStore(state => state.tokens)
  const profile = useLifeOSStore(state => state.profile)
  const todayStats = useLifeOSStore(state => state.todayStats)
  
  return (
    <div className="card p-4 space-y-4">
      {/* Tokens */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
          Tokeny
        </h3>
        <div className="space-y-2">
          {tokens.map(token => (
            <div 
              key={token.tokenType}
              className="bg-cosmic-card/50 rounded-lg p-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{token.emoji}</span>
                <span className="text-sm text-gray-300">{token.label}</span>
              </div>
              <span className="text-xl font-bold text-cosmic-cyan">
                {token.currentBalance}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Today's Stats */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
          Statystyki Dziś
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">🚶 Kroki</span>
            <span className="font-semibold">
              {todayStats?.steps.toLocaleString() || 0} / {profile?.stepGoal.toLocaleString() || 8000}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">💧 Woda</span>
            <span className="font-semibold">
              {todayStats?.waterGlasses || 0} / {profile?.waterGoal || 8}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">📚 Strony</span>
            <span className="font-semibold">
              {todayStats?.readingPages || 0}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">⭐ XP dziś</span>
            <span className="font-semibold text-cosmic-cyan">
              +{todayStats?.xpEarned || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
