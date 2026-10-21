import type { PolyStyle } from './user'

export interface ConstellationNode {
  id: string
  displayName: string
  primaryPhotoUrl: string
  polyStyle: PolyStyle
  isCurrentUser: boolean
  depth: number
}

export interface ConstellationEdge {
  id: string
  source: string
  target: string
  relationshipLabel?: string
}
