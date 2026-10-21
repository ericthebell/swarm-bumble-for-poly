import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ROUTES } from './config/routes'
import AppShell from './components/layout/AppShell'
import Spinner from './components/ui/Spinner'
import LandingPage from './pages/LandingPage'
import OnboardingPage from './pages/OnboardingPage'
import DiscoveryPage from './pages/DiscoveryPage'
import MatchesPage from './pages/MatchesPage'
import PartnersPage from './pages/PartnersPage'
import ProfilePage from './pages/ProfilePage'
import ConstellationPage from './pages/ConstellationPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'
import type { ReactNode } from 'react'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={32} />
      </div>
    )
  }

  if (!user) {
    return <Navigate to={ROUTES.LANDING} replace />
  }

  return <>{children}</>
}

function PublicRoute({ children }: { children: ReactNode }) {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={32} />
      </div>
    )
  }

  // If logged in, route to the right place
  if (user) {
    if (profile?.onboardingComplete) {
      return <Navigate to={ROUTES.DISCOVER} replace />
    }
    return <Navigate to={ROUTES.ONBOARDING} replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path={ROUTES.LANDING} element={<PublicRoute><LandingPage /></PublicRoute>} />
      {/* Redirect old login/signup routes to landing */}
      <Route path="/login" element={<Navigate to={ROUTES.LANDING} replace />} />
      <Route path="/signup" element={<Navigate to={ROUTES.LANDING} replace />} />

      {/* Onboarding (protected but no shell) */}
      <Route path={ROUTES.ONBOARDING} element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />

      {/* Demo routes (no auth required) */}
      <Route element={<AppShell />}>
        <Route path="/demo" element={<DiscoveryPage />} />
        <Route path="/demo/matches" element={<MatchesPage />} />
        <Route path="/demo/partners" element={<PartnersPage />} />
        <Route path="/demo/constellation" element={<ConstellationPage />} />
      </Route>

      {/* Protected routes with app shell */}
      <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route path={ROUTES.DISCOVER} element={<DiscoveryPage />} />
        <Route path={ROUTES.MATCHES} element={<MatchesPage />} />
        <Route path={ROUTES.PARTNERS} element={<PartnersPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.CONSTELLATION} element={<ConstellationPage />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-center" richColors />
      </AuthProvider>
    </BrowserRouter>
  )
}
