import { useState } from 'react'
import { UserPlus, Eye, EyeOff, Shield, Heart, Quote } from 'lucide-react'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

interface DemoPartner {
  id: string
  displayName: string
  avatar: string
  relationshipLabel: string
  visibility: 'public' | 'matches_only' | 'hidden'
  endorsement?: string
  since: string
}

const DEMO_PARTNERS: DemoPartner[] = [
  {
    id: 'p1',
    displayName: 'Alex',
    avatar: 'https://api.dicebear.com/8.x/lorelei/svg?seed=alex&backgroundColor=d1d4f9',
    relationshipLabel: 'Nesting Partner',
    visibility: 'public',
    endorsement: 'One of the most thoughtful and communicative people I know. They make everyone feel seen and valued.',
    since: '3 years',
  },
  {
    id: 'p2',
    displayName: 'Morgan',
    avatar: 'https://api.dicebear.com/8.x/lorelei/svg?seed=morgan&backgroundColor=c0aede',
    relationshipLabel: 'Partner',
    visibility: 'matches_only',
    endorsement: 'Always up for an adventure and never runs out of interesting conversation topics.',
    since: '8 months',
  },
]

const DEMO_PENDING = [
  {
    id: 'req1',
    displayName: 'Jordan',
    avatar: 'https://api.dicebear.com/8.x/lorelei/svg?seed=jordan&backgroundColor=b6e3f4',
    relationshipLabel: 'Partner',
  },
]

const VISIBILITY_LABELS = {
  public: { label: 'Public', icon: Eye, description: 'Visible to everyone' },
  matches_only: { label: 'Matches Only', icon: Shield, description: 'Only your matches see this' },
  hidden: { label: 'Hidden', icon: EyeOff, description: 'Not shown on your profile' },
}

export default function PartnersPage() {
  const [partners, setPartners] = useState(DEMO_PARTNERS)

  function cycleVisibility(id: string) {
    const order: Array<'public' | 'matches_only' | 'hidden'> = ['public', 'matches_only', 'hidden']
    setPartners((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
        const currentIdx = order.indexOf(p.visibility)
        return { ...p, visibility: order[(currentIdx + 1) % order.length] }
      })
    )
  }

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-hive-900">Partners</h2>
        <Button size="sm">
          <UserPlus size={16} className="mr-1.5" />
          Link Partner
        </Button>
      </div>

      {/* Pending requests */}
      {DEMO_PENDING.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-hive-500 uppercase tracking-wide mb-3">Pending Requests</h3>
          {DEMO_PENDING.map((req) => (
            <div key={req.id} className="flex items-center gap-3 p-3 bg-pollen-50 rounded-xl border border-pollen-100">
              <img src={req.avatar} alt={req.displayName} className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <p className="font-semibold text-hive-800">{req.displayName}</p>
                <p className="text-xs text-hive-500">wants to link as <span className="font-medium">{req.relationshipLabel}</span></p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Accept</Button>
                <Button size="sm" variant="ghost">Decline</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Linked partners */}
      <div>
        <h3 className="text-sm font-semibold text-hive-500 uppercase tracking-wide mb-3">Your Partners</h3>
        <div className="space-y-4">
          {partners.map((partner) => {
            const vis = VISIBILITY_LABELS[partner.visibility]
            const VisIcon = vis.icon
            return (
              <div key={partner.id} className="bg-white rounded-xl border border-hive-100 shadow-card overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={partner.avatar} alt={partner.displayName} className="w-14 h-14 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-hive-800">{partner.displayName}</p>
                        <Badge variant="honey">{partner.relationshipLabel}</Badge>
                      </div>
                      <p className="text-xs text-hive-400 mt-0.5">
                        <Heart size={10} className="inline mr-1" />
                        Together {partner.since}
                      </p>
                    </div>
                  </div>

                  {/* Visibility control */}
                  <button
                    onClick={() => cycleVisibility(partner.id)}
                    className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-hive-50 rounded-lg text-sm text-hive-600 hover:bg-hive-100 transition-colors w-full"
                  >
                    <VisIcon size={14} />
                    <span className="font-medium">{vis.label}</span>
                    <span className="text-xs text-hive-400 ml-1">— {vis.description}</span>
                  </button>
                </div>

                {/* Endorsement */}
                {partner.endorsement && (
                  <div className="px-4 py-3 bg-honey-50 border-t border-honey-100">
                    <div className="flex items-start gap-2">
                      <Quote size={14} className="text-honey-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-hive-700 italic">{partner.endorsement}</p>
                        <p className="text-xs text-hive-400 mt-1">— {partner.displayName}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
