import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings } from 'lucide-react'
import { useImagePreload } from '../../hooks/useImagePreload'
import { HealthZone } from './HealthZone'
import { useLifeOSStore } from '../../store/lifeOsStore'
import { HydrationEngine, HydrationState, GOAL_OPTIONS } from '../../engines/HydrationEngine'

export function HealthTab() {
    const { isLoaded, error } = useImagePreload('/life-os-rpg/assets/backgrounds/bg_health.webp')
    const { todayStats, currentCalorieBalance } = useLifeOSStore()
    const activeQuests = useLifeOSStore(state => state.activeQuests)

    const healthQuests = activeQuests.filter(q => q.notes === 'health' || q.targetValue > 0) // Basic filter for now

    const isPreview = new URLSearchParams(window.location.search).get('preview') === 'true'

    // Mock data for preview mode
    const mockHealth = {
        water: { current: 5, goal: 8 },
        sleep: { hours: 7.5, quality: 85 },
        weight: { current: 75, goal: 72 },
        steps: 7500,
        calorieBalance: 350
    }

    const displaySteps = isPreview ? mockHealth.steps : (todayStats?.steps || 0)
    const displaySleep = isPreview ? mockHealth.sleep.hours : (todayStats?.sleepHours || '0.0')
    const displayCalories = isPreview ? mockHealth.calorieBalance : currentCalorieBalance

    const [hydration, setHydration] = useState<HydrationState | null>(null);
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [, setTicker] = useState(0);

    useEffect(() => {
        if (isPreview) {
            const mock: HydrationState = {
                date: new Date().toISOString().split('T')[0],
                currentMl: 1400,
                goalMl: 2400,
                lastDrinkAt: new Date(Date.now() - 14 * 60000), // 14 mins ago
                drainPerHour: 100,
                logs: []
            };
            setHydration(mock);
        } else {
            HydrationEngine.getTodayState().then(setHydration);
        }

        const interval = setInterval(() => setTicker(t => t + 1), 60000);
        return () => clearInterval(interval);
    }, [isPreview]);

    const handleAddWater = async (amount: number) => {
        if (isPreview) {
            setHydration(prev => {
                if (!prev) return prev;
                return { ...prev, currentMl: prev.currentMl + amount, lastDrinkAt: new Date() };
            });
        } else {
            const newState = await HydrationEngine.addWater(amount);
            setHydration(newState);
        }
    };

    const handleSetGoal = async (goal: number) => {
        if (isPreview) {
            setHydration(prev => prev ? { ...prev, goalMl: goal } : prev);
        } else {
            const newState = await HydrationEngine.updateGoal(goal);
            setHydration(newState);
        }
        setShowGoalModal(false);
    };

    const effectiveMl = hydration ? HydrationEngine.getEffectiveMl(hydration) : 0;
    const fillPercent = hydration ? HydrationEngine.getPercent(hydration) : 0;
    const { minutesLeft, severity } = hydration ? HydrationEngine.getDrainAlert(hydration) : { minutesLeft: 0, severity: 'ok' };
    const lastDrinkMin = hydration?.lastDrinkAt ? Math.floor((Date.now() - new Date(hydration.lastDrinkAt).getTime()) / 60000) : 0;

    let progressColor = 'bg-cyan-500';
    let glowColor = 'glow-cyan';
    if (fillPercent < 40) { progressColor = 'bg-red-500 animate-pulse'; glowColor = 'glow-red'; }
    else if (fillPercent < 70) { progressColor = 'bg-yellow-500'; glowColor = 'glow-amber'; }

    // Background skeleton
    if (!isLoaded && !error && !isPreview) {
        return (
            <div className="min-h-screen animate-pulse bg-cosmic-bg/80 flex flex-col p-4 gap-4 pb-24">
                <div className="h-32 bg-white/5 rounded-2xl w-full" />
                <div className="h-32 bg-white/5 rounded-2xl w-full" />
                <div className="h-32 bg-white/5 rounded-2xl w-full" />
            </div>
        )
    }

    return (
        <>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                }}
                className="relative min-h-screen pb-24"
            >
                {/* Background Image restricted to HealthTab with CSS gradient fallback */}
                <div
                    className="fixed inset-0 bg-cover bg-center z-[-2]"
                    style={{
                        backgroundImage: "url('/life-os-rpg/assets/backgrounds/bg_health.webp')",
                        background: isLoaded ? "url('/life-os-rpg/assets/backgrounds/bg_health.webp')" : "linear-gradient(135deg, #0a1628 0%, #0d2818 50%, #1a0a28 100%)",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                <div className="fixed inset-0 bg-[rgba(5,15,10,0.45)] z-[-1]" />

                <div className="p-4 space-y-4 safe-top">
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600 mb-6 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                        Health Sanctuary
                    </h1>

                    {/* Dashboard Cards Grid */}
                    <div className="grid grid-cols-2 gap-4">

                        {/* Calorie Balance */}
                        <div className="col-span-2 backdrop-blur-sm bg-white/5 border border-white/10 text-white rounded-xl p-4 glow-green flex flex-col items-center justify-center">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Calorie Balance</span>
                            <span className="text-3xl font-black text-emerald-400 drop-shadow-[0_0_8px_#34d399]">
                                {displayCalories > 0 ? `+${Math.floor(displayCalories)}` : Math.floor(displayCalories)}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">kcal available</span>
                        </div>

                        {/* Steps */}
                        <div className="backdrop-blur-sm bg-white/5 border border-white/10 text-white rounded-xl p-4 glow-green flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Steps Today</span>
                            <span className="text-2xl font-bold text-green-400 drop-shadow-[0_0_8px_#4ade80]">
                                {displaySteps.toLocaleString()}
                            </span>
                        </div>

                        {/* Hydration Widget 2.0 */}
                        <div className={`col-span-2 backdrop-blur-sm bg-white/5 border border-white/10 text-white rounded-xl p-4 flex flex-col ${glowColor}`}>
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                                    💧 NAWODNIENIE
                                    {fillPercent < 50 && <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-0.5 rounded-full border border-red-500/30">💀 -10% XP</span>}
                                </h2>
                                <button onClick={() => setShowGoalModal(true)} className="text-gray-400 hover:text-white transition-colors">
                                    <Settings className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative w-full h-6 bg-black/40 rounded-full border border-white/10 overflow-hidden mb-3">
                                <motion.div
                                    className={`h-full ${progressColor}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${fillPercent}%` }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white shadow-black drop-shadow-md">
                                    {Math.floor(effectiveMl).toLocaleString()} / {hydration?.goalMl?.toLocaleString() || 2400} ml
                                </div>
                            </div>

                            {/* Add Buttons */}
                            <div className="flex gap-2 mb-3">
                                {[100, 200, 330, 500].map(amount => (
                                    <button
                                        key={amount}
                                        onClick={() => handleAddWater(amount)}
                                        className="flex-1 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
                                    >
                                        +{amount}
                                    </button>
                                ))}
                            </div>

                            {/* Info Row */}
                            <div className="flex justify-between text-[10px] text-gray-400 border-t border-white/5 pt-2">
                                <span>⏰ Odpływ: -{hydration?.drainPerHour || 100}ml/h</span>
                                <span>Ostatnie: {hydration?.lastDrinkAt ? `${lastDrinkMin} min` : 'nigdy'}</span>
                            </div>

                            {/* Warnings */}
                            <AnimatePresence>
                                {(severity === 'warning' || severity === 'danger') && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={`mt-2 text-[10px] p-2 rounded-lg border text-center ${severity === 'danger' ? 'bg-red-500/20 border-red-500/50 text-red-300' : 'bg-amber-500/20 border-amber-500/50 text-amber-300'}`}
                                    >
                                        ⚠️ Za {minutesLeft} min spadniesz poniżej 50%!
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Sleep */}
                        <div className="backdrop-blur-sm bg-white/5 border border-white/10 text-white rounded-xl p-4 glow-blue flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sleep Status</span>
                            <span className="text-2xl font-bold text-blue-400 drop-shadow-[0_0_8px_#60a5fa]">
                                {displaySleep}h
                            </span>
                        </div>

                        {/* HR hidden — future Garmin integration */}
                        {false && (
                            <div className="backdrop-blur-sm bg-white/5 border border-white/10 text-white rounded-xl p-4 glow-red flex flex-col">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Resting HR</span>
                                <span className="text-2xl font-bold text-red-500 drop-shadow-[0_0_8px_#ef4444] animate-pulse">
                                    -- bpm
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Existing Health Zone Content */}
                    <div className="mt-8 pt-4 border-t border-white/10">
                        <HealthZone onBack={() => { }} />
                    </div>

                    {/* Active Quests */}
                    <div className="mt-8">
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">⚕️ Health Quests</h2>
                        <div className="space-y-3">
                            {healthQuests.length > 0 ? (
                                healthQuests.map(quest => (
                                    <div key={quest.id} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 flex justify-between items-center">
                                        <div className="flex-1">
                                            <p className="font-bold text-sm text-white">Active Quest Tracking</p>
                                            <div className="w-full bg-black/40 h-2 rounded-full mt-2 overflow-hidden border border-white/5">
                                                <div
                                                    className="h-full bg-emerald-500 glow-green"
                                                    style={{ width: `${quest.progressPercent}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10 text-gray-500 text-sm italic">
                                    No active health quests entirely focused on healing. Resting is valid.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Goal Modal */}
            <AnimatePresence>
                {showGoalModal && (
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
                            className="w-full max-w-sm bg-cosmic-bg rounded-3xl border border-white/10 p-5"
                        >
                            <h2 className="text-xl font-bold text-center mb-6">Wybierz Cel Nawodnienia</h2>
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {GOAL_OPTIONS.map(goal => (
                                    <button
                                        key={goal}
                                        onClick={() => handleSetGoal(goal)}
                                        className={`py-3 rounded-xl border font-bold ${hydration?.goalMl === goal ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 glow-cyan' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                    >
                                        {goal} ml
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowGoalModal(false)}
                                className="w-full py-3 text-sm font-medium text-gray-500 hover:text-white"
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
