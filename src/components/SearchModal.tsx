import { useState, useEffect, useRef } from 'react'
import { Search, X, Clock, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { searchPosts } from '@/lib/blog'
import type { BlogPost } from '@/types/blog'
import { cn, debounce } from '@/lib/utils'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [trendingSearches] = useState([
    'gold price prediction 2026',
    'investment strategies',
    'market analysis',
    'precious metals',
    'economic trends'
  ])
  
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches')
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  const debouncedSearch = debounce(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const searchResults = await searchPosts(searchQuery)
      setResults(searchResults)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, 300)

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    debouncedSearch(searchQuery)
    
    if (searchQuery.trim()) {
      const updatedSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
      setRecentSearches(updatedSearches)
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
    }
  }

  const handleClearRecent = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-hidden"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative mx-4 mt-20 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          {/* Search Input */}
          <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search articles, topics, or keywords..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none"
            />
            <button
              onClick={onClose}
              className="ml-3 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-96 overflow-y-auto">
            {query.trim().length < 2 ? (
              /* Recent & Trending Searches */
              <div className="p-4 space-y-6">
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Recent Searches
                      </h3>
                      <button
                        onClick={handleClearRecent}
                        className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="block w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trending Searches
                  </h3>
                  <div className="space-y-2">
                    {trendingSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="block w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Search Results */
              <div className="p-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-600"></div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                    </p>
                    {results.slice(0, 5).map((post) => (
                      <a
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        onClick={onClose}
                        className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                      >
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1 line-clamp-1">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <span className="mr-3">{post.category}</span>
                          <span>{post.readingTime}</span>
                        </div>
                      </a>
                    ))}
                    {results.length > 5 && (
                      <div className="text-center pt-2">
                        <button className="text-sm text-gold-600 hover:text-gold-700 dark:text-gold-400 dark:hover:text-gold-300">
                          View all {results.length} results
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No results found for "{query}"
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      Try different keywords or check your spelling
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <span>Press <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">↵</kbd> to search</span>
                <span>Press <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Esc</kbd> to close</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
