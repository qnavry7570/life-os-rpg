import { useEffect, useState } from 'react'
import { Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLifeOSStore } from '../../store/lifeOsStore'

const heroConfig: Record<string, { img: string; glow: string; color: string }> = {
  explorer: { img: 'assets/hero/hero_explorer.webp', glow: 'glow-amber', color: '#f59e0b' },
  scholar: { img: 'assets/hero/hero_scholar.webp', glow: 'glow-blue', color: '#60a5fa' },
  warrior: { img: 'assets/hero/hero_warrior.webp', glow: 'glow-green', color: '#4ade80' },
}

export function HeroPanel() {
  const { profile, updateProfile } = useLifeOSStore()
  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Auto-set heroClass to 'explorer' if null (first launch check)
  useEffect(() => {
    if (profile && !profile.heroClass) {
      updateProfile({ heroClass: 'Explorer' as any })
      setShowBanner(true)
    }
  }, [profile, updateProfile])

  // Also check if they are the default Explorer but hasn't explicitly dismissed it
  // (Optional: Just show if they haven't dismissed. Here we show it if they naturally landed on Explorer without explicitly picking maybe. For simplicity we use local state or localStorage).
  useEffect(() => {
    if (profile?.heroClass === 'Explorer' && !localStorage.getItem('lifeos_hero_dismissed')) {
      setShowBanner(true)
    }
  }, [profile])

  if (!profile) return null

  const classKey = profile.heroClass?.toLowerCase() || 'explorer'
  const config = heroConfig[classKey] || heroConfig.explorer

  const xpPercent = (profile.xpCurrentLevel / (profile.xpCurrentLevel + profile.xpToNextLevel)) * 100

  const handleDismissBanner = () => {
    setShowBanner(false)
    localStorage.setItem('lifeos_hero_dismissed', 'true')
  }

  const handleSelectClass = (newClass: string) => {
    // capitalize
    const capitalized = newClass.charAt(0).toUpperCase() + newClass.slice(1)
    updateProfile({ heroClass: capitalized as any })
    setShowModal(false)
    handleDismissBanner()
  }

  return (
    <>
      <div className="card bg-cosmic-card/80 backdrop-blur-sm border-white/10 mb-4 relative p-5 rounded-2xl">
        {/* Top Right Gear Icon */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        {/* First Launch Banner */}
        <AnimatePresence>
          {showBanner && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div
                onClick={() => setShowModal(true)}
                className="w-full text-center py-2 px-3 text-sm rounded-xl border border-amber-500/50 glow-amber bg-amber-900/20 text-amber-100 cursor-pointer flex justify-between items-center"
              >
                <span>🧭 Explorer by default — tap here to switch class</span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDismissBanner(); }}
                  className="text-amber-300/60 hover:text-amber-100 px-2"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Avatar & Identity */}
        <div className="flex flex-col items-center gap-3 mb-5">
          <div className={`relative w-[120px] h-[160px] rounded-2xl overflow-hidden border-2 border-opacity-50 ${config.glow}`} style={{ borderColor: config.color }}>
            {/* Fallback gradient */}
            <div className={`absolute inset-0 bg-gradient-to-b from-cosmic-bg to-cosmic-card`} />
            <img
              src={config.img}
              alt={profile.heroClass}
              className="absolute inset-0 w-full h-full object-cover z-10"
              loading="lazy"
              decoding="async"
              onError={(e) => (e.currentTarget.style.opacity = '0')}
            />
          </div>

          <div className="text-center mt-1">
            <h1 className="text-2xl font-bold font-serif tracking-wide" style={{ textShadow: `0 0 10px ${config.color}80` }}>
              {profile.heroName}
            </h1>
            <p className="text-sm text-gray-400 font-medium">
              Poziom {profile.level} {profile.heroClass}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-between items-center bg-black/20 rounded-xl p-3 mb-4">
          <div className="text-center flex-1 border-r border-white/5">
            <div className="text-amber-400 text-lg font-bold flex justify-center items-center gap-1">
              🔥 {profile.masterStreak}
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Dni Streaku</p>
          </div>
          <div className="text-center flex-1">
            <div className="text-cosmic-cyan text-lg font-bold flex justify-center items-center gap-1">
              💠 {profile.focusTokens || 0}
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Tokeny Skupienia</p>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400 font-medium px-1">
            <span>XP do Następnego Poziomu</span>
            <span style={{ color: config.color }}>
              {Math.floor(profile.xpCurrentLevel).toLocaleString()} / {profile.xpToNextLevel.toLocaleString()}
            </span>
          </div>
          <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full ${config.glow}`}
              style={{ backgroundColor: config.color }}
            />
          </div>
        </div>
      </div>

      {/* Class Selection Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-sm bg-cosmic-bg rounded-3xl border border-white/10 p-5 max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-center mb-6">Wybierz Złodzieja Czasu... wróć, Ścieżkę</h2>
              <div className="space-y-4">
                {Object.entries(heroConfig).map(([key, c]) => (
                  <div key={key} className="flex gap-4 p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                    <img src={c.img} className="w-16 h-20 rounded-lg object-cover" />
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-bold capitalize mb-1" style={{ color: c.color }}>{key}</h3>
                      <p className="text-xs text-gray-400 mb-2">Bonus: +10% do {key === 'warrior' ? 'Siły' : key === 'scholar' ? 'Wiedzy' : 'Eksploracji'}</p>
                      <button
                        onClick={() => handleSelectClass(key)}
                        className="py-1 px-4 rounded text-xs font-bold text-white/90 w-fit"
                        style={{ backgroundColor: c.color, boxShadow: `0 0 10px ${c.color}40` }}
                      >
                        Wybierz
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-full mt-4 py-3 text-sm font-medium text-gray-500 hover:text-white"
              >
                Anuluj
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
