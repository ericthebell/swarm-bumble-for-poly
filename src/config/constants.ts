import type { PolyStyle, SeekingType, SexualOrientation, RomanticOrientation, Gender } from '../types/user'

export const POLY_STYLE_LABELS: Record<PolyStyle, string> = {
  solo_poly: 'Solo Poly',
  hierarchical: 'Hierarchical',
  non_hierarchical: 'Non-Hierarchical',
  relationship_anarchy: 'Relationship Anarchy',
  triad_seeking: 'Triad Seeking',
  open_relationship: 'Open Relationship',
  mono_poly_flexible: 'Mono/Poly Flexible',
  other: 'Other',
}

export const SEEKING_LABELS: Record<SeekingType, string> = {
  casual: 'Casual',
  committed: 'Committed',
  play_partners: 'Play Partners',
  nesting_partner: 'Nesting Partner',
  comet: 'Comet',
  friendship: 'Friendship',
  exploration: 'Exploration',
  other: 'Other',
}

export const ORIENTATION_LABELS: Record<SexualOrientation, string> = {
  straight: 'Straight',
  gay: 'Gay',
  lesbian: 'Lesbian',
  bisexual: 'Bisexual',
  pansexual: 'Pansexual',
  queer: 'Queer',
  asexual: 'Asexual',
  demisexual: 'Demisexual',
  other: 'Other',
}

export const ROMANTIC_LABELS: Record<RomanticOrientation, string> = {
  romantic: 'Romantic',
  aromantic: 'Aromantic',
  demiromantic: 'Demiromantic',
  other: 'Other',
}

export const GENDER_LABELS: Record<Gender, string> = {
  woman: 'Woman',
  man: 'Man',
  nonbinary: 'Nonbinary',
  genderqueer: 'Genderqueer',
  genderfluid: 'Genderfluid',
  agender: 'Agender',
  trans_woman: 'Trans Woman',
  trans_man: 'Trans Man',
  two_spirit: 'Two-Spirit',
  other: 'Other',
}
