import { useEffect, useState } from 'react'
import { useLifeOSStore } from './store/lifeOsStore'
import { seedDatabase } from './db/seed'
import { ZoneMap } from './components/Map/ZoneMap'
import { HealthZone } from './components/Zones/HealthZone'
import { WorkZone } from './components/Zones/WorkZone'
import { SanctuaryZone } from './components/Zones/SanctuaryZone'
import { SocialZone } from './components/Zones/SocialZone'
import { WeeklySummary } from './components/Summary/WeeklySummary'
import { Loader2, BarChart3 } from 'lucide-react'

type View = 'map' | 'health' | 'work' | 'sanctuary' | 'social' | 'summary'

function App() {
  const { initialize, isLoading } = useLifeOSStore()
  const [currentView, setCurrentView] = useState<View>('map')
  
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
    switch (currentView) {
      case 'health':
        return <HealthZone onBack={() => setCurrentView('map')} />
      case 'work':
        return <WorkZone onBack={() => setCurrentView('map')} />
      case 'sanctuary':
        return <SanctuaryZone onBack={() => setCurrentView('map')} />
      case 'social':
        return <SocialZone onBack={() => setCurrentView('map')} />
      case 'summary':
        return <WeeklySummary onBack={() => setCurrentView('map')} />
      default:
        return <ZoneMap onZoneClick={(zoneId) => setCurrentView(zoneId as View)} />
    }
  }
  
  return (
    <div className="relative">
      {renderView()}
      
      {/* Floating Summary Button (only on map view) */}
      {currentView === 'map' && (
        <button
          onClick={() => setCurrentView('summary')}
          className="fixed bottom-6 right-6 btn-primary p-4 rounded-full shadow-glow-purple hover:scale-110 transition-transform"
          aria-label="Weekly Summary"
        >
          <BarChart3 className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}

export default App
