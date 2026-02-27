import { useLifeOSStore } from '../../store/lifeOsStore'

export function TokensPanel() {
  const tokens = useLifeOSStore(state => state.tokens)
  const profile = useLifeOSStore(state => state.profile)
  const todayStats = useLifeOSStore(state => state.todayStats)

  return (
    <div className="card bg-cosmic-card/80 backdrop-blur-sm border-white/10 p-4 space-y-4 rounded-2xl">
      {/* Tokens */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
          Tokeny
        </h3>
        <div className="space-y-3">
          {tokens.length === 0 && (
            <div className="bg-white/5 rounded-xl border border-white/10 p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/tokens/token_focus.webp"
                  alt="Focus"
                  className="w-10 h-10 object-contain drop-shadow-[0_0_8px_#00d4ff]"
                  loading="lazy"
                  decoding="async"
                />
                <span className="text-sm text-gray-300">Focus Tokens</span>
              </div>
              <span className="text-xl font-bold text-cosmic-cyan text-glow-cyan">
                {profile?.focusTokens || 0}
              </span>
            </div>
          )}
          {tokens.map(token => {
            const isFocus = token.tokenType === 'focus'
            const isNature = token.tokenType === 'nature'
            const isKnowledge = token.tokenType === 'knowledge'

            return (
              <div
                key={token.tokenType}
                className="bg-white/5 rounded-xl border border-white/10 p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {isFocus ? (
                    <img
                      src="/assets/tokens/token_focus.webp"
                      alt="Focus"
                      className="w-10 h-10 object-contain drop-shadow-[0_0_8px_#00d4ff]"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : isNature ? (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 shadow-glow-green" />
                  ) : isKnowledge ? (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 shadow-glow-purple" />
                  ) : (
                    <span className="text-2xl">{token.emoji}</span>
                  )}
                  <span className="text-sm text-gray-300">{token.label}</span>
                </div>
                <span className={`text-xl font-bold ${isFocus ? 'text-cosmic-cyan text-glow-cyan' : isNature ? 'text-emerald-400' : isKnowledge ? 'text-purple-400' : 'text-white'}`}>
                  {token.currentBalance}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Today's Stats */}
      <div className="pt-2">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
          Statystyki Dziś
        </h3>
        <div className="space-y-3 p-3 bg-black/20 rounded-xl border border-white/5 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">🚶 Kroki</span>
            <span className="font-semibold text-emerald-400">
              {todayStats?.steps.toLocaleString() || 0} / {profile?.stepGoal.toLocaleString() || 8000}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">💧 Woda</span>
            <span className="font-semibold text-cyan-400">
              {todayStats?.waterGlasses || 0} / {profile?.waterGoal || 8}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">📚 Strony</span>
            <span className="font-semibold text-blue-400">
              {todayStats?.readingPages || 0}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2 mt-2 border-t border-white/10">
            <span className="text-gray-400 uppercase tracking-wider text-xs font-bold">⭐ Zdobądź XP</span>
            <span className="font-bold text-amber-400 glow-amber text-lg">
              +{todayStats?.xpEarned || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
