'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) alert(error.message)
    else alert('Check your email for the login link!')
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h1 className="text-xl font-semibold mb-4">Login</h1>
        <input
          className="w-full p-2 border rounded mb-3"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button
          className="w-full bg-green-500 text-white py-2 rounded"
          onClick={handleLogin}
        >
          Send Magic Link
        </button>
      </div>
    </div>
  )
}
