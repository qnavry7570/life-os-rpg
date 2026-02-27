import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface LevelUpModalProps {
    isOpen: boolean;
    newLevel: number;
    newTitlePL: string;
    accentColor: string;
    badge: string;
    heroClass: string;
    onClose: () => void;
}

const RING_SIZE = 140;
const RADIUS = 64;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function LevelUpModal({ isOpen, newLevel, newTitlePL, accentColor, badge, heroClass, onClose }: LevelUpModalProps) {
    useEffect(() => {
        if (isOpen) {
            confetti({
                particleCount: 150,
                spread: 80,
                colors: [accentColor, '#ffffff', '#F59E0B'],
                origin: { y: 0.6 }
            });
        }
    }, [isOpen, accentColor]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[rgba(0,0,0,0.92)] backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="w-full max-w-[360px] bg-slate-900 rounded-2xl p-6 border text-center flex flex-col items-center shadow-2xl overflow-hidden relative"
                        style={{ borderColor: accentColor }}
                        initial={{ scale: 0.5, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.5, y: 50 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    >
                        {/* Background Glow */}
                        <div
                            className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                            style={{ background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)` }}
                        />

                        <motion.h2
                            className="text-xl font-black text-amber-400 mb-6 drop-shadow-[0_0_10px_#F59E0B] relative z-10"
                            animate={{ opacity: [0.8, 1, 0.8], scale: [0.98, 1.02, 0.98] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                            ✨ AWANS NA POZIOM! ✨
                        </motion.h2>

                        {/* Circular Image identical to HeroPanel */}
                        <div className="relative flex items-center justify-center mb-6 z-10" style={{ width: RING_SIZE, height: RING_SIZE }}>
                            <svg width={RING_SIZE} height={RING_SIZE} className="absolute top-0 left-0 -rotate-90">
                                <circle cx={70} cy={70} r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={8} />
                                <motion.circle
                                    cx={70} cy={70} r={RADIUS}
                                    fill="none"
                                    stroke={accentColor}
                                    strokeWidth={8}
                                    strokeLinecap="round"
                                    strokeDasharray={CIRCUMFERENCE}
                                    initial={{ strokeDashoffset: CIRCUMFERENCE }}
                                    animate={{ strokeDashoffset: 0 }}
                                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                                />
                            </svg>
                            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-transparent">
                                <div className="absolute inset-0 bg-gradient-to-b from-cosmic-bg to-cosmic-card z-0" />
                                <img
                                    src={`assets/hero/hero_${heroClass?.toLowerCase() || 'explorer'}.webp`}
                                    alt="Hero"
                                    className="absolute inset-0 w-full h-full object-cover object-top z-10"
                                    loading="lazy" decoding="async"
                                    onError={(e) => (e.currentTarget.style.opacity = '0')}
                                />
                            </div>
                        </div>

                        {/* Level number animation */}
                        <motion.div
                            className="text-6xl font-black mb-2 z-10"
                            style={{ color: accentColor, textShadow: `0 0 20px ${accentColor}80` }}
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.4, 1] }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            {newLevel}
                        </motion.div>

                        <h3 className="text-xl font-bold text-white mb-2 z-10">{badge} {newTitlePL}</h3>

                        <p className="text-gray-400 text-sm mb-1 z-10">Osiągnąłeś poziom {newLevel}!</p>
                        <p className="text-gray-400 text-sm mb-6 z-10">Nowy tytuł: <span className="font-bold text-white">{newTitlePL}</span></p>

                        <button
                            onClick={onClose}
                            className="w-full py-3 rounded-xl font-bold text-white transition-transform hover:scale-105 active:scale-95 z-10 flex items-center justify-center gap-2 relative overflow-hidden group"
                            style={{ backgroundColor: accentColor }}
                        >
                            <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                            ⚔️ Kontynuuj Przygodę
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
