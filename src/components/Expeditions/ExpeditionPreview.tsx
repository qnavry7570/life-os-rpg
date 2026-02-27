import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { db } from '../../db/database'
import type { Expedition } from '../../db/types'
import { useLifeOSStore } from '../../store/lifeOsStore'

export function ExpeditionPreview() {
    const [activeExpedition, setActiveExpedition] = useState<Expedition | null>(null)
    const todayStats = useLifeOSStore(state => state.todayStats)

    useEffect(() => {
        // Load active expedition from IndexedDB
        const loadExpedition = async () => {
            const all = await db.expeditions.toArray()
            const active = all.find(e => e.isActive)
            if (active) setActiveExpedition(active)
        }
        loadExpedition()
    }, [])

    const stepsToday = todayStats?.steps || 0
    const kmToday = (stepsToday * 0.0008).toFixed(1)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full aspect-video rounded-xl overflow-hidden relative border border-white/20 shadow-glow-blue glow-cyan"
        >
            <div className="absolute inset-0 z-0">
                <img
                    src="assets/expeditions/trail_camino.webp"
                    alt="Trail Background"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col justify-end p-4 pb-5">
                {!activeExpedition ? (
                    <div className="text-center bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10 glow-amber flex flex-col items-center gap-2">
                        <h3 className="font-bold text-lg text-amber-400">Camino de Santiago</h3>
                        <p className="text-xs text-gray-300">Zacznij 800-kilometrową wędrówkę na podstawie swoich codziennych kroków.</p>
                        <button className="btn-primary w-full mt-2 shadow-glow-amber bg-amber-600 hover:bg-amber-500 text-white">Rozpocznij Wyprawę</button>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <h3 className="text-lg font-bold text-white drop-shadow-md flex items-center gap-2">
                                    <span>{activeExpedition.coverEmoji}</span>
                                    {activeExpedition.name}
                                </h3>
                                <p className="text-sm font-medium text-emerald-300 drop-shadow-sm">
                                    Kroki dzisiaj dodały: +{kmToday} km
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="text-xs text-gray-300 uppercase block">Progres</span>
                                <span className="text-xl font-bold text-white glow-cyan">
                                    {Math.floor(activeExpedition.currentPositionKm)} <span className="text-sm text-gray-400">/ {activeExpedition.totalDistanceKm}km</span>
                                </span>
                            </div>
                        </div>

                        <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/20 shadow-inner">
                            <div
                                className="h-full bg-cosmic-cyan glow-cyan"
                                style={{ width: `${Math.min(activeExpedition.progressPercent, 100)}%` }}
                            />
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    )
}
