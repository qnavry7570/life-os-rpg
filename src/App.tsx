import { useEffect, useState } from 'react'
import { useLifeOSStore } from './store/lifeOsStore'
import { seedDatabase } from './db/seed'
import { Loader2 } from 'lucide-react'
import { BottomNav, TabId } from './components/Navigation/BottomNav'
import { WorkZone } from './components/Zones/WorkZone'
import { HealthTab } from './components/Zones/HealthTab'
import { ExpeditionTab } from './components/Zones/ExpeditionTab'
import { WeeklySummary } from './components/Summary/WeeklySummary'
import { HeroTab } from './components/Zones/HeroTab'

function App() {
  const { initialize, isLoading } = useLifeOSStore()

  // Persist tab via localStorage
  const getInitialTab = (): TabId => {
    const saved = localStorage.getItem('lifeos_active_tab') as TabId
    return saved || 'dashboard'
  }

  const [currentTab, setCurrentTab] = useState<TabId>(getInitialTab)

  useEffect(() => {
    const init = async () => {
      await seedDatabase()
      await initialize()
    }
    init()
  }, [initialize])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cosmic-bg">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-cosmic-purple mx-auto" />
          <p className="text-gray-400">Inicjalizacja Life OS...</p>
        </div>
      </div>
    )
  }

  const renderView = () => {
    switch (currentTab) {
      case 'dashboard':
        return <WorkZone onBack={() => { }} /> // Removing onBack as we navigate via tabs
      case 'health':
        return <HealthTab />
      case 'expedition':
        return <ExpeditionTab />
      case 'stats':
        return <WeeklySummary />
      case 'hero':
        return <HeroTab />
      default:
        return <WorkZone onBack={() => { }} />
    }
  }

  return (
    <div className="relative min-h-screen pb-24">
      {/* Fixed Background */}
      <div
        className="fixed inset-0 bg-cover bg-center z-[-2]"
        style={{ backgroundImage: "url('/assets/map/map_world_bg.webp')" }}
      />

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-[rgba(5,8,20,0.85)] z-[-1]" />

      {/* Main Content Area */}
      <main className="w-full relative">
        {renderView()}
      </main>

      <BottomNav activeTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  )
}

export default App
