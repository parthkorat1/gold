// Auto-tagging system for viral content optimization

export interface AutoTagOptions {
  title: string
  description: string
  content: string
  category: string
}

// High-reach, viral, and SEO-optimized tags
const VIRAL_TAGS = [
  'viral', 'trending', 'breaking news', 'hot topic', 'must read',
  'exclusive', 'insider', 'secret', 'revealed', 'shocking',
  'amazing', 'incredible', 'unbelievable', 'mind-blowing'
]

const SEO_TAGS = [
  'high reach', 'seo optimized', 'google trending', 'search ranking',
  'viral content', 'social media', 'shareable', 'engaging',
  'clickbait', 'attention grabbing', 'buzzworthy'
]

const FINANCIAL_TAGS = [
  'investment', 'finance', 'money', 'wealth', 'millionaire',
  'billionaire', 'rich', 'success', 'profit', 'earnings',
  'stock market', 'cryptocurrency', 'bitcoin', 'trading',
  'portfolio', 'assets', 'returns', 'dividends'
]

const TECH_TAGS = [
  'technology', 'innovation', 'future', 'ai', 'artificial intelligence',
  'machine learning', 'automation', 'digital', 'tech stocks',
  'startup', 'unicorn', 'disruption', 'revolutionary'
]

const REAL_ESTATE_TAGS = [
  'real estate', 'property', 'housing', 'mortgage', 'rental',
  'investment property', 'commercial', 'residential', 'flipping',
  'landlord', 'tenant', 'appreciation', 'equity'
]

const CRYPTO_TAGS = [
  'cryptocurrency', 'bitcoin', 'ethereum', 'crypto', 'blockchain',
  'defi', 'nft', 'altcoin', 'mining', 'wallet', 'exchange',
  'trading', 'hodl', 'bull market', 'bear market'
]

const AGE_TAGS = [
  'young millionaire', 'millennial', 'gen z', 'college student',
  'teenager', '20s', '30s', '40s', 'retirement', 'early retirement'
]

const SUCCESS_TAGS = [
  'success story', 'rags to riches', 'self-made', 'entrepreneur',
  'business owner', 'ceo', 'founder', 'startup', 'scaling',
  'growth', 'expansion', 'acquisition', 'ipo'
]

// Category-specific tag mapping
const CATEGORY_TAG_MAP = {
  'Breaking News': [...VIRAL_TAGS, ...SEO_TAGS, 'breaking', 'urgent', 'latest'],
  'Viral Stories': [...VIRAL_TAGS, ...SUCCESS_TAGS, ...AGE_TAGS, 'inspirational'],
  'AI & Tech': [...TECH_TAGS, ...VIRAL_TAGS, 'innovation', 'disruption'],
  'Crypto': [...CRYPTO_TAGS, ...VIRAL_TAGS, ...SUCCESS_TAGS],
  'Real Estate': [...REAL_ESTATE_TAGS, ...VIRAL_TAGS, ...SUCCESS_TAGS],
  'Investment': [...FINANCIAL_TAGS, ...VIRAL_TAGS, ...SUCCESS_TAGS]
}

// Extract keywords from text
function extractKeywords(text: string): string[] {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3)
  
  // Count word frequency
  const wordCount: { [key: string]: number } = {}
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1
  })
  
  // Return most frequent words
  return Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([word]) => word)
}

