import { create } from 'zustand'
import { db, getTodayDateString, xpForLevel, levelFromXp } from '../db/database'
import type {
  Profile,
  DailyStats,
  TimerWindow,
  ActiveQuest,
  TokenBalance,
  CalorieEntry,
  HabitType,
  XpSource,
  TimerPhase,
} from '../db/types'

interface LifeOSState {
  // ========== CACHE (from DB) ==========
  profile: Profile | null
  todayStats: DailyStats | null
  timerWindows: TimerWindow[]
  activeQuests: ActiveQuest[]
  tokens: TokenBalance[]
  
  // ========== LIVE STATE (not in DB) ==========
  currentCalorieBalance: number
  currentBurnRateKcalPerHour: number
  calorieHistory: CalorieEntry[] // last 24h for chart
  
  // Timer state (updated every second)
  timerStates: Record<string, {
    secondsRemaining: number
    phase: TimerPhase
  }>
  
  // UI State
  isLoading: boolean
  lastSync: Date | null
  
  // ========== ACTIONS ==========
  // Initialization
  initialize: () => Promise<void>
  
  // Profile
  loadProfile: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<void>
  
  // Daily Stats
  loadTodayStats: () => Promise<void>
  updateTodayStats: (updates: Partial<DailyStats>) => Promise<void>
  
  // Timers
  loadTimers: () => Promise<void>
  hitTimer: (timerId: string) => Promise<void>
  tickTimers: () => Promise<void>
  
  // Quests
  loadActiveQuests: () => Promise<void>
  updateQuestProgress: (questId: number, progress: number) => Promise<void>
  completeQuest: (questId: number) => Promise<void>
  
  // Calories
  logMeal: (kcal: number, mealName?: string) => Promise<void>
  setBurnRate: (kcalPerHour: number) => Promise<void>
  loadCalorieHistory: () => Promise<void>
  updateCalorieBalance: () => void
  
  // XP System
  awardXP: (source: XpSource, amount: number, description: string) => Promise<void>
  
  // Habits
  logHabit: (habitType: HabitType, value: number, unit: string) => Promise<void>
  
  // Tokens
  loadTokens: () => Promise<void>
  awardToken: (tokenType: string, amount: number) => Promise<void>
  spendToken: (tokenType: string, amount: number) => Promise<void>
}

