import { motion } from 'framer-motion'
import { AchievementsSection } from './AchievementsSection'
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

export function WeeklySummary() {
  const isPreview = new URLSearchParams(window.location.search).get('preview') === 'true';

  const MOCK_WEEKLY_DATA = {
    days: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nd'],
    steps: [4200, 7800, 6100, 9200, 5500, 11000, 8300],
    calories: [1850, 2100, 1950, 2400, 1750, 2600, 2200],
    xp: [120, 180, 150, 220, 100, 280, 190],
  };

  const MOCK_CALORIES_CHART = [
    { day: "Pon", value: 1840 },
    { day: "Wt", value: 2210 },
    { day: "Śr", value: 1650 },
    { day: "Czw", value: 2480 },
    { day: "Pt", value: 1920 },
    { day: "Sob", value: 2750 },
    { day: "Nd", value: 2100 },
  ];

  const dataToUse = isPreview ? MOCK_WEEKLY_DATA : MOCK_WEEKLY_DATA; // Fallback for now until db connects

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
      }}
      className="p-4 safe-top space-y-6 pb-32"
    >
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
        📊 Weekly Stats
      </h1>

      <p className="text-sm text-gray-400">Podsumowanie Twojej aktywności z ostatnich 7 dni.</p>

      {/* Wytyczne: Krok 1 (BUG #1) Karta Podsumowania */}
      {isPreview && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-3 flex flex-col items-center justify-center glow-purple">
            <span className="text-[10px] text-purple-300 uppercase tracking-widest mb-1">Łącznie XP</span>
            <span className="text-xl font-bold text-purple-100">1240</span>
          </div>
          <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-xl p-3 flex flex-col items-center justify-center glow-green">
            <span className="text-[10px] text-emerald-300 uppercase tracking-widest mb-1">Kroki</span>
            <span className="text-xl font-bold text-emerald-100">52 100</span>
          </div>
          <div className="bg-amber-900/30 border border-amber-500/30 rounded-xl p-3 flex flex-col items-center justify-center glow-amber">
            <span className="text-[10px] text-amber-300 uppercase tracking-widest mb-1">Seria</span>
            <span className="text-xl font-bold text-amber-100">3 dni</span>
          </div>
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-3 flex flex-col items-center justify-center glow-blue">
            <span className="text-[10px] text-blue-300 uppercase tracking-widest mb-1">Kcal</span>
            <span className="text-xl font-bold text-blue-100">14 850</span>
          </div>
        </div>
      )}

      {/* TODO: wire up to dailyStats IndexedDB */}
      <div className="card bg-kosmic-card/80 backdrop-blur-sm border-white/10 p-4 space-y-2 glow-green">
        <h3 className="font-bold text-sm text-gray-300">Kroki (7 dni)</h3>
        <div className="h-48 bg-black/30 rounded-xl border border-white/5 flex items-center justify-center flex-col gap-2">
          <div className="flex w-full px-2 h-32 items-end justify-between gap-1">
            {dataToUse.steps.map((val, i) => (
              <div key={i} className="w-full bg-emerald-500/80 rounded-t-md" style={{ height: `${(val / 12000) * 100}%` }} />
            ))}
          </div>
          <div className="flex w-full px-2 justify-between text-[10px] text-gray-500">
            {dataToUse.days.map((d) => <span key={d}>{d}</span>)}
          </div>
        </div>
      </div>

      <div className="card bg-kosmic-card/80 backdrop-blur-sm border-white/10 p-4 space-y-2 glow-amber">
        <h3 className="font-bold text-sm text-gray-300">Spalone Kalorie</h3>
        <div className="pt-4" style={{ minHeight: '200px' }}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MOCK_CALORIES_CHART}>
              <XAxis dataKey="day" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#1e1b4b', borderColor: '#f59e0b', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#f59e0b' }}
              />
              <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card bg-kosmic-card/80 backdrop-blur-sm border-white/10 p-4 space-y-2 glow-purple">
        <h3 className="font-bold text-sm text-gray-300">Zdobyte XP</h3>
        <div className="h-48 bg-black/30 rounded-xl border border-white/5 flex items-center justify-center flex-col gap-2">
          <div className="flex w-full px-2 h-32 items-end justify-between gap-1">
            {dataToUse.xp.map((val, i) => (
              <div key={i} className="w-full bg-purple-500/80 rounded-t-md" style={{ height: `${(val / 300) * 100}%` }} />
            ))}
          </div>
          <div className="flex w-full px-2 justify-between text-[10px] text-gray-500">
            {dataToUse.days.map((d) => <span key={d}>{d}</span>)}
          </div>
        </div>
      </div>

      <AchievementsSection />
    </motion.div>
  )
}
