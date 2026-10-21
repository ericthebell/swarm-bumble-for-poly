import type { PolyStyle, SeekingType, SexualOrientation, Gender } from '../types/user'

export interface DemoProfile {
  uid: string
  displayName: string
  age: number
  bio: string
  gender: Gender
  pronouns: string
  city: string
  photoUrls: string[]
  sexualOrientation: SexualOrientation[]
  polyStyle: PolyStyle
  seeking: SeekingType[]
  interests: string[]
  linkedPartnerCount: number
  linkedPartnerPreviews: { uid: string; displayName: string; primaryPhotoUrl: string }[]
}

// Placeholder avatar URLs using DiceBear API (generates SVG avatars)
function avatar(seed: string) {
  return `https://api.dicebear.com/8.x/lorelei/svg?seed=${seed}&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`
}

export const DEMO_PROFILES: DemoProfile[] = [
  {
    uid: 'demo-1',
    displayName: 'River',
    age: 29,
    bio: 'Queer artist and kitchen witch. I believe love expands. Looking for genuine connection and good conversations over homemade soup.',
    gender: 'nonbinary',
    pronouns: 'they/them',
    city: 'Portland, OR',
    photoUrls: [avatar('river'), avatar('river2'), avatar('river3')],
    sexualOrientation: ['pansexual'],
    polyStyle: 'relationship_anarchy',
    seeking: ['committed', 'friendship'],
    interests: ['Art', 'Cooking', 'Tarot', 'Hiking', 'Poetry'],
    linkedPartnerCount: 1,
    linkedPartnerPreviews: [
      { uid: 'p1', displayName: 'Sage', primaryPhotoUrl: avatar('sage') },
    ],
  },
  {
    uid: 'demo-2',
    displayName: 'Luna',
    age: 34,
    bio: 'Software engineer by day, salsa dancer by night. Happily partnered and looking to expand our circle. Big fan of parallel play and cozy nights in.',
    gender: 'woman',
    pronouns: 'she/her',
    city: 'San Francisco, CA',
    photoUrls: [avatar('luna'), avatar('luna2')],
    sexualOrientation: ['bisexual'],
    polyStyle: 'hierarchical',
    seeking: ['casual', 'play_partners'],
    interests: ['Dancing', 'Code', 'Board Games', 'Wine', 'Travel'],
    linkedPartnerCount: 1,
    linkedPartnerPreviews: [
      { uid: 'p2', displayName: 'Marcus', primaryPhotoUrl: avatar('marcus') },
    ],
  },
  {
    uid: 'demo-3',
    displayName: 'Jasper',
    age: 27,
    bio: 'Climbing enthusiast and plant dad. Solo poly and loving the freedom. Let\'s go on an adventure and see where things lead.',
    gender: 'man',
    pronouns: 'he/him',
    city: 'Denver, CO',
    photoUrls: [avatar('jasper'), avatar('jasper2'), avatar('jasper3')],
    sexualOrientation: ['queer'],
    polyStyle: 'solo_poly',
    seeking: ['casual', 'comet', 'exploration'],
    interests: ['Rock Climbing', 'Plants', 'Photography', 'Yoga', 'Music'],
    linkedPartnerCount: 0,
    linkedPartnerPreviews: [],
  },
  {
    uid: 'demo-4',
    displayName: 'Aria',
    age: 31,
    bio: 'Therapist, bookworm, and relationship nerd. I practice what I preach — ethical non-monogamy with lots of communication.',
    gender: 'woman',
    pronouns: 'she/they',
    city: 'Seattle, WA',
    photoUrls: [avatar('aria'), avatar('aria2')],
    sexualOrientation: ['bisexual', 'demisexual'],
    polyStyle: 'non_hierarchical',
    seeking: ['committed', 'nesting_partner'],
    interests: ['Psychology', 'Books', 'Meditation', 'Cats', 'Podcasts'],
    linkedPartnerCount: 2,
    linkedPartnerPreviews: [
      { uid: 'p3', displayName: 'Kai', primaryPhotoUrl: avatar('kai') },
      { uid: 'p4', displayName: 'Devon', primaryPhotoUrl: avatar('devon') },
    ],
  },
  {
    uid: 'demo-5',
    displayName: 'Felix',
    age: 26,
    bio: 'DJ, dog lover, eternal optimist. Our polycule is looking for a fourth — must love puns and late-night diner runs.',
    gender: 'genderfluid',
    pronouns: 'he/they',
    city: 'Austin, TX',
    photoUrls: [avatar('felix'), avatar('felix2'), avatar('felix3')],
    sexualOrientation: ['pansexual'],
    polyStyle: 'triad_seeking',
    seeking: ['committed', 'play_partners'],
    interests: ['Music', 'Dogs', 'Comedy', 'Cooking', 'Roller Skating'],
    linkedPartnerCount: 2,
    linkedPartnerPreviews: [
      { uid: 'p5', displayName: 'Zara', primaryPhotoUrl: avatar('zara') },
      { uid: 'p6', displayName: 'Quinn', primaryPhotoUrl: avatar('quinn') },
    ],
  },
]
