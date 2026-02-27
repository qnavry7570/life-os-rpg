import { motion } from 'framer-motion'
import { useImagePreload } from '../../hooks/useImagePreload'
import { HealthZone } from './HealthZone'
import { useLifeOSStore } from '../../store/lifeOsStore'

export function HealthTab() {
    const { isLoaded, error } = useImagePreload('assets/health/health_sanctuary_bg.webp')
    const { todayStats, currentCalorieBalance } = useLifeOSStore()
    const activeQuests = useLifeOSStore(state => state.activeQuests)

    const healthQuests = activeQuests.filter(q => q.notes === 'health' || q.targetValue > 0) // Basic filter for now

    // Background skeleton
    if (!isLoaded && !error) {
        return (
            <div className="min-h-screen animate-pulse bg-cosmic-bg/80 flex flex-col p-4 gap-4 pb-24">
                <div className="h-32 bg-white/5 rounded-2xl w-full" />
                <div className="h-32 bg-white/5 rounded-2xl w-full" />
                <div className="h-32 bg-white/5 rounded-2xl w-full" />
            </div>
        )
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
            }}
            className="relative min-h-screen pb-24"
        >
            {/* Background Image restricted to HealthTab */}
            <div
                className="fixed inset-0 bg-cover bg-center z-[-2]"
                style={{ backgroundImage: "url('assets/health/health_sanctuary_bg.webp')" }}
            />
            <div className="fixed inset-0 bg-[rgba(5,15,10,0.80)] z-[-1]" />

            <div className="p-4 space-y-4 safe-top">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600 mb-6 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                    Health Sanctuary
                </h1>

                {/* Dashboard Cards Grid */}
                <div className="grid grid-cols-2 gap-4">

                    {/* Calorie Balance */}
                    <div className="col-span-2 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 glow-green flex flex-col items-center justify-center">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Calorie Balance</span>
                        <span className="text-3xl font-black text-emerald-400 drop-shadow-[0_0_8px_#34d399]">
                            {currentCalorieBalance > 0 ? `+${Math.floor(currentCalorieBalance)}` : Math.floor(currentCalorieBalance)}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">kcal available</span>
                    </div>

                    {/* Steps */}
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 glow-green flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Steps Today</span>
                        <span className="text-2xl font-bold text-green-400 drop-shadow-[0_0_8px_#4ade80]">
                            {todayStats?.steps.toLocaleString() || 0}
                        </span>
                    </div>

                    {/* Water */}
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 glow-cyan flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Hydration</span>
                        <span className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_8px_#22d3ee]">
                            {todayStats?.waterGlasses || 0} / 8
                        </span>
                        <span className="text-[10px] text-gray-500 mt-1">glasses</span>
                    </div>

                    {/* Sleep */}
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 glow-blue flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sleep Status</span>
                        <span className="text-2xl font-bold text-blue-400 drop-shadow-[0_0_8px_#60a5fa]">
                            {todayStats?.sleepHours || '0.0'}h
                        </span>
                    </div>

                    {/* Heart Rate Placeholder */}
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 glow-red flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Resting HR</span>
                        <span className="text-2xl font-bold text-red-500 drop-shadow-[0_0_8px_#ef4444] animate-pulse">
                            -- bpm
                        </span>
                    </div>
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
    )
}
