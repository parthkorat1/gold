export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  excerpt: string
  author: string
  publishedAt: string
  updatedAt?: string
  category: string
  tags: string[]
  featuredImage?: string
  featured?: boolean
  trending?: boolean
  readingTime: string
  seoTitle?: string
  seoDescription?: string
  keywords?: string[]
}

export interface Category {
  slug: string
  name: string
  description: string
  color: string
  postCount: number
}

export interface Author {
  name: string
  bio: string
  avatar?: string
  social?: {
    twitter?: string
    linkedin?: string
    website?: string
  }
}

export interface NewsletterSubscriber {
  email: string
  subscribedAt: string
  isActive: boolean
}

export interface SearchResult {
  posts: BlogPost[]
  categories: Category[]
  totalCount: number
  query: string
}
