'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from './Sidebar'
import SidebarPanel from './SidebarPanel' // import at the top



type Chat = {
  id: string
  name: string
  last_message: string
  last_message_time: string
  avatar_url: string

}

type Message = {
    id: string
    content: string
    chat_id: string
    sender_id: string
    timestamp: string
  }

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()

 
// scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Fetch current user
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUserId(user?.id ?? null)
    }

    getUser()
  }, [])

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }


  // Fetch chat list from Supabase
  useEffect(() => {
    const fetchChats = async () => {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .order('last_message_time', { ascending: false })

      if (error) console.error('Error loading chats:', error)
      else setChats(data)
    }

    fetchChats()
  }, [])


  // Fetch messages for selected chat
  useEffect(() => {
    if (!selectedChat) return

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', selectedChat.id)
        .order('timestamp')

      if (error) console.error(error)
      else setMessages(data)
    }

    fetchMessages()

    // Real-time subscription
    const channel = supabase
      .channel(`chat-${selectedChat.id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_id=eq.${selectedChat.id}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [selectedChat])

  // Send new message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || !userId) return

    const { error } = await supabase.from('messages').insert({
      chat_id: selectedChat.id,
      sender_id: userId,
      content: newMessage,
    })

    if (error) {
      console.error('Send failed:', error)
    } else {
      setNewMessage('')
    }
  }  

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}

      <SidebarPanel />

      <Sidebar
        chats={chats}
        selectedChatId={selectedChat?.id || null}
        onSelectChat={(chatId) =>
          setSelectedChat(chats.find((c) => c.id === chatId) || null)
        }
      />
      {/* <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button> */}
      {/* <div className="md:w-1/4 w-full bg-gray-100 p-4 border-b md:border-b-0 md:border-r">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold ">Chats</h2>
        <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
          </div>
        <ul className="space-y-2">
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-3 rounded cursor-pointer hover:bg-green-100 ${
                selectedChat?.id === chat.id ? 'bg-green-200' : ''
              }`}
            >
              <p className="font-medium">{chat.name}</p>
              <p className="text-sm text-gray-600 truncate">{chat.last_message}</p>
            </li>
          ))}
        </ul>
      </div> */}

      {/* Chat Window Placeholder */}
      <div className="md:w-3/4 w-full p-4 flex flex-col flex-1">
        {selectedChat ? (
          <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded max-w-sm ${
                  msg.sender_id === userId ? 'bg-green-300 ml-auto text-right' : 'bg-gray-200'
                }`}
              >
                <div>{msg.content}</div>
                <div className="text-xs text-gray-600 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex">
            <input
              className="flex-1 p-2 border rounded-l"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 text-white px-4 py-2 rounded-r"
            >
              Send
            </button>
          </div>
        </>

        ) : (
          <p className="text-gray-400 italic">Select a chat to start messaging</p>
        )}
      </div>
      <div ref={bottomRef} />
    </div>
    
  )
}
