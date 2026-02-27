import { motion } from 'framer-motion';

interface FloatingXPProps {
    amount: number;
    x: number;
    y: number;
    color?: string;
    onComplete: () => void;
}

export function FloatingXP({ amount, x, y, color = '#F59E0B', onComplete }: FloatingXPProps) {
    return (
        <motion.div
            className="fixed z-[9999] pointer-events-none font-bold text-sm select-none"
            style={{ left: x, top: y, color, textShadow: `0 0 10px ${color}` }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: -70 }}
            transition={{ duration: 1.8, times: [0, 0.1, 0.7, 1] }}
            onAnimationComplete={onComplete}
        >
            +{amount} XP ✨
        </motion.div>
    );
}
