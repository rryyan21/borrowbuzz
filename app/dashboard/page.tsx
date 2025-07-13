'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BeeMascot from "../components/BeeMascot"
import { supabase, getCurrentUser, signOut } from "../../lib/supabase"
import { User } from '@supabase/supabase-js'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      setLoading(false)
      
      if (!currentUser) {
        router.push('/auth/signin')
      }
    }

    getUser()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)
      } else {
        setUser(null)
        router.push('/auth/signin')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-campusYellow/10">
        <div className="text-campusBlue text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to signin
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-campusYellow/10">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full border-t-8 border-campusBlue flex flex-col items-center">
        <BeeMascot className="w-16 h-16 mb-4" />
        <h1 className="text-2xl font-extrabold text-campusBlue mb-2 text-center">Welcome to your Dashboard!</h1>
        <p className="text-campusNavy mb-2 text-center">
          Signed in as: <span className="font-semibold text-campusBlue">{user.email}</span>
        </p>
        <p className="text-campusNavy mb-4 text-center">
          Start listing, browsing, or booking items on campus.
        </p>
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors mb-4"
        >
          Sign Out
        </button>
        <div className="text-campusBlue text-xs text-center">Go Blue! &mdash; BorrowBuzz</div>
      </div>
    </div>
  )
} 