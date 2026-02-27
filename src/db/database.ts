import Dexie, { type Table } from 'dexie'
import type {
  Profile,
  CalorieEntry,
  DailyStats,
  TimerWindow,
  Quest,
  ActiveQuest,
  XpEvent,
  TokenBalance,
  Expedition,
  HabitLog,
  Streak,
  SeasonalCampaign,
  DailyQuestRecord,
} from './types'

export class LifeOSDatabase extends Dexie {
  profile!: Table<Profile>
  calorieEntries!: Table<CalorieEntry>
  dailyStats!: Table<DailyStats>
  timerWindows!: Table<TimerWindow>
  quests!: Table<Quest>
  activeQuests!: Table<ActiveQuest>
  xpEvents!: Table<XpEvent>
  tokenBalance!: Table<TokenBalance>
  expeditions!: Table<Expedition>
  habitLog!: Table<HabitLog>
  streaks!: Table<Streak>
  seasonalCampaigns!: Table<SeasonalCampaign>
  dailyQuests!: Table<DailyQuestRecord>

  constructor() {
    super('LifeOS_DB')

    this.version(1).stores({
      profile: '&id',
      calorieEntries: '++id, timestamp, type, linkedHabitLogId',
      dailyStats: '&date, isComplete, xpEarned',
      timerWindows: '&id, phase, category',
      quests: '++id, type, category, difficulty, isActive, isLocationBased',
      activeQuests: '++id, questId, assignedDate, period, status, expiresAt',
      xpEvents: '++id, timestamp, source, linkedDate, levelAfter',
      tokenBalance: '&tokenType',
      expeditions: '++id, isActive, slug',
      habitLog: '++id, timestamp, habitType, source, syncedToDailyStats, linkedQuestId',
      streaks: '&habitId, lastActiveDate',
      seasonalCampaigns: '&id, isActive, startDate',
    })

    this.version(2).stores({
      dailyQuests: '++id, date, completedCount'
    }).upgrade(() => {
      // Optional: Data migration if needed
    })
  }
}

export const db = new LifeOSDatabase()

// Helper function to calculate XP needed for level
export function xpForLevel(level: number): number {
  if (level <= 1) return 0
  return 100 * level * (level - 1) / 2
}

// Helper function to calculate level from total XP
export function levelFromXp(xp: number): number {
  return Math.floor((1 + Math.sqrt(1 + 8 * xp / 100)) / 2)
}

// Helper function to get today's date string
export function getTodayDateString(): string {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

// Helper function to check if it's within active hours
export function isWithinActiveHours(
  hourStart: number,
  hourEnd: number,
  weekdaysOnly: boolean
): boolean {
  const now = new Date()
  const hour = now.getHours()
  const day = now.getDay()

  // Check weekday constraint
  if (weekdaysOnly && (day === 0 || day === 6)) {
    return false
  }

  // Check hour constraint
  return hour >= hourStart && hour < hourEnd
}
