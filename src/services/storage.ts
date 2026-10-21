import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../config/firebase'

export async function uploadPhoto(uid: string, file: File, index: number): Promise<string> {
  const storageRef = ref(storage, `users/${uid}/photos/${index}_${Date.now()}`)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}

export async function deletePhoto(photoUrl: string) {
  const storageRef = ref(storage, photoUrl)
  await deleteObject(storageRef)
}
