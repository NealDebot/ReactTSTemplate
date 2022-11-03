import { firebaseConfig } from '@util/config'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signOut,
  indexedDBLocalPersistence,
  signInAnonymously,
} from 'firebase/auth'

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
auth.setPersistence(indexedDBLocalPersistence)

// Auth
export const logout = () => signOut(auth)

export const signInAnon = () => {
  return signInAnonymously(auth)
}

// DB
