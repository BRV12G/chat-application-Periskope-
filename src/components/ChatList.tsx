'use client'

import ChatListItem from './ChatListItem'

export default function ChatList({
  chats,
  selectedChatId,
  onSelectChat,
}: {
  chats: any[]
  selectedChatId: string | null
  onSelectChat: (chatId: string) => void
}) {
  return (
    <ul className="space-y-2">
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          selected={chat.id === selectedChatId}
          onClick={() => onSelectChat(chat.id)}
        />
      ))}
    </ul>
  )
}
