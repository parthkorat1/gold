import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp } from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogCard from '@/components/BlogCard'
import SEO from '@/components/SEO'
import { getPostsByCategory, getAllPosts, getCategories } from '@/lib/blog'
import type { BlogPost, Category } from '@/types/blog'
import { slugify } from '@/lib/utils'

interface CategoryPageProps {
  posts: BlogPost[]
  category: Category
  allCategories: Category[]
}

export default function CategoryPage({ posts, category, allCategories }: CategoryPageProps) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600"></div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Category Not Found
          </h1>
          <Link href="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://rechman.vercel.app' },
    { name: 'Blog', url: 'https://rechman.vercel.app/blog' },
    { name: category.name, url: `https://rechman.vercel.app/category/${category.slug}` },
  ]

  return (
    <>
      <SEO
        title={`${category.name} Articles - Gold Insights Blog`}
        description={`Explore ${category.name.toLowerCase()} articles and insights. Discover expert analysis, trends, and strategies in ${category.name.toLowerCase()}.`}
        canonical={`https://rechman.vercel.app/category/${category.slug}`}
        openGraph={{
          title: `${category.name} Articles - Gold Insights Blog`,
          description: `Explore ${category.name.toLowerCase()} articles and insights. Discover expert analysis, trends, and strategies in ${category.name.toLowerCase()}.`,
          url: `https://rechman.vercel.app/category/${category.slug}`,
        }}
        breadcrumbs={breadcrumbs}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />

        <main>
          {/* Header Section */}
          <section className="section-padding bg-gradient-to-br from-gold-50 to-white dark:from-gold-900 dark:to-gray-900">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center text-gold-600 hover:text-gold-700 dark:text-gold-400 dark:hover:text-gold-300 transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>

                <div className="text-center">
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6">
                    {category.name}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                    {category.description}
                  </p>
                  
                  <div className="inline-flex items-center px-4 py-2 bg-gold-100 dark:bg-gold-900 text-gold-800 dark:text-gold-200 rounded-full text-sm font-medium">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {posts.length} Article{posts.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Category Filter */}
          <section className="py-8 border-b border-gray-200 dark:border-gray-700">
            <div className="container-custom">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Other categories:
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        cat.slug === category.slug
                          ? 'bg-gold-100 text-gold-800 dark:bg-gold-900 dark:text-gold-200'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {cat.name} ({cat.postCount})
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Articles */}
          <section className="section-padding">
            <div className="container-custom">
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post, index) => (
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
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No articles found in this category
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Check back soon for new content in this category
                  </p>
                  <Link href="/blog" className="btn-primary">
                    Browse All Articles
                  </Link>
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
                  Stay Updated on {category.name}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Get the latest {category.name.toLowerCase()} insights delivered to your inbox
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

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = getCategories()
  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  
  // Check if we're in build mode and Firebase is not available
  const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  
  if (isBuildTime) {
    // Use fallback/sample data during build if Firebase is not configured
    const allCategories = getCategories()
    const category = allCategories.find((cat) => cat.slug === slug)
    
    if (!category) {
      return {
        notFound: true,
      }
    }
    
    const posts = await getPostsByCategory(slug)
    return {
      props: {
        posts,
        category,
        allCategories,
      },
      revalidate: 60,
    }
  }

  try {
    const posts = await getPostsByCategory(slug)
    const allCategories = getCategories()
    const category = allCategories.find((cat) => cat.slug === slug)

    if (!category) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        posts,
        category,
        allCategories,
      },
      revalidate: 60, // Revalidate every minute
    }
  } catch (error) {
    console.error('Error fetching category posts:', error)
    const allCategories = getCategories()
    const category = allCategories.find((cat) => cat.slug === slug)
    
    if (!category) {
      return {
        notFound: true,
      }
    }
    
    return {
      props: {
        posts: [],
        category,
        allCategories,
      },
      revalidate: 60,
    }
  }
}
