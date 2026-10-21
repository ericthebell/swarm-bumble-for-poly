import type { Timestamp } from 'firebase/firestore'

export type PartnerVisibility = 'public' | 'matches_only' | 'hidden'

export interface PartnerLink {
  id: string
  requesterUid: string
  recipientUid: string
  status: 'pending' | 'accepted' | 'declined' | 'removed'
  relationshipLabel?: string
  visibility: Record<string, PartnerVisibility>
  createdAt: Timestamp
  acceptedAt?: Timestamp
  updatedAt: Timestamp
}

export interface Endorsement {
  id: string
  authorUid: string
  subjectUid: string
  partnerLinkId: string
  text: string
  isVisible: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}
