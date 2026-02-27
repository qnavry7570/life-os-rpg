import { motion } from 'framer-motion'
import { HeroPanel } from '../Hero/HeroPanel'
import { TokensPanel } from '../Stats/TokensPanel'

export function HeroTab() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
            }}
            className="p-4 safe-top space-y-6"
        >
            <HeroPanel />
            <TokensPanel />
        </motion.div>
    )
}
