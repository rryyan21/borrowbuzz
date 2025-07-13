import { supabase } from './supabase'

// Types
export interface Listing {
  id: string
  user_id: string
  title: string
  description: string | null
  price_per_day: number
  category: string
  condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor'
  availability_status: 'available' | 'rented' | 'unavailable'
  location: string | null
  images: string[] | null
  contact_info: any
  view_count: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  emoji: string | null
  created_at: string
}

export interface Rental {
  id: string
  listing_id: string
  renter_id: string
  owner_id: string
  start_date: string
  end_date: string
  total_price: number
  status: 'pending' | 'active' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
  listings?: Listing
}

export interface Profile {
  id: string
  full_name: string | null
  university: string | null
  graduation_year: number | null
  phone_number: string | null
  bio: string | null
  avatar_url: string | null
  campus_location: string | null
  created_at: string
  updated_at: string
}

// Listings functions
export async function createListing(listing: Omit<Listing, 'id' | 'user_id' | 'view_count' | 'created_at' | 'updated_at'>) {
  const { data: user } = await supabase.auth.getUser()
  if (!user.user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('listings')
    .insert([{ ...listing, user_id: user.user.id }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getListings(filters?: {
  category?: string
  search?: string
  condition?: string
  maxPrice?: number
  availability?: string
}) {
  try {
    let query = supabase
      .from('listings')
      .select('*')
      .eq('availability_status', 'available')
      .order('created_at', { ascending: false })

    if (filters?.category && filters.category !== 'all' && filters.category !== '') {
      query = query.eq('category', filters.category)
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    if (filters?.condition) {
      query = query.eq('condition', filters.condition)
    }

    if (filters?.maxPrice) {
      query = query.lte('price_per_day', filters.maxPrice)
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase query error:', error)
      throw error
    }
    
    console.log('getListings success, found:', data?.length || 0, 'listings')
    return data as Listing[]
  } catch (error) {
    console.error('Error in getListings:', error)
    throw error
  }
}

export async function getUserListings(userId: string) {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase query error in getUserListings:', error)
      throw error
    }
    
    console.log('getUserListings success, found:', data?.length || 0, 'listings for user:', userId)
    return data as Listing[]
  } catch (error) {
    console.error('Error in getUserListings:', error)
    throw error
  }
}

export async function updateListing(id: string, updates: Partial<Listing>) {
  const { data, error } = await supabase
    .from('listings')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteListing(id: string) {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function incrementViewCount(id: string) {
  const { error } = await supabase.rpc('increment_view_count', { listing_id: id })
  if (error) throw error
}

// Categories functions
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) throw error
  return data as Category[]
}

// User stats functions
export async function getUserStats(userId: string) {
  const [listingsResult, rentalsAsRenterResult, rentalsAsOwnerResult] = await Promise.all([
    supabase.from('listings').select('id').eq('user_id', userId),
    supabase.from('rentals').select('id').eq('renter_id', userId),
    supabase.from('rentals').select('id').eq('owner_id', userId)
  ])

  const itemsListed = listingsResult.data?.length || 0
  const itemsBorrowed = rentalsAsRenterResult.data?.length || 0
  const itemsLent = rentalsAsOwnerResult.data?.length || 0

  // Active rentals (as owner)
  const { data: activeRentals } = await supabase
    .from('rentals')
    .select('id')
    .eq('owner_id', userId)
    .eq('status', 'active')

  const activeRentalsCount = activeRentals?.length || 0

  return {
    itemsListed,
    itemsBorrowed,
    itemsLent,
    activeRentals: activeRentalsCount
  }
}

// Recent activity function
export async function getUserActivity(userId: string, limit = 5) {
  // Get recent listings
  const { data: recentListings } = await supabase
    .from('listings')
    .select('id, title, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  // Get recent rentals as renter
  const { data: recentRentals } = await supabase
    .from('rentals')
    .select(`
      id, status, created_at,
      listings!inner (title)
    `)
    .eq('renter_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  // Combine and sort by date
  const activities = [
    ...(recentListings || []).map(listing => ({
      id: listing.id,
      type: 'listed' as const,
      item: listing.title,
      date: listing.created_at,
      status: 'available' as const
    })),
    ...(recentRentals || []).map(rental => ({
      id: rental.id,
      type: 'borrowed' as const,
      item: (rental.listings as any)?.title || 'Unknown item',
      date: rental.created_at,
      status: rental.status
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return activities.slice(0, limit)
} 

// Profile functions
export async function ensureUserProfile(userId: string, userData?: { full_name?: string, email?: string }) {
  // Check if profile already exists
  const { data: existingProfile, error: checkError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (checkError && checkError.code !== 'PGRST116') {
    // PGRST116 is "no rows returned" which is expected if no profile exists
    throw checkError
  }

  if (!existingProfile) {
    // Create profile if it doesn't exist
    const { data, error } = await supabase
      .from('profiles')
      .insert([{
        id: userId,
        full_name: userData?.full_name || userData?.email || 'Anonymous User',
        university: 'University of Michigan'
      }])
      .select()
      .single()

    if (error) throw error
    return data
  }

  return existingProfile
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data as Profile
}

export async function updateUserProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
} 