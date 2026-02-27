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
  const { initialize } = useLifeOSStore()

  // Get initial tab from hash or default to dashboard
  const getInitialTab = (): TabId => {
    const hash = window.location.hash.replace('#', '')
    const validTabs: TabId[] = ['dashboard', 'health', 'expedition', 'stats', 'hero']
    if (validTabs.includes(hash as TabId)) {
      return hash as TabId
    }
    return 'dashboard'
  }

  const [currentTab, setCurrentTab] = useState<TabId>(getInitialTab)

  // Listen for hash changes to update tab
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as TabId
      const validTabs: TabId[] = ['dashboard', 'health', 'expedition', 'stats', 'hero']
      if (validTabs.includes(hash)) {
        setCurrentTab(hash)
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Sync state changes to URL hash
  useEffect(() => {
    const actHash = currentTab === 'dashboard' ? '' : `#${currentTab}`
    if (window.location.hash !== actHash && !(currentTab === 'dashboard' && window.location.hash === '')) {
      window.history.pushState(null, '', actHash || window.location.pathname)
    }
  }, [currentTab])

  const MIN_SPLASH_DURATION = 800
  const MAX_SPLASH_DURATION = 2000

  // Screenshot/bot bypass — jeśli URL zawiera ?preview=true,
  // pomiń splash screen i pokaż UI natychmiast z mock danymi
  const isPreviewMode = new URLSearchParams(window.location.search).get('preview') === 'true'

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (isPreviewMode) {
      setIsReady(true) // instant, bez DB
      return
    }

    const startTime = Date.now()

    // Safety fallback: Force UI to show after MAX_SPLASH_DURATION
    const fallbackTimeout = setTimeout(() => {
      setIsReady(true)
    }, MAX_SPLASH_DURATION)

    const init = async () => {
      try {
        await seedDatabase()
        await initialize()
      } catch (error) {
        console.error("Initialization error:", error)
      } finally {
        const elapsed = Date.now() - startTime
        const remainingTime = Math.max(0, MIN_SPLASH_DURATION - elapsed)

        // Wait for MIN_SPLASH_DURATION before removing splash
        setTimeout(() => {
          clearTimeout(fallbackTimeout)
          setIsReady(true)
        }, remainingTime)
      }
    }

    init()

    return () => clearTimeout(fallbackTimeout)
  }, [initialize])

  // Show loading spinner only until our min/max duration resolves
  if (!isReady) {
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
        style={{ backgroundImage: "url('assets/map/map_world_bg.webp')" }}
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
