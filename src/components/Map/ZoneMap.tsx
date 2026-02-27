import { MapPin } from 'lucide-react'

interface Zone {
  id: string
  name: string
  emoji: string
  color: string
  gradient: string
  description: string
}

interface ZoneMapProps {
  onZoneClick: (zoneId: string) => void
}

const zones: Zone[] = [
  {
    id: 'health',
    name: 'Health',
    emoji: '❤️',
    color: 'from-red-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-red-500/20 to-pink-500/20',
    description: 'Kroki, kalorie, ruch',
  },
  {
    id: 'sanctuary',
    name: 'Sanctuary',
    emoji: '🧘',
    color: 'from-purple-500 to-indigo-500',
    gradient: 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20',
    description: 'Odpoczynek, medytacja',
  },
  {
    id: 'work',
    name: 'Work',
    emoji: '💼',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
    description: 'Questy, pomodoro, fokus',
  },
  {
    id: 'social',
    name: 'Social',
    emoji: '🤝',
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
    description: 'Kontakty, relacje',
  },
]

export function ZoneMap({ onZoneClick }: ZoneMapProps) {
  return (
    <div className="min-h-screen bg-cosmic-bg flex flex-col">
      {/* Hero Header */}
      <div className="p-4 text-center border-b border-cosmic-border">
        <div className="text-6xl mb-2">🧙‍♂️</div>
        <h1 className="text-2xl font-bold text-glow-purple mb-1">Life OS</h1>
        <p className="text-sm text-gray-400">Wybierz strefę swojego życia</p>
      </div>
      
      {/* Zone Grid */}
      <div className="flex-1 p-4 grid grid-cols-2 gap-4">
        {zones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => onZoneClick(zone.id)}
            className={`${zone.gradient} border-2 border-transparent hover:border-cosmic-purple rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group`}
          >
            {/* Background Pulse Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${zone.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
            
            {/* Zone Icon */}
            <div className="text-6xl mb-2 group-hover:scale-110 transition-transform">
              {zone.emoji}
            </div>
            
            {/* Zone Name */}
            <h2 className={`text-xl font-bold bg-gradient-to-r ${zone.color} bg-clip-text text-transparent`}>
              {zone.name}
            </h2>
            
            {/* Description */}
            <p className="text-xs text-gray-400 text-center">
              {zone.description}
            </p>
            
            {/* Enter Arrow */}
            <MapPin className="w-5 h-5 text-gray-500 group-hover:text-cosmic-purple transition-colors" />
          </button>
        ))}
      </div>
      
      {/* Footer Info */}
      <div className="p-4 text-center text-xs text-gray-500 border-t border-cosmic-border">
        Kliknij strefę aby wejść
      </div>
    </div>
  )
}
