import { Link } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <h1 className="font-display text-6xl font-bold text-honey-500 mb-4">404</h1>
      <p className="text-hive-500 mb-6">This page doesn't exist</p>
      <Link to={ROUTES.LANDING}>
        <Button>Go Home</Button>
      </Link>
    </div>
  )
}
