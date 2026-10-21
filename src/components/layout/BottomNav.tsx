import { NavLink, useLocation } from 'react-router-dom'
import { Compass, MessageCircle, Users, User, Waypoints } from 'lucide-react'
import { ROUTES } from '../../config/routes'

export default function BottomNav() {
  const { pathname } = useLocation()
  const isDemo = pathname.startsWith('/demo')
  const prefix = isDemo ? '/demo' : ''

  const tabs = [
    { to: prefix || ROUTES.DISCOVER, icon: Compass, label: 'Discover' },
    { to: `${prefix}/matches` || ROUTES.MATCHES, icon: MessageCircle, label: 'Matches' },
    { to: `${prefix}/partners` || ROUTES.PARTNERS, icon: Users, label: 'Partners' },
    { to: `${prefix}/constellation` || ROUTES.CONSTELLATION, icon: Waypoints, label: 'Map' },
    ...(isDemo ? [] : [{ to: ROUTES.PROFILE, icon: User, label: 'Profile' }]),
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-hive-200 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === prefix || to === ROUTES.DISCOVER}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors ${
                isActive ? 'text-honey-500' : 'text-hive-400 hover:text-hive-600'
              }`
            }
          >
            <Icon size={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
