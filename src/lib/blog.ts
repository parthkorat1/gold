import { BlogPost, Category } from '@/types/blog'
import { slugify, generateExcerpt, readingTime } from './utils'
import { 
  getAllBlogPosts as getAllFirestorePosts, 
  getBlogPostBySlug as getFirestorePostBySlug, 
  getFeaturedPosts as getFirestoreFeaturedPosts, 
  getTrendingPosts as getFirestoreTrendingPosts, 
  getPostsByCategory as getFirestorePostsByCategory,
  searchBlogPosts as searchFirestorePosts 
} from './firebase-storage'

// Fallback data for when Firestore is not available
const samplePosts: BlogPost[] = [
  {
    slug: 'bitcoin-100k-2024-breaking-news',
    title: '🚨 BREAKING: Bitcoin Hits $100K! This 25-Year-Old Made $2.3M in 6 Months',
    description: 'BREAKING NEWS: Bitcoin just hit $100,000! See how this young investor turned $5,000 into $2.3 million. The strategy that changed everything revealed.',
    content: '<p>This is a viral breaking news story about Bitcoin...</p>',
    excerpt: 'BREAKING NEWS: Bitcoin just hit $100,000! See how this young investor turned $5,000 into $2.3 million. The strategy that changed everything revealed.',
    author: 'RichMan News Team',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    category: 'Breaking News',
    tags: ['bitcoin', 'cryptocurrency', 'breaking news', 'viral', 'investment', 'millionaire'],
    featuredImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=630&fit=crop',
    featured: true,
    trending: true,
    readingTime: '3 min read',
    seoTitle: 'Bitcoin $100K BREAKING: 25-Year-Old Made $2.3M - Strategy Revealed',
    seoDescription: 'BREAKING: Bitcoin hits $100K! Young investor made $2.3M from $5K. The viral strategy that changed everything. Read now!',
    keywords: ['bitcoin 100k', 'cryptocurrency news', 'bitcoin breaking news', 'crypto millionaire', 'bitcoin investment', 'viral crypto story']
  },
  {
    slug: 'tesla-stock-crash-2024-viral',
    title: '🔥 VIRAL: Tesla Stock Crashes 40% - This Investor Lost $50M But Made It Back in 3 Days',
    description: 'VIRAL STORY: Tesla stock crashes 40% and this investor lost $50 million. But wait... he made it ALL back in just 3 days using this secret strategy!',
    content: '<p>This is a viral story about Tesla stock crash...</p>',
    excerpt: 'VIRAL STORY: Tesla stock crashes 40% and this investor lost $50 million. But wait... he made it ALL back in just 3 days using this secret strategy!',
    author: 'RichMan News Team',
    publishedAt: '2024-01-10T09:00:00Z',
    category: 'Viral Stories',
    tags: ['tesla', 'stock market', 'viral', 'millionaire', 'investment', 'crash'],
    featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop',
    featured: true,
    trending: true,
    readingTime: '4 min read',
    seoTitle: 'Tesla Stock Crash: Investor Lost $50M, Made It Back in 3 Days - VIRAL',
    seoDescription: 'VIRAL: Tesla crashes 40%, investor loses $50M but makes it back in 3 days! The secret strategy revealed. Read now!',
    keywords: ['tesla stock crash', 'tesla viral news', 'stock market crash', 'tesla investor', 'viral finance story', 'tesla recovery']
  },
  {
    slug: 'ai-stock-picks-2024-millionaire',
    title: '🤖 AI Picks These 3 Stocks - One Made 1,200% in 6 Months! (Millionaire Reveals)',
    description: 'BREAKING: AI algorithm picks 3 stocks that could make you rich. One already gained 1,200% in 6 months! Millionaire investor reveals the AI strategy.',
    content: '<p>This is a viral story about AI stock picks...</p>',
    excerpt: 'BREAKING: AI algorithm picks 3 stocks that could make you rich. One already gained 1,200% in 6 months! Millionaire investor reveals the AI strategy.',
    author: 'RichMan News Team',
    publishedAt: '2024-01-08T11:00:00Z',
    category: 'AI & Tech',
    tags: ['ai stocks', 'artificial intelligence', 'viral', 'millionaire', 'stock picks', 'technology'],
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
    featured: false,
    trending: true,
    readingTime: '5 min read',
    seoTitle: 'AI Stock Picks: 1,200% Gains in 6 Months - Millionaire Reveals Strategy',
    seoDescription: 'BREAKING: AI picks 3 stocks, one gained 1,200% in 6 months! Millionaire reveals the AI strategy that changed everything. Read now!',
    keywords: ['ai stock picks', 'artificial intelligence stocks', 'ai investment', 'viral stock news', 'ai millionaire', 'tech stocks']
  },
  {
    slug: 'real-estate-crash-2024-breaking',
    title: '🏠 BREAKING: Real Estate Market CRASHES! This 30-Year-Old Bought 47 Properties for $0 Down',
    description: 'BREAKING NEWS: Real estate market crashes but this 30-year-old bought 47 properties for $0 down payment! The secret strategy that banks don\'t want you to know.',
    content: '<p>This is a viral breaking news story about real estate...</p>',
    excerpt: 'BREAKING NEWS: Real estate market crashes but this 30-year-old bought 47 properties for $0 down payment! The secret strategy that banks don\'t want you to know.',
    author: 'RichMan News Team',
    publishedAt: '2024-01-05T08:00:00Z',
    category: 'Breaking News',
    tags: ['real estate', 'property investment', 'breaking news', 'viral', 'millionaire', 'zero down'],
    featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop',
    featured: false,
    trending: true,
    readingTime: '6 min read',
    seoTitle: 'Real Estate Crash: 30-Year-Old Bought 47 Properties $0 Down - BREAKING',
    seoDescription: 'BREAKING: Real estate crashes but 30-year-old bought 47 properties $0 down! The secret strategy banks don\'t want you to know. Read now!',
    keywords: ['real estate crash', 'property investment', 'zero down payment', 'real estate viral', 'property millionaire', 'real estate breaking news']
  },
  {
    slug: 'crypto-millionaire-2024-secret',
    title: '💰 VIRAL: This 22-Year-Old Made $50M in Crypto - The Secret Strategy That Changed Everything',
    description: 'VIRAL STORY: 22-year-old made $50 million in cryptocurrency using this secret strategy. Banks hate him! The method that turned $500 into millions.',
    content: '<p>This is a viral story about a crypto millionaire...</p>',
    excerpt: 'VIRAL STORY: 22-year-old made $50 million in cryptocurrency using this secret strategy. Banks hate him! The method that turned $500 into millions.',
    author: 'RichMan News Team',
    publishedAt: '2024-01-03T14:00:00Z',
    category: 'Viral Stories',
    tags: ['cryptocurrency', 'crypto millionaire', 'viral', 'young millionaire', 'crypto strategy', 'bitcoin'],
    featuredImage: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=630&fit=crop',
    featured: true,
    trending: true,
    readingTime: '7 min read',
    seoTitle: 'Crypto Millionaire: 22-Year-Old Made $50M - Secret Strategy VIRAL',
    seoDescription: 'VIRAL: 22-year-old made $50M in crypto with secret strategy! Banks hate him. The method that turned $500 into millions. Read now!',
    keywords: ['crypto millionaire', 'cryptocurrency strategy', 'young millionaire', 'crypto viral', 'bitcoin millionaire', 'crypto investment']
  }
]

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getAllFirestorePosts()
    return posts.map((post: any) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      publishedAt: post.publishedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: post.updatedAt?.toDate?.()?.toISOString(),
      category: post.category,
      tags: post.tags,
      featuredImage: post.featuredImage,
      featured: post.featured,
      trending: post.trending,
      readingTime: post.readingTime,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      keywords: post.keywords
    }))
  } catch (error) {
    console.error('Error fetching posts from Firestore:', error)
    // Return fallback data if Firestore fails
    return samplePosts.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await getFirestorePostBySlug(slug)
    if (!post) return null
    
    return {
      slug: (post as any).slug,
      title: (post as any).title,
      description: (post as any).description,
      content: (post as any).content,
      excerpt: (post as any).excerpt,
      author: (post as any).author,
      publishedAt: (post as any).publishedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: (post as any).updatedAt?.toDate?.()?.toISOString(),
      category: (post as any).category,
      tags: (post as any).tags,
      featuredImage: (post as any).featuredImage,
      featured: (post as any).featured,
      trending: (post as any).trending,
      readingTime: (post as any).readingTime,
      seoTitle: (post as any).seoTitle,
      seoDescription: (post as any).seoDescription,
      keywords: (post as any).keywords
    }
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    // Return fallback data if Firestore fails
    const posts = await getAllPosts()
    return posts.find((post) => post.slug === slug) || null
  }
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getFirestoreFeaturedPosts()
    return posts.map((post: any) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      publishedAt: post.publishedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: post.updatedAt?.toDate?.()?.toISOString(),
      category: post.category,
      tags: post.tags,
      featuredImage: post.featuredImage,
      featured: post.featured,
      trending: post.trending,
      readingTime: post.readingTime,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      keywords: post.keywords
    }))
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    const posts = await getAllPosts()
    return posts.filter((post) => post.featured)
  }
}

