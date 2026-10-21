import { useState } from 'react'
import SwipeCard from './SwipeCard'
import SwipeActions from './SwipeActions'
import MatchPopup from './MatchPopup'
import type { DemoProfile } from '../../utils/demoData'

interface Props {
  profiles: DemoProfile[]
}

export default function SwipeStack({ profiles }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMatch, setShowMatch] = useState(false)
  const [matchedProfile, setMatchedProfile] = useState<DemoProfile | null>(null)

  const hasCards = currentIndex < profiles.length

  function handleSwipe(direction: 'like' | 'pass' | 'superlike') {
    // Simulate a match on every "like" for demo purposes
    if (direction === 'like' || direction === 'superlike') {
      const profile = profiles[currentIndex]
      // 40% chance of match for demo
      if (Math.random() < 0.4) {
        setMatchedProfile(profile)
        setShowMatch(true)
      }
    }
    setCurrentIndex((i) => i + 1)
  }

  if (!hasCards) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <div className="w-20 h-20 bg-honey-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">🐝</span>
        </div>
        <h2 className="font-display text-xl font-bold text-hive-800 mb-2">
          You've seen everyone!
        </h2>
        <p className="text-hive-500">
          Check back later for new people in your area
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-1 mx-4 mt-2">
        {/* Render current and next card */}
        {profiles.slice(currentIndex, currentIndex + 2).reverse().map((profile, i, arr) => (
          <SwipeCard
            key={profile.uid}
            profile={profile}
            onSwipe={handleSwipe}
            isTop={i === arr.length - 1}
          />
        ))}
      </div>
      <SwipeActions onSwipe={handleSwipe} />

      {showMatch && matchedProfile && (
        <MatchPopup
          profile={matchedProfile}
          onClose={() => setShowMatch(false)}
        />
      )}
    </div>
  )
}
