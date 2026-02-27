import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExpeditionPreview } from '../Expeditions/ExpeditionPreview'

export function ExpeditionTab() {
    const [modalData, setModalData] = useState<{ name: string } | null>(null)

    const handleZoneClick = (name: string) => {
        setModalData({ name })
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
            }}
            className="w-full min-h-screen px-4 safe-top pb-32 space-y-6 flex flex-col"
        >
            {/* 1. Header & Expedition Card */}
            <div className="pt-2">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 mb-4 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">
                    Eksploracja Świata
                </h1>
                <ExpeditionPreview />
            </div>

            {/* 2. Map Background with absolute pins */}
            <div className="relative w-full aspect-[9/16] max-h-[60vh] rounded-2xl overflow-hidden border border-white/20 shadow-glow-purple mx-auto bg-cosmic-bg/50">
                <img
                    src="/life-os-rpg/assets/map/map_world_bg.webp"
                    alt="World Map"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-[rgba(5,8,20,0.2)] pointer-events-none" />

                {/* Buttons */}
                <button
                    onClick={() => handleZoneClick('Health Sanctuary')}
                    className="absolute top-[20%] left-[15%] flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 group"
                >
                    <div className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full border-2 border-green-400 glow-green flex items-center justify-center text-xl hover:scale-110 transition-transform">
                        ❤️
                    </div>
                    <span className="text-[10px] font-bold mt-1 text-green-300 drop-shadow-md bg-black/40 px-2 py-0.5 rounded-full">Health</span>
                </button>

                <button
                    onClick={() => handleZoneClick('Knowledge Spire')}
                    className="absolute top-[25%] right-[15%] flex flex-col items-center justify-center transform translate-x-1/2 -translate-y-1/2 group"
                >
                    <div className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full border-2 border-blue-400 glow-blue flex items-center justify-center text-xl hover:scale-110 transition-transform">
                        📚
                    </div>
                    <span className="text-[10px] font-bold mt-1 text-blue-300 drop-shadow-md bg-black/40 px-2 py-0.5 rounded-full">Knowledge</span>
                </button>

                <button
                    onClick={() => handleZoneClick('Fitness Citadel')}
                    className="absolute bottom-[30%] left-[15%] flex flex-col items-center justify-center transform -translate-x-1/2 translate-y-1/2 group"
                >
                    <div className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full border-2 border-amber-400 glow-amber flex items-center justify-center text-xl hover:scale-110 transition-transform">
                        ⚔️
                    </div>
                    <span className="text-[10px] font-bold mt-1 text-amber-300 drop-shadow-md bg-black/40 px-2 py-0.5 rounded-full">Fitness</span>
                </button>

                <button
                    onClick={() => handleZoneClick('Focus Monastery')}
                    className="absolute bottom-[25%] right-[15%] flex flex-col items-center justify-center transform translate-x-1/2 translate-y-1/2 group"
                >
                    <div className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full border-2 border-purple-400 glow-purple flex items-center justify-center text-xl hover:scale-110 transition-transform">
                        🧘
                    </div>
                    <span className="text-[10px] font-bold mt-1 text-purple-300 drop-shadow-md bg-black/40 px-2 py-0.5 rounded-full">Focus</span>
                </button>

                {/* Center Base */}
                <button
                    onClick={() => handleZoneClick('Home Base')}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group"
                >
                    <div className="w-14 h-14 bg-black/80 backdrop-blur-md rounded-full border-2 border-orange-500 glow-pulse flex items-center justify-center text-2xl hover:scale-110 transition-transform">
                        🏕️
                    </div>
                    <span className="text-xs font-bold mt-1 text-orange-400 drop-shadow-md bg-black/60 px-2 py-1 rounded-full absolute -bottom-6 whitespace-nowrap left-1/2 transform -translate-x-1/2">Obóz</span>
                </button>

            </div>

            {/* Modal */}
            <AnimatePresence>
                {modalData && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-xs bg-cosmic-card rounded-2xl border border-white/10 p-6 text-center shadow-lg"
                        >
                            <h2 className="text-xl font-bold mb-2">{modalData.name}</h2>
                            <p className="text-gray-400 mb-6 text-sm">Nowa strefa wejdzie w życie w kolejnym sezonie.</p>
                            <button
                                onClick={() => setModalData(null)}
                                className="btn-primary w-full"
                            >
                                Zamknij
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
