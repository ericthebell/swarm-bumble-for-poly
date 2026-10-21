import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'

export default function AppShell() {
  return (
    <div className="flex flex-col h-full max-w-lg mx-auto">
      <Header />
      <main className="flex-1 overflow-hidden pb-16">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
