import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useLifeOSStore } from '../../store/lifeOsStore'
import { Plus, Flame } from 'lucide-react'

export function CalorieEngine() {
  const {
    currentCalorieBalance,
    currentBurnRateKcalPerHour,
    calorieHistory,
    todayStats,
    logMeal,
    setBurnRate,
  } = useLifeOSStore()
  
  const [showMealDialog, setShowMealDialog] = useState(false)
  const [mealKcal, setMealKcal] = useState('')
  const [mealName, setMealName] = useState('')
  const [showBurnRateDialog, setShowBurnRateDialog] = useState(false)
  const [newBurnRate, setNewBurnRate] = useState('')
  
  // Prepare chart data - last 6 hours
  const chartData = calorieHistory
    .filter(entry => {
      const sixHoursAgo = Date.now() - 6 * 60 * 60 * 1000
      return entry.timestamp.getTime() > sixHoursAgo
    })
    .map(entry => ({
      time: entry.timestamp.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
      balance: Math.round(entry.balanceAfter),
    }))
  
  const handleAddMeal = async () => {
    const kcal = parseInt(mealKcal)
    if (isNaN(kcal) || kcal <= 0) return
    
    await logMeal(kcal, mealName || undefined)
    setMealKcal('')
    setMealName('')
    setShowMealDialog(false)
  }
  
  const handleUpdateBurnRate = async () => {
    const rate = parseInt(newBurnRate)
    if (isNaN(rate) || rate <= 0) return
    
    await setBurnRate(rate)
    setNewBurnRate('')
    setShowBurnRateDialog(false)
  }
  
  const balanceColor = currentCalorieBalance >= 0 
    ? 'text-cosmic-cyan' 
    : 'text-cosmic-amber'
  
  const balanceSign = currentCalorieBalance >= 0 ? '+' : ''
  
  return (
    <div className="card p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Bilans Kalorii — LIVE
        </h2>
        <button
          onClick={() => setShowMealDialog(!showMealDialog)}
          className="btn-secondary text-sm py-1 px-3 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Posiłek
        </button>
      </div>
      
      {/* Meal Dialog */}
      {showMealDialog && (
        <div className="bg-cosmic-card/50 rounded-lg p-4 space-y-3 border border-cosmic-border">
          <input
            type="text"
            placeholder="Nazwa posiłku (opcjonalnie)"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            className="w-full bg-cosmic-bg border border-cosmic-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cosmic-purple"
          />
          <input
            type="number"
            placeholder="Kalorie (kcal)"
            value={mealKcal}
            onChange={(e) => setMealKcal(e.target.value)}
            className="w-full bg-cosmic-bg border border-cosmic-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cosmic-purple"
          />
          <button
            onClick={handleAddMeal}
            className="btn-primary w-full"
          >
            Dodaj Posiłek
          </button>
        </div>
      )}
      
      {/* Current Balance */}
      <div className="text-center">
        <div className={`text-5xl font-bold ${balanceColor} text-glow-cyan`}>
          {balanceSign}{Math.floor(currentCalorieBalance)}
        </div>
        <p className="text-sm text-gray-500">kcal bilans</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">
          <p className="text-gray-500">Spalono dziś</p>
          <p className="text-xl font-semibold text-red-400">
            {todayStats?.caloriesBurned.toLocaleString() || 0}
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Spożyto dziś</p>
          <p className="text-xl font-semibold text-green-400">
            {todayStats?.caloriesConsumed.toLocaleString() || 0}
          </p>
        </div>
      </div>
      
      {/* Burn Rate */}
      <div 
        onClick={() => setShowBurnRateDialog(!showBurnRateDialog)}
        className="flex items-center justify-center gap-2 text-sm bg-cosmic-card/30 rounded-lg p-2 cursor-pointer hover:bg-cosmic-card/50 transition-all"
      >
        <Flame className="w-4 h-4 text-orange-400" />
        <span className="text-gray-400">Spalanie:</span>
        <span className="font-semibold text-orange-400">
          {currentBurnRateKcalPerHour} kcal/h
        </span>
        <span className="text-xs text-gray-500">(kliknij aby zmienić)</span>
      </div>
      
      {/* Burn Rate Dialog */}
      {showBurnRateDialog && (
        <div className="bg-cosmic-card/50 rounded-lg p-4 space-y-3 border border-cosmic-border">
          <p className="text-sm text-gray-400">Ustaw spalanie kalorii na godzinę:</p>
          <input
            type="number"
            placeholder="np. 80"
            value={newBurnRate}
            onChange={(e) => setNewBurnRate(e.target.value)}
            className="w-full bg-cosmic-bg border border-cosmic-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cosmic-purple"
          />
          <button
            onClick={handleUpdateBurnRate}
            className="btn-primary w-full"
          >
            Zapisz
          </button>
        </div>
      )}
      
      {/* Chart */}
      {chartData.length > 0 && (
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="time" 
                stroke="#4b5563"
                style={{ fontSize: '10px' }}
              />
              <YAxis 
                stroke="#4b5563"
                style={{ fontSize: '10px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#141428',
                  border: '1px solid #1f1f3d',
                  borderRadius: '8px',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#06b6d4" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
