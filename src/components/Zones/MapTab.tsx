import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Trek, TREKS } from '../../data/TrekDatabase';
import { ExpeditionEngine } from '../../engines/ExpeditionEngine';
import { ActiveExpedition } from '../../db/types';
import { TrekSelectorModal } from '../Expeditions/TrekSelectorModal';

export function MapTab() {
    const [activeExp, setActiveExp] = useState<ActiveExpedition | null>(null);
    const [trek, setTrek] = useState<Trek | null>(null);
    const [showSelector, setShowSelector] = useState(false);
    const isPreview = new URLSearchParams(window.location.search).get('preview') === 'true';

    useEffect(() => {
        if (isPreview) {
            const mockTrek = TREKS.find(t => t.id === 'camino_santiago')!;
            const mockExp: ActiveExpedition = {
                trekId: 'camino_santiago',
                completedKm: 234,
                startedAt: new Date('2025-01-15T00:00:00Z'),
                stepLogs: []
            };
            setActiveExp(mockExp);
            setTrek(mockTrek);
        } else {
            ExpeditionEngine.getActiveExpedition().then(exp => {
                if (exp) {
                    setActiveExp(exp);
                    setTrek(TREKS.find(t => t.id === exp.trekId) || null);
                }
            });
        }
    }, [isPreview]);

    const handleSelectTrek = async (newTrek: Trek) => {
        setShowSelector(false);
        const exp = await ExpeditionEngine.getActiveExpedition();
        setActiveExp(exp);
        setTrek(newTrek);
    };

    if (showSelector) {
        return <TrekSelectorModal onSelect={handleSelectTrek} onClose={() => setShowSelector(false)} />;
    }

    if (!activeExp || !trek) {
        const REGION_TILES = [
            { id: 'poland',   name: 'Polska',          emoji: '🇵🇱', desc: '3 szlaki',  gradient: 'from-red-900/50 to-red-700/20',      border: 'border-red-500/30' },
            { id: 'europe',   name: 'Europa',           emoji: '🇪🇺', desc: '3 szlaki',  gradient: 'from-blue-900/50 to-yellow-800/20',  border: 'border-blue-400/30' },
            { id: 'americas', name: 'Ameryki',          emoji: '🌎',  desc: '2 szlaki',  gradient: 'from-green-900/50 to-emerald-800/20',border: 'border-green-500/30' },
            { id: 'asia',     name: 'Azja',             emoji: '🌏',  desc: '2 szlaki',  gradient: 'from-amber-900/50 to-orange-800/20', border: 'border-amber-500/30' },
            { id: 'cityWalk', name: 'Spacery Miejskie', emoji: '🏙️', desc: '4 miasta',  gradient: 'from-purple-900/50 to-pink-800/20',  border: 'border-purple-400/30' },
        ];
        return (
            <motion.div
                initial="hidden" animate="visible"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="w-full min-h-screen px-4 safe-top pb-32 flex flex-col pt-6 relative z-10"
            >
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 mb-2 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">
                    🗺️ Nawigacja
                </h1>
                <p className="text-gray-400 text-sm mb-6">Wybierz region, aby rozpocząć wyprawę opartą na krokach.</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {REGION_TILES.map(tile => (
                        <button
                            key={tile.id}
                            onClick={() => setShowSelector(true)}
                            className={`p-5 rounded-2xl border bg-gradient-to-br ${tile.gradient} ${tile.border} flex flex-col items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95${tile.id === 'cityWalk' ? ' col-span-2' : ''}`}
                        >
                            <span className="text-4xl">{tile.emoji}</span>
                            <span className="font-bold text-gray-100 text-sm">{tile.name}</span>
                            <span className="text-[10px] text-gray-400">{tile.desc}</span>
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setShowSelector(true)}
                    className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-[1.02] transition-transform"
                >
                    🗺️ Wybierz Dowolną Wyprawę
                </button>
            </motion.div>
        );
    }

    const progressPercent = ExpeditionEngine.getProgressPercent(activeExp, trek);

    const getTrekImage = (trekId: string) => {
        switch (trekId) {
            case 'tatry_glowny': return '/life-os-rpg/assets/expeditions/trail_tatry.webp'
            case 'szlak_beskidzki': return '/life-os-rpg/assets/expeditions/trail_beskidy.webp'
            case 'szlak_nadmorski': return '/life-os-rpg/assets/expeditions/trail_nadmorski.webp'
            case 'camino_santiago': return '/life-os-rpg/assets/expeditions/trail_camino.webp'
            case 'tour_mont_blanc': return '/life-os-rpg/assets/expeditions/trail_mont_blanc.webp'
            case 'gr20_korsyka': return '/life-os-rpg/assets/expeditions/trail_gr20.webp'
            case 'appalachian_trail': return '/life-os-rpg/assets/expeditions/trail_appalachian.webp'
            case 'inca_trail': return '/life-os-rpg/assets/expeditions/trail_inca.webp'
            case 'everest_base_camp': return '/life-os-rpg/assets/expeditions/trail_ebc.webp'
            case 'nakasendo_japonia': return '/life-os-rpg/assets/expeditions/trail_nakasendo.webp'
            case 'city_tokyo': return '/life-os-rpg/assets/expeditions/city_tokyo.webp'
            case 'city_nyc': return '/life-os-rpg/assets/expeditions/city_nyc.webp'
            case 'city_london': return '/life-os-rpg/assets/expeditions/city_london.webp'
            case 'city_rome': return '/life-os-rpg/assets/expeditions/city_rome.webp'
            default: return '/life-os-rpg/assets/expeditions/trail_camino.webp'
        }
    }

    return (
        <motion.div
            initial="hidden" animate="visible"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="w-full min-h-screen px-4 safe-top pt-6 pb-32 relative z-10 flex flex-col"
        >
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 mb-6 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">
                Nawigacja
            </h1>

            <div className="bg-cosmic-card/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg p-4 flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">{trek.emoji}</span>
                        <div>
                            <h2 className="font-bold text-white leading-tight">{trek.name}</h2>
                            <span className="text-xs text-gray-400">{trek.distanceKm} km • {trek.region}</span>
                        </div>
                    </div>
                </div>

                <div
                    className="w-full h-[220px] rounded-xl border border-white/10 shadow-lg bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('${getTrekImage(trek.id)}')`,
                    }}
                />

                <div className="w-full">
                    <div className="flex justify-between text-xs font-bold text-gray-300 mb-1">
                        <span>Postęp</span>
                        <span style={{ color: trek.accentColor }}>{Math.floor(progressPercent)}%</span>
                    </div>
                    <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            className="h-full"
                            style={{ backgroundColor: trek.accentColor }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                <button
                    onClick={() => window.location.hash = '#expedition_details'}
                    className="w-full py-3 rounded-xl border border-white/20 text-sm font-bold text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                    📊 Szczegóły wyprawy
                </button>
            </div>
        </motion.div>
    );
}
