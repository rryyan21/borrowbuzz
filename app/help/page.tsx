'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '../../lib/supabase'
import DashboardHeader from '../components/DashboardHeader'
import { User } from '@supabase/supabase-js'

export default function Help() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push('/auth/signin')
        return
      }
      setUser(currentUser)
      setLoading(false)
    }

    checkUser()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-campusBlue mx-auto"></div>
          <p className="text-campusBlue mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />
      
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-campusNavy">Help & Support 🤝</h1>
          <p className="text-gray-600 mt-2">
            Everything you need to know about using BorrowBuzz
          </p>
        </div>

        <div className="space-y-8">
          {/* Getting Started */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-campusNavy mb-4">🚀 Getting Started</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-campusBlue mb-2">How to List an Item</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-600">
                  <li>Click "List Item" in the navigation</li>
                  <li>Fill out the item details (title, description, price per day)</li>
                  <li>Select the appropriate category and condition</li>
                  <li>Add your contact information</li>
                  <li>Click "Post Listing" to publish</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-medium text-campusBlue mb-2">How to Browse Items</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-600">
                  <li>Click "Browse" in the navigation</li>
                  <li>Use the search bar to find specific items</li>
                  <li>Apply filters by category, condition, or price</li>
                  <li>Click on any item to view details</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Safety Guidelines */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-campusNavy mb-4">🛡️ Safety Guidelines</h2>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start space-x-3">
                <span className="text-campusBlue">•</span>
                <span>Only meet in public, well-lit areas on campus</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-campusBlue">•</span>
                <span>Inspect items carefully before borrowing</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-campusBlue">•</span>
                <span>Keep records of your transactions</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-campusBlue">•</span>
                <span>Report any suspicious activity immediately</span>
              </div>
            </div>
          </div>

          {/* Campus Guidelines */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-campusNavy mb-4">🏫 Campus Guidelines</h2>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start space-x-3">
                <span className="text-campusBlue">•</span>
                <span>Only University of Michigan students can use BorrowBuzz</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-campusBlue">•</span>
                <span>Items must be legal and allowed on campus</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-campusBlue">•</span>
                <span>No alcohol, drugs, or dangerous items</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-campusBlue">•</span>
                <span>Be respectful and follow the Wolverine Code</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-campusNavy mb-4">📦 Item Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">📱</span>
                  <span className="text-gray-600">Electronics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">📚</span>
                  <span className="text-gray-600">Books & Study</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">👕</span>
                  <span className="text-gray-600">Clothing & Accessories</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⚽</span>
                  <span className="text-gray-600">Sports & Recreation</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🏠</span>
                  <span className="text-gray-600">Home & Living</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🚲</span>
                  <span className="text-gray-600">Transportation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🔧</span>
                  <span className="text-gray-600">Tools & Equipment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🍽️</span>
                  <span className="text-gray-600">Kitchen & Dining</span>
                </div>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-campusNavy mb-4">🔧 Troubleshooting</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-campusBlue mb-2">My listing isn't showing up</h3>
                <p className="text-gray-600">Try refreshing the page or check if you've applied filters that might hide your listing.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-campusBlue mb-2">Can't sign in</h3>
                <p className="text-gray-600">Make sure you're using your @umich.edu email address and check your email for the login link.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-campusBlue mb-2">Need to report an issue</h3>
                <p className="text-gray-600">Contact us at borrowbuzz@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-campusBlue text-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">📞 Need More Help?</h2>
            <p className="mb-4">
              Still have questions? We're here to help!
            </p>
            <div className="space-y-2">
              <p>📧 Email: borrowbuzz@gmail.com</p>
              <p>💬 Campus Support: Available 24/7</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 