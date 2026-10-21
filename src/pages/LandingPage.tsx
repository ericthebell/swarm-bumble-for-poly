import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithGoogle } from '../services/auth'
import { getProfile, createProfile, createPrivateData } from '../services/profiles'
import { ROUTES } from '../config/routes'
import GoogleSignInButton from '../components/auth/GoogleSignInButton'

export default function LandingPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleGoogle() {
    setLoading(true)
    setError('')
    try {
      const { user } = await signInWithGoogle()

      // Check if user already has a profile
      const existingProfile = await getProfile(user.uid)

      if (existingProfile) {
        // Returning user — go to discover or onboarding
        if (existingProfile.onboardingComplete) {
          navigate(ROUTES.DISCOVER)
        } else {
          navigate(ROUTES.ONBOARDING)
        }
      } else {
        // New user — create profile skeleton and send to onboarding
        await createProfile(user.uid, {})
        await createPrivateData(user.uid, user.email ?? '')
        navigate(ROUTES.ONBOARDING)
      }
    } catch (err) {
      console.error('Sign-in failed:', err)
      setError('Sign-in failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gradient-to-b from-honey-50 to-white">
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto mb-6 bg-honey-500 rounded-3xl flex items-center justify-center shadow-card">
          <svg width="48" height="48" viewBox="0 0 100 100" className="text-white">
            <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" fill="none" stroke="currentColor" strokeWidth="6"/>
            <circle cx="35" cy="45" r="8" fill="currentColor"/>
            <circle cx="65" cy="45" r="8" fill="currentColor"/>
            <circle cx="50" cy="70" r="8" fill="currentColor"/>
            <line x1="35" y1="45" x2="65" y2="45" stroke="currentColor" strokeWidth="3"/>
            <line x1="35" y1="45" x2="50" y2="70" stroke="currentColor" strokeWidth="3"/>
            <line x1="65" y1="45" x2="50" y2="70" stroke="currentColor" strokeWidth="3"/>
          </svg>
        </div>
        <h1 className="font-display text-4xl font-bold text-hive-900 mb-3">
          swarm
        </h1>
        <p className="text-lg text-hive-500 max-w-xs mx-auto">
          Dating designed for polyamorous people. Build your constellation.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-nectar-50 text-nectar-600 text-sm rounded-xl max-w-xs w-full">
          {error}
        </div>
      )}

      <div className="w-full max-w-xs">
        <GoogleSignInButton onClick={handleGoogle} disabled={loading} />
        {loading && (
          <p className="mt-3 text-sm text-hive-400 animate-pulse">Signing you in...</p>
        )}
      </div>

      <p className="mt-8 text-sm text-hive-400">
        Many connections. One community.
      </p>
    </div>
  )
}
