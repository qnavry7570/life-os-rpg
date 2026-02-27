import { motion } from 'framer-motion';
import { ACHIEVEMENTS, RARITY_CONFIG } from '../../engines/AchievementEngine';

export function AchievementsSection() {
    const isPreview = new URLSearchParams(window.location.search).get('preview') === 'true';

    // Mock unlocked in ?preview=true (6 first common + rare):
    const PREVIEW_UNLOCKED = ['first_steps', 'first_pomodoro', 'hydration_start', 'first_quest', '10k_steps', 'pomo_25'];

    // TO DO: Later integrate with db.achievements.toArray() mapped by ID
    const unlockedIds = isPreview ? PREVIEW_UNLOCKED : [];

    const unlockedCount = unlockedIds.length;
    const totalCount = ACHIEVEMENTS.length;

    return (
        <div className="mt-8">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex justify-between items-center">
                <span>🏆 OSIĄGNIĘCIA</span>
                <span className="text-xs font-normal" style={{ color: RARITY_CONFIG.epic.color }}>[{unlockedCount} / {totalCount}]</span>
            </h2>

            <div className="grid grid-cols-3 gap-3">
                {ACHIEVEMENTS.map((achievement, index) => {
                    const isUnlocked = unlockedIds.includes(achievement.id);
                    const rarityConfig = RARITY_CONFIG[achievement.rarity];

                    return (
                        <motion.div
                            key={achievement.id}
                            className="rounded-xl p-2 flex flex-col items-center justify-center gap-1 relative overflow-hidden transition-colors"
                            style={{
                                background: isUnlocked ? rarityConfig.color + '15' : 'rgba(255,255,255,0.03)',
                                border: `1px solid ${isUnlocked ? rarityConfig.border : 'rgba(255,255,255,0.08)'}`,
                                boxShadow: isUnlocked && achievement.rarity === 'legendary' ? `0 0 12px ${rarityConfig.glow}` : 'none',
                                filter: isUnlocked ? 'none' : 'grayscale(80%) opacity(0.4)',
                                height: 90
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.03 }}
                            whileHover={isUnlocked ? { scale: 1.05 } : {}}
                        >
                            {isUnlocked && (
                                <span className="absolute top-1 right-1 text-[10px]">✅</span>
                            )}
                            {achievement.rarity === 'legendary' && isUnlocked && (
                                <div className="absolute inset-0 z-0 bg-white/10 animate-[shimmer_2s_infinite] -translate-x-full" />
                            )}

                            <span className="text-2xl z-10">{achievement.icon}</span>
                            <span className="text-[10px] text-center leading-tight font-medium z-10"
                                style={{ color: isUnlocked ? rarityConfig.color : '#4B5563' }}>
                                {achievement.titlePL}
                            </span>
                            <span className="text-[9px] uppercase tracking-wide z-10 mt-auto"
                                style={{ color: isUnlocked ? rarityConfig.color + 'AA' : '#374151' }}>
                                {rarityConfig.label}
                            </span>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
