import { db, getTodayDateString, xpForLevel, levelFromXp } from '../db/database'
import type { DailyQuestItem, DailyQuestRecord, XpSource } from '../db/types'

export class QuestEngine {

    // 1. Generate new quests if they don't exist
    static generateDailyQuests(): DailyQuestItem[] {
        return [
            {
                id: 'quest_steps',
                title: 'Steps Challenge',
                description: 'Zrób 8000 kroków aby zdobyć XP',
                icon: '🚶',
                targetValue: 8000,
                currentValue: 0,
                unit: 'kroków',
                xpReward: 150,
                status: 'active',
                category: 'fitness',
            },
            {
                id: 'quest_calorie',
                title: 'Calorie Burner',
                description: 'Spal aktywnie 300 kcal',
                icon: '🔥',
                targetValue: 300,
                currentValue: 0,
                unit: 'kcal',
                xpReward: 200,
                status: 'active',
                category: 'fitness',
            },
            {
                id: 'quest_focus',
                title: 'Focus Session',
                description: 'Utrzymaj skupienie przez 25 minut',
                icon: '🧠',
                targetValue: 25,
                currentValue: 0,
                unit: 'min',
                xpReward: 180,
                status: 'active',
                category: 'mind',
            },
        ]
    }

    // 2. Fetch or initialize today's record
    static async getActiveDailyQuests(date: string): Promise<DailyQuestRecord> {
        let record = await db.dailyQuests.get(date)

        if (!record) {
            record = {
                date,
                quests: this.generateDailyQuests(),
                completedCount: 0,
                totalXpEarned: 0,
            }
            await db.dailyQuests.add(record)
        }

        return record
    }

    // 3. Central check: runs every 5 minutes to sync with DailyStats
    static async checkAndUpdateQuests(): Promise<void> {
        const today = getTodayDateString()
        const stats = await db.dailyStats.get(today)
        if (!stats) return

        const record = await this.getActiveDailyQuests(today)
        if (record.completedCount >= 3) return // All done

        let updated = false
        let newlyCompleted = 0
        let newXp = 0

        // Update Step Quest
        const stepQuest = record.quests.find(q => q.id === 'quest_steps')
        if (stepQuest && stepQuest.status === 'active') {
            stepQuest.currentValue = stats.steps
            if (stepQuest.currentValue >= stepQuest.targetValue) {
                stepQuest.currentValue = stepQuest.targetValue
                stepQuest.status = 'completed'
                newlyCompleted++
                newXp += stepQuest.xpReward
            }
            updated = true
        }

        // Update Calorie Quest (caloriesBurned covers active burn in DailyStats)
        const calQuest = record.quests.find(q => q.id === 'quest_calorie')
        if (calQuest && calQuest.status === 'active') {
            calQuest.currentValue = stats.caloriesBurned
            if (calQuest.currentValue >= calQuest.targetValue) {
                calQuest.currentValue = calQuest.targetValue
                calQuest.status = 'completed'
                newlyCompleted++
                newXp += calQuest.xpReward
            }
            updated = true
        }

        // Update Focus Quest
        const focusQuest = record.quests.find(q => q.id === 'quest_focus')
        if (focusQuest && focusQuest.status === 'active') {
            focusQuest.currentValue = stats.focusMinutes
            if (focusQuest.currentValue >= focusQuest.targetValue) {
                focusQuest.currentValue = focusQuest.targetValue
                focusQuest.status = 'completed'
                newlyCompleted++
                newXp += focusQuest.xpReward
            }
            updated = true
        }

        if (updated) {
            record.completedCount += newlyCompleted
            record.totalXpEarned += newXp

            if (record.completedCount === 3 && newlyCompleted > 0) {
                record.completedAt = new Date().toISOString()
                // Bonus XP for finishing all 3 could be placed here if desired
            }

            await db.dailyQuests.update(record.id!, record)

            // Award XP to profile for newly completed quests
            if (newlyCompleted > 0) {
                await this.awardQuestXP(newXp)
            }
        }
    }

    // Helper to sync awarded XP to Profile (similar to lifeOsStore.awardXp)
    private static async awardQuestXP(amount: number): Promise<void> {
        const profile = await db.profile.get(1)
        const today = getTodayDateString()
        const stats = await db.dailyStats.get(today)

        if (!profile || !stats) return

        const now = new Date()
        const newXpTotal = profile.xpTotal + amount
        const newLevel = levelFromXp(newXpTotal)
        const xpForCurrentLevel = xpForLevel(newLevel)
        const xpForNextLevel = xpForLevel(newLevel + 1)

        await db.xpEvents.add({
            timestamp: now,
            source: 'quest_daily' as XpSource,
            amount,
            description: 'Daily Quest Reward',
            xpTotalAfter: newXpTotal,
            levelBefore: profile.level,
            levelAfter: newLevel,
            linkedDate: today,
        })

        await db.profile.update(1, {
            xpTotal: newXpTotal,
            xpCurrentLevel: newXpTotal - xpForCurrentLevel,
            xpToNextLevel: xpForNextLevel - newXpTotal,
            level: newLevel,
        })

        await db.dailyStats.update(today, {
            xpEarned: stats.xpEarned + amount,
        })
    }

    // 4. Return total XP earned historically from DailyQuests
    static async getTotalXPEarned(): Promise<number> {
        const allRecords = await db.dailyQuests.toArray()
        return allRecords.reduce((sum, record) => sum + record.totalXpEarned, 0)
    }
}
