import { useState } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Star, Users, BookOpen, Search } from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogCard from '@/components/BlogCard'
import SearchModal from '@/components/SearchModal'
import SEO from '@/components/SEO'
import { getAllPosts, getFeaturedPosts, getTrendingPosts } from '@/lib/blog'
import { BlogPost } from '@/types/blog'

interface HomeProps {
  featuredPosts: BlogPost[]
  trendingPosts: BlogPost[]
  latestPosts: BlogPost[]
}

export default function Home({ featuredPosts, trendingPosts, latestPosts }: HomeProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const stats = [
    { label: 'Monthly Readers', value: '50K+', icon: Users },
    { label: 'Articles Published', value: '200+', icon: BookOpen },
    { label: 'Expert Authors', value: '15+', icon: Star },
    { label: 'Trending Topics', value: '50+', icon: TrendingUp },
  ]

  const categories = [
    { name: 'Finance', slug: 'finance', count: 45, color: 'bg-blue-500' },
    { name: 'Investment', slug: 'investment', count: 38, color: 'bg-yellow-500' },
    { name: 'Future Trends', slug: 'future-trends', count: 32, color: 'bg-orange-500' },
    { name: 'Technology', slug: 'technology', count: 28, color: 'bg-purple-500' },
  ]

  return (
    <>
      <SEO
        title="Gold Insights Blog - Latest Market Trends & Predictions"
        description="Discover the latest gold market insights, price predictions, and investment strategies. Expert analysis on gold trends for 2026 and beyond."
        canonical="https://goldinsights.blog"
        openGraph={{
          title: "Gold Insights Blog - Latest Market Trends & Predictions",
          description: "Discover the latest gold market insights, price predictions, and investment strategies. Expert analysis on gold trends for 2026 and beyond.",
          url: "https://goldinsights.blog",
        }}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header onSearchClick={() => setIsSearchOpen(true)} />
        
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        <main>
          {/* Hero Section */}
          <section className="section-padding bg-gradient-to-br from-gold-50 to-white dark:from-gold-900 dark:to-gray-900">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6 text-balance">
                    Your Gateway to{' '}
                    <span className="gradient-text">Gold Market Intelligence</span>
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto text-balance">
                    Stay ahead with expert analysis, price predictions, and investment strategies 
                    from leading market analysts and financial experts.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                      onClick={() => setIsSearchOpen(true)}
                      className="btn-primary flex items-center"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Explore Articles
                    </button>
                    <Link href="/newsletter" className="btn-outline flex items-center">
                      Get Weekly Updates
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gold-100 dark:bg-gold-900 rounded-xl mb-3">
                        <Icon className="w-6 h-6 text-gold-600 dark:text-gold-400" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            </div>
          </section>

          {/* Featured Articles */}
          <section className="section-padding">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Featured Articles
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Handpicked insights and analysis from our expert contributors
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.slice(0, 2).map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <BlogCard post={post} featured />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center mt-12"
              >
                <Link href="/blog" className="btn-secondary">
                  View All Articles
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Trending Topics */}
          <section className="section-padding bg-gray-50 dark:bg-gray-800">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Trending Now
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  The most popular articles and topics our readers are engaging with
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingPosts.slice(0, 6).map((post, index) => (
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
            </div>
          </section>

          {/* Categories */}
          <section className="section-padding">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Explore Categories
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Dive deep into specific topics and find content tailored to your interests
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/category/${category.slug}`}
                      className="group block card-hover text-center"
                    >
                      <div className={`w-16 h-16 ${category.color} rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <span className="text-white text-2xl font-bold">
                          {category.name.charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {category.count} articles
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
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
                  Stay Ahead of the Market
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Get weekly insights, market analysis, and exclusive content delivered to your inbox
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
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  Join 10,000+ subscribers. Unsubscribe anytime.
                </p>
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
  const featuredPosts = getFeaturedPosts()
  const trendingPosts = getTrendingPosts()
  const latestPosts = getAllPosts().slice(0, 6)

  return {
    props: {
      featuredPosts,
      trendingPosts,
      latestPosts,
    },
    revalidate: 3600, // Revalidate every hour
  }
}
