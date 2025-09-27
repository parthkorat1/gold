import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, TrendingUp, Share2, Twitter, Facebook, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import type { BlogPost } from '@/types/blog'
import { formatDate, slugify } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
  className?: string
}

export default function BlogCard({ post, featured = false, className }: BlogCardProps) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const categorySlug = slugify(post.category)
  const categoryColors = {
    'finance': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'technology': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'future-trends': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'investment': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'lifestyle': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'market-analysis': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  }

  const shareUrl = `https://richman.news/blog/${post.slug}`
  const shareText = post.title

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400')
    setShowShareMenu(false)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -4, transition: { duration: 0.2 } }
  }

  if (featured) {
    return (
      <motion.article
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className={cn(
          'group card-hover overflow-hidden',
          className
        )}
      >
        <div className="relative h-64 mb-6">
          <Image
            src={post.featuredImage || '/placeholder-blog.jpg'}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className={cn(
              'px-3 py-1 rounded-full text-xs font-medium',
              categoryColors[categorySlug as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
            )}>
              {post.category}
            </span>
          </div>
          {post.trending && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-800 dark:bg-gold-900 dark:text-gold-200 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors line-clamp-2">
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formatDate(post.publishedAt, 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readingTime}</span>
              </div>
            </div>
            
            {/* Share Button */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                aria-label="Share article"
              >
                <Share2 className="w-4 h-4" />
              </button>
              
              {showShareMenu && (
                <div className="absolute right-0 top-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-10">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="p-2 text-blue-700 hover:text-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={cn(
        'group card-hover',
        className
      )}
    >
      <div className="space-y-4">
        <div className="relative h-48">
          <Image
            src={post.featuredImage || '/placeholder-blog.jpg'}
            alt={post.title}
            fill
            className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              categoryColors[categorySlug as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
            )}>
              {post.category}
            </span>
          </div>
          {post.trending && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-800 dark:bg-gold-900 dark:text-gold-200 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors line-clamp-2">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <User className="w-3 h-3 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{formatDate(post.publishedAt, 'MMM dd')}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
