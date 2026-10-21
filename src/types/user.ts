import type { Timestamp, GeoPoint } from 'firebase/firestore'

export type PolyStyle =
  | 'solo_poly'
  | 'hierarchical'
  | 'non_hierarchical'
  | 'relationship_anarchy'
  | 'triad_seeking'
  | 'open_relationship'
  | 'mono_poly_flexible'
  | 'other'

export type SeekingType =
  | 'casual'
  | 'committed'
  | 'play_partners'
  | 'nesting_partner'
  | 'comet'
  | 'friendship'
  | 'exploration'
  | 'other'

export type SexualOrientation =
  | 'straight'
  | 'gay'
  | 'lesbian'
  | 'bisexual'
  | 'pansexual'
  | 'queer'
  | 'asexual'
  | 'demisexual'
  | 'other'

export type RomanticOrientation =
  | 'romantic'
  | 'aromantic'
  | 'demiromantic'
  | 'other'

export type Gender =
  | 'woman'
  | 'man'
  | 'nonbinary'
  | 'genderqueer'
  | 'genderfluid'
  | 'agender'
  | 'trans_woman'
  | 'trans_man'
  | 'two_spirit'
  | 'other'

export interface PartnerPreview {
  uid: string
  displayName: string
  primaryPhotoUrl: string
}

export interface UserProfile {
  uid: string
  displayName: string
  dateOfBirth: Timestamp
  bio: string
  gender: Gender
  genderCustom?: string
  pronouns: string

  location: {
    geopoint: GeoPoint
    geohash: string
    city: string
    state?: string
  }

  sexualOrientation: SexualOrientation[]
  romanticOrientation: RomanticOrientation
  polyStyle: PolyStyle
  polyStyleCustom?: string
  seeking: SeekingType[]

  interests: string[]
  photoUrls: string[]
  photoCount: number

  linkedPartnerCount: number
  linkedPartnerPreviews: PartnerPreview[]

  createdAt: Timestamp
  updatedAt: Timestamp
  lastActiveAt: Timestamp
  isActive: boolean
  onboardingComplete: boolean
}

export interface UserPrivate {
  email: string
  notificationPreferences: {
    matches: boolean
    messages: boolean
    partnerRequests: boolean
  }
  blockedUserIds: string[]
  reportedUserIds: string[]
}

export interface DiscoverySettings {
  ageRange: { min: number; max: number }
  maxDistanceKm: number
  genderPreferences: Gender[]
  polyStylePreferences: PolyStyle[]
  seekingPreferences: SeekingType[]
}
