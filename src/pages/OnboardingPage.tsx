import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Timestamp, GeoPoint } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthContext'
import { updateProfile, saveDiscoverySettings } from '../services/profiles'
import { uploadPhoto } from '../services/storage'
import { ROUTES } from '../config/routes'
import { POLY_STYLE_LABELS, SEEKING_LABELS, ORIENTATION_LABELS, GENDER_LABELS } from '../config/constants'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import type { Gender, SexualOrientation, PolyStyle, SeekingType } from '../types/user'
import { geohashForLocation } from 'geofire-common'

const STEPS = ['Basics', 'Photos', 'About', 'Identity', 'Preferences']

export default function OnboardingPage() {
  const { user, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)

  // Step 1: Basics
  const [displayName, setDisplayName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState<Gender>('nonbinary')
  const [pronouns, setPronouns] = useState('')

  // Step 2: Photos
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])

  // Step 3: About
  const [bio, setBio] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [interestInput, setInterestInput] = useState('')

  // Step 4: Identity (poly-specific)
  const [sexualOrientation, setSexualOrientation] = useState<SexualOrientation[]>([])
  const [polyStyle, setPolyStyle] = useState<PolyStyle>('non_hierarchical')
  const [seeking, setSeeking] = useState<SeekingType[]>([])

  // Step 5: Preferences
  const [ageMin, setAgeMin] = useState(21)
  const [ageMax, setAgeMax] = useState(45)
  const [maxDistance, setMaxDistance] = useState(50)

  function addPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (photoFiles.length + files.length > 6) return
    setPhotoFiles((prev) => [...prev, ...files])
    files.forEach((f) => {
      const reader = new FileReader()
      reader.onload = () => setPhotoPreviews((prev) => [...prev, reader.result as string])
      reader.readAsDataURL(f)
    })
  }

  function removePhoto(index: number) {
    setPhotoFiles((prev) => prev.filter((_, i) => i !== index))
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  function toggleArrayItem<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]
  }

  function addInterest() {
    const tag = interestInput.trim()
    if (tag && interests.length < 10 && !interests.includes(tag)) {
      setInterests((prev) => [...prev, tag])
      setInterestInput('')
    }
  }

  async function handleFinish() {
    if (!user) return
    setSaving(true)
    try {
      // Upload photos
      const photoUrls = await Promise.all(
        photoFiles.map((file, i) => uploadPhoto(user.uid, file, i))
      )

      // Get location (best effort)
      let location = {
        geopoint: new GeoPoint(0, 0),
        geohash: geohashForLocation([0, 0]),
        city: 'Unknown',
      }
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
        )
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        location = {
          geopoint: new GeoPoint(lat, lng),
          geohash: geohashForLocation([lat, lng]),
          city: 'Your City',
        }
      } catch {
        // Location unavailable, use defaults
      }

      await updateProfile(user.uid, {
        displayName,
        dateOfBirth: Timestamp.fromDate(new Date(dateOfBirth)),
        gender,
        pronouns,
        bio,
        interests,
        photoUrls,
        photoCount: photoUrls.length,
        sexualOrientation,
        romanticOrientation: 'romantic',
        polyStyle,
        seeking,
        location,
        onboardingComplete: true,
      })

      await saveDiscoverySettings(user.uid, {
        ageRange: { min: ageMin, max: ageMax },
        maxDistanceKm: maxDistance,
        genderPreferences: Object.keys(GENDER_LABELS) as Gender[],
        polyStylePreferences: [],
        seekingPreferences: [],
      })

      // Refresh profile in AuthContext so routing knows onboarding is done
      await refreshProfile()
      navigate(ROUTES.DISCOVER)
    } catch (err) {
      console.error('Onboarding failed:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Progress bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-hive-100 px-4 py-3">
        <div className="flex gap-1.5 mb-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? 'bg-honey-500' : 'bg-hive-200'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-hive-400 font-medium">{STEPS[step]}</p>
      </div>

      <div className="max-w-sm mx-auto px-6 py-8">
        {/* Step 1: Basics */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-hive-900 mb-1">The basics</h2>
              <p className="text-hive-500">Let people know who you are</p>
            </div>
            <Input
              label="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="What should people call you?"
            />
            <Input
              label="Date of Birth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-hive-700">Gender</label>
              <div className="flex flex-wrap gap-2">
                {(Object.entries(GENDER_LABELS) as [Gender, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setGender(key)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      gender === key
                        ? 'bg-honey-500 text-white'
                        : 'bg-hive-100 text-hive-600 hover:bg-hive-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <Input
              label="Pronouns"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              placeholder="e.g. they/them, she/her"
            />
          </div>
        )}

        {/* Step 2: Photos */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-hive-900 mb-1">Add photos</h2>
              <p className="text-hive-500">Up to 6 photos. First one is your main.</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {photoPreviews.map((src, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden bg-hive-100">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/50 text-white rounded-full text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
              {photoFiles.length < 6 && (
                <label className="aspect-[3/4] rounded-xl border-2 border-dashed border-hive-300 flex items-center justify-center cursor-pointer hover:border-honey-500 transition-colors">
                  <span className="text-2xl text-hive-400">+</span>
                  <input type="file" accept="image/*" onChange={addPhoto} className="hidden" />
                </label>
              )}
            </div>
          </div>
        )}

        {/* Step 3: About */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-hive-900 mb-1">About you</h2>
              <p className="text-hive-500">What makes you, you?</p>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-hive-700">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={500}
                rows={4}
                placeholder="Tell people about yourself..."
                className="w-full px-4 py-2.5 bg-white border border-hive-200 rounded-xl text-hive-800 placeholder:text-hive-400 focus:outline-none focus:ring-2 focus:ring-honey-500 resize-none"
              />
              <p className="text-xs text-hive-400 text-right">{bio.length}/500</p>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-hive-700">Interests (up to 10)</label>
              <div className="flex gap-2">
                <Input
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                  placeholder="Add an interest"
                  className="flex-1"
                />
                <Button variant="secondary" onClick={addInterest}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {interests.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-honey-100 text-honey-700 rounded-full text-sm"
                  >
                    {tag}
                    <button onClick={() => setInterests((prev) => prev.filter((t) => t !== tag))} className="text-honey-500 hover:text-honey-700">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Identity — the poly-specific step */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-hive-900 mb-1">Your identity</h2>
              <p className="text-hive-500">This is what makes Swarm different</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-hive-700">Sexual Orientation (select all)</label>
              <div className="flex flex-wrap gap-2">
                {(Object.entries(ORIENTATION_LABELS) as [SexualOrientation, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSexualOrientation((prev) => toggleArrayItem(prev, key))}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      sexualOrientation.includes(key)
                        ? 'bg-honey-500 text-white'
                        : 'bg-hive-100 text-hive-600 hover:bg-hive-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-hive-700">Relationship Style</label>
              <div className="flex flex-wrap gap-2">
                {(Object.entries(POLY_STYLE_LABELS) as [PolyStyle, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setPolyStyle(key)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      polyStyle === key
                        ? 'bg-nectar-500 text-white'
                        : 'bg-hive-100 text-hive-600 hover:bg-hive-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-hive-700">Looking For (select all)</label>
              <div className="flex flex-wrap gap-2">
                {(Object.entries(SEEKING_LABELS) as [SeekingType, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSeeking((prev) => toggleArrayItem(prev, key))}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      seeking.includes(key)
                        ? 'bg-pollen-500 text-white'
                        : 'bg-hive-100 text-hive-600 hover:bg-hive-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Preferences */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-hive-900 mb-1">Preferences</h2>
              <p className="text-hive-500">Who do you want to see?</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-hive-700 mb-1">
                  Age Range: {ageMin} – {ageMax}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={18}
                    max={99}
                    value={ageMin}
                    onChange={(e) => setAgeMin(Math.min(Number(e.target.value), ageMax))}
                    className="flex-1 accent-honey-500"
                  />
                  <input
                    type="range"
                    min={18}
                    max={99}
                    value={ageMax}
                    onChange={(e) => setAgeMax(Math.max(Number(e.target.value), ageMin))}
                    className="flex-1 accent-honey-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-hive-700 mb-1">
                  Maximum Distance: {maxDistance} km
                </label>
                <input
                  type="range"
                  min={5}
                  max={200}
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="w-full accent-honey-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <Button variant="secondary" onClick={() => setStep((s) => s - 1)} className="flex-1">
              Back
            </Button>
          )}
          {step < STEPS.length - 1 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              className="flex-1"
              disabled={step === 0 && (!displayName || !dateOfBirth)}
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleFinish} className="flex-1" disabled={saving}>
              {saving ? 'Setting up...' : 'Start Swarming'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
