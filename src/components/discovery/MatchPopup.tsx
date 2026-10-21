import { motion, AnimatePresence } from 'framer-motion'
import Button from '../ui/Button'
import type { DemoProfile } from '../../utils/demoData'

interface Props {
  profile: DemoProfile
  onClose: () => void
}

export default function MatchPopup({ profile, onClose }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-3xl p-8 text-center max-w-sm w-full shadow-card-hover"
          initial={{ scale: 0.8, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 10, stiffness: 200 }}
            className="text-6xl mb-4"
          >
            🐝
          </motion.div>

          <h2 className="font-display text-3xl font-bold text-hive-900 mb-2">
            It&apos;s a Match!
          </h2>
          <p className="text-hive-500 mb-6">
            You and <span className="font-semibold text-honey-600">{profile.displayName}</span> liked each other
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-honey-400">
              <img
                src={profile.photoUrls[0]}
                alt={profile.displayName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Button size="lg" className="w-full" onClick={onClose}>
              Send a Message
            </Button>
            <Button variant="ghost" className="w-full" onClick={onClose}>
              Keep Swiping
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
