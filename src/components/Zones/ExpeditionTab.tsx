import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// @ts-ignore
import iconUrl from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet marker icon issue
(L.Marker.prototype as any).options.icon = L.icon({
    iconUrl, shadowUrl: iconShadow,
    iconSize: [25, 41], iconAnchor: [12, 41],
});

import { Trek, TREKS, TrekRegion } from '../../data/TrekDatabase';
import { ExpeditionEngine } from '../../engines/ExpeditionEngine';
import { ActiveExpedition } from '../../db/types';
import { TrekSelectorModal } from '../Expeditions/TrekSelectorModal';

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

function getCurrentPosition(expedition: ActiveExpedition, trek: Trek): [number, number] {
    const percent = Math.min(1, Math.max(0, expedition.completedKm / trek.distanceKm));
    if (percent <= 0) return trek.route[0] as [number, number];
    if (percent >= 1) return trek.route[trek.route.length - 1] as [number, number];

    const totalPoints = trek.route.length;
    const exactIndex = percent * (totalPoints - 1);
    const lowerIndex = Math.floor(exactIndex);
    const upperIndex = Math.ceil(exactIndex);
    const fraction = exactIndex - lowerIndex;

    const p1 = trek.route[lowerIndex];
    const p2 = trek.route[upperIndex];
    if (!p2) return p1 as [number, number];

    const lat = p1[0] + (p2[0] - p1[0]) * fraction;
    const lng = p1[1] + (p2[1] - p1[1]) * fraction;
    return [lat, lng];
}

