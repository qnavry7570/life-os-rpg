import { useEffect, useState } from 'react'
import { Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLifeOSStore } from '../../store/lifeOsStore'
import { NotificationService } from '../../services/NotificationService'
import { getLevelData } from '../../engines/LevelingEngine'

const heroConfig: Record<string, { img: string; glow: string; color: string }> = {
  explorer: { img: '/life-os-rpg/assets/hero/hero_explorer.webp', glow: 'glow-amber', color: '#f59e0b' },
  scholar: { img: '/life-os-rpg/assets/hero/hero_scholar.webp', glow: 'glow-blue', color: '#60a5fa' },
  warrior: { img: '/life-os-rpg/assets/hero/hero_warrior.webp', glow: 'glow-green', color: '#4ade80' },
}

const RING_SIZE = 120;
const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function HeroPanel() {
  const storeProfile = useLifeOSStore(state => state.profile)
  const updateProfile = useLifeOSStore(state => state.updateProfile)
  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  const isPreview = new URLSearchParams(window.location.search).get('preview') === 'true';

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      setNotificationsEnabled(true)
    }
  }, [])

  // Auto-set heroClass to 'explorer' if null (first launch check)
  useEffect(() => {
    if (storeProfile && !storeProfile.heroClass) {
      updateProfile({ heroClass: 'Explorer' as any })
      setShowBanner(true)
    }
  }, [storeProfile, updateProfile])

  useEffect(() => {
    if (storeProfile?.heroClass === 'Explorer' && !localStorage.getItem('lifeos_hero_dismissed')) {
      setShowBanner(true)
    }
  }, [storeProfile])

  if (!storeProfile && !isPreview) return null

  // Mock profile fallback
  const mockProfile = { xpTotal: 3150, level: 9, heroClass: 'explorer', heroName: 'Bohater Próbny', masterStreak: 5, focusTokens: 12 };
  const profile = isPreview ? mockProfile : storeProfile!;

  const totalXP = isPreview ? 3150 : ((profile as any).xpTotal ?? 0);
  const { current, progressPercent, xpIntoLevel } = getLevelData(totalXP);

  const xpFraction = current.xpToNext > 0 ? xpIntoLevel / current.xpToNext : 1;
  const strokeDashoffset = CIRCUMFERENCE - (xpFraction * CIRCUMFERENCE);

  const tierBadgeName = current.level <= 10 ? 'NOWICJUSZ' :
    current.level <= 20 ? 'ADEPT' :
      current.level <= 30 ? 'MISTRZ' :
        current.level <= 40 ? 'LEGENDA' :
          current.level <= 49 ? 'BÓG' : '👑 BÓG ŻYCIA';

  const handleDismissBanner = () => {
    setShowBanner(false)
    localStorage.setItem('lifeos_hero_dismissed', 'true')
  }

  const handleSelectClass = (newClass: string) => {
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

        {/* Full-width Avatar */}
        <div className="w-full h-[280px] rounded-2xl overflow-hidden relative mb-4 border border-white/10 shadow-lg">
          <img
            src="/life-os-rpg/assets/hero/hero_warrior.webp"
            alt="Hero cover"
            className="w-full h-full object-cover object-top"
            loading="lazy" decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              target.parentElement!.innerHTML += '<div class="absolute inset-0 flex items-center justify-center text-[64px] bg-black/50 text-center w-full h-full z-10">⚔️</div>';
            }}
          />
        </div>

        {/* Circular XP Ring & Level */}
        <div className="flex flex-col items-center gap-2 mb-4 -mt-16">
          <div className="relative flex items-center justify-center bg-cosmic-card rounded-full z-20 shadow-xl" style={{ width: RING_SIZE, height: RING_SIZE }}>
            <svg width={RING_SIZE} height={RING_SIZE} className="absolute top-0 left-0" style={{ transform: 'rotate(-90deg)' }}>
              {/* Track */}
              <circle cx={60} cy={60} r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={6} />
              {/* Progress — animowany Framer Motion */}
              <motion.circle
                cx={60} cy={60} r={RADIUS}
                fill="none"
                stroke={current.accentColor}
                strokeWidth={8}
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 6px ${current.accentColor})` }}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{ strokeDashoffset: strokeDashoffset }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center bg-cosmic-bg w-20 h-20 rounded-full border border-white/5">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1 mt-1">Poziom</span>
              <span className="text-4xl font-black leading-none" style={{ color: current.accentColor, textShadow: `0 0 10px ${current.accentColor}80` }}>
                {current.level}
              </span>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mt-1 px-2 w-full">
            <h2 className="text-white font-bold text-lg leading-tight">{profile.heroName || 'Bohater'}</h2>
            <p className="text-xs font-semibold mt-1" style={{ color: current.accentColor }}>
              {current.badge} {current.titlePL}
            </p>
            <p className="text-gray-500 text-xs mt-0.5 capitalize">{profile.heroClass || 'explorer'}</p>

            {/* Tier badge */}
            <div className="inline-flex items-center gap-1 mt-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider"
              style={{ background: current.accentColor + '15', color: current.accentColor, border: `1px solid ${current.accentColor}30` }}>
              {tierBadgeName}
            </div>

            {/* Linear XP bar */}
            <div className="mt-4 mb-2">
              <div className="flex justify-center text-[10px] text-gray-500 font-medium mb-1.5 px-1">
                <span>{Math.floor(xpIntoLevel)} / {current.xpToNext > 0 ? current.xpToNext : 'MAX'} XP do Lv {current.level + 1}</span>
              </div>
              <div className="h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${current.accentColor}88, ${current.accentColor})` }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1.0, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
            </div>
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
              💠 {profile.focusTokens ?? 12}
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Tokeny Skupienia</p>
          </div>
        </div>

        {/* Notifications Toggle */}
        <button
          onClick={async () => {
            const granted = await NotificationService.requestPermission()
            if (granted) {
              await NotificationService.scheduleMorningReminder()
              await NotificationService.scheduleEveningReminder()
              setNotificationsEnabled(true)
            }
          }}
          className="w-full mt-3 py-2 px-4 rounded-lg bg-amber-500/20 border border-amber-500/30
                     text-amber-300 text-sm font-medium hover:bg-amber-500/30 transition-all"
        >
          {notificationsEnabled ? '🔔 Powiadomienia Aktywne' : '🔔 Włącz Powiadomienia'}
        </button>
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
