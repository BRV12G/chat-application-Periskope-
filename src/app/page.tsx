'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default function HomePage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data.user) {
        // Not logged in
        setUser(null)
        setCheckingAuth(false)
      } else {
        // Logged in
        setUser(data.user)
        router.push('/chat')
      }
    }

    checkUser()
  }, [router])

  if (checkingAuth) {
    return (
      <main className="h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Checking authentication...</p>
      </main>
    )
  }

  return (
    <main className="h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to ChatX</h1>
      <p className="text-gray-600 mb-8">A real-time messaging app built with ❤️ using Next.js, Supabase, and Tailwind.</p>

      <Link
        href="/login"
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Login to Continue
      </Link>
    </main>
  )
}
