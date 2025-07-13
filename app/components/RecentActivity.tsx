'use client'

import { useState, useEffect } from 'react'
import { getCurrentUser } from '../../lib/supabase'
import { getUserActivity } from '../../lib/database'

interface Activity {
  id: string
  type: 'listed' | 'borrowed'
  item: string
  date: string
  status: string
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const user = await getCurrentUser()
        if (user) {
          const userActivity = await getUserActivity(user.id, 4)
          setActivities(userActivity)
        }
      } catch (error) {
        console.error('Error loading activity:', error)
      } finally {
        setLoading(false)
      }
    }

    loadActivity()
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'borrowed': return '📥'
      case 'listed': return '📝'
      case 'returned': return '✅'
      case 'lent': return '📤'
      default: return '📦'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800'
      case 'available': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-campusBlue mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="h-5 w-16 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 w-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-campusBlue mb-4">Recent Activity</h2>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📝</div>
          <p className="text-gray-600">No recent activity</p>
          <p className="text-sm text-gray-500">Start by listing an item or browsing the marketplace!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-campusBlue mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{getActivityIcon(activity.type)}</div>
              <div>
                <p className="font-medium text-campusNavy">{activity.item}</p>
                <p className="text-sm text-gray-600">
                  {activity.type === 'listed' ? 'Listed by you' : 
                   activity.type === 'borrowed' ? 'Borrowed by you' :
                   'Recent activity'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                {activity.status}
              </span>
              <p className="text-xs text-gray-500 mt-1">{formatDate(activity.date)}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-campusBlue hover:text-campusNavy font-medium text-sm">
        View All Activity →
      </button>
    </div>
  )
} 