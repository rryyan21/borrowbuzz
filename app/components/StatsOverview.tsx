'use client'

import { useState, useEffect } from 'react'
import { getCurrentUser } from '../../lib/supabase'
import { getUserStats } from '../../lib/database'

export default function StatsOverview() {
  const [stats, setStats] = useState({
    itemsListed: 0,
    itemsBorrowed: 0,
    itemsLent: 0,
    activeRentals: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const user = await getCurrentUser()
        if (user) {
          const userStats = await getUserStats(user.id)
          setStats(userStats)
        }
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  const statsDisplay = [
    { label: 'Items Listed', value: stats.itemsListed.toString(), icon: '📦' },
    { label: 'Items Borrowed', value: stats.itemsBorrowed.toString(), icon: '🤝' },
    { label: 'Items Lent', value: stats.itemsLent.toString(), icon: '📤' },
    { label: 'Active Rentals', value: stats.activeRentals.toString(), icon: '⏰' },
  ]

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-campusBlue mb-4">Your Activity</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center p-4 bg-gray-50 rounded-lg animate-pulse">
              <div className="h-8 w-8 mx-auto mb-2 bg-gray-200 rounded"></div>
              <div className="h-6 w-8 mx-auto mb-1 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 mx-auto bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-campusBlue mb-4">Your Activity</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsDisplay.map((stat) => (
          <div key={stat.label} className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold text-campusBlue">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
} 