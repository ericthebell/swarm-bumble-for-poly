import { DEMO_PROFILES } from './demoData'

export interface DemoMatch {
  id: string
  profile: typeof DEMO_PROFILES[0]
  lastMessage: string | null
  lastMessageAt: string | null
  unread: number
}

export interface DemoChatMessage {
  id: string
  senderId: string
  text: string
  timestamp: string
  isMe: boolean
}

export const DEMO_MATCHES: DemoMatch[] = [
  {
    id: 'match-1',
    profile: DEMO_PROFILES[0], // River
    lastMessage: "That sounds amazing! I'd love to check out that gallery with you",
    lastMessageAt: '2 min ago',
    unread: 2,
  },
  {
    id: 'match-2',
    profile: DEMO_PROFILES[3], // Aria
    lastMessage: 'Have you read Polysecure? It changed my perspective completely',
    lastMessageAt: '1 hour ago',
    unread: 0,
  },
  {
    id: 'match-3',
    profile: DEMO_PROFILES[4], // Felix
    lastMessage: null,
    lastMessageAt: null,
    unread: 0,
  },
]

export const DEMO_CHAT_MESSAGES: DemoChatMessage[] = [
  { id: '1', senderId: 'demo-1', text: 'Hey! I loved your profile. Fellow kitchen witch here 🧙', timestamp: '10:30 AM', isMe: false },
  { id: '2', senderId: 'me', text: 'Ahh no way! What do you like to cook?', timestamp: '10:32 AM', isMe: true },
  { id: '3', senderId: 'demo-1', text: 'Mostly soups and stews. There is something so meditative about a slow simmer. Also, I make a mean focaccia.', timestamp: '10:35 AM', isMe: false },
  { id: '4', senderId: 'me', text: "Okay you had me at focaccia. I've been trying to perfect my sourdough for months", timestamp: '10:37 AM', isMe: true },
  { id: '5', senderId: 'demo-1', text: 'Sourdough is a journey! I killed my first 3 starters before one survived 😅', timestamp: '10:38 AM', isMe: false },
  { id: '6', senderId: 'me', text: "Haha I'm on starter number 2 right now. Also I saw you're into art — there's a great new exhibit downtown", timestamp: '10:40 AM', isMe: true },
  { id: '7', senderId: 'demo-1', text: "That sounds amazing! I'd love to check out that gallery with you", timestamp: '10:41 AM', isMe: false },
]
