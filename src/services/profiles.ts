import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import type { UserProfile, UserPrivate, DiscoverySettings } from '../types/user'

export async function createProfile(uid: string, data: Partial<UserProfile>) {
  const ref = doc(db, 'users', uid)
  await setDoc(ref, {
    ...data,
    uid,
    linkedPartnerCount: 0,
    linkedPartnerPreviews: [],
    isActive: true,
    onboardingComplete: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastActiveAt: serverTimestamp(),
  })
}

export async function getProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? (snap.data() as UserProfile) : null
}

export async function updateProfile(uid: string, data: Partial<UserProfile>) {
  await updateDoc(doc(db, 'users', uid), {
    ...data,
    updatedAt: serverTimestamp(),
    lastActiveAt: serverTimestamp(),
  })
}

export function subscribeToProfile(uid: string, callback: (profile: UserProfile | null) => void): Unsubscribe {
  return onSnapshot(doc(db, 'users', uid), (snap) => {
    callback(snap.exists() ? (snap.data() as UserProfile) : null)
  })
}

export async function createPrivateData(uid: string, email: string) {
  await setDoc(doc(db, 'users', uid, 'private', uid), {
    email,
    notificationPreferences: { matches: true, messages: true, partnerRequests: true },
    blockedUserIds: [],
    reportedUserIds: [],
  } satisfies UserPrivate)
}

export async function saveDiscoverySettings(uid: string, settings: DiscoverySettings) {
  await setDoc(doc(db, 'users', uid, 'discovery_settings', uid), settings)
}

export async function getDiscoverySettings(uid: string): Promise<DiscoverySettings | null> {
  const snap = await getDoc(doc(db, 'users', uid, 'discovery_settings', uid))
  return snap.exists() ? (snap.data() as DiscoverySettings) : null
}
