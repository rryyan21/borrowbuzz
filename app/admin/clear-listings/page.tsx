'use client'

import { useState } from 'react'
import { deleteAllListings } from '../../../lib/database'

export default function ClearListings() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleClearListings = async () => {
    if (!confirm('Are you sure you want to delete ALL listings? This cannot be undone!')) {
      return
    }

    setLoading(true)
    try {
      await deleteAllListings()
      setMessage('✅ All listings have been successfully deleted!')
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">⚠️ Admin Panel</h1>
        <p className="text-gray-600 mb-6">
          This will permanently delete all listings from the database.
        </p>
        
        <button
          onClick={handleClearListings}
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 font-medium"
        >
          {loading ? 'Deleting...' : 'Delete All Listings'}
        </button>
        
        {message && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
            {message}
          </div>
        )}
      </div>
    </div>
  )
} 