import { useLifeOSStore } from '../../store/lifeOsStore'

export function HeroPanel() {
  const profile = useLifeOSStore(state => state.profile)
  
  if (!profile) return null
  
  const xpPercent = (profile.xpCurrentLevel / (profile.xpCurrentLevel + profile.xpToNextLevel)) * 100
  
  return (
    <div className="card-glow p-4 mb-4">
      {/* Hero Identity */}
      <div className="flex items-center gap-4 mb-4">
        <div className="text-5xl w-16 h-16 flex items-center justify-center bg-cosmic-purple/20 rounded-full border-2 border-cosmic-purple">
          {profile.avatarEmoji}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-glow-purple">{profile.heroName}</h1>
          <p className="text-sm text-gray-400">
            Poziom {profile.level} {profile.heroClass}
          </p>
        </div>
        <div className="text-right">
          <div className="text-amber-400 text-sm font-semibold flex items-center gap-1">
            🔥 <span>{profile.masterStreak}</span>
          </div>
          <p className="text-xs text-gray-500">dni streaku</p>
        </div>
      </div>
      
      {/* XP Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-400">
          <span>XP do następnego poziomu</span>
          <span className="text-cosmic-cyan font-semibold">
            {Math.floor(profile.xpCurrentLevel).toLocaleString()} / {profile.xpToNextLevel.toLocaleString()}
          </span>
        </div>
        <div className="progress-bar h-3">
          <div 
            className="progress-fill bg-gradient-to-r from-cosmic-purple to-cosmic-cyan shadow-glow-cyan"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}
