import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Save, 
  Eye, 
  Upload, 
  X, 
  AlertCircle,
  TrendingUp,
  Star,
  Hash,
  Tag,
  Wand2,
  RefreshCw
} from 'lucide-react'
import RichTextEditor from '@/components/admin/RichTextEditor'
import SEO from '@/components/SEO'
import { generateAutoTags, getSuggestedTags, cleanTags, generateSEOKeywords, getSuggestedSEOKeywords } from '@/lib/auto-tags'

const blogPostSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters').max(500, 'Description must be less than 500 characters'),
  category: z.string().min(1, 'Please select a category'),
  tags: z.string().min(1, 'Please add at least one tag'),
  featuredImage: z.string().optional(),
  seoTitle: z.string().max(200, 'SEO title must be less than 200 characters').optional(),
  seoDescription: z.string().max(500, 'SEO description must be less than 500 characters').optional(),
  keywords: z.string().optional(),
  featured: z.boolean().default(false),
  trending: z.boolean().default(false),
  status: z.enum(['draft', 'published']).default('draft')
})

type BlogPostForm = z.infer<typeof blogPostSchema>

export default function NewPost() {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [autoGeneratingTags, setAutoGeneratingTags] = useState(false)
  const [suggestedTags, setSuggestedTags] = useState<string[]>([])
  const [autoGeneratingKeywords, setAutoGeneratingKeywords] = useState(false)
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([])
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues
  } = useForm<BlogPostForm>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      featured: false,
      trending: false,
      status: 'draft'
    }
  })

  const watchedValues = watch()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }
  }, [router])

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      // For now, we'll use a simple approach - convert to base64 or use external URL
      // In production, you'd upload to a CDN or cloud storage
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setValue('featuredImage', result)
        setSuccess('Image processed successfully!')
        setUploadingImage(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      setError('Error processing image')
      setUploadingImage(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const generateExcerpt = (content: string) => {
    const strippedContent = content.replace(/(<([^>]+)>)/gi, '')
    return strippedContent.substring(0, 300).trim() + '...'
  }

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.replace(/(<([^>]+)>)/gi, '').split(/\s/g).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min read`
  }

  const handleAutoGenerateTags = async () => {
    const formData = getValues()
    if (!formData.title || !formData.description || !formData.category) {
      setError('Please fill in title, description, and category first')
      return
    }

    setAutoGeneratingTags(true)
    try {
      const autoTags = generateAutoTags({
        title: formData.title,
        description: formData.description,
        content: content,
        category: formData.category
      })
      
      const cleanedTags = cleanTags(autoTags)
      setValue('tags', cleanedTags.join(', '))
      setSuccess('Auto-generated viral tags! 🚀')
    } catch (error) {
      setError('Failed to generate tags')
    } finally {
      setAutoGeneratingTags(false)
    }
  }

  const handleGetSuggestedTags = () => {
    const formData = getValues()
    if (!formData.category) {
      setError('Please select a category first')
      return
    }

    const suggestions = getSuggestedTags(formData.category)
    setSuggestedTags(suggestions)
  }

  const addSuggestedTag = (tag: string) => {
    const currentTags = getValues('tags') || ''
    const currentTagsArray = currentTags.split(',').map(t => t.trim()).filter(Boolean)
    
    if (!currentTagsArray.includes(tag)) {
      const newTags = [...currentTagsArray, tag]
      setValue('tags', newTags.join(', '))
    }
  }

  const handleAutoGenerateKeywords = async () => {
    const formData = getValues()
    if (!formData.title || !formData.description || !formData.category) {
      setError('Please fill in title, description, and category first')
      return
    }

    setAutoGeneratingKeywords(true)
    try {
      // Generate SEO-focused keywords based on content
      const seoKeywords = generateSEOKeywords({
        title: formData.title,
        description: formData.description,
        content: content,
        category: formData.category
      })
      
      const cleanedKeywords = cleanTags(seoKeywords)
      setValue('keywords', cleanedKeywords.join(', '))
      setSuccess('Auto-generated SEO keywords! 🎯')
    } catch (error) {
      setError('Failed to generate keywords')
    } finally {
      setAutoGeneratingKeywords(false)
    }
  }

  const handleGetSuggestedKeywords = () => {
    const formData = getValues()
    if (!formData.category) {
      setError('Please select a category first')
      return
    }

    const suggestions = getSuggestedSEOKeywords(formData.category)
    setSuggestedKeywords(suggestions)
  }

  const addSuggestedKeyword = (keyword: string) => {
    const currentKeywords = getValues('keywords') || ''
    const currentKeywordsArray = currentKeywords.split(',').map(k => k.trim()).filter(Boolean)
    
    if (!currentKeywordsArray.includes(keyword)) {
      const newKeywords = [...currentKeywordsArray, keyword]
      setValue('keywords', newKeywords.join(', '))
    }
  }

  const onSubmit = async (data: BlogPostForm) => {
    if (!content.trim()) {
      setError('Please add some content to your post')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('adminToken')
      const postData = {
        ...data,
        slug: generateSlug(data.title),
        content,
        excerpt: generateExcerpt(content),
        readingTime: calculateReadingTime(content),
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        keywords: data.keywords?.split(',').map(keyword => keyword.trim()).filter(Boolean) || []
      }

      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      })

      if (response.ok) {
        const result = await response.json()
        setSuccess('Post created successfully!')
        setTimeout(() => {
          router.push('/admin/dashboard')
        }, 2000)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to create post')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const categories = [
    'Breaking News',
    'Viral Stories', 
    'AI & Tech',
    'Crypto',
    'Real Estate',
    'Investment'
  ]

  return (
    <>
      <SEO
        title="Create New Post - RichMan Admin"
        description="Create a new viral blog post"
        noindex
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Create New Post
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Alerts */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center"
              >
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center"
              >
                <AlertCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                <p className="text-green-600 dark:text-green-400">{success}</p>
              </motion.div>
            )}

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Editor */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Post Title *
                  </label>
                  <input
                    {...register('title')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="🚨 BREAKING: Your Viral Headline Here..."
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Write a compelling description that will make people want to read more..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
                  )}
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content *
                  </label>
                  <RichTextEditor
                    content={content}
                    onChange={setContent}
                    placeholder="Start writing your viral content here..."
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Publish Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Publish Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        {...register('status')}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          {...register('featured')}
                          type="checkbox"
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          Featured
                        </span>
                      </label>
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          {...register('trending')}
                          type="checkbox"
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Trending
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Category & Tags */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Category & Tags</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category *
                      </label>
                      <select
                        {...register('category')}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category.message}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Tags *
                        </label>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={handleGetSuggestedTags}
                            className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                          >
                            <Tag className="w-3 h-3 inline mr-1" />
                            Suggest
                          </button>
                          <button
                            type="button"
                            onClick={handleAutoGenerateTags}
                            disabled={autoGeneratingTags}
                            className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors disabled:opacity-50"
                          >
                            {autoGeneratingTags ? (
                              <RefreshCw className="w-3 h-3 inline mr-1 animate-spin" />
                            ) : (
                              <Wand2 className="w-3 h-3 inline mr-1" />
                            )}
                            Auto-Generate
                          </button>
                        </div>
                      </div>
                      
                      <input
                        {...register('tags')}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="bitcoin, crypto, viral, breaking news (or click Auto-Generate)"
                      />
                      
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        💡 <strong>Pro Tip:</strong> Click "Auto-Generate" for viral, SEO-optimized tags that reach millions!
                      </p>
                      
                      {errors.tags && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tags.message}</p>
                      )}
                      
                      {/* Suggested Tags */}
                      {suggestedTags.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                            Suggested tags for "{watchedValues.category}":
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {suggestedTags.map((tag, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => addSuggestedTag(tag)}
                                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              >
                                + {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Featured Image</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Upload Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      {uploadingImage && (
                        <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">Uploading...</p>
                      )}
                    </div>

                    {watchedValues.featuredImage && (
                      <div className="relative">
                        <Image
                          src={watchedValues.featuredImage}
                          alt="Featured"
                          width={400}
                          height={128}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setValue('featuredImage', '')}
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    <div>
                      <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Or Image URL
                      </label>
                      <input
                        {...register('featuredImage')}
                        type="url"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </div>
                </div>

                {/* SEO Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">SEO Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        SEO Title
                      </label>
                      <input
                        {...register('seoTitle')}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="SEO optimized title for search engines"
                      />
                      {errors.seoTitle && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.seoTitle.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        SEO Description
                      </label>
                      <textarea
                        {...register('seoDescription')}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="SEO description for search engines"
                      />
                      {errors.seoDescription && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.seoDescription.message}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Keywords
                        </label>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={handleGetSuggestedKeywords}
                            className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                          >
                            <Hash className="w-3 h-3 inline mr-1" />
                            Suggest
                          </button>
                          <button
                            type="button"
                            onClick={handleAutoGenerateKeywords}
                            disabled={autoGeneratingKeywords}
                            className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors disabled:opacity-50"
                          >
                            {autoGeneratingKeywords ? (
                              <RefreshCw className="w-3 h-3 inline mr-1 animate-spin" />
                            ) : (
                              <Wand2 className="w-3 h-3 inline mr-1" />
                            )}
                            Auto-Generate
                          </button>
                        </div>
                      </div>
                      
                      <input
                        {...register('keywords')}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="bitcoin news, crypto viral, breaking news (or click Auto-Generate)"
                      />
                      
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        🎯 <strong>SEO Pro:</strong> Click "Auto-Generate" for high-ranking keywords that boost search visibility!
                      </p>
                      
                      {/* Suggested Keywords */}
                      {suggestedKeywords.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                            Suggested SEO keywords for "{watchedValues.category}":
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {suggestedKeywords.map((keyword, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => addSuggestedKeyword(keyword)}
                                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              >
                                + {keyword}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating Post...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Create Post
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}
