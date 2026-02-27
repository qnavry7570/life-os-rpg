import { db, getTodayDateString } from './database'
import type { TimerWindow, Quest, TokenBalance, Expedition, Waypoint } from './types'

export async function seedDatabase() {
  // Check if already seeded
  const profileCount = await db.profile.count()
  if (profileCount > 0) {
    console.log('✅ Database already initialized')
    return
  }

  console.log('🌱 Seeding Life OS Database...')

  // ========== PROFILE ==========
  await db.profile.add({
    id: 1,
    heroName: 'Odkrywca',
    heroClass: 'Explorer',
    avatarEmoji: '🧙‍♂️',
    createdAt: new Date(),
    level: 1,
    xpTotal: 0,
    xpCurrentLevel: 0,
    xpToNextLevel: 100,
    vitality: 50,
    energy: 50,
    wisdom: 50,
    focus: 50,
    condition: 50,
    focusTokens: 0,
    masterStreak: 0,
    longestMasterStreak: 0,
    lastActiveDate: '',
    dailyCalorieBurnRate: 80,
    stepGoal: 8000,
    waterGoal: 8,
    sleepGoal: 7.5,
    timezone: 'Europe/Warsaw',
  })

  // ========== TIMER WINDOWS ==========
  const now = new Date()
  const timers: TimerWindow[] = [
    {
      id: 'movement_90',
      label: 'Okno Ruchu',
      emoji: '🚶',
      durationMinutes: 90,
      category: 'movement',
      phase: 'counting_down',
      lastResetAt: now,
      nextDeadlineAt: new Date(now.getTime() + 90 * 60000),
      secondsRemaining: 90 * 60,
      completionsToday: 0,
      missesToday: 0,
      streakDays: 0,
      longestStreak: 0,
      xpOnHit: 50,
      xpOnMiss: -10,
      debuffOnMiss: 'Energia -5%',
      isEnabled: true,
      activeHoursStart: 7,
      activeHoursEnd: 22,
      weekdaysOnly: false,
      autoResetOnSleep: true,
      updatedAt: now,
    },
    {
      id: 'hydration_120',
      label: 'Nawodnienie',
      emoji: '💧',
      durationMinutes: 120,
      category: 'nutrition',
      phase: 'counting_down',
      lastResetAt: now,
      nextDeadlineAt: new Date(now.getTime() + 120 * 60000),
      secondsRemaining: 120 * 60,
      completionsToday: 0,
      missesToday: 0,
      streakDays: 0,
      longestStreak: 0,
      xpOnHit: 30,
      xpOnMiss: -5,
      tokenReward: 'hydration',
      debuffOnMiss: 'Focus -3%',
      isEnabled: true,
      activeHoursStart: 7,
      activeHoursEnd: 22,
      weekdaysOnly: false,
      autoResetOnSleep: true,
      updatedAt: now,
    },
    {
      id: 'focus_session',
      label: 'Sesja Fokusowa',
      emoji: '🎯',
      durationMinutes: 60,
      category: 'focus',
      phase: 'counting_down',
      lastResetAt: now,
      nextDeadlineAt: new Date(now.getTime() + 60 * 60000),
      secondsRemaining: 0,
      completionsToday: 0,
      missesToday: 0,
      streakDays: 0,
      longestStreak: 0,
      xpOnHit: 80,
      xpOnMiss: 0,
      tokenReward: 'focus',
      isEnabled: true,
      activeHoursStart: 6,
      activeHoursEnd: 23,
      weekdaysOnly: false,
      autoResetOnSleep: false,
      updatedAt: now,
    },
  ]
  await db.timerWindows.bulkAdd(timers)

  // ========== TOKENS ==========
  const tokens: TokenBalance[] = [
    {
      tokenType: 'focus',
      currentBalance: 0,
      totalEarned: 0,
      totalSpent: 0,
      emoji: '🎯',
      label: 'Focus Token',
      description: 'Aktywuj Deep Work Mode (2x XP przez 2h)',
      expiresAtMidnight: false,
      lastUpdated: now,
    },
    {
      tokenType: 'nature',
      currentBalance: 0,
      totalEarned: 0,
      totalSpent: 0,
      emoji: '🌿',
      label: 'Nature Token',
      description: 'Bonus regeneracji HRV',
      expiresAtMidnight: false,
      lastUpdated: now,
    },
    {
      tokenType: 'knowledge',
      currentBalance: 0,
      totalEarned: 0,
      totalSpent: 0,
      emoji: '📚',
      label: 'Knowledge Token',
      description: '2x XP za naukę przez 1h',
      expiresAtMidnight: false,
      lastUpdated: now,
    },
  ]
  await db.tokenBalance.bulkAdd(tokens)

  // ========== DAILY QUESTS LIBRARY ==========
  const quests: Omit<Quest, 'id'>[] = [
    {
      type: 'daily',
      category: 'movement',
      difficulty: 'easy',
      title: 'Codzienny Marsz',
      description: 'Osiągnij 8,000 kroków przed końcem dnia',
      emoji: '🚶',
      flavorText: 'Odkrywca wyrusza w trasę każdego dnia',
      targetMetric: 'steps',
      targetValue: 8000,
      targetUnit: 'kroków',
      xpReward: 100,
      focusTokenReward: 0,
      attributeBonus: [{ attribute: 'condition', amount: 2 }],
      isLocationBased: false,
      isRepeatable: true,
      cooldownDays: 0,
      isActive: true,
      timesCompleted: 0,
      createdAt: now,
    },
    {
      type: 'daily',
      category: 'knowledge',
      difficulty: 'easy',
      title: 'Czytelnik',
      description: 'Przeczytaj 20 stron książki lub artykułu',
      emoji: '📚',
      targetMetric: 'pages',
      targetValue: 20,
      targetUnit: 'stron',
      xpReward: 80,
      focusTokenReward: 0,
      attributeBonus: [{ attribute: 'wisdom', amount: 3 }],
      isLocationBased: false,
      isRepeatable: true,
      cooldownDays: 0,
      isActive: true,
      timesCompleted: 0,
      createdAt: now,
    },
    {
      type: 'daily',
      category: 'nutrition',
      difficulty: 'trivial',
      title: 'Nawodnienie Mistrza',
      description: 'Wypij 8 szklanek wody',
      emoji: '💧',
      targetMetric: 'water_glasses',
      targetValue: 8,
      targetUnit: 'szklanek',
      xpReward: 50,
      focusTokenReward: 0,
      attributeBonus: [{ attribute: 'vitality', amount: 2 }],
      isLocationBased: false,
      isRepeatable: true,
      cooldownDays: 0,
      isActive: true,
      timesCompleted: 0,
      createdAt: now,
    },
    {
      type: 'daily',
      category: 'focus',
      difficulty: 'medium',
      title: 'Sesja Głębokiej Pracy',
      description: 'Skoncentruj się przez 60 minut bez przerw',
      emoji: '🎯',
      targetMetric: 'focus_minutes',
      targetValue: 60,
      targetUnit: 'minut',
      xpReward: 120,
      focusTokenReward: 2,
      attributeBonus: [{ attribute: 'focus', amount: 5 }],
      isLocationBased: false,
      isRepeatable: true,
      cooldownDays: 0,
      isActive: true,
      timesCompleted: 0,
      createdAt: now,
    },
    {
      type: 'daily',
      category: 'movement',
      difficulty: 'medium',
      title: 'Wyprawa na Świeże Powietrze',
      description: 'Spędź 30 minut na zewnątrz',
      emoji: '🌿',
      targetMetric: 'outdoor_minutes',
      targetValue: 30,
      targetUnit: 'minut',
      xpReward: 90,
      focusTokenReward: 0,
      attributeBonus: [
        { attribute: 'vitality', amount: 2 },
        { attribute: 'energy', amount: 3 },
      ],
      isLocationBased: false,
      isRepeatable: true,
      cooldownDays: 0,
      isActive: true,
      timesCompleted: 0,
      createdAt: now,
    },
    {
      type: 'weekly',
      category: 'exploration',
      difficulty: 'hard',
      title: 'Odkrywca Okolicy',
      description: 'Odwiedź 3 nowe miejsca w promieniu 5km',
      emoji: '🗺️',
      targetMetric: 'steps',
      targetValue: 3,
      targetUnit: 'lokalizacji',
      xpReward: 500,
      focusTokenReward: 0,
      attributeBonus: [{ attribute: 'condition', amount: 10 }],
      isLocationBased: true,
      photoRequired: true,
      photoVerificationPrompt: 'Verify this is an outdoor location photo',
      isRepeatable: true,
      cooldownDays: 7,
      isActive: true,
      timesCompleted: 0,
      createdAt: now,
    },
  ]

  for (const quest of quests) {
    await db.quests.add(quest as Quest)
  }

  // ========== EXPEDITION - CAMINO DE SANTIAGO ==========
  const waypoints: Waypoint[] = [
    {
      km: 0,
      name: 'Saint-Jean-Pied-de-Port',
      description: 'Punkt startowy w Pirenejach',
      emoji: '🏁',
      xpBonus: 100,
      isReached: true,
      reachedAt: now,
    },
    {
      km: 75,
      name: 'Pamplona',
      description: 'Miasto byków',
      emoji: '🐂',
      xpBonus: 200,
      isReached: false,
    },
    {
      km: 180,
      name: 'Logroño',
      description: 'Serce La Rioja',
      emoji: '🍷',
      xpBonus: 300,
      isReached: false,
    },
    {
      km: 340,
      name: 'Burgos',
      description: 'Katedra gotycka',
      emoji: '⛪',
      xpBonus: 400,
      isReached: false,
    },
    {
      km: 490,
      name: 'León',
      description: 'Witraże w katedrze',
      emoji: '🌈',
      xpBonus: 500,
      isReached: false,
    },
    {
      km: 650,
      name: 'Sarria',
      description: 'Ostatnie 100km',
      emoji: '🎯',
      xpBonus: 600,
      isReached: false,
    },
    {
      km: 780,
      name: 'Santiago de Compostela',
      description: 'CEL!',
      emoji: '🏆',
      xpBonus: 2000,
      isReached: false,
    },
  ]

  const expedition: Omit<Expedition, 'id'> = {
    name: 'Camino de Santiago',
    slug: 'camino_de_santiago',
    totalDistanceKm: 780,
    description: 'Legendarna pielgrzymka przez północną Hiszpanię',
    coverEmoji: '🌄',
    difficulty: 'medium',
    currentPositionKm: 0,
    progressPercent: 0,
    isActive: true,
    startedAt: now,
    stepsPerKm: 1300,
    waypoints,
  }
  await db.expeditions.add(expedition as Expedition)

  // ========== INITIALIZE TODAY'S STATS ==========
  const today = getTodayDateString()
  await db.dailyStats.add({
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
  })

  // ========== GENERATE TODAY'S DAILY QUESTS ==========
  const dailyQuests = await db.quests
    .where('type')
    .equals('daily')
    .and(q => q.isActive)
    .limit(5)
    .toArray()

  for (const quest of dailyQuests) {
    if (quest.id) {
      await db.activeQuests.add({
        questId: quest.id,
        assignedDate: today,
        period: 'daily',
        expiresAt: new Date(new Date().setHours(23, 59, 59, 999)),
        status: 'active',
        currentProgress: 0,
        targetValue: quest.targetValue,
        progressPercent: 0,
        source: 'auto_daily',
      })
    }
  }

  console.log('✅ Life OS Database seeded successfully!')
  console.log(`   - Profile: Odkrywca Level 1`)
  console.log(`   - Timers: 3 active windows`)
  console.log(`   - Tokens: 3 types initialized`)
  console.log(`   - Quests: ${quests.length} in library, 5 active today`)
  console.log(`   - Expedition: Camino de Santiago (780km)`)
  console.log(`   - Daily Stats: ${today} initialized`)
}
