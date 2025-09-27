import { BlogPost, Category } from '@/types/blog'
import { slugify, generateExcerpt, readingTime } from './utils'

// Sample blog posts data - in a real app, this would come from a CMS or API
const samplePosts: BlogPost[] = [
  {
    slug: 'gold-price-prediction-2026',
    title: 'Gold Price May Reach $200,000 in 2026: Expert Analysis & Market Predictions',
    description: 'Comprehensive analysis of gold price predictions for 2026. Discover expert insights, market trends, and investment strategies as gold potentially reaches unprecedented heights.',
    content: '<p>This is a sample blog post about gold price predictions...</p>',
    excerpt: 'Comprehensive analysis of gold price predictions for 2026. Discover expert insights, market trends, and investment strategies as gold potentially reaches unprecedented heights.',
    author: 'Dr. Sarah Chen',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    category: 'Finance',
    tags: ['gold', 'investment', 'price prediction', 'market analysis', 'precious metals', '2026 forecast'],
    featuredImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=630&fit=crop',
    featured: true,
    trending: true,
    readingTime: '8 min read',
    seoTitle: 'Gold Price Prediction 2026: Will Gold Reach $200,000? Expert Analysis',
    seoDescription: 'Expert analysis predicts gold could reach $200,000 by 2026. Discover market trends, investment strategies, and what drives gold prices in our comprehensive guide.',
    keywords: ['gold price prediction 2026', 'gold forecast', 'gold investment', 'precious metals', 'market analysis', 'gold trends']
  },
  {
    slug: 'gold-investment-strategies-2024',
    title: 'Ultimate Gold Investment Strategies for 2024: Maximize Your Portfolio Returns',
    description: 'Discover proven gold investment strategies for 2024. Learn how to diversify your portfolio with precious metals and maximize returns in volatile markets.',
    content: '<p>This is a sample blog post about gold investment strategies...</p>',
    excerpt: 'Discover proven gold investment strategies for 2024. Learn how to diversify your portfolio with precious metals and maximize returns in volatile markets.',
    author: 'Michael Rodriguez',
    publishedAt: '2024-01-10T09:00:00Z',
    category: 'Investment',
    tags: ['gold investment', 'portfolio diversification', 'precious metals', 'investment strategies', 'wealth preservation'],
    featuredImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop',
    featured: true,
    trending: false,
    readingTime: '6 min read',
    seoTitle: 'Gold Investment Strategies 2024: Complete Guide to Precious Metals Investing',
    seoDescription: 'Master gold investment strategies for 2024. Expert tips on portfolio diversification, risk management, and maximizing returns with precious metals.',
    keywords: ['gold investment strategies', 'precious metals investing', 'portfolio diversification', 'gold portfolio', 'investment tips 2024']
  },
  {
    slug: 'future-of-digital-gold',
    title: 'The Future of Digital Gold: How Technology is Revolutionizing Precious Metals',
    description: 'Explore how blockchain technology and digital innovations are transforming gold investment. Discover digital gold platforms, tokenization, and the future of precious metals.',
    content: '<p>This is a sample blog post about digital gold...</p>',
    excerpt: 'Explore how blockchain technology and digital innovations are transforming gold investment. Discover digital gold platforms, tokenization, and the future of precious metals.',
    author: 'Alexandra Kim',
    publishedAt: '2024-01-08T11:00:00Z',
    category: 'Technology',
    tags: ['digital gold', 'blockchain', 'cryptocurrency', 'fintech', 'precious metals', 'tokenization'],
    featuredImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=630&fit=crop',
    featured: false,
    trending: true,
    readingTime: '7 min read',
    seoTitle: 'Digital Gold Revolution: How Technology is Transforming Precious Metals Investment',
    seoDescription: 'Discover how digital gold platforms, blockchain technology, and tokenization are revolutionizing precious metals investment. The future of gold is digital.',
    keywords: ['digital gold', 'blockchain gold', 'gold tokenization', 'crypto gold', 'fintech precious metals', 'digital assets']
  },
  {
    slug: 'gold-market-trends-2024',
    title: 'Gold Market Trends 2024: What Investors Need to Know',
    description: 'Comprehensive analysis of gold market trends for 2024. Discover key factors driving gold prices, investment opportunities, and market outlook.',
    content: '<p>This is a sample blog post about gold market trends...</p>',
    excerpt: 'Comprehensive analysis of gold market trends for 2024. Discover key factors driving gold prices, investment opportunities, and market outlook.',
    author: 'Robert Martinez',
    publishedAt: '2024-01-05T08:00:00Z',
    category: 'Market Analysis',
    tags: ['market trends', 'gold analysis', 'investment', '2024 outlook', 'economic indicators'],
    featuredImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop',
    featured: false,
    trending: true,
    readingTime: '9 min read',
    seoTitle: 'Gold Market Trends 2024: Complete Investment Analysis & Outlook',
    seoDescription: 'Stay ahead with our comprehensive analysis of gold market trends for 2024. Expert insights on price drivers, investment strategies, and market opportunities.',
    keywords: ['gold market trends 2024', 'gold analysis', 'precious metals market', 'investment outlook', 'gold price drivers']
  },
  {
    slug: 'precious-metals-portfolio-diversification',
    title: 'Precious Metals Portfolio Diversification: A Complete Guide',
    description: 'Learn how to effectively diversify your investment portfolio with precious metals. Expert strategies for gold, silver, platinum, and palladium allocation.',
    content: '<p>This is a sample blog post about precious metals portfolio diversification...</p>',
    excerpt: 'Learn how to effectively diversify your investment portfolio with precious metals. Expert strategies for gold, silver, platinum, and palladium allocation.',
    author: 'Jennifer Walsh',
    publishedAt: '2024-01-03T14:00:00Z',
    category: 'Investment',
    tags: ['portfolio diversification', 'precious metals', 'investment strategy', 'risk management', 'asset allocation'],
    featuredImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=630&fit=crop',
    featured: true,
    trending: false,
    readingTime: '10 min read',
    seoTitle: 'Precious Metals Portfolio Diversification: Complete Investment Guide',
    seoDescription: 'Master precious metals portfolio diversification with expert strategies for gold, silver, platinum, and palladium. Build a resilient investment portfolio.',
    keywords: ['precious metals diversification', 'portfolio allocation', 'gold silver investment', 'precious metals strategy', 'investment diversification']
  }
]

