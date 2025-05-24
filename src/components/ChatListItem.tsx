'use client'

import { FaUserCircle } from 'react-icons/fa'

export default function ChatListItem({
  chat,
  selected,
  onClick,
}: {
  chat: any
  selected: boolean
  onClick: () => void
}) {
  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded cursor-pointer ${
        selected ? 'bg-green-200' : 'hover:bg-green-100'
      }`}
    >
      {/* Avatar */}
      {chat.avatar_url ? (
        <img
          src={chat.avatar_url}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <FaUserCircle className="w-10 h-10 text-gray-400" />
      )}

      {/* Text */}
      <div className="flex-1">
        <p className="font-medium text-sm">{chat.name}</p>
        <p className="text-xs text-gray-500 truncate">{chat.last_message}</p>
      </div>
    </li>
  )
}
