import { useLifeOSStore } from '../../store/lifeOsStore'

interface AttributeBarProps {
  emoji: string
  label: string
  value: number
  color: string
  glowClass: string
}

function AttributeBar({ emoji, label, value, color, glowClass }: AttributeBarProps) {
  return (
    <div className="stat-bar">
      <span className="text-2xl">{emoji}</span>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          <span className={`text-sm font-bold ${glowClass}`}>{value}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className={`progress-fill ${color} ${glowClass.replace('text', 'shadow')}`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export function AttributesPanel() {
  const profile = useLifeOSStore(state => state.profile)
  
  if (!profile) return null
  
  return (
    <div className="card p-4 space-y-3">
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
        Atrybuty Bohatera
      </h2>
      
      <AttributeBar 
        emoji="❤️"
        label="Witalność"
        value={profile.vitality}
        color="bg-gradient-to-r from-red-500 to-pink-500"
        glowClass="text-red-400 shadow-glow-red"
      />
      
      <AttributeBar 
        emoji="⚡"
        label="Energia"
        value={profile.energy}
        color="bg-gradient-to-r from-yellow-500 to-amber-500"
        glowClass="text-amber-400 shadow-glow-amber"
      />
      
      <AttributeBar 
        emoji="🧠"
        label="Mądrość"
        value={profile.wisdom}
        color="bg-gradient-to-r from-blue-500 to-indigo-500"
        glowClass="text-blue-400"
      />
      
      <AttributeBar 
        emoji="🎯"
        label="Fokus"
        value={profile.focus}
        color="bg-gradient-to-r from-cyan-500 to-teal-500"
        glowClass="text-cosmic-cyan shadow-glow-cyan"
      />
      
      <AttributeBar 
        emoji="💪"
        label="Kondycja"
        value={profile.condition}
        color="bg-gradient-to-r from-green-500 to-emerald-500"
        glowClass="text-green-400 shadow-glow-green"
      />
    </div>
  )
}