export function getAllPosts(): BlogPost[] {
  return samplePosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts()
  return posts.find((post) => post.slug === slug) || null
}

export function getFeaturedPosts(): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter((post) => post.featured)
}

export function getTrendingPosts(): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter((post) => post.trending)
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter((post) => 
    slugify(post.category) === category
  )
}

export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const posts = getAllPosts()
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
      slug: 'finance',
      name: 'Finance',
      description: 'Latest insights about finance',
      color: 'bg-blue-100 text-blue-800',
      postCount: 1
    },
    {
      slug: 'investment',
      name: 'Investment',
      description: 'Latest insights about investment',
      color: 'bg-yellow-100 text-yellow-800',
      postCount: 2
    },
    {
      slug: 'technology',
      name: 'Technology',
      description: 'Latest insights about technology',
      color: 'bg-purple-100 text-purple-800',
      postCount: 1
    },
    {
      slug: 'market-analysis',
      name: 'Market Analysis',
      description: 'Latest insights about market analysis',
      color: 'bg-red-100 text-red-800',
      postCount: 1
    }
  ]
  
  return categories.sort((a, b) => b.postCount - a.postCount)
}

export function searchPosts(query: string): BlogPost[] {
  const posts = getAllPosts()
  const lowercaseQuery = query.toLowerCase()

  return posts.filter((post) => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.category.toLowerCase().includes(lowercaseQuery)
  )
}
