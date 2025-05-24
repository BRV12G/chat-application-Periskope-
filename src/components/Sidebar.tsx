'use client'

import ChatFilterBar from './ChatFilterBar'
import ChatList from './ChatList'

export default function Sidebar({
  chats,
  selectedChatId,
  onSelectChat,
}: {
  chats: any[]
  selectedChatId: string | null
  onSelectChat: (chatId: string) => void
}) {
  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Chats</h2>
        <button className="text-green-600 text-sm hover:underline">New Chat</button>
      </div>

      {/* Search + Filter */}
      <ChatFilterBar />

      {/* Chat List */}
      <div className="mt-4 flex-1 overflow-y-auto">
        <ChatList chats={chats} selectedChatId={selectedChatId} onSelectChat={onSelectChat} />
      </div>
    </div>
  )
}