export function ExpeditionTab() {
    const [activeExp, setActiveExp] = useState<ActiveExpedition | null>(null);
    const [trek, setTrek] = useState<Trek | null>(null);
    const [showSelector, setShowSelector] = useState(false);
    const [estimatedEnd, setEstimatedEnd] = useState<Date | null>(null);

    const isPreview = new URLSearchParams(window.location.search).get('preview') === 'true';

    useEffect(() => {
        if (isPreview) {
            const mockTrek = TREKS.find(t => t.id === 'camino_santiago')!;
            const mockExp: ActiveExpedition = {
                trekId: 'camino_santiago',
                completedKm: 234,
                startedAt: new Date('2025-01-15T00:00:00Z'),
                stepLogs: [
                    { date: new Date().toISOString().split('T')[0], steps: 3000, km: 2.3 },
                    { date: '2025-01-20', steps: 8500, km: 6.5 }
                ]
            };
            setActiveExp(mockExp);
            setTrek(mockTrek);
            setEstimatedEnd(new Date('2026-08-12'));
        } else {
            ExpeditionEngine.getActiveExpedition().then(exp => {
                if (exp) {
                    setActiveExp(exp);
                    const t = TREKS.find(tr => tr.id === exp.trekId) || null;
                    setTrek(t);
                    if (t) {
                        setEstimatedEnd(ExpeditionEngine.getEstimatedCompletion(exp, t));
                    }
                }
            });
        }
    }, [isPreview]);

    const handleSelectTrek = async (newTrek: Trek) => {
        setShowSelector(false);
        const exp = await ExpeditionEngine.getActiveExpedition();
        setActiveExp(exp);
        setTrek(newTrek);
        setEstimatedEnd(null); // Will recalculate as it gets steps
    };

    if (showSelector) {
        return <TrekSelectorModal onSelect={handleSelectTrek} onClose={() => setShowSelector(false)} />;
    }

    if (!activeExp || !trek) {
        return (
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
                className="w-full min-h-screen px-4 safe-top pb-32 space-y-6 flex flex-col pt-4"
            >
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 mb-2 mt-4">
                    Eksploracja Świata
                </h1>
                <p className="text-gray-400 mb-6">Nie masz aktywnej wyprawy. Wybierz region, aby rozpocząć przygodę!</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    {REGIONS.map(reg => (
                        <button
                            key={reg.id}
                            onClick={() => setShowSelector(true)}
                            className={`p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-2 ${reg.id === 'cityWalk' ? 'col-span-2' : ''}`}
                        >
                            <span className="text-4xl">{reg.emoji}</span>
                            <span className="font-bold text-gray-200">{reg.name}</span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setShowSelector(true)}
                    className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-[1.02] transition-transform"
                >
                    🗺️ Wybierz Wyprawę
                </button>
            </motion.div>
        );
    }

    const progressPercent = ExpeditionEngine.getProgressPercent(activeExp, trek);
    const todayLog = activeExp.stepLogs.find(l => l.date === new Date().toISOString().split('T')[0]);
    const todayKm = todayLog ? todayLog.km : 0;
    const todaySteps = todayLog ? todayLog.steps : 0;
    const remainingKm = trek.distanceKm - activeExp.completedKm;



    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
            className="w-full min-h-screen px-4 pt-6 pb-32 space-y-6 flex flex-col overflow-y-auto safe-top"
        >
            {/* Header */}
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center shadow-lg">
                <div className="flex-1">
                    <h1 className="text-lg font-bold text-white flex gap-2 items-center">
                        <span className="text-2xl">{trek.emoji}</span>
                        {trek.name}
                    </h1>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                        <span>{trek.flag} {trek.country}</span>
                        <span>•</span>
                        <span>{trek.distanceKm} km</span>
                        <span>•</span>
                        <span style={{ color: DIFFICULTY_COLORS[trek.difficulty] }} className="font-bold uppercase">{trek.difficulty}</span>
                    </div>
                </div>
                <button
                    onClick={() => setShowSelector(true)}
                    className="ml-4 px-3 py-1.5 rounded-lg border border-white/20 text-xs font-bold text-gray-300 hover:bg-white/10 transition-colors"
                >
                    Zmień
                </button>
            </div>

            {/* MAP LEAFLET */}
            <div className="rounded-2xl overflow-hidden border border-white/20 shadow-lg relative z-0">
                <MapContainer
                    center={[trek.centerLat, trek.centerLng]}
                    zoom={trek.zoomLevel}
                    style={{ height: '300px', width: '100%', borderRadius: '16px' }}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        subdomains={['a', 'b', 'c']}
                    />
                    <Polyline
                        positions={trek.route}
                        color={trek.accentColor}
                        weight={4}
                        opacity={0.8}
                    />
                    <Marker position={getCurrentPosition(activeExp, trek)} />
                </MapContainer>
            </div>

            {/* PROGRESS BAR */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-gray-400">POSTĘP</span>
                    <span className="text-sm font-bold" style={{ color: trek.accentColor }}>
                        {activeExp.completedKm.toFixed(1)} / {trek.distanceKm} km ({Math.floor(progressPercent)}%)
                    </span>
                </div>
                <div className="w-full h-4 bg-black/40 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                        className="h-full"
                        style={{ backgroundColor: trek.accentColor }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                </div>
            </div>

            {/* STATS */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">📅 Rozpoczęto:</span>
                    <span className="font-bold text-white">{new Date(activeExp.startedAt).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">📏 Pozostało:</span>
                    <span className="font-bold text-white">{remainingKm.toFixed(1)} km</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">🚶 Dziś:</span>
                    <span className="font-bold text-green-400">+{todayKm.toFixed(1)} km <span className="text-gray-500 font-normal">({todaySteps.toLocaleString()} kroków)</span></span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">🏁 Szacowane ukończenie:</span>
                    <span className="font-bold text-blue-300">{estimatedEnd ? estimatedEnd.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Brak danych'}</span>
                </div>
            </div>

            {/* WAYPOINTS */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <h3 className="text-xs font-bold text-gray-400 mb-4 px-1">WAYPOINTS</h3>
                <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {trek.waypoints.map((wp, i) => {
                        const isReached = activeExp.completedKm >= wp.km;
                        const isGoal = i === trek.waypoints.length - 1;
                        return (
                            <div key={i} className="relative flex items-center justify-between xl:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-4 border-cosmic-bg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow flex-shrink-0 relative z-10 ${isReached ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-500'}`}>
                                    {isReached ? '✅' : '⬜'}
                                </div>
                                <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-3 rounded-xl shadow">
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">{wp.emoji}</span>
                                            <span className={`font-bold ${isReached ? 'text-white' : 'text-gray-400'}`}>{wp.name}</span>
                                        </div>
                                        <div className="text-gray-500 text-xs text-right whitespace-nowrap">
                                            {wp.km} km
                                            {isReached && <div className="text-green-400 font-bold mt-0.5">osiągnięty!</div>}
                                            {isGoal && !isReached && <div className="text-blue-400 font-bold mt-0.5">cel!</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </motion.div>
    );
}
