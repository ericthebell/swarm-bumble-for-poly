# Swarm — Polyamorous Dating App

Bumble-style dating app designed for polyamorous people. Brand metaphor: bees, hive, constellation.

## Tech Stack

- **Frontend**: React 19 + TypeScript, Vite 7, Tailwind CSS v4
- **Backend**: Firebase (Auth, Firestore, Storage, Cloud Functions)
- **Key libs**: framer-motion (swipe animations), @xyflow/react (constellation graph), react-hook-form + zod (forms), lucide-react (icons), sonner (toasts), geofire-common (geolocation)

## Current State

### What's Built

| Feature | Status | Key Files |
|---|---|---|
| Landing page | Google sign-in only, handles new + returning users | `src/pages/LandingPage.tsx` |
| Onboarding wizard | Wired to live Firestore (5 steps) | `src/pages/OnboardingPage.tsx` |
| Swipe discovery | Working with demo data | `src/components/discovery/SwipeCard.tsx`, `SwipeStack.tsx`, `SwipeActions.tsx`, `MatchPopup.tsx` |
| Matches + Chat | Working with demo data | `src/pages/MatchesPage.tsx` (includes inline chat view) |
| Partner linking | Working with demo data | `src/pages/PartnersPage.tsx` (visibility controls, endorsements) |
| Constellation graph | Working with demo data | `src/pages/ConstellationPage.tsx` (React Flow, 3-hop depth) |
| Auth context | Wired to Firebase Auth + Firestore profile | `src/contexts/AuthContext.tsx` |
| Firestore services | Profile/storage services wired live | `src/services/profiles.ts`, `auth.ts`, `storage.ts` |
| Firebase project | Created (`swarm-dating`), Spark plan | `.env.local` has credentials |

### Firebase Services Enabled

- **Auth**: Google sign-in only (no email/password)
- **Firestore**: Created in test mode (nam5 region)
- **Storage**: Created in test mode, bucket `gs://swarm-dating.firebasestorage.app`
- **Web app**: Registered as "Swarm Web App"
- **Public-facing name**: "Swarm Dating"

### What's Connected to Live Firebase

- Google sign-in → Firebase Auth
- Profile creation on first sign-in → Firestore `users/{uid}`
- Private data creation → Firestore `users/{uid}/private/{uid}`
- Onboarding saves profile + discovery settings + photos → Firestore + Storage
- AuthContext fetches profile to determine routing (new user → onboarding, returning → discover)

### What Still Uses Demo Data

- Discovery/swiping (uses `src/utils/demoData.ts` hardcoded profiles)
- Matches + Chat (uses `src/utils/demoChatData.ts`)
- Partners page (hardcoded demo data)
- Constellation graph (hardcoded demo nodes)

### What's NOT Built Yet

- **Firestore security rules** — still in test mode, no rules deployed
- **Storage security rules** — still in test mode
- **Cloud Functions** — `getDiscoveryCandidates`, `onSwipeCreated`, `onMessageCreated`, `onPartnerLinkAccepted`, `getConstellation`
- **Swipe/match services** — `src/services/swipes.ts`, `matches.ts`, `chat.ts`, `partnerLinks.ts`, `constellation.ts`
- **Live data hooks** — custom hooks to connect remaining UI to Firestore (`useMatches`, `useChat`, etc.)
- **Firebase Hosting** deployment
- **PWA** manifest + service worker

## Auth Flow

Google-only authentication. No email/password.

1. User lands on `/` → sees "Continue with Google" button
2. Google popup → Firebase Auth creates/signs in user
3. App checks Firestore for existing profile:
   - **No profile** → creates skeleton profile + private data → routes to `/onboarding`
   - **Profile exists, onboarding incomplete** → routes to `/onboarding`
   - **Profile exists, onboarding complete** → routes to `/discover`
4. Old `/login` and `/signup` routes redirect to `/`

## Project Structure

