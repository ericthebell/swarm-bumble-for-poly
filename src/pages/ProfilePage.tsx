import { useAuth } from '../contexts/AuthContext'
import { signOut } from '../services/auth'
import Button from '../components/ui/Button'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="p-6">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-24 h-24 bg-honey-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">👤</span>
        </div>
        <h2 className="font-display text-xl font-bold text-hive-800">
          {user?.displayName || user?.email || 'Your Profile'}
        </h2>
        <p className="text-sm text-hive-500 mt-1">{user?.email}</p>
      </div>

      <div className="space-y-3">
        <Button variant="secondary" className="w-full" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    </div>
  )
}
