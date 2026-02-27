// Type definitions for all database entities

export type HeroClass = 'Scholar' | 'Explorer' | 'Warrior' | 'Monk'
export type DataSource = 'manual' | 'timer_auto' | 'api_garmin' | 'api_google_fit' | 'gemini_vision' | 'gps'
export type CalorieEventType = 'burn_rate_set' | 'meal_added' | 'activity_burst' | 'snapshot'
export type TimerWindowId = 'movement_90' | 'hydration_120' | 'focus_session' | 'eye_break_60' | 'posture_45' | 'outdoor_daily'
export type TimerCategory = 'health' | 'focus' | 'nutrition' | 'movement'
export type TimerPhase = 'counting_down' | 'warning' | 'expired' | 'completed' | 'cooldown'
export type QuestType = 'daily' | 'weekly' | 'monthly' | 'challenge' | 'location' | 'seasonal'
export type QuestCategory = 'movement' | 'knowledge' | 'focus' | 'nutrition' | 'exploration' | 'social'
export type Difficulty = 'trivial' | 'easy' | 'medium' | 'hard' | 'legendary'
export type MetricType = 'steps' | 'pages' | 'water_glasses' | 'focus_minutes' | 'sleep_hours' |
  'calories_deficit' | 'outdoor_minutes' | 'exercise_minutes' | 'learning_minutes' | 'meditation_minutes'
export type QuestPeriod = 'daily' | 'weekly' | 'monthly'
export type QuestStatus = 'active' | 'completed' | 'failed' | 'abandoned'
export type XpSource = 'quest_daily' | 'quest_weekly' | 'quest_location' | 'timer_window' |
  'streak_bonus' | 'streak_milestone' | 'level_up_bonus' | 'seasonal' | 'manual' | 'penalty'

export interface DailyQuestItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  xpReward: number;
  status: 'active' | 'completed' | 'locked';
  category: 'fitness' | 'mind' | 'health';
}

export interface DailyQuestRecord {
  id?: number;
  date: string; // format YYYY-MM-DD
  quests: DailyQuestItem[];
  completedCount: number;
  totalXpEarned: number;
  completedAt?: string;
}

export type HabitType =
  // Movement
  'steps_update' | 'exercise_session' | 'outdoor_start' | 'outdoor_end' |
  // Nutrition
  'meal_logged' | 'water_glass' | 'calorie_burn_rate_change' |
  // Sleep
  'sleep_start' | 'sleep_end' | 'sleep_quality_rated' |
  // Knowledge
  'reading_session' | 'learning_session' | 'podcast_session' |
  // Focus
  'focus_session_start' | 'focus_session_end' | 'social_media_block' |
  // Mood
  'mood_morning' | 'mood_evening' | 'energy_rated' |
  // Timer
  'timer_hit' | 'timer_miss' | 'timer_reset' |
  // Quest
  'quest_progress' | 'quest_complete' | 'gps_checkin' | 'photo_verified'

// ============= CORE ENTITIES =============

export interface Profile {
  id: 1

  // Identity
  heroName: string
  heroClass: HeroClass
  avatarEmoji: string
  createdAt: Date

  // Level & XP
  level: number
  xpTotal: number
  xpCurrentLevel: number
  xpToNextLevel: number

  // Attributes (0-100, recalculated daily at 00:00)
  vitality: number
  energy: number
  wisdom: number
  focus: number
  condition: number

  // Tokens (quick access)
  focusTokens: number

  // Master Streak
  masterStreak: number
  longestMasterStreak: number
  lastActiveDate: string // 'YYYY-MM-DD'

  // Configuration
  dailyCalorieBurnRate: number
  stepGoal: number
  waterGoal: number
  sleepGoal: number
  timezone: string
}

export interface CalorieEntry {
  id?: number
  timestamp: Date
  type: CalorieEventType
  value: number // kcal (positive = consumption, negative = burn)
  balanceAfter: number

  mealName?: string
  source: DataSource
  geminiConfidence?: number
  photoRef?: string
  linkedHabitLogId?: number
}

export interface DailyStats {
  date: string // 'YYYY-MM-DD' - PRIMARY KEY

  // Movement
  steps: number
  stepsSource: DataSource
  activeMinutes: number
  exerciseMinutes: number
  outdoorMinutes: number

  // Sleep
  sleepHours: number
  sleepQuality: number // 1-5
  bedtimeTimestamp?: Date
  wakeTimeTimestamp?: Date

  // Nutrition
  caloriesConsumed: number
  caloriesBurned: number
  calorieBalance: number
  waterGlasses: number
  mealsCount: number

  // Knowledge
  readingPages: number
  readingMinutes: number
  learningMinutes: number
  podcastMinutes: number

  // Focus
  focusMinutes: number
  focusSessionsCount: number
  screenTimeMinutes: number
  socialMediaMinutes: number
  focusTokensEarned: number
  meditationMinutes: number

  // Mood
  morningMood: number // 1-5
  eveningMood: number // 1-5
  energyLevel: number // 1-10

  // Gamification
  xpEarned: number
  questsCompleted: number
  timerWindowsHit: number
  timerWindowsMissed: number
  streakActive: boolean