// Auto-generate tags based on content
export function generateAutoTags(options: AutoTagOptions): string[] {
  const { title, description, content, category } = options
  
  const allText = `${title} ${description} ${content}`.toLowerCase()
  const tags = new Set<string>()
  
  // Add category-specific tags
  const categoryTags = CATEGORY_TAG_MAP[category as keyof typeof CATEGORY_TAG_MAP] || []
  categoryTags.forEach(tag => {
    if (allText.includes(tag.toLowerCase()) || Math.random() > 0.7) {
      tags.add(tag)
    }
  })
  
  // Add viral tags (always include some)
  const viralCount = Math.min(3, Math.floor(Math.random() * 4) + 1)
  const shuffledViral = VIRAL_TAGS.sort(() => 0.5 - Math.random())
  shuffledViral.slice(0, viralCount).forEach(tag => tags.add(tag))
  
  // Add SEO tags
  const seoCount = Math.min(2, Math.floor(Math.random() * 3) + 1)
  const shuffledSEO = SEO_TAGS.sort(() => 0.5 - Math.random())
  shuffledSEO.slice(0, seoCount).forEach(tag => tags.add(tag))
  
  // Add content-based keywords
  const keywords = extractKeywords(allText)
  keywords.slice(0, 3).forEach(keyword => tags.add(keyword))
  
  // Add financial tags if content is about money
  if (allText.includes('money') || allText.includes('dollar') || allText.includes('million') || allText.includes('billion')) {
    const financialCount = Math.min(2, Math.floor(Math.random() * 3) + 1)
    const shuffledFinancial = FINANCIAL_TAGS.sort(() => 0.5 - Math.random())
    shuffledFinancial.slice(0, financialCount).forEach(tag => tags.add(tag))
  }
  
  // Add age-related tags if content mentions ages
  if (allText.includes('year old') || allText.includes('age') || allText.includes('young') || allText.includes('teen')) {
    const ageCount = Math.min(2, Math.floor(Math.random() * 3) + 1)
    const shuffledAge = AGE_TAGS.sort(() => 0.5 - Math.random())
    shuffledAge.slice(0, ageCount).forEach(tag => tags.add(tag))
  }
  
  // Add success tags if content is about success
  if (allText.includes('success') || allText.includes('made') || allText.includes('earned') || allText.includes('built')) {
    const successCount = Math.min(2, Math.floor(Math.random() * 3) + 1)
    const shuffledSuccess = SUCCESS_TAGS.sort(() => 0.5 - Math.random())
    shuffledSuccess.slice(0, successCount).forEach(tag => tags.add(tag))
  }
  
  // Convert to array and limit to 8-12 tags for optimal SEO
  const finalTags = Array.from(tags).slice(0, 12)
  
  return finalTags
}

// Get suggested tags for a specific category
export function getSuggestedTags(category: string): string[] {
  const categoryTags = CATEGORY_TAG_MAP[category as keyof typeof CATEGORY_TAG_MAP] || []
  const viralTags = VIRAL_TAGS.slice(0, 3)
  const seoTags = SEO_TAGS.slice(0, 2)
  
  return Array.from(new Set([...categoryTags, ...viralTags, ...seoTags])).slice(0, 10)
}

// Validate and clean tags
export function cleanTags(tags: string[]): string[] {
  return tags
    .map(tag => tag.trim().toLowerCase())
    .filter(tag => tag.length > 0 && tag.length <= 50)
    .filter((tag, index, arr) => arr.indexOf(tag) === index) // Remove duplicates
    .slice(0, 15) // Limit to 15 tags max
}

// SEO Keywords for search engine optimization
const SEO_KEYWORDS = {
  'Breaking News': [
    'breaking news', 'latest news', 'urgent news', 'news today', 'current events',
    'news update', 'live news', 'news alert', 'top news', 'news headlines'
  ],
  'Viral Stories': [
    'viral story', 'success story', 'inspirational story', 'amazing story', 'incredible story',
    'viral video', 'viral post', 'trending story', 'popular story', 'shareable story'
  ],
  'AI & Tech': [
    'artificial intelligence', 'ai technology', 'tech news', 'innovation', 'technology trends',
    'ai tools', 'machine learning', 'tech startup', 'digital transformation', 'tech industry'
  ],
  'Crypto': [
    'cryptocurrency', 'bitcoin news', 'crypto market', 'blockchain technology', 'crypto trading',
    'digital currency', 'crypto investment', 'altcoin news', 'crypto analysis', 'crypto trends'
  ],
  'Real Estate': [
    'real estate news', 'property market', 'housing market', 'real estate investment', 'property trends',
    'real estate tips', 'property investment', 'real estate market', 'housing trends', 'property news'
  ],
  'Investment': [
    'investment news', 'stock market', 'investment tips', 'financial news', 'investment strategy',
    'portfolio management', 'investment advice', 'market analysis', 'investment opportunities', 'wealth building'
  ]
}

