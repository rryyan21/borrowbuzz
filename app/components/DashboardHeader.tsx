'use client'

import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import BeeMascot from './BeeMascot'
import { signOut } from '../../lib/supabase'
import { useRouter, usePathname } from 'next/navigation'

interface DashboardHeaderProps {
  user: User
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const navigateTo = (path: string) => {
    router.push(path)
    setMobileMenuOpen(false) // Close mobile menu when navigating
  }

  // Function to determine if a tab is active
  const isActive = (path: string) => {
    if (path === '/dashboard' && pathname === '/dashboard') return true
    if (path !== '/dashboard' && pathname.startsWith(path)) return true
    return false
  }

  // Function to get tab styling
  const getTabStyles = (path: string) => {
    if (isActive(path)) {
      return "text-campusBlue font-semibold border-b-2 border-campusBlue pb-2 transition-colors"
    }
    return "text-campusNavy hover:text-campusBlue font-medium transition-colors"
  }

  // Function to get mobile tab styling
  const getMobileTabStyles = (path: string) => {
    if (isActive(path)) {
      return "block w-full text-left text-campusBlue font-semibold bg-campusYellow/10 px-3 py-2 rounded-lg transition-colors"
    }
    return "block w-full text-left text-campusNavy hover:text-campusBlue font-medium transition-colors"
  }

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('/dashboard')}>
            <div className="w-10 h-10 bg-campusYellow rounded-full flex items-center justify-center">
              <BeeMascot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-campusBlue">BorrowBuzz</h1>
              <p className="text-xs text-campusNavy">Campus Marketplace</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => navigateTo('/browse')} 
              className={getTabStyles('/browse')}
            >
              Browse
            </button>
            <button 
              onClick={() => navigateTo('/list-item')} 
              className={getTabStyles('/list-item')}
            >
              List Item
            </button>
            <button 
              onClick={() => navigateTo('/dashboard')} 
              className={getTabStyles('/dashboard')}
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigateTo('/help')} 
              className={getTabStyles('/help')}
            >
              Help
            </button>
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-campusNavy">{user.email}</p>
              <p className="text-xs text-gray-500">@umich.edu</p>
            </div>
            <button
              onClick={handleSignOut}
              className="text-gray-500 hover:text-red-600 text-sm font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              <button 
                onClick={() => navigateTo('/browse')} 
                className={getMobileTabStyles('/browse')}
              >
                Browse
              </button>
              <button 
                onClick={() => navigateTo('/list-item')} 
                className={getMobileTabStyles('/list-item')}
              >
                List Item
              </button>
              <button 
                onClick={() => navigateTo('/dashboard')} 
                className={getMobileTabStyles('/dashboard')}
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigateTo('/help')} 
                className={getMobileTabStyles('/help')}
              >
                Help
              </button>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-campusNavy mb-1">{user.email}</p>
                <button
                  onClick={handleSignOut}
                  className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 