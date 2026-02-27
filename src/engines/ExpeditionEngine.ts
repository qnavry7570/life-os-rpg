import { db } from '../db/database'
import { Trek, TREKS } from '../data/TrekDatabase'
import { ActiveExpedition } from '../db/types'

export const STEPS_TO_KM_DEFAULT = 1300; // override z Trek.stepsPerKm

export class ExpeditionEngine {

    static async getActiveExpedition(): Promise<ActiveExpedition | null> {
        return (await db.activeExpeditions.toCollection().first()) || null;
    }

    static async startExpedition(trekId: string): Promise<ActiveExpedition> {
        // Stop currently active, if any (we assume only one active at a time)
        await db.activeExpeditions.clear();

        const newExp: ActiveExpedition = {
            trekId,
            startedAt: new Date(),
            completedKm: 0,
            stepLogs: []
        };

        await db.activeExpeditions.add(newExp);
        return newExp;
    }

    static async addDailySteps(steps: number, date: string): Promise<{ kmAdded: number; newTotal: number; progressPercent: number } | null> {
        const exp = await this.getActiveExpedition();
        if (!exp) return null;

        const trek = TREKS.find(t => t.id === exp.trekId);
        if (!trek) return null;

        const kmAdded = steps / (trek.stepsPerKm || STEPS_TO_KM_DEFAULT);

        // Find existing log for today and update it, otherwise push new 
        const existingLog = exp.stepLogs.find(l => l.date === date);
        if (existingLog) {
            existingLog.steps += steps;
            existingLog.km += kmAdded;
        } else {
            exp.stepLogs.push({ date, steps, km: kmAdded });
        }

        exp.completedKm += kmAdded;
        if (exp.completedKm > trek.distanceKm) {
            exp.completedKm = trek.distanceKm; // Cap at max
        }

        // Store updated
        await db.activeExpeditions.clear();
        await db.activeExpeditions.add(exp);

        const progressPercent = (exp.completedKm / trek.distanceKm) * 100;
        return { kmAdded, newTotal: exp.completedKm, progressPercent };
    }

    static getProgressPercent(expedition: ActiveExpedition, trek: Trek): number {
        return Math.min(100, Math.max(0, (expedition.completedKm / trek.distanceKm) * 100));
    }

    static getEstimatedCompletion(expedition: ActiveExpedition, trek: Trek): Date | null {
        if (expedition.stepLogs.length === 0) return null;

        // Get average of last 7 entries (or fewer)
        const recentLogs = [...expedition.stepLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 7);
        const totalKmRecent = recentLogs.reduce((acc, log) => acc + log.km, 0);
        const avgKmPerDay = totalKmRecent / recentLogs.length;

        if (avgKmPerDay <= 0) return null;

        const remainingKm = trek.distanceKm - expedition.completedKm;
        const daysLeft = remainingKm / avgKmPerDay;

        const date = new Date();
        date.setDate(date.getDate() + daysLeft);
        return date;
    }

    static formatKm(km: number): string {
        if (km < 1) return `${Math.floor(km * 1000)}m`;
        if (km >= 1000) return `${(km / 1000).toFixed(1)}k km`;
        return `${km.toFixed(1)} km`;
    }
}