// High-volume search keywords
const HIGH_VOLUME_KEYWORDS = [
  'news', 'today', 'latest', 'breaking', 'viral', 'trending', 'popular', 'hot',
  'success', 'millionaire', 'billionaire', 'rich', 'wealthy', 'money', 'earnings',
  'investment', 'trading', 'crypto', 'bitcoin', 'stocks', 'real estate', 'business',
  'entrepreneur', 'startup', 'technology', 'ai', 'future', 'prediction', 'analysis'
]

// Long-tail keywords for better SEO
const LONG_TAIL_KEYWORDS = [
  'how to make money', 'investment strategies', 'crypto trading tips', 'real estate investment',
  'young millionaire stories', 'success stories', 'wealth building tips', 'financial freedom',
  'passive income ideas', 'side hustle ideas', 'entrepreneur success', 'startup success stories'
]

// Generate SEO keywords based on content
export function generateSEOKeywords(options: AutoTagOptions): string[] {
  const { title, description, content, category } = options
  
  const allText = `${title} ${description} ${content}`.toLowerCase()
  const keywords = new Set<string>()
  
  // Add category-specific SEO keywords
  const categoryKeywords = SEO_KEYWORDS[category as keyof typeof SEO_KEYWORDS] || []
  categoryKeywords.forEach(keyword => {
    if (allText.includes(keyword.toLowerCase()) || Math.random() > 0.6) {
      keywords.add(keyword)
    }
  })
  
  // Add high-volume keywords
  const highVolumeCount = Math.min(3, Math.floor(Math.random() * 4) + 1)
  const shuffledHighVolume = HIGH_VOLUME_KEYWORDS.sort(() => 0.5 - Math.random())
  shuffledHighVolume.slice(0, highVolumeCount).forEach(keyword => keywords.add(keyword))
  
  // Add long-tail keywords
  const longTailCount = Math.min(2, Math.floor(Math.random() * 3) + 1)
  const shuffledLongTail = LONG_TAIL_KEYWORDS.sort(() => 0.5 - Math.random())
  shuffledLongTail.slice(0, longTailCount).forEach(keyword => keywords.add(keyword))
  
  // Add content-based keywords
  const contentKeywords = extractKeywords(allText)
  contentKeywords.slice(0, 4).forEach(keyword => keywords.add(keyword))
  
  // Add financial keywords if content is about money
  if (allText.includes('money') || allText.includes('dollar') || allText.includes('million') || allText.includes('billion')) {
    keywords.add('financial news')
    keywords.add('money making')
    keywords.add('wealth building')
  }
  
  // Add age-related keywords
  if (allText.includes('year old') || allText.includes('age') || allText.includes('young') || allText.includes('teen')) {
    keywords.add('young entrepreneur')
    keywords.add('millennial success')
    keywords.add('gen z success')
  }
  
  // Add success keywords
  if (allText.includes('success') || allText.includes('made') || allText.includes('earned') || allText.includes('built')) {
    keywords.add('success story')
    keywords.add('entrepreneur success')
    keywords.add('business success')
  }
  
  // Convert to array and limit to 8-10 keywords for optimal SEO
  const finalKeywords = Array.from(keywords).slice(0, 10)
  
  return finalKeywords
}

// Get suggested SEO keywords for a specific category
export function getSuggestedSEOKeywords(category: string): string[] {
  const categoryKeywords = SEO_KEYWORDS[category as keyof typeof SEO_KEYWORDS] || []
  const highVolumeKeywords = HIGH_VOLUME_KEYWORDS.slice(0, 3)
  const longTailKeywords = LONG_TAIL_KEYWORDS.slice(0, 2)
  
  return Array.from(new Set([...categoryKeywords, ...highVolumeKeywords, ...longTailKeywords])).slice(0, 8)
}
