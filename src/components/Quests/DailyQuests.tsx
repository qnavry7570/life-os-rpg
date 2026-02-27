import { useLifeOSStore } from '../../store/lifeOsStore'
import { CheckCircle2, Circle } from 'lucide-react'

export function DailyQuests() {
  const { activeQuests, updateQuestProgress } = useLifeOSStore()
  
  return (
    <div className="card p-4 space-y-4">
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
        <span>📋 Dzienne Questy</span>
        <span className="text-xs bg-cosmic-purple/20 px-2 py-1 rounded-full">
          {activeQuests.filter(q => q.status === 'completed').length}/{activeQuests.length}
        </span>
      </h2>
      
      <div className="space-y-3">
        {activeQuests.map(quest => {
          const isCompleted = quest.status === 'completed'
          
          return (
            <div 
              key={quest.id}
              className={`p-3 rounded-lg border ${
                isCompleted 
                  ? 'bg-green-500/10 border-green-500' 
                  : 'bg-cosmic-card/50 border-cosmic-border'
              }`}
            >
              <div className="flex items-start gap-3 mb-2">
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                )}
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`text-sm font-semibold ${
                      isCompleted ? 'text-green-400 line-through' : 'text-white'
                    }`}>
                      Quest #{quest.questId}
                    </h3>
                    <span className="text-xs text-cosmic-cyan font-semibold">
                      {isCompleted ? `✓ +${quest.xpAwarded} XP` : `+${quest.targetValue} XP`}
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-2">
                    {quest.currentProgress} / {quest.targetValue}
                  </div>
                  
                  <div className="progress-bar h-2">
                    <div 
                      className={`progress-fill ${
                        isCompleted 
                          ? 'bg-green-500' 
                          : 'bg-gradient-to-r from-cosmic-purple to-cosmic-cyan'
                      }`}
                      style={{ width: `${Math.min(100, quest.progressPercent)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        
        {activeQuests.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            Brak aktywnych questów na dziś
          </div>
        )}
      </div>
    </div>
  )
}
