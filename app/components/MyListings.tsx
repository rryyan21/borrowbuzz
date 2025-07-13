'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '../../lib/supabase'
import { getUserListings, Listing } from '../../lib/database'

export default function MyListings() {
  const router = useRouter()
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadListings = async () => {
      try {
        const user = await getCurrentUser()
        if (user) {
          const userListings = await getUserListings(user.id)
          setListings(userListings.slice(0, 3)) // Show only first 3
        }
      } catch (error) {
        console.error('Error loading listings:', error)
      } finally {
        setLoading(false)
      }
    }

    loadListings()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'rented': return 'bg-blue-100 text-blue-800'
      case 'unavailable': return 'bg-red-100 text-red-800'
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

  const getCategoryEmoji = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'Electronics': '📱',
      'Books & Study': '📚',
      'Clothing & Accessories': '👕',
      'Sports & Recreation': '⚽',
      'Home & Living': '🏠',
      'Transportation': '🚲',
      'Tools & Equipment': '🔧',
      'Kitchen & Dining': '🍽️',
      'Other': '📦'
    }
    return categoryMap[category] || '📦'
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-campusBlue">My Listings</h2>
          <button className="text-campusBlue hover:text-campusNavy font-medium text-sm">
            + Add New
          </button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded"></div>
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

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-campusBlue">My Listings</h2>
        <button 
          onClick={() => router.push('/list-item')}
          className="text-campusBlue hover:text-campusNavy font-medium text-sm"
        >
          + Add New
        </button>
      </div>
      
      {listings.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📝</div>
          <p className="text-gray-600 mb-2">No listings yet</p>
          <p className="text-sm text-gray-500 mb-4">Start earning by sharing your stuff!</p>
          <button 
            onClick={() => router.push('/list-item')}
            className="bg-campusBlue text-white px-4 py-2 rounded-lg hover:bg-campusNavy transition-colors"
          >
            List Your First Item
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {listings.map((listing) => (
              <div 
                key={listing.id} 
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push(`/listing/${listing.id}`)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{getCategoryEmoji(listing.category)}</div>
                  <div>
                    <h3 className="font-medium text-campusNavy">{listing.title}</h3>
                    <p className="text-sm text-gray-600">
                      ${listing.price_per_day}/day • {listing.view_count} views
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.availability_status)}`}>
                    {listing.availability_status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(listing.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => router.push('/my-listings')}
            className="w-full mt-4 text-campusBlue hover:text-campusNavy font-medium text-sm"
          >
            View All Listings →
          </button>
        </>
      )}
    </div>
  )
} 