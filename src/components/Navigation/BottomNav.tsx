import { Sword, Heart, Map, BarChart2, User } from 'lucide-react'
import { motion } from 'framer-motion'

export type TabId = 'dashboard' | 'health' | 'expedition' | 'stats' | 'hero' | 'expedition_details'

interface BottomNavProps {
    activeTab: TabId
    onTabChange: (tab: TabId) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
    const tabs = [
        { id: 'dashboard', icon: Sword, label: 'Dashboard', glow: 'glow-amber' },
        { id: 'health', icon: Heart, label: 'Health', glow: 'glow-green' },
        { id: 'expedition', icon: Map, label: 'Expeditions', glow: 'glow-blue' },
        { id: 'stats', icon: BarChart2, label: 'Stats', glow: 'glow-cyan' },
        { id: 'hero', icon: User, label: 'Hero', glow: 'glow-pulse' },
    ] as const

    // State is now managed via URL hash in App.tsx

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe pt-2 bg-[rgba(5,8,20,0.85)] backdrop-blur-md border-t border-white/10">
            <ul className="flex justify-between items-center max-w-md mx-auto relative pb-2 pt-1">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    const Icon = tab.icon

                    return (
                        <li key={tab.id} className="relative flex-1">
                            <button
                                onClick={() => onTabChange(tab.id as TabId)}
                                className="w-full flex flex-col items-center justify-center py-2 relative z-10"
                                aria-label={tab.label}
                            >
                                <Icon
                                    className={`w-6 h-6 mb-1 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500'
                                        }`}
                                />

                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav-glow"
                                        className={`absolute inset-0 rounded-xl ${tab.glow} opacity-20`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.2 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