export const useLifeOSStore = create<LifeOSState>((set, get) => ({
  // ========== INITIAL STATE ==========
  profile: null,
  todayStats: null,
  timerWindows: [],
  activeQuests: [],
  tokens: [],
  currentCalorieBalance: 0,
  currentBurnRateKcalPerHour: 80,
  calorieHistory: [],
  timerStates: {},
  isLoading: true,
  lastSync: null,
  
  // ========== INITIALIZATION ==========
  initialize: async () => {
    set({ isLoading: true })
    try {
      await get().loadProfile()
      await get().loadTodayStats()
      await get().loadTimers()
      await get().loadActiveQuests()
      await get().loadTokens()
      await get().loadCalorieHistory()
      
      // Start timer tick
      setInterval(() => {
        get().tickTimers()
        get().updateCalorieBalance()
      }, 1000)
      
      // Snapshot calories every 10 minutes
      setInterval(() => {
        const { currentCalorieBalance, currentBurnRateKcalPerHour } = get()
        const now = new Date()
        db.calorieEntries.add({
          timestamp: now,
          type: 'snapshot',
          value: 0,
          balanceAfter: currentCalorieBalance,
          source: 'timer_auto',
        })
      }, 10 * 60 * 1000)
      
      set({ isLoading: false, lastSync: new Date() })
    } catch (error) {
      console.error('Failed to initialize Life OS:', error)
      set({ isLoading: false })
    }
  },
  
  // ========== PROFILE ==========
  loadProfile: async () => {
    const profile = await db.profile.get(1)
    if (profile) {
      set({ 
        profile,
        currentBurnRateKcalPerHour: profile.dailyCalorieBurnRate,
      })
    }
  },
  
  updateProfile: async (updates) => {
    const { profile } = get()
    if (!profile) return
    
    const updatedProfile = { ...profile, ...updates }
    await db.profile.update(1, updatedProfile)
    set({ profile: updatedProfile })
  },
  
  // ========== DAILY STATS ==========
  loadTodayStats: async () => {
    const today = getTodayDateString()
    let stats = await db.dailyStats.get(today)
    
    // Create if doesn't exist
    if (!stats) {
      const now = new Date()
      stats = {
        date: today,
        steps: 0,
        stepsSource: 'manual',
        activeMinutes: 0,
        exerciseMinutes: 0,
        outdoorMinutes: 0,
        sleepHours: 0,
        sleepQuality: 0,
        caloriesConsumed: 0,
        caloriesBurned: 0,
        calorieBalance: 0,
        waterGlasses: 0,
        mealsCount: 0,
        readingPages: 0,
        readingMinutes: 0,
        learningMinutes: 0,
        podcastMinutes: 0,
        focusMinutes: 0,
        focusSessionsCount: 0,
        screenTimeMinutes: 0,
        socialMediaMinutes: 0,
        focusTokensEarned: 0,
        meditationMinutes: 0,
        morningMood: 0,
        eveningMood: 0,
        energyLevel: 5,
        xpEarned: 0,
        questsCompleted: 0,
        timerWindowsHit: 0,
        timerWindowsMissed: 0,
        streakActive: true,
        isComplete: false,
        updatedAt: now,
      }
      await db.dailyStats.add(stats)
    }
    
    set({ todayStats: stats })
  },
  
  updateTodayStats: async (updates) => {
    const { todayStats } = get()
    if (!todayStats) return
    
    const today = getTodayDateString()
    const updatedStats = { ...todayStats, ...updates, updatedAt: new Date() }
    await db.dailyStats.update(today, updatedStats)
    set({ todayStats: updatedStats })
  },
  
  // ========== TIMERS ==========
  loadTimers: async () => {
    const timers = await db.timerWindows.toArray()
    const timerStates: Record<string, { secondsRemaining: number; phase: TimerPhase }> = {}
    
    timers.forEach(timer => {
      timerStates[timer.id] = {
        secondsRemaining: timer.secondsRemaining,
        phase: timer.phase,
      }
    })
    
    set({ timerWindows: timers, timerStates })
  },
  
  hitTimer: async (timerId) => {
    const { timerWindows, todayStats } = get()
    const timer = timerWindows.find(t => t.id === timerId)
    if (!timer || !todayStats) return
    
    const now = new Date()
    const nextDeadline = new Date(now.getTime() + timer.durationMinutes * 60000)
    
    // Update timer
    const updates = {
      lastResetAt: now,
      nextDeadlineAt: nextDeadline,
      secondsRemaining: timer.durationMinutes * 60,
      phase: 'counting_down' as TimerPhase,
      completionsToday: timer.completionsToday + 1,
      updatedAt: now,
    }
    await db.timerWindows.update(timerId, updates)
    
    // Log habit
    await db.habitLog.add({
      timestamp: now,
      habitType: 'timer_hit',
      value: 1,
      unit: 'completion',
      source: 'manual',
      linkedTimerId: timerId,
      linkedDailyStatDate: getTodayDateString(),
      syncedToDailyStats: false,
    })
    
    // Award XP
    await get().awardXP('timer_window', timer.xpOnHit, `Trafiono ${timer.label}`)
    
    // Award token if applicable
    if (timer.tokenReward) {
      await get().awardToken(timer.tokenReward, 1)
    }
    
    // Update daily stats
    await get().updateTodayStats({
      timerWindowsHit: todayStats.timerWindowsHit + 1,
    })
    
    // Reload timers
    await get().loadTimers()
  },
  
  tickTimers: async () => {
    const { timerWindows, timerStates } = get()
    const now = new Date()
    const updates: Record<string, Partial<TimerWindow>> = {}
    
    for (const timer of timerWindows) {
      if (!timer.isEnabled) continue
      
      const secondsRemaining = Math.floor(
        (timer.nextDeadlineAt.getTime() - now.getTime()) / 1000
      )
      
      let phase = timer.phase
      
      // Determine phase
      if (secondsRemaining <= 0) {
        phase = 'expired'
      } else if (secondsRemaining <= 15 * 60) {
        phase = 'warning'
      } else {
        phase = 'counting_down'
      }
      
      // Update state
      timerStates[timer.id] = {
        secondsRemaining: Math.max(0, secondsRemaining),
        phase,
      }
      
      // If phase changed, update DB
      if (phase !== timer.phase) {
        updates[timer.id] = { phase }
      }
    }
    
    // Batch update DB
    for (const [timerId, update] of Object.entries(updates)) {
      await db.timerWindows.update(timerId, update)
    }
    
    set({ timerStates: { ...timerStates } })
  },
  
  // ========== QUESTS ==========
  loadActiveQuests: async () => {
    const today = getTodayDateString()
    const quests = await db.activeQuests
      .where('assignedDate')
      .equals(today)
      .and(q => q.status === 'active')
      .toArray()
    
    set({ activeQuests: quests })
  },
  
  updateQuestProgress: async (questId, progress) => {
    const { activeQuests } = get()
    const quest = activeQuests.find(q => q.id === questId)
    if (!quest) return
    
    const progressPercent = Math.min(100, (progress / quest.targetValue) * 100)
    
    await db.activeQuests.update(questId, {
      currentProgress: progress,
      progressPercent,
    })
    
    // Check if completed
    if (progress >= quest.targetValue && quest.status === 'active') {
      await get().completeQuest(questId)
    }
    
    await get().loadActiveQuests()
  },
  
  completeQuest: async (questId) => {
    const quest = await db.activeQuests.get(questId)
    if (!quest) return
    
    const questTemplate = await db.quests.get(quest.questId)
    if (!questTemplate) return
    
    const now = new Date()
    
    // Update quest status
    await db.activeQuests.update(questId, {
      status: 'completed',
      completedAt: now,
      xpAwarded: questTemplate.xpReward,
    })
    
    // Award XP
    await get().awardXP(
      `quest_${quest.period}` as XpSource,
      questTemplate.xpReward,
      `Ukończono quest: ${questTemplate.title}`
    )
    
    // Award focus tokens
    if (questTemplate.focusTokenReward > 0) {
      await get().awardToken('focus', questTemplate.focusTokenReward)
    }
    
    // Update daily stats
    const { todayStats } = get()
    if (todayStats) {
      await get().updateTodayStats({
        questsCompleted: todayStats.questsCompleted + 1,
      })
    }
    
    await get().loadActiveQuests()
  },
  
  // ========== CALORIES ==========
  logMeal: async (kcal, mealName) => {
    const { currentCalorieBalance, todayStats } = get()
    if (!todayStats) return
    
    const now = new Date()
    const newBalance = currentCalorieBalance + kcal
    
    await db.calorieEntries.add({
      timestamp: now,
      type: 'meal_added',
      value: kcal,
      balanceAfter: newBalance,
      mealName,
      source: 'manual',
    })
    
    await get().updateTodayStats({
      caloriesConsumed: todayStats.caloriesConsumed + kcal,
      calorieBalance: todayStats.calorieBalance + kcal,
      mealsCount: todayStats.mealsCount + 1,
    })
    
    await get().loadCalorieHistory()
  },
  
  setBurnRate: async (kcalPerHour) => {
    const { currentCalorieBalance } = get()
    const now = new Date()
    
    await db.calorieEntries.add({
      timestamp: now,
      type: 'burn_rate_set',
      value: -kcalPerHour,
      balanceAfter: currentCalorieBalance,
      source: 'manual',
    })
    
    await get().updateProfile({ dailyCalorieBurnRate: kcalPerHour })
    set({ currentBurnRateKcalPerHour: kcalPerHour })
  },
  
  loadCalorieHistory: async () => {
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const entries = await db.calorieEntries
      .where('timestamp')
      .above(last24h)
      .toArray()
    
    set({ calorieHistory: entries })
    
    // Calculate current balance from last snapshot or start of day
    const lastEntry = entries[entries.length - 1]
    if (lastEntry) {
      set({ currentCalorieBalance: lastEntry.balanceAfter })
    }
  },
  
  updateCalorieBalance: () => {
    const { currentCalorieBalance, currentBurnRateKcalPerHour, calorieHistory } = get()
    
    if (calorieHistory.length === 0) return
    
    // Calculate burn since last snapshot
    const lastSnapshot = calorieHistory
      .filter(e => e.type === 'snapshot')
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0]
    
    if (!lastSnapshot) return
    
    const minutesSinceSnapshot = (Date.now() - lastSnapshot.timestamp.getTime()) / 60000
    const burnedSinceSnapshot = (currentBurnRateKcalPerHour / 60) * minutesSinceSnapshot
    
    set({ currentCalorieBalance: lastSnapshot.balanceAfter - burnedSinceSnapshot })
  },
  
  // ========== XP SYSTEM ==========
  awardXP: async (source, amount, description) => {
    const { profile, todayStats } = get()
    if (!profile || !todayStats) return
    
    const now = new Date()
    const newXpTotal = profile.xpTotal + amount
    const newLevel = levelFromXp(newXpTotal)
    const leveledUp = newLevel > profile.level
    
    // Calculate XP progress in current level
    const xpForCurrentLevel = xpForLevel(newLevel)
    const xpForNextLevel = xpForLevel(newLevel + 1)
    const xpCurrentLevel = newXpTotal - xpForCurrentLevel
    const xpToNextLevel = xpForNextLevel - newXpTotal
    
    // Log XP event
    await db.xpEvents.add({
      timestamp: now,
      source,
      amount,
      description,
      xpTotalAfter: newXpTotal,
      levelBefore: profile.level,
      levelAfter: newLevel,
      linkedDate: getTodayDateString(),
    })
    
    // Update profile
    await get().updateProfile({
      xpTotal: newXpTotal,
      xpCurrentLevel,
      xpToNextLevel,
      level: newLevel,
    })
    
    // Update today's stats
    await get().updateTodayStats({
      xpEarned: todayStats.xpEarned + amount,
    })
    
    // If leveled up, award bonus XP
    if (leveledUp) {
      const bonusXp = newLevel * 50
      setTimeout(() => {
        get().awardXP('level_up_bonus', bonusXp, `Bonus za osiągnięcie poziomu ${newLevel}!`)
      }, 100)
    }
  },
  
  // ========== HABITS ==========
  logHabit: async (habitType, value, unit) => {
    const now = new Date()
    
    await db.habitLog.add({
      timestamp: now,
      habitType,
      value,
      unit,
      source: 'manual',
      linkedDailyStatDate: getTodayDateString(),
      syncedToDailyStats: false,
    })
  },
  
  // ========== TOKENS ==========
  loadTokens: async () => {
    const tokens = await db.tokenBalance.toArray()
    set({ tokens })
  },
  
  awardToken: async (tokenType, amount) => {
    const token = await db.tokenBalance.get(tokenType)
    if (!token) return
    
    await db.tokenBalance.update(tokenType, {
      currentBalance: token.currentBalance + amount,
      totalEarned: token.totalEarned + amount,
      lastUpdated: new Date(),
    })
    
    // Update profile cache for focus tokens
    if (tokenType === 'focus') {
      const { profile } = get()
      if (profile) {
        await get().updateProfile({
          focusTokens: profile.focusTokens + amount,
        })
      }
    }
    
    await get().loadTokens()
  },
  
  spendToken: async (tokenType, amount) => {
    const token = await db.tokenBalance.get(tokenType)
    if (!token || token.currentBalance < amount) return
    
    await db.tokenBalance.update(tokenType, {
      currentBalance: token.currentBalance - amount,
      totalSpent: token.totalSpent + amount,
      lastUpdated: new Date(),
    })
    
    // Update profile cache for focus tokens
    if (tokenType === 'focus') {
      const { profile } = get()
      if (profile) {
        await get().updateProfile({
          focusTokens: profile.focusTokens - amount,
        })
      }
    }
    
    await get().loadTokens()
  },
}))
