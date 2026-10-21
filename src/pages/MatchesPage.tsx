import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { DEMO_MATCHES, DEMO_CHAT_MESSAGES, type DemoMatch, type DemoChatMessage } from '../utils/demoChatData'
import Badge from '../components/ui/Badge'

export default function MatchesPage() {
  const [selectedMatch, setSelectedMatch] = useState<DemoMatch | null>(null)
  const [messageInput, setMessageInput] = useState('')
  const [messages, setMessages] = useState<DemoChatMessage[]>(DEMO_CHAT_MESSAGES)

  const newMatches = DEMO_MATCHES.filter((m) => !m.lastMessage)
  const conversations = DEMO_MATCHES.filter((m) => m.lastMessage)

  function sendMessage() {
    if (!messageInput.trim()) return
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        senderId: 'me',
        text: messageInput.trim(),
        timestamp: 'Just now',
        isMe: true,
      },
    ])
    setMessageInput('')
  }

  // Chat view
  if (selectedMatch) {
    return (
      <div className="flex flex-col h-full">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-hive-100 bg-white">
          <button
            onClick={() => setSelectedMatch(null)}
            className="text-hive-500 hover:text-hive-700 text-sm font-medium"
          >
            ← Back
          </button>
          <img
            src={selectedMatch.profile.photoUrls[0]}
            alt={selectedMatch.profile.displayName}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-hive-800 text-sm">{selectedMatch.profile.displayName}</p>
            <p className="text-xs text-hive-400">{selectedMatch.profile.pronouns}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.isMe
                    ? 'bg-honey-500 text-white rounded-br-md'
                    : 'bg-hive-100 text-hive-800 rounded-bl-md'
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.isMe ? 'text-white/70' : 'text-hive-400'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-hive-100 bg-white">
          <input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 bg-hive-50 rounded-full text-sm text-hive-800 placeholder:text-hive-400 focus:outline-none focus:ring-2 focus:ring-honey-500"
          />
          <button
            onClick={sendMessage}
            disabled={!messageInput.trim()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-honey-500 text-white disabled:opacity-40"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  // Match list view
  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      {/* New matches */}
      {newMatches.length > 0 && (
        <div>
          <h3 className="font-display text-lg font-bold text-hive-800 mb-3">New Matches</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {newMatches.map((match) => (
              <button
                key={match.id}
                onClick={() => setSelectedMatch(match)}
                className="flex flex-col items-center gap-1.5 min-w-[72px]"
              >
                <div className="relative">
                  <img
                    src={match.profile.photoUrls[0]}
                    alt={match.profile.displayName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-honey-400"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-honey-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px]">✨</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-hive-700 truncate w-full text-center">
                  {match.profile.displayName}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Conversations */}
      <div>
        <h3 className="font-display text-lg font-bold text-hive-800 mb-3">Messages</h3>
        {conversations.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle size={32} className="mx-auto text-hive-300 mb-2" />
            <p className="text-hive-400 text-sm">No conversations yet</p>
          </div>
        ) : (
          <div className="space-y-1">
            {conversations.map((match) => (
              <button
                key={match.id}
                onClick={() => setSelectedMatch(match)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-hive-50 transition-colors"
              >
                <div className="relative">
                  <img
                    src={match.profile.photoUrls[0]}
                    alt={match.profile.displayName}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {match.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-nectar-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">{match.unread}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-hive-800">{match.profile.displayName}</span>
                    <span className="text-xs text-hive-400">{match.lastMessageAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm truncate ${match.unread > 0 ? 'text-hive-800 font-medium' : 'text-hive-500'}`}>
                      {match.lastMessage}
                    </p>
                  </div>
                  <Badge variant="hive" className="mt-1 text-[10px]">
                    {match.profile.polyStyle.replace(/_/g, ' ')}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
