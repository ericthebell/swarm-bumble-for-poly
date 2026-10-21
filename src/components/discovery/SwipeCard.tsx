import { useState } from 'react'
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import { MapPin, Heart, Users } from 'lucide-react'
import Badge from '../ui/Badge'
import { POLY_STYLE_LABELS, SEEKING_LABELS } from '../../config/constants'
import type { DemoProfile } from '../../utils/demoData'

interface Props {
  profile: DemoProfile
  onSwipe: (direction: 'like' | 'pass' | 'superlike') => void
  isTop: boolean
}

const SWIPE_THRESHOLD = 120
const VELOCITY_THRESHOLD = 500

export default function SwipeCard({ profile, onSwipe, isTop }: Props) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [exiting, setExiting] = useState(false)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-300, 300], [-18, 18])
  const likeOpacity = useTransform(x, [0, 100], [0, 1])
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0])

  function handleDragEnd(_: unknown, info: PanInfo) {
    const { offset, velocity } = info

    if (offset.x > SWIPE_THRESHOLD || velocity.x > VELOCITY_THRESHOLD) {
      setExiting(true)
      onSwipe('like')
    } else if (offset.x < -SWIPE_THRESHOLD || velocity.x < -VELOCITY_THRESHOLD) {
      setExiting(true)
      onSwipe('pass')
    } else if (offset.y < -SWIPE_THRESHOLD || velocity.y < -VELOCITY_THRESHOLD) {
      setExiting(true)
      onSwipe('superlike')
    }
  }

  function cyclePhoto(e: React.MouseEvent) {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    if (clickX > rect.width / 2) {
      setPhotoIndex((i) => Math.min(i + 1, profile.photoUrls.length - 1))
    } else {
      setPhotoIndex((i) => Math.max(i - 1, 0))
    }
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{
        x,
        rotate,
        zIndex: isTop ? 10 : 5,
        scale: isTop ? 1 : 0.95,
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      animate={exiting ? { x: x.get() > 0 ? 500 : -500, opacity: 0 } : {}}
      transition={{ type: 'spring', damping: 30, stiffness: 200 }}
    >
      <div className="relative h-full bg-white rounded-card shadow-card overflow-hidden flex flex-col">
        {/* Photo */}
        <div className="relative flex-[3] min-h-0 bg-hive-100" onClick={cyclePhoto}>
          <img
            src={profile.photoUrls[photoIndex]}
            alt={profile.displayName}
            className="w-full h-full object-cover"
          />

          {/* Photo indicators */}
          <div className="absolute top-3 left-3 right-3 flex gap-1">
            {profile.photoUrls.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i === photoIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* LIKE / NOPE stamps */}
          <motion.div
            className="absolute top-8 left-6 border-4 border-green-500 text-green-500 font-display text-3xl font-bold px-4 py-1 rounded-lg -rotate-12"
            style={{ opacity: likeOpacity }}
          >
            LIKE
          </motion.div>
          <motion.div
            className="absolute top-8 right-6 border-4 border-red-400 text-red-400 font-display text-3xl font-bold px-4 py-1 rounded-lg rotate-12"
            style={{ opacity: nopeOpacity }}
          >
            NOPE
          </motion.div>
        </div>

        {/* Profile info */}
        <div className="p-4 space-y-3 overflow-y-auto flex-[2] min-h-0">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-2xl font-bold text-hive-900">
                {profile.displayName}
              </h2>
              <span className="text-xl text-hive-400">{profile.age}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-hive-500 mt-0.5">
              <MapPin size={14} />
              {profile.city}
              <span className="mx-1">·</span>
              {profile.pronouns}
            </div>
          </div>

          {/* Poly style + seeking */}
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="nectar">{POLY_STYLE_LABELS[profile.polyStyle]}</Badge>
            {profile.seeking.map((s) => (
              <Badge key={s} variant="honey">{SEEKING_LABELS[s]}</Badge>
            ))}
          </div>

          {/* Bio */}
          <p className="text-sm text-hive-600 line-clamp-3">{profile.bio}</p>

          {/* Partners */}
          {profile.linkedPartnerCount > 0 && (
            <div className="flex items-center gap-2">
              <Users size={14} className="text-hive-400" />
              <div className="flex -space-x-2">
                {profile.linkedPartnerPreviews.map((p) => (
                  <img
                    key={p.uid}
                    src={p.primaryPhotoUrl}
                    alt={p.displayName}
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-xs text-hive-500">
                {profile.linkedPartnerCount} linked partner{profile.linkedPartnerCount > 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Interests */}
          <div className="flex flex-wrap gap-1.5">
            {profile.interests.map((interest) => (
              <span key={interest} className="px-2 py-0.5 bg-hive-100 text-hive-600 rounded-full text-xs">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
