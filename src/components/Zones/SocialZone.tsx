import { ArrowLeft, Users, MessageCircle, Calendar } from 'lucide-react'

interface SocialZoneProps {
  onBack: () => void
}

export function SocialZone({ onBack }: SocialZoneProps) {
  return (
    <div className="min-h-screen bg-cosmic-bg">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-cosmic-card border-b border-cosmic-border p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="btn-secondary py-2 px-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🤝</span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Social Zone
              </h1>
            </div>
            <p className="text-xs text-gray-400">Relacje i kontakty</p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Coming Soon */}
        <div className="card p-8 text-center space-y-4">
          <div className="text-6xl">🚧</div>
          <h2 className="text-xl font-bold text-gray-300">Wkrótce!</h2>
          <p className="text-sm text-gray-500">
            Strefa Social jest w budowie. Wkrótce tutaj znajdziesz:
          </p>
          
          <div className="space-y-3 text-left mt-6">
            <div className="flex items-center gap-3 bg-cosmic-card/50 rounded-lg p-3">
              <Users className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-sm font-semibold">Spotkania</div>
                <div className="text-xs text-gray-500">Śledź kontakty ze znajomymi</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-cosmic-card/50 rounded-lg p-3">
              <MessageCircle className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-sm font-semibold">Rozmowy</div>
                <div className="text-xs text-gray-500">Jakość i częstość interakcji</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-cosmic-card/50 rounded-lg p-3">
              <Calendar className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-sm font-semibold">Wydarzenia</div>
                <div className="text-xs text-gray-500">Planowane spotkania i eventy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
