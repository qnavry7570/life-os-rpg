import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { QuestEngine } from '../../engines/QuestEngine'
import type { DailyQuestItem } from '../../db/types'

export function DailyQuests() {
  const [quests, setQuests] = useState<DailyQuestItem[]>([])
  const [allCompleted, setAllCompleted] = useState(false)

  const isPreviewMode = new URLSearchParams(window.location.search).get('preview') === 'true'

  const MOCK_QUESTS: DailyQuestItem[] = [
    { id: 'quest_steps', title: 'Steps Challenge', description: 'Zrób 8000 kroków aby zdobyć XP', icon: '🚶', targetValue: 8000, currentValue: 6200, unit: 'kroków', xpReward: 150, status: 'active', category: 'fitness' },
    { id: 'quest_calorie', title: 'Calorie Burner', description: 'Spal aktywnie 300 kcal', icon: '🔥', targetValue: 300, currentValue: 300, unit: 'kcal', xpReward: 200, status: 'completed', category: 'fitness' },
    { id: 'quest_focus', title: 'Focus Session', description: 'Utrzymaj skupienie przez 25 minut', icon: '🧠', targetValue: 25, currentValue: 10, unit: 'min', xpReward: 180, status: 'active', category: 'mind' },
  ]

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    const loadQuests = async () => {
      if (isPreviewMode) {
        setQuests(MOCK_QUESTS)
        return
      }

      const today = new Date().toISOString().split('T')[0]
      await QuestEngine.checkAndUpdateQuests() // Sync before fetching
      const record = await QuestEngine.getActiveDailyQuests(today)
      setQuests(record.quests)

      if (record.completedCount >= 3 && !allCompleted) {
        setAllCompleted(true)
        triggerConfetti()
      }
    }

    loadQuests()

    if (!isPreviewMode) {
      interval = setInterval(() => {
        loadQuests()
      }, 5 * 60 * 1000) // 5 minutes
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPreviewMode, allCompleted])

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#10b981', '#14b8a6', '#f59e0b']
    })
  }

  const completedCount = quests.filter(q => q.status === 'completed').length
  const totalXp = quests.reduce((sum, q) => sum + q.xpReward, 0)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fitness': return 'bg-emerald-500'
      case 'mind': return 'bg-blue-500'
      case 'health': return 'bg-teal-500'
      default: return 'bg-cosmic-purple'
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>🎯 Dzisiejsze Misje</span>
        </h2>
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <span className="text-sm font-bold text-white">{completedCount}/3</span>
        </div>
      </div>

      {/* Complete Banner */}
      <AnimatePresence>
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-4 text-center"
          >
            <h3 className="text-amber-400 font-bold mb-1">🏆 Wszystkie misje ukończone!</h3>
            <p className="text-sm text-amber-200/80">+{totalXp} XP zdobyte dzisiaj. Niesamowite!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quest Cards */}
      <div className="space-y-3">
        {quests.map((quest, index) => {
          const isCompleted = quest.status === 'completed'
          const percent = Math.min(100, (quest.currentValue / quest.targetValue) * 100)

          return (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileTap={isCompleted ? { scale: 1.05 } : {}}
              className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 relative overflow-hidden ${isCompleted ? 'glow-pulse ring-1 ring-emerald-500/50' : ''
                }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{quest.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-white truncate">{quest.title}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-bold text-amber-400">+{quest.xpReward} XP</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-gray-400'
                        }`}>
                        {isCompleted ? '✅ Ukończono' : 'Aktywny'}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{quest.description}</p>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-medium text-gray-400">
                      <span>{Math.floor(quest.currentValue)} {quest.unit}</span>
                      <span>{quest.targetValue} {quest.unit} ({Math.floor(percent)}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full ${getCategoryColor(quest.category)}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
