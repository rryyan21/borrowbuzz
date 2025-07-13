'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '../../lib/supabase'
import { getListings, getCategories, Listing, Category } from '../../lib/database'
import DashboardHeader from '../components/DashboardHeader'
import { User } from '@supabase/supabase-js'

export default function Browse() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [listings, setListings] = useState<Listing[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    condition: '',
    maxPrice: '',
    sortBy: 'newest'
  })

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push('/auth/signin')
        return
      }
      setUser(currentUser)
    }

    checkUser()
  }, [router])

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        console.log('Loading data with filters:', filters)
        console.log('User ID:', user?.id)
        
        const [listingsData, categoriesData] = await Promise.all([
          getListings({
            category: filters.category || undefined,
            search: filters.search || undefined,
            condition: filters.condition || undefined,
            maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined
          }),
          getCategories()
        ])
        
        console.log('Raw listings loaded:', listingsData)
        console.log('Categories loaded:', categoriesData)
        
        // Sort listings
        let sortedListings = [...listingsData]
        if (filters.sortBy === 'price_low') {
          sortedListings.sort((a, b) => a.price_per_day - b.price_per_day)
        } else if (filters.sortBy === 'price_high') {
          sortedListings.sort((a, b) => b.price_per_day - a.price_per_day)
        } else if (filters.sortBy === 'popular') {
          sortedListings.sort((a, b) => b.view_count - a.view_count)
        }
        // Default is newest (already sorted by created_at desc in getListings)

        setListings(sortedListings)
        setCategories(categoriesData)
        console.log('Final sorted listings:', sortedListings.length)
      } catch (error) {
        console.error('Error loading data:', error)
        console.error('Error details:', {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          error
        })
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadData()
    }
  }, [user, filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      condition: '',
      maxPrice: '',
      sortBy: 'newest'
    })
  }



  const formatCondition = (condition: string) => {
    return condition.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-campusBlue mx-auto"></div>
          <p className="text-campusBlue mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-campusNavy">Browse Items 🔍</h1>
              <p className="text-gray-600 mt-2">
                Discover amazing items shared by fellow Wolverines
              </p>
            </div>
            

          </div>
        </div>

        {/* Search Bar and Quick Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-campusBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for items..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-campusBlue focus:border-campusBlue focus:bg-white transition-colors placeholder-gray-500"
                />
              </div>
            </div>

            {/* Quick Sort */}
            <div className="flex items-center gap-4">
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-campusBlue focus:border-campusBlue focus:bg-white transition-colors"
              >
                <option value="newest">Newest</option>
                <option value="price_low">Price ↑</option>
                <option value="price_high">Price ↓</option>
                <option value="popular">Popular</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-campusBlue text-white hover:bg-campusNavy rounded-lg transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                Filters
              </button>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-campusNavy mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-campusBlue focus:border-campusBlue focus:bg-white transition-colors"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.emoji} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-campusNavy mb-2">Condition</label>
                  <select
                    value={filters.condition}
                    onChange={(e) => handleFilterChange('condition', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-campusBlue focus:border-campusBlue focus:bg-white transition-colors"
                  >
                    <option value="">Any Condition</option>
                    <option value="new">New</option>
                    <option value="like_new">Like New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-campusNavy mb-2">Max Price/Day</label>
                  <input
                    type="number"
                    placeholder="$0"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-campusBlue focus:border-campusBlue focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-campusBlue text-sm transition-colors"
                >
                  Clear all filters
                </button>
                <div className="text-sm text-gray-600">
                  {listings.length} item{listings.length !== 1 ? 's' : ''} found
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-campusBlue mx-auto"></div>
            <p className="text-campusBlue mt-4">Loading items...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="text-campusBlue hover:text-campusNavy font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Results count */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {listings.length} item{listings.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer group border border-gray-200"
                  onClick={() => router.push(`/listing/${listing.id}`)}
                >
                  {/* Image */}
                  <div className="h-48 overflow-hidden">
                    {listing.images && listing.images.length > 0 ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="bg-gradient-to-br from-campusBlue to-campusNavy h-full flex items-center justify-center group-hover:from-campusNavy group-hover:to-campusBlue transition-all duration-200">
                        <div className="text-white text-5xl">
                          {categories.find(c => c.name === listing.category)?.emoji || '📦'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Title and Price */}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-campusNavy text-lg leading-tight group-hover:text-campusBlue transition-colors line-clamp-2">
                        {listing.title}
                      </h3>
                      <div className="text-right ml-2 flex-shrink-0">
                        <div className="font-bold text-campusBlue text-lg">
                          ${listing.price_per_day}
                        </div>
                        <div className="text-xs text-gray-500">per day</div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {listing.description || 'No description available'}
                    </p>

                    {/* Details */}
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                      <span className="bg-gray-100 px-2 py-1 rounded-full">
                        {formatCondition(listing.condition)}
                      </span>
                      <span>{listing.view_count} views</span>
                    </div>

                    {/* Location and Date */}
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                      <span>📍 {listing.location || 'Campus'}</span>
                      <span>{formatDate(listing.created_at)}</span>
                    </div>

                    {/* Owner */}
                    <div className="flex items-center justify-between text-sm text-gray-600 pt-2 border-t border-gray-100">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-campusYellow rounded-full flex items-center justify-center mr-2">
                          <span className="text-xs">👤</span>
                        </div>
                        <span className="truncate">
                          Wolverine
                        </span>
                      </div>
                      {listing.user_id === user?.id && (
                        <span className="ml-2 text-xs bg-campusBlue text-white px-2 py-1 rounded-full">
                          Your listing
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 