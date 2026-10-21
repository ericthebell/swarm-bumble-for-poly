import type { Timestamp } from 'firebase/firestore'

export interface Swipe {
  swiperId: string
  swipedId: string
  direction: 'like' | 'pass' | 'superlike'
  createdAt: Timestamp
}

export interface Match {
  id: string
  userIds: [string, string]
  userProfiles: Record<string, {
    displayName: string
    primaryPhotoUrl: string
  }>
  createdAt: Timestamp
  lastMessageAt: Timestamp | null
  lastMessagePreview: string | null
  unreadCount: Record<string, number>
}
