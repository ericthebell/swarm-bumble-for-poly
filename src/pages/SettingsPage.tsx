import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function SettingsPage() {
  const navigate = useNavigate()

  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-hive-500 mb-6">
        <ArrowLeft size={20} />
        Back
      </button>
      <h2 className="font-display text-xl font-bold text-hive-800 mb-4">Settings</h2>
      <p className="text-hive-500">Settings coming soon</p>
    </div>
  )
}
