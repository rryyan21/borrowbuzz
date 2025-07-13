'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, getCurrentUser } from "../../lib/supabase"
import { User } from '@supabase/supabase-js'
import DashboardHeader from '../components/DashboardHeader'
import QuickActions from '../components/QuickActions'
import StatsOverview from '../components/StatsOverview'
import RecentActivity from '../components/RecentActivity'
import MyListings from '../components/MyListings'
import { ensureUserProfile } from "../../lib/database"

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
      } else {
        // Ensure user profile exists
        try {
          await ensureUserProfile(currentUser.id, {
            full_name: currentUser.user_metadata?.full_name,
            email: currentUser.email
          })
        } catch (error) {
          console.error('Error ensuring user profile:', error)
        }
      }
    }

    getUser()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        // Ensure user profile exists
        try {
          await ensureUserProfile(session.user.id, {
            full_name: session.user.user_metadata?.full_name,
            email: session.user.email
          })
        } catch (error) {
          console.error('Error ensuring user profile:', error)
        }
      } else {
        setUser(null)
        router.push('/auth/signin')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-campusBlue mx-auto"></div>
          <p className="text-campusBlue mt-4">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to signin
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-campusNavy">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Ready to buzz around campus? Here's what's happening with your rentals.
          </p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Stats Overview */}
        <StatsOverview />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <RecentActivity />
          
          {/* My Listings */}
          <MyListings />
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-gradient-to-r from-campusBlue to-campusNavy rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">🐝 Campus Community Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium">Be Responsive</p>
              <p className="opacity-90">Reply to messages within 2 hours</p>
            </div>
            <div>
              <p className="font-medium">Fair Pricing</p>
              <p className="opacity-90">Check similar items for reference</p>
            </div>
            <div>
              <p className="font-medium">Stay Safe</p>
              <p className="opacity-90">Meet in public campus locations</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 