```
src/
├── config/
│   ├── firebase.ts          # Firebase app init (uses VITE_ env vars, falls back to demo values)
│   ├── routes.ts            # Route path constants
│   └── constants.ts         # Label maps for PolyStyle, SeekingType, Gender, etc.
├── types/                   # TypeScript interfaces for Firestore documents
│   ├── user.ts              # UserProfile, PolyStyle, SeekingType, Gender, orientations
│   ├── match.ts             # Swipe, Match
│   ├── chat.ts              # Message
│   ├── partner.ts           # PartnerLink, Endorsement
│   └── constellation.ts     # ConstellationNode, ConstellationEdge
├── contexts/
│   └── AuthContext.tsx       # Firebase Auth + Firestore profile provider
├── services/                # Firestore/Storage CRUD functions
│   ├── auth.ts              # signInWithGoogle, signOut (Google-only)
│   ├── profiles.ts          # create/get/update profile, discovery settings, private data
│   └── storage.ts           # uploadPhoto, deletePhoto
├── components/
│   ├── ui/                  # Button, Input, Badge, Spinner
│   ├── layout/              # AppShell, Header, BottomNav
│   ├── auth/                # GoogleSignInButton
│   └── discovery/           # SwipeCard, SwipeStack, SwipeActions, MatchPopup
├── pages/                   # Route-level page components
├── utils/
│   ├── demoData.ts          # 5 demo profiles with poly-specific fields
│   └── demoChatData.ts      # Demo matches and chat messages
├── App.tsx                  # Router with public/protected/demo routes
├── main.tsx                 # Entry point
└── index.css                # Tailwind v4 @theme with honey/pollen/nectar/hive colors
```

## Design System

- **Colors**: honey (amber primary), pollen (warm secondary), nectar (pink-red for likes/matches), hive (slate neutrals)
- **Fonts**: Plus Jakarta Sans (body), Fredoka (display/headings)
- **Radius**: `rounded-card` (20px), `rounded-pill` (full)
- **Shadows**: `shadow-card`, `shadow-card-hover`

## Routes

| Route | Auth | Description |
|---|---|---|
| `/` | Public | Landing page with Google sign-in |
| `/login`, `/signup` | Redirect | Redirect to `/` |
| `/onboarding` | Protected | 5-step profile creation wizard |
| `/discover` | Protected | Swipe card stack |
| `/matches` | Protected | Match list + inline chat |
| `/partners` | Protected | Partner linking + endorsements |
| `/constellation` | Protected | Relationship graph |
| `/profile`, `/settings` | Protected | User profile + settings |
| `/demo/*` | None | Demo versions of all features (no auth required) |

## Firestore Schema

See types in `src/types/` for full interfaces. Key collections:
- `users/{uid}` — public profile (poly style, seeking, partners, photos)
- `users/{uid}/private/{uid}` — email, blocked users, notification prefs
- `users/{uid}/discovery_settings/{uid}` — age range, distance, gender/poly preferences
- `swipes/{swiperUid_swipedUid}` — write-only from client
- `matches/{sortedUid1_uid2}` — created by Cloud Functions only
- `matches/{id}/messages/{msgId}` — chat messages
- `partner_links/{sortedUid1_uid2}` — consent-based linking with per-user visibility
- `endorsements/{id}` — partner testimonials

## Firebase Config

- **Project ID**: `swarm-dating`
- **Plan**: Spark (free)
- **Storage bucket**: `gs://swarm-dating.firebasestorage.app`
- **Auth providers**: Google only

`src/config/firebase.ts` reads from env vars with demo fallbacks:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Set these in `.env.local` (gitignored via `*.local` in `.gitignore`).

## Commands

```bash
npm run dev      # Start Vite dev server (port 5173)
npm run build    # TypeScript check + Vite production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Next Steps

1. **Deploy Firestore security rules + Storage rules** — replace test mode with proper rules (users can only read/write their own data, swipes are write-only, matches are read-only from client)
2. **Write swipe/match services** — `src/services/swipes.ts` to record swipes, Cloud Function `onSwipeCreated` to detect mutual likes and create matches
3. **Write chat service** — `src/services/chat.ts` with real-time message listener, Cloud Function `onMessageCreated` for push notifications
4. **Write partner link service** — `src/services/partnerLinks.ts` for consent-based linking
5. **Connect discovery to live data** — replace demo profiles with Firestore query (geohash-based, filtered by preferences)
6. **Connect matches/chat to live data** — replace demo matches with Firestore subscription
7. **Connect partners + constellation to live data**
8. **Deploy Cloud Functions** — match detection, discovery candidates, constellation traversal
9. **Deploy to Firebase Hosting**
10. **PWA** — manifest + service worker for installability

## Important Notes

- **Be careful killing processes on ports** — user has warned that `kill` commands on ports sometimes crash the browser. Use targeted `lsof -i :PORT | grep LISTEN` to find specific PIDs before killing.
- **LoginPage.tsx and SignUpPage.tsx still exist** as files but are no longer imported or routed. They can be deleted.
- **Demo routes** (`/demo/*`) bypass auth entirely and always use hardcoded demo data — useful for UI development without signing in.
