'use client'

import { useState, useEffect } from 'react'
import { FaFilter, FaSearch, FaCheckCircle, FaVolumeMute, FaPlus  } from 'react-icons/fa'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'


type Chat = {
  id: string
  name: string
  last_message: string
  last_message_time: string
  avatar_url?: string
  phone?: string
  tags?: string[]
  unread_count?: number
  muted?: boolean
}

export default function ChatSidebar({
  chats,
  onSelectChat,
  selectedChatId,
}: {
  chats: Chat[]
  onSelectChat: (id: string) => void
  selectedChatId: string | null
}) {
  const [search, setSearch] = useState('')

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  )

  //  New chat button click handler
  const handleNewChat = () => {
    // Add your logic here to create a new chat
    alert('New Chat clicked')
  }

  return (
    <div className="w-full md:w-1/4 border-r bg-white h-screen flex flex-col p-3 relative">
      {/* Top Controls */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold text-gray-700">chats</h2>
        </div>

        <div className="flex gap-2 mb-2">
          <button className="text-green-600 font-semibold text-sm flex items-center gap-1">
            <FaFilter /> Custom filter
          </button>
          <button className="text-xs text-gray-600 border border-gray-300 px-2 py-1 rounded">
            Save
          </button>
          <button className="text-xs text-gray-600 border border-gray-300 px-2 py-1 rounded">
            Search
          </button>
          <span className="text-green-600 text-xs font-semibold flex items-center gap-1">
            <FaCheckCircle /> Filtered
          </span>
        </div>

        {/* <input
          type="text"
          className="w-full px-3 py-1 text-sm border border-gray-300 rounded"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto space-y-1">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`p-3 rounded-md cursor-pointer ${
              selectedChatId === chat.id ? 'bg-green-50' : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                {chat.avatar_url ? (
                  <Image
                    src={chat.avatar_url}
                    alt={chat.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-sm font-bold text-white bg-green-600">
                    {chat.name[0]}
                  </div>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold truncate">{chat.name}</p>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {chat.last_message_time}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {chat.last_message}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-1 text-[10px]">
                  {chat.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-1 rounded text-white ${
                        tag === 'Demo'
                          ? 'bg-gray-400'
                          : tag === 'Internal'
                          ? 'bg-green-600'
                          : tag === 'Content'
                          ? 'bg-green-500'
                          : tag === 'Signup'
                          ? 'bg-blue-500'
                          : tag === 'Dont Send'
                          ? 'bg-red-500'
                          : 'bg-gray-500'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Icons */}
              <div className="flex flex-col items-end gap-1 ml-2">
                {chat.unread_count ? (
                  <span className="text-xs text-green-600 font-semibold">
                    {chat.unread_count}
                  </span>
                ) : null}
                {chat.muted && (
                  <FaVolumeMute className="text-gray-400 text-xs" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleNewChat}
        className="absolute bottom-4 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition"
        title="New Chat"
      >
        <FaPlus />
      </button>
      
    </div>
  )
}