export async function getTrendingPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getFirestoreTrendingPosts()
    return posts.map((post: any) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      publishedAt: post.publishedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: post.updatedAt?.toDate?.()?.toISOString(),
      category: post.category,
      tags: post.tags,
      featuredImage: post.featuredImage,
      featured: post.featured,
      trending: post.trending,
      readingTime: post.readingTime,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      keywords: post.keywords
    }))
  } catch (error) {
    console.error('Error fetching trending posts:', error)
    const posts = await getAllPosts()
    return posts.filter((post) => post.trending)
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const posts = await getFirestorePostsByCategory(category)
    return posts.map((post: any) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      publishedAt: post.publishedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: post.updatedAt?.toDate?.()?.toISOString(),
      category: post.category,
      tags: post.tags,
      featuredImage: post.featuredImage,
      featured: post.featured,
      trending: post.trending,
      readingTime: post.readingTime,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      keywords: post.keywords
    }))
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    const posts = await getAllPosts()
    return posts.filter((post) =>
      slugify(post.category) === category
    )
  }
}

export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts
    .filter((post) =>
      post.slug !== currentPost.slug &&
      (post.category === currentPost.category ||
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit)
}

export function getCategories(): Category[] {
  const categories: Category[] = [
    {
      slug: 'breaking-news',
      name: '🚨 Breaking News',
      description: 'Latest breaking financial news and market updates',
      color: 'bg-red-100 text-red-800',
      postCount: 2
    },
    {
      slug: 'viral-stories',
      name: '🔥 Viral Stories',
      description: 'Viral financial stories that are trending worldwide',
      color: 'bg-orange-100 text-orange-800',
      postCount: 2
    },
    {
      slug: 'ai-tech',
      name: '🤖 AI & Tech',
      description: 'Artificial intelligence and technology in finance',
      color: 'bg-purple-100 text-purple-800',
      postCount: 1
    }
  ]

  return categories.sort((a, b) => b.postCount - a.postCount)
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  try {
    const posts = await searchFirestorePosts(query)
    return posts.map((post: any) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      publishedAt: post.publishedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: post.updatedAt?.toDate?.()?.toISOString(),
      category: post.category,
      tags: post.tags,
      featuredImage: post.featuredImage,
      featured: post.featured,
      trending: post.trending,
      readingTime: post.readingTime,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      keywords: post.keywords
    }))
  } catch (error) {
    console.error('Error searching posts:', error)
    const posts = await getAllPosts()
    const lowercaseQuery = query.toLowerCase()
    return posts.filter((post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.description.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      post.category.toLowerCase().includes(lowercaseQuery)
    )
  }
}