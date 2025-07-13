'use client'

import { useRouter } from 'next/navigation'

export default function QuickActions() {
  const router = useRouter()

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-campusBlue mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => router.push('/list-item')}
          className="bg-campusBlue hover:bg-campusNavy text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <span>📝</span>
          <span>List an Item</span>
        </button>
        <button 
          onClick={() => router.push('/browse')}
          className="bg-campusYellow hover:bg-yellow-400 text-campusNavy font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <span>🔍</span>
          <span>Browse Items</span>
        </button>
      </div>
    </div>
  )
} 