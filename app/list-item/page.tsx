'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '../../lib/supabase'
import { createListing, getCategories, Category } from '../../lib/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/hooks/use-toast'
import { User } from '@supabase/supabase-js'
import { 
  Upload, 
  X, 
  DollarSign, 
  MapPin, 
  Phone, 
  Mail, 
  Camera,
  Star,
  Package,
  Clock,
  CheckCircle2
} from 'lucide-react'

interface ListingFormData {
  title: string
  description: string
  price_per_day: string
  category: string
  condition: string
  location: string
  contact_email: string
  contact_phone: string
  preferred_contact: string
  images: string[]
}

const conditions = [
  { value: 'new', label: 'Brand New', icon: Star, color: 'text-green-600' },
  { value: 'like_new', label: 'Like New', icon: Star, color: 'text-blue-600' },
  { value: 'good', label: 'Good Condition', icon: CheckCircle2, color: 'text-yellow-600' },
  { value: 'fair', label: 'Fair Condition', icon: Package, color: 'text-orange-600' },
  { value: 'poor', label: 'Poor Condition', icon: Clock, color: 'text-red-600' }
]

export default function ListItem() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<ListingFormData>({
    title: '',
    description: '',
    price_per_day: '',
    category: '',
    condition: 'good',
    location: '',
    contact_email: '',
    contact_phone: '',
    preferred_contact: 'email',
    images: []
  })
  
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push('/auth/signin')
        return
      }
      setUser(currentUser)
      setFormData(prev => ({ ...prev, contact_email: currentUser.email || '' }))
    }

    checkUser()
  }, [router])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error loading categories:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadCategories()
    }
  }, [user])

  const handleInputChange = (field: keyof ListingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setImagePreview(imageUrl)
        setFormData(prev => ({ ...prev, images: [imageUrl] }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setFormData(prev => ({ ...prev, images: [] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await createListing({
        title: formData.title,
        description: formData.description,
        price_per_day: parseFloat(formData.price_per_day),
        category: formData.category,
        condition: formData.condition as 'new' | 'like_new' | 'good' | 'fair' | 'poor',
        location: formData.location,
        contact_info: {
          email: formData.contact_email,
          phone: formData.contact_phone,
          preferred: formData.preferred_contact
        },
        images: formData.images,
        availability_status: 'available'
      })

      toast({
        title: "Listing Created Successfully! 🎉",
        description: "Your item is now available for other students to rent.",
      })

      router.push('/browse')
    } catch (error) {
      console.error('Error creating listing:', error)
      toast({
        title: "Error Creating Listing",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-blue-600 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            List Your Item ✨
          </h1>
          <p className="text-muted-foreground text-lg">
            Share your items with fellow students and earn some extra cash!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload Section */}
          <Card className="shadow-medium animate-slide-up border-0 bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Item Photo
              </CardTitle>
              <CardDescription>
                Add a clear photo of your item to attract more renters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-xl p-8 transition-all hover:border-primary/50 hover:bg-primary/5">
                {imagePreview ? (
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg shadow-soft"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={removeImage}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <span className="text-primary hover:text-primary/80 font-medium transition-colors">
                          Click to upload a photo
                        </span>
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card className="shadow-medium animate-slide-up [animation-delay:0.1s] border-0 bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Item Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., MacBook Pro 13-inch Charger"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                  className="bg-background/50 border-border/50 focus:bg-background transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium">
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="bg-background/50 border-border/50">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          <span className="flex items-center gap-2">
                            <span>{cat.emoji}</span>
                            <span>{cat.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Condition *</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                    <SelectTrigger className="bg-background/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => {
                        const IconComponent = condition.icon
                        return (
                          <SelectItem key={condition.value} value={condition.value}>
                            <span className="flex items-center gap-2">
                              <IconComponent className={`h-4 w-4 ${condition.color}`} />
                              <span>{condition.label}</span>
                            </span>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium">
                    Price per Day *
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={formData.price_per_day}
                      onChange={(e) => handleInputChange('price_per_day', e.target.value)}
                      required
                      min="0"
                      step="0.01"
                      className="pl-10 bg-background/50 border-border/50 focus:bg-background transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">
                    Campus Location
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="e.g., Central Campus, North Campus"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="pl-10 bg-background/50 border-border/50 focus:bg-background transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item, its condition, and any important details..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="bg-background/50 border-border/50 focus:bg-background transition-all resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-medium animate-slide-up [animation-delay:0.2s] border-0 bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Contact Information
              </CardTitle>
              <CardDescription>
                How should interested students reach you?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.contact_email}
                      onChange={(e) => handleInputChange('contact_email', e.target.value)}
                      required
                      className="pl-10 bg-background/50 border-border/50 focus:bg-background transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number (Optional)
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(734) 555-0123"
                      value={formData.contact_phone}
                      onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                      className="pl-10 bg-background/50 border-border/50 focus:bg-background transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Preferred Contact Method</Label>
                <RadioGroup
                  value={formData.preferred_contact}
                  onValueChange={(value) => handleInputChange('preferred_contact', value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email-contact" />
                    <Label htmlFor="email-contact" className="text-sm cursor-pointer">
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="phone-contact" />
                    <Label htmlFor="phone-contact" className="text-sm cursor-pointer">
                      Phone
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Submit Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end animate-slide-up [animation-delay:0.3s]">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => router.push('/dashboard')}
              className="border-border/50"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-medium min-w-32"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </div>
              ) : (
                'Post Listing'
              )}
            </Button>
          </div>
        </form>

        {/* Visual Enhancement */}
        <div className="mt-12 text-center animate-fade-in [animation-delay:0.4s]">
          <Badge variant="secondary" className="px-4 py-2">
            ✨ Your listing will be reviewed and published within 24 hours
          </Badge>
        </div>
      </div>
    </div>
  )
} 