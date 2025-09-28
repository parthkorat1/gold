import mongoose, { Schema, Document } from 'mongoose'

export interface IBlogPost extends Document {
  slug: string
  title: string
  description: string
  content: string
  excerpt: string
  author: string
  publishedAt: Date
  updatedAt?: Date
  category: string
  tags: string[]
  featuredImage?: string
  featured: boolean
  trending: boolean
  readingTime: string
  seoTitle?: string
  seoDescription?: string
  keywords?: string[]
  status: 'draft' | 'published' | 'archived'
  views: number
  shares: number
  likes: number
  createdAt: Date
}

const BlogPostSchema = new Schema<IBlogPost>({
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300
  },
  author: {
    type: String,
    required: true,
    default: 'RichMan News Team'
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: true,
    enum: ['Breaking News', 'Viral Stories', 'AI & Tech', 'Crypto', 'Real Estate', 'Investment']
  },
  tags: [{
    type: String,
    maxlength: 50
  }],
  featuredImage: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  readingTime: {
    type: String,
    required: true,
    default: '5 min read'
  },
  seoTitle: {
    type: String,
    maxlength: 200
  },
  seoDescription: {
    type: String,
    maxlength: 500
  },
  keywords: [{
    type: String,
    maxlength: 100
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Indexes for better performance
BlogPostSchema.index({ slug: 1 })
BlogPostSchema.index({ status: 1, publishedAt: -1 })
BlogPostSchema.index({ category: 1, status: 1 })
BlogPostSchema.index({ featured: 1, trending: 1 })
BlogPostSchema.index({ tags: 1 })

// Update the updatedAt field before saving
BlogPostSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema)
