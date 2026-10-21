import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { signIn, signInWithGoogle } from '../services/auth'
import { ROUTES } from '../config/routes'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import GoogleSignInButton from '../components/auth/GoogleSignInButton'

interface LoginForm {
  email: string
  password: string
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()

  async function onSubmit(data: LoginForm) {
    setLoading(true)
    setError('')
    try {
      await signIn(data.email, data.password)
      navigate(ROUTES.DISCOVER)
    } catch {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setLoading(true)
    setError('')
    try {
      await signInWithGoogle()
      navigate(ROUTES.DISCOVER)
    } catch {
      setError('Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-bold text-hive-900 text-center mb-8">
          Welcome back
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-nectar-50 text-nectar-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={errors.password?.message}
          />
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-hive-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-hive-50 text-hive-400">or</span>
          </div>
        </div>

        <GoogleSignInButton onClick={handleGoogle} disabled={loading} />

        <p className="mt-6 text-center text-sm text-hive-500">
          Don&apos;t have an account?{' '}
          <Link to={ROUTES.SIGNUP} className="text-honey-500 font-medium hover:text-honey-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
