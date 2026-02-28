import { db, dbReady } from '../db/database'

export interface HydrationState {
    id?: number;
    date: string; // YYYY-MM-DD
    currentMl: number;
    goalMl: number;
    lastDrinkAt: Date | null;
    drainPerHour: number; // default 100
    logs: { time: Date; amount: number }[];
}

export const GOAL_OPTIONS = [1500, 2000, 2400, 3000];

export class HydrationEngine {
    static async getTodayState(): Promise<HydrationState> {
        await dbReady;
        const today = new Date().toISOString().split('T')[0];
        let state = await db.hydration.get(today);

        if (!state) {
            const savedGoal = parseInt(localStorage.getItem('lifeos_hydration_goal') || '2000');
            state = {
                date: today,
                currentMl: 0,
                goalMl: GOAL_OPTIONS.includes(savedGoal) ? savedGoal : 2000,
                lastDrinkAt: null,
                drainPerHour: 100,
                logs: []
            };
            await db.hydration.put(state);
        }
        return state;
    }

    static async addWater(ml: number): Promise<HydrationState> {
        await dbReady;
        const state = await this.getTodayState();
        const now = new Date();

        state.currentMl += ml;
        state.lastDrinkAt = now;
        state.logs.push({ time: now, amount: ml });

        await db.hydration.put(state);
        return state;
    }

    static getDrainedSince(lastDrink: Date | null, drainPerHour: number): number {
        if (!lastDrink) return 0;
        const diffMs = new Date().getTime() - new Date(lastDrink).getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        return Math.floor(diffHours * drainPerHour);
    }

    static getEffectiveMl(state: HydrationState): number {
        const drained = this.getDrainedSince(state.lastDrinkAt, state.drainPerHour);
        return Math.max(0, state.currentMl - drained);
    }

    static getPercent(state: HydrationState): number {
        const effective = this.getEffectiveMl(state);
        return Math.min(100, Math.max(0, (effective / state.goalMl) * 100));
    }

    static getDrainAlert(state: HydrationState): { minutesLeft: number; severity: 'ok' | 'warning' | 'danger' } {
        const effective = this.getEffectiveMl(state);
        const percent = (effective / state.goalMl) * 100;

        const drainPerMinute = state.drainPerHour / 60;

        // Calculate minutes until it drops below 50%
        const targetMl = state.goalMl * 0.5;
        let diffToTarget = effective - targetMl;

        let minutesLeft = 0;
        if (diffToTarget > 0 && drainPerMinute > 0) {
            minutesLeft = Math.floor(diffToTarget / drainPerMinute);
        }

        let severity: 'ok' | 'warning' | 'danger' = 'ok';
        if (percent < 30) severity = 'danger';
        else if (percent < 60) severity = 'warning';

        return { minutesLeft, severity };
    }

    static async updateGoal(newGoal: number): Promise<HydrationState> {
        await dbReady;
        const state = await this.getTodayState();
        state.goalMl = newGoal;
        localStorage.setItem('lifeos_hydration_goal', newGoal.toString());
        await db.hydration.put(state);
        return state;
    }
}
