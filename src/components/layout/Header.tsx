import { Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../config/routes'

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-hive-100">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        <h1 className="font-display text-xl font-bold text-honey-500">
          swarm
        </h1>
        <button
          onClick={() => navigate(ROUTES.SETTINGS)}
          className="p-2 text-hive-400 hover:text-hive-600 transition-colors"
          aria-label="Settings"
        >
          <Settings size={20} />
        </button>
      </div>
    </header>
  )
}