  // Meta
  isComplete: boolean
  notes?: string
  updatedAt: Date
}

export interface TimerWindow {
  id: TimerWindowId

  // Definition
  label: string
  emoji: string
  durationMinutes: number
  category: TimerCategory

  // Current State
  phase: TimerPhase
  lastResetAt: Date
  nextDeadlineAt: Date
  secondsRemaining: number

  // Today's Stats
  completionsToday: number
  missesToday: number

  // Streak
  streakDays: number
  longestStreak: number

  // Rewards & Penalties
  xpOnHit: number
  xpOnMiss: number
  tokenReward?: string
  debuffOnMiss?: string

  // Configuration
  isEnabled: boolean
  activeHoursStart: number
  activeHoursEnd: number
  weekdaysOnly: boolean
  autoResetOnSleep: boolean

  updatedAt: Date
}

export interface AttributeBonus {
  attribute: string
  amount: number
}

export interface Quest {
  id?: number

  // Classification
  type: QuestType
  category: QuestCategory
  difficulty: Difficulty

  // Content
  title: string
  description: string
  emoji: string
  flavorText?: string

  // Target
  targetMetric: MetricType
  targetValue: number
  targetUnit: string

  // Rewards
  xpReward: number
  focusTokenReward: number
  attributeBonus: AttributeBonus[]
  specialReward?: string

  // Location (location quests only)
  isLocationBased: boolean
  locationName?: string
  locationLat?: number
  locationLng?: number
  locationRadiusMeters?: number
  photoRequired?: boolean
  photoVerificationPrompt?: string

  // Availability
  isRepeatable: boolean
  cooldownDays: number
  seasonalCampaignId?: string
  prerequisiteLevel?: number

  // Meta
  isActive: boolean
  timesCompleted: number
  createdAt: Date
}

export interface ActiveQuest {
  id?: number
  questId: number

  // When
  assignedDate: string // 'YYYY-MM-DD'
  period: QuestPeriod
  expiresAt: Date

  // Status
  status: QuestStatus
  currentProgress: number
  targetValue: number
  progressPercent: number

  // Completion
  completedAt?: Date
  xpAwarded?: number

  // GPS/Photo Verification
  gpsVerified?: boolean
  gpsVerifiedAt?: Date
  gpsLat?: number
  gpsLng?: number

  photoBlob?: Blob
  photoVerifiedAt?: Date
  geminiVerificationResult?: string
  geminiConfidence?: number

  // Meta
  source: 'auto_daily' | 'seasonal' | 'manual' | 'location_nearby'
  notes?: string
}

export interface XpEvent {
  id?: number
  timestamp: Date

  // Source
  source: XpSource
  amount: number // can be negative (penalty)
  description: string

  // State After
  xpTotalAfter: number
  levelBefore: number
  levelAfter: number

  // Links
  linkedQuestId?: number
  linkedTimerId?: string
  linkedDate: string // 'YYYY-MM-DD'
}

export interface TokenBalance {
  tokenType: string // PRIMARY KEY

  // State
  currentBalance: number
  totalEarned: number
  totalSpent: number

  // Meta
  emoji: string
  label: string
  description: string
  expiresAtMidnight: boolean
  lastUpdated: Date
}

export interface Waypoint {
  km: number
  name: string
  description: string
  emoji: string
  xpBonus: number
  isReached: boolean
  reachedAt?: Date
}

export interface Expedition {
  id?: number

  // Route
  name: string
  slug: string
  totalDistanceKm: number
  description: string
  coverEmoji: string
  difficulty: Difficulty

  // Progress
  currentPositionKm: number
  progressPercent: number
  isActive: boolean
  startedAt?: Date
  estimatedEndAt?: Date

  // Conversion
  stepsPerKm: number

  // Waypoints
  waypoints: Waypoint[]
}

export interface HabitLog {
  id?: number
  timestamp: Date

  // What
  habitType: HabitType
  value: number
  unit: string

  // Meta
  source: DataSource
  linkedQuestId?: number
  linkedTimerId?: string
  linkedDailyStatDate?: string
  metadata?: Record<string, unknown>
  syncedToDailyStats: boolean
}

export interface Streak {
  habitId: string // PRIMARY KEY
  label: string
  emoji: string

  // State
  currentStreak: number
  longestStreak: number
  lastActiveDate: string // 'YYYY-MM-DD'
  lastBrokenDate?: string

  // History
  totalDaysActive: number
  totalDaysMissed: number
  startDate: string

  // Milestones
  milestonesDone: number[] // [7, 30, 100, ...]
}

export interface SeasonalCampaign {
  id: string // PRIMARY KEY: 'march_2026_awakening'

  // Definition
  name: string
  theme: string
  startDate: string // 'YYYY-MM-DD'
  endDate: string
  coverEmoji: string

  // Seasonal Currency
  currencyName: string
  currencyEmoji: string
  currencyBalance: number
  currencyTotal: number

  // Quests
  mainQuestIds: number[]
  bonusQuestIds: number[]

  // Progress
  completionPercent: number
  mainQuestsCompleted: number
  isActive: boolean

  // Final Reward
  finalRewardDescription: string
  finalRewardUnlocked: boolean
}
