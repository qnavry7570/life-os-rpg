import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
        return (
            <motion.div
                initial="hidden" animate="visible"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="w-full min-h-screen px-4 safe-top pb-32 flex flex-col justify-center items-center relative z-10"
            >
                <div className="text-6xl mb-4">🗺️</div>
                <h2 className="text-xl font-bold text-white mb-2">Nie masz aktywnej wyprawy</h2>
                <p className="text-gray-400 text-center mb-8 text-sm">Rozpocznij trekking lub wirtualny spacer, aby śledzić swój postęp oparty na codziennych krokach.</p>
                <button
                    onClick={() => setShowSelector(true)}
                    className="w-full max-w-xs py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-[1.02] transition-transform"
                >
                    🗺️ Wybierz Wyprawę
                </button>
            </motion.div>
        );
    }

    const progressPercent = ExpeditionEngine.getProgressPercent(activeExp, trek);

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

                <div className="relative w-full h-[200px] rounded-xl overflow-hidden border border-white/5 pointer-events-none">
                    {/* Non-interactive Map */}
                    <MapContainer
                        center={[trek.centerLat, trek.centerLng]}
                        zoom={trek.zoomLevel}
                        style={{ height: '100%', width: '100%' }}
                        zoomControl={false}
                        dragging={false}
                        scrollWheelZoom={false}
                        doubleClickZoom={false}
                        touchZoom={false}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Polyline positions={trek.route} color={trek.accentColor} weight={3} opacity={0.8} />
                    </MapContainer>
                </div>

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
