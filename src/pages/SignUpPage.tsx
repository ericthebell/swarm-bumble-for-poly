import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { signUp, signInWithGoogle } from '../services/auth'
import { createProfile, createPrivateData } from '../services/profiles'
import { ROUTES } from '../config/routes'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import GoogleSignInButton from '../components/auth/GoogleSignInButton'

interface SignUpForm {
  email: string
  password: string
  confirmPassword: string
}

export default function SignUpPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpForm>()

  async function onSubmit(data: SignUpForm) {
    setLoading(true)
    setError('')
    try {
      const { user } = await signUp(data.email, data.password)
      await createProfile(user.uid, {})
      await createPrivateData(user.uid, data.email)
      navigate(ROUTES.ONBOARDING)
    } catch {
      setError('Failed to create account. Email may already be in use.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setLoading(true)
    setError('')
    try {
      const { user } = await signInWithGoogle()
      await createProfile(user.uid, {})
      await createPrivateData(user.uid, user.email ?? '')
      navigate(ROUTES.ONBOARDING)
    } catch {
      setError('Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-bold text-hive-900 text-center mb-2">
          Join the swarm
        </h1>
        <p className="text-center text-hive-500 mb-8">
          Find your people, build your constellation
        </p>

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
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'At least 8 characters' },
            })}
            error={errors.password?.message}
          />
          <Input
            label="Confirm Password"
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (val) => val === watch('password') || 'Passwords do not match',
            })}
            error={errors.confirmPassword?.message}
          />
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
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
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-honey-500 font-medium hover:text-honey-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
