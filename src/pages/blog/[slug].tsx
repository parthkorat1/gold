import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Share2, ArrowLeft, TrendingUp, BookOpen } from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogCard from '@/components/BlogCard'
import SEO from '@/components/SEO'
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog'
import type { BlogPost } from '@/types/blog'
import { formatDate } from '@/lib/utils'

interface BlogPostProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function BlogPost({ post, relatedPosts }: BlogPostProps) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Post Not Found
          </h1>
          <Link href="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const shareUrl = `https://rechman.vercel.app/blog/${post.slug}`
  const shareText = `Check out this article: ${post.title}`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: shareUrl,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl)
      // You could add a toast notification here
    }
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://rechman.vercel.app' },
    { name: 'Blog', url: 'https://rechman.vercel.app/blog' },
    { name: post.title, url: shareUrl },
  ]

  return (
    <>
      <SEO
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.description}
        canonical={shareUrl}
        openGraph={{
          title: post.seoTitle || post.title,
          description: post.seoDescription || post.description,
          url: shareUrl,
          images: post.featuredImage ? [{ url: post.featuredImage }] : undefined,
        }}
        article={post}
        breadcrumbs={breadcrumbs}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />

        <main>
          {/* Back Button */}
          <section className="py-8 border-b border-gray-200 dark:border-gray-700">
            <div className="container-custom">
              <Link
                href="/blog"
                className="inline-flex items-center text-gold-600 hover:text-gold-700 dark:text-gold-400 dark:hover:text-gold-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </div>
          </section>

          {/* Article Header */}
          <article className="py-12">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                {/* Category & Meta */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 bg-gold-100 dark:bg-gold-900 text-gold-800 dark:text-gold-200 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      {post.trending && (
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={handleShare}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                    {post.title}
                  </h1>

                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Featured Image */}
                {post.featuredImage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12"
                  >
                    <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </motion.div>
                )}

                {/* Article Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="prose prose-lg dark:prose-invert max-w-none"
                >
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
              <div className="container-custom">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Related Articles
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Continue exploring with these related insights
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost, index) => (
                    <motion.div
                      key={relatedPost.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <BlogCard post={relatedPost} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Newsletter CTA */}
          <section className="section-padding gradient-bg">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center"
              >
                <BookOpen className="w-16 h-16 text-gold-600 dark:text-gold-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Enjoyed This Article?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Subscribe to get more insights like this delivered to your inbox weekly
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
  // Check if we're in build mode and Firebase is not available
  const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  
  if (isBuildTime) {
    // Return empty paths during build if Firebase is not configured
    return {
      paths: [],
      fallback: true,
    }
  }

  try {
    const posts = await getAllPosts()
    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }))

    return {
      paths,
      fallback: true,
    }
  } catch (error) {
    console.error('Error fetching posts for static paths:', error)
    return {
      paths: [],
      fallback: true,
    }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  
  // Check if we're in build mode and Firebase is not available
  const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  
  if (isBuildTime) {
    // Return 404 during build if Firebase is not configured
    return {
      notFound: true,
    }
  }

  try {
    const post = await getPostBySlug(slug)

    if (!post) {
      return {
        notFound: true,
      }
    }

    const relatedPosts = await getRelatedPosts(post, 3)

    return {
      props: {
        post,
        relatedPosts,
      },
      revalidate: 3600, // Revalidate every hour
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return {
      notFound: true,
    }
  }
}
