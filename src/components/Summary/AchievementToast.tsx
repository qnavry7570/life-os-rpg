import { motion, AnimatePresence } from 'framer-motion';
import { Achievement, RARITY_CONFIG } from '../../engines/AchievementEngine';
import { useEffect } from 'react';

interface AchievementToastProps {
    achievement: Achievement | null;
    isVisible: boolean;
    onHide: () => void;
}

export function AchievementToast({ achievement, isVisible, onHide }: AchievementToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onHide();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onHide]);

    return (
        <AnimatePresence>
            {isVisible && achievement && (
                <motion.div
                    className="fixed bottom-24 left-4 right-4 z-[9900] mx-auto max-w-sm rounded-2xl p-4 shadow-2xl flex items-center gap-4 bg-slate-900/95 backdrop-blur-sm border"
                    style={{ borderColor: RARITY_CONFIG[achievement.rarity].color }}
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 120, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                >
                    <div className="text-4xl">{achievement.icon}</div>
                    <div className="flex-1">
                        <h4 className="text-white font-bold text-sm">🏆 Nowa Odznaka!</h4>
                        <p className="font-bold text-lg leading-tight" style={{ color: RARITY_CONFIG[achievement.rarity].color }}>
                            {achievement.titlePL}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="font-black text-amber-400">+{achievement.xpReward} XP</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
