import { useState } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Filter, ArrowRight } from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogCard from '@/components/BlogCard'
import SearchModal from '@/components/SearchModal'
import SEO from '@/components/SEO'
import { getAllPosts, getCategories } from '@/lib/blog'
import type { BlogPost, Category } from '@/types/blog'

interface BlogIndexProps {
  posts: BlogPost[]
  categories: Category[]
}

export default function BlogIndex({ posts, categories }: BlogIndexProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || 
      post.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <SEO
        title="Blog - Gold Market Insights & Analysis"
        description="Explore our comprehensive collection of gold market insights, investment strategies, and expert analysis. Stay informed with the latest trends and predictions."
        canonical="https://rechman.vercel.app/blog"
        openGraph={{
          title: "Blog - Gold Market Insights & Analysis",
          description: "Explore our comprehensive collection of gold market insights, investment strategies, and expert analysis. Stay informed with the latest trends and predictions.",
          url: "https://rechman.vercel.app/blog",
        }}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header onSearchClick={() => setIsSearchOpen(true)} />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        <main>
          {/* Header Section */}
          <section className="section-padding bg-gradient-to-br from-gold-50 to-white dark:from-gold-900 dark:to-gray-900">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Market Insights & Analysis
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                  Discover expert analysis, market predictions, and investment strategies 
                  from leading financial experts and market analysts.
                </p>
                
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search articles, topics, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Filters */}
          <section className="py-8 border-b border-gray-200 dark:border-gray-700">
            <div className="container-custom">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Filter by category:
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-gold-100 text-gold-800 dark:bg-gold-900 dark:text-gold-200'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    All ({posts.length})
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category.slug
                          ? 'bg-gold-100 text-gold-800 dark:bg-gold-900 dark:text-gold-200'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {category.name} ({category.postCount})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Blog Posts */}
          <section className="section-padding">
            <div className="container-custom">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No articles found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try adjusting your search terms or category filter
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('all')
                    }}
                    className="btn-primary"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}

              {/* Load More */}
              {filteredPosts.length > 0 && filteredPosts.length >= 12 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-center mt-12"
                >
                  <button className="btn-secondary">
                    Load More Articles
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </motion.div>
              )}
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="section-padding gradient-bg">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Never Miss an Update
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Get the latest insights delivered to your inbox every week
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 input"
                  />
                  <button className="btn-primary whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts()
  const categories = getCategories()

  return {
    props: {
      posts,
      categories,
    },
    revalidate: 3600, // Revalidate every hour
  }
}
