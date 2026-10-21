import SwipeStack from '../components/discovery/SwipeStack'
import { DEMO_PROFILES } from '../utils/demoData'

export default function DiscoveryPage() {
  return (
    <div className="h-full">
      <SwipeStack profiles={DEMO_PROFILES} />
    </div>
  )
}
