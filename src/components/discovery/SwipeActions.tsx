import { X, Heart, Star } from 'lucide-react'

interface Props {
  onSwipe: (direction: 'like' | 'pass' | 'superlike') => void
  disabled?: boolean
}

export default function SwipeActions({ onSwipe, disabled }: Props) {
  return (
    <div className="flex items-center justify-center gap-5 py-4">
      <button
        onClick={() => onSwipe('pass')}
        disabled={disabled}
        className="w-14 h-14 flex items-center justify-center rounded-full bg-white border-2 border-hive-200 text-hive-400 shadow-card hover:border-red-400 hover:text-red-400 transition-colors disabled:opacity-50"
        aria-label="Pass"
      >
        <X size={26} />
      </button>
      <button
        onClick={() => onSwipe('superlike')}
        disabled={disabled}
        className="w-11 h-11 flex items-center justify-center rounded-full bg-white border-2 border-hive-200 text-pollen-500 shadow-card hover:border-pollen-500 transition-colors disabled:opacity-50"
        aria-label="Super Like"
      >
        <Star size={20} />
      </button>
      <button
        onClick={() => onSwipe('like')}
        disabled={disabled}
        className="w-14 h-14 flex items-center justify-center rounded-full bg-nectar-500 text-white shadow-card hover:bg-nectar-600 transition-colors disabled:opacity-50"
        aria-label="Like"
      >
        <Heart size={26} />
      </button>
    </div>
  )
}
