'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import BeeMascot from './BeeMascot'

export default function AuthForm() {
  const router = useRouter()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push('/dashboard')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-campusYellow via-white to-campusBlue">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 border-t-8 border-campusBlue">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-campusYellow flex items-center justify-center shadow-md mb-4">
            <BeeMascot className="w-14 h-14" />
          </div>
          <h1 className="text-3xl font-extrabold text-campusBlue mb-2 text-center">
            Sign in to BorrowBuzz
          </h1>
          <p className="text-campusNavy text-center text-base mb-4">
            UMich students only. Use your <span className="font-bold">.edu</span> email.
          </p>
        </div>
        
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          redirectTo={`${window.location.origin}/dashboard`}
          theme="light"
        />
        
        <div className="mt-6 text-campusBlue text-xs text-center">
          Need a whisk? List it in 30s after you sign in!<br />
          Go Blue! &mdash; BorrowBuzz
        </div>
      </div>
    </div>
  )
} 