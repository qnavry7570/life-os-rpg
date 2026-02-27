import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trek, TrekRegion, TREKS } from '../../data/TrekDatabase';
import { ExpeditionEngine } from '../../engines/ExpeditionEngine';

interface TrekSelectorModalProps {
    onSelect: (trek: Trek) => void;
    onClose: () => void;
}

const REGIONS: { id: TrekRegion; name: string; emoji: string }[] = [
    { id: 'poland', name: 'Polska', emoji: '🇵🇱' },
    { id: 'europe', name: 'Europa', emoji: '🇪🇺' },
    { id: 'americas', name: 'Ameryki', emoji: '🌎' },
    { id: 'asia', name: 'Azja', emoji: '🌏' },
    { id: 'cityWalk', name: 'Spacery Miejskie', emoji: '🏙️' },
];

const DIFFICULTY_COLORS = {
    easy: '#10b981',
    medium: '#f59e0b',
    hard: '#ef4444',
    epic: '#8b5cf6',
    legendary: '#ec4899'
};

export function TrekSelectorModal({ onSelect, onClose }: TrekSelectorModalProps) {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedRegion, setSelectedRegion] = useState<TrekRegion | null>(null);
    const [selectedTrek, setSelectedTrek] = useState<Trek | null>(null);

    const handleRegionSelect = (regionId: TrekRegion) => {
        setSelectedRegion(regionId);
        setStep(2);
    };

    const handleTrekSelect = (trek: Trek) => {
        setSelectedTrek(trek);
        setStep(3);
    };

    const handleConfirm = async () => {
        if (!selectedTrek) return;
        await ExpeditionEngine.startExpedition(selectedTrek.id);
        onSelect(selectedTrek);
    };

    const filteredTreks = TREKS.filter(t => t.region === selectedRegion);

    return (
        <div className="fixed inset-0 z-[100] bg-gray-950/95 backdrop-blur-md overflow-y-auto">
            <div className="min-h-screen p-4 safe-top pb-24 max-w-md mx-auto relative">

                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between mb-6 bg-gray-950/80 p-2 rounded-xl backdrop-blur-sm">
                    <button
                        onClick={() => {
                            if (step === 3) setStep(2);
                            else if (step === 2) setStep(1);
                            else onClose();
                        }}
                        className="text-gray-400 p-2 hover:text-white"
                    >
                        ◀ Wróć
                    </button>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                        🗺️ Wybierz Wyprawę
                    </h2>
                    <button onClick={onClose} className="text-gray-400 p-2 hover:text-white">✕</button>
                </div>

                <AnimatePresence mode="wait">
                    {/* KROK 1: Regiony */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {REGIONS.map(reg => (
                                <button
                                    key={reg.id}
                                    onClick={() => handleRegionSelect(reg.id)}
                                    className={`p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-2 ${reg.id === 'cityWalk' ? 'col-span-2' : ''}`}
                                >
                                    <span className="text-4xl">{reg.emoji}</span>
                                    <span className="font-bold text-gray-200">{reg.name}</span>
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {/* KROK 2: Trasy w regionie */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-4"
                        >
                            {filteredTreks.map(trek => (
                                <button
                                    key={trek.id}
                                    onClick={() => handleTrekSelect(trek)}
                                    className="w-full text-left p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 flex gap-4"
                                >
                                    <div className="text-4xl">{trek.emoji}</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-white">{trek.name}</h3>
                                            <span
                                                className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-black/20"
                                                style={{ backgroundColor: DIFFICULTY_COLORS[trek.difficulty], color: '#fff' }}
                                            >
                                                {trek.difficulty}
                                            </span>
                                        </div>
                                        <div className="text-xs text-blue-300 mb-2">{trek.distanceKm} km</div>
                                        <p className="text-xs text-gray-400">{trek.descriptionPL}</p>
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {/* KROK 3: Potwierdzenie */}
                    {step === 3 && selectedTrek && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="p-6 rounded-3xl border border-white/10 bg-cosmic-card/80 backdrop-blur-md text-center"
                        >
                            <div className="text-6xl mb-4">{selectedTrek.emoji}</div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r flex flex-wrap justify-center mb-2" style={{ color: selectedTrek.accentColor }}>{selectedTrek.name}</h3>

                            <p className="text-gray-300 mb-6">
                                Ruszasz na {selectedTrek.name} — <span className="text-white font-bold">{selectedTrek.distanceKm} km</span>.
                            </p>

                            <div className="bg-black/30 p-4 rounded-xl border border-white/5 mb-8 text-sm text-gray-400">
                                Szacowany czas: ~{Math.ceil(selectedTrek.distanceKm / 6.5)} dni przy średnim tempie 6.5 km/dzień (ok. {Math.round(6.5 * (selectedTrek.stepsPerKm || 1300))} kroków/dzień).
                            </div>

                            <button
                                onClick={handleConfirm}
                                className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] transform hover:scale-[1.02] transition-all"
                            >
                                🚀 Rozpocznij Wyprawę
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
