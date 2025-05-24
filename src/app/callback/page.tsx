'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleLogin = async () => {
      const { error } = await supabase.auth.getSession()
      if (error) {
        console.error(error.message)
      } else {
        router.push('/chat')
      }
    }

    handleLogin()
  }, [router])

  return <p className="p-4">Logging in...</p>
}
