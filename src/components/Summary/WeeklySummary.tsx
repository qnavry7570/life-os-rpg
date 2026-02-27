import { motion } from 'framer-motion'
// import { BarChart, LineChart, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export function WeeklySummary() {
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

      {/* TODO: wire up to dailyStats IndexedDB */}
      <div className="card bg-kosmic-card/80 backdrop-blur-sm border-white/10 p-4 space-y-2 glow-green">
        <h3 className="font-bold text-sm text-gray-300">Kroki (7 dni) - Zespół roboczy</h3>
        <div className="h-48 bg-black/30 rounded-xl border border-white/5 flex items-center justify-center">
          {/* <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[]} />
            </ResponsiveContainer> */}
          <span className="text-gray-500 text-xs italic">BarChart (Brak Danych)</span>
        </div>
      </div>

      {/* TODO: wire up to dailyStats IndexedDB */}
      <div className="card bg-kosmic-card/80 backdrop-blur-sm border-white/10 p-4 space-y-2 glow-amber">
        <h3 className="font-bold text-sm text-gray-300">Spalone Kalorie</h3>
        <div className="h-48 bg-black/30 rounded-xl border border-white/5 flex items-center justify-center">
          {/* <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[]} />
            </ResponsiveContainer> */}
          <span className="text-gray-500 text-xs italic">LineChart (Brak Danych)</span>
        </div>
      </div>

      {/* TODO: wire up to dailyStats IndexedDB */}
      <div className="card bg-kosmic-card/80 backdrop-blur-sm border-white/10 p-4 space-y-2 glow-purple">
        <h3 className="font-bold text-sm text-gray-300">Zdobyte XP</h3>
        <div className="h-48 bg-black/30 rounded-xl border border-white/5 flex items-center justify-center">
          {/* <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[]} />
            </ResponsiveContainer> */}
          <span className="text-gray-500 text-xs italic">AreaChart (Brak Danych)</span>
        </div>
      </div>
    </motion.div>
  )
}
