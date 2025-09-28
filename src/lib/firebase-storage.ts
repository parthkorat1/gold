import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  orderBy, 
  where,
  serverTimestamp 
} from 'firebase/firestore'
import { db } from './firebase'

// Check if Firebase is properly initialized
if (!db) {
  console.warn('Firebase is not initialized. Firestore operations will fail.')
}

// Blog Posts Collection
const BLOG_POSTS_COLLECTION = 'blogPosts'

export interface FirestoreBlogPost {
  slug: string
  title: string
  description: string
  content: string
  excerpt: string
  author: string
  publishedAt: any
  updatedAt: any
  category: string
  tags: string[]
  featuredImage?: string
  featured: boolean
  trending: boolean
  readingTime: string
  seoTitle?: string
  seoDescription?: string
  keywords?: string[]
  status: 'draft' | 'published' | 'archived'
  views: number
  shares: number
  likes: number
  createdAt: any
}

// Create a new blog post
export const createBlogPost = async (postData: Omit<FirestoreBlogPost, 'createdAt' | 'updatedAt'>) => {
  if (!db) {
    throw new Error('Firebase is not initialized. Please check your environment variables.')
  }
  
  try {
    const docRef = await addDoc(collection(db, BLOG_POSTS_COLLECTION), {
      ...postData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating blog post:', error)
    throw new Error('Failed to create blog post')
  }
}

// Get all published blog posts (simplified query to avoid index requirement)
export const getAllBlogPosts = async () => {
  if (!db) {
    throw new Error('Firebase is not initialized. Please check your environment variables.')
  }
  
  try {
    // First get all posts, then filter client-side to avoid index requirement
    const q = query(
      collection(db, BLOG_POSTS_COLLECTION),
      orderBy('publishedAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    // Filter published posts client-side
    const publishedPosts = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter((post: any) => post.status === 'published')
    
    return publishedPosts
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw new Error('Failed to fetch blog posts')
  }
}

// Get blog post by slug
export const getBlogPostBySlug = async (slug: string) => {
  if (!db) {
    throw new Error('Firebase is not initialized. Please check your environment variables.')
  }
  
  try {
    // Get all posts and filter client-side to avoid index requirement
    const q = query(
      collection(db, BLOG_POSTS_COLLECTION),
      orderBy('publishedAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    const post = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .find((post: any) => post.slug === slug && post.status === 'published')
    
    return post || null
  } catch (error) {
    console.error('Error fetching blog post:', error)
    throw new Error('Failed to fetch blog post')
  }
}

// Get featured posts
export const getFeaturedPosts = async () => {
  if (!db) {
    throw new Error('Firebase is not initialized. Please check your environment variables.')
  }
  
  try {
    // Get all posts and filter client-side
    const q = query(
      collection(db, BLOG_POSTS_COLLECTION),
      orderBy('publishedAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    const featuredPosts = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter((post: any) => post.status === 'published' && post.featured === true)
    
    return featuredPosts
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    throw new Error('Failed to fetch featured posts')
  }
}

// Get trending posts
export const getTrendingPosts = async () => {
  if (!db) {
    throw new Error('Firebase is not initialized. Please check your environment variables.')
  }
  
  try {
    // Get all posts and filter client-side
    const q = query(
      collection(db, BLOG_POSTS_COLLECTION),
      orderBy('publishedAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    const trendingPosts = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter((post: any) => post.status === 'published' && post.trending === true)
    
    return trendingPosts
  } catch (error) {
    console.error('Error fetching trending posts:', error)
    throw new Error('Failed to fetch trending posts')
  }
}

// Get posts by category
export const getPostsByCategory = async (category: string) => {
  if (!db) {
    throw new Error('Firebase is not initialized. Please check your environment variables.')
  }
  
  try {
    // Get all posts and filter client-side
    const q = query(
      collection(db, BLOG_POSTS_COLLECTION),
      orderBy('publishedAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    const categoryPosts = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter((post: any) => post.status === 'published' && post.category === category)
    
    return categoryPosts
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    throw new Error('Failed to fetch posts by category')
  }
}

// Update blog post
export const updateBlogPost = async (postId: string, updateData: Partial<FirestoreBlogPost>) => {
  if (!db) {
    throw new Error('Firebase is not initialized. Please check your environment variables.')
  }
  
  try {
    const postRef = doc(db, BLOG_POSTS_COLLECTION, postId)
    await updateDoc(postRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    })
  } catch (error) {
    console.error('Error updating blog post:', error)
    throw new Error('Failed to update blog post')
  }
}

// Delete blog post
export const deleteBlogPost = async (postId: string) => {
  if (!db) {
    throw new Error('Firebase is not initialized. Please check your environment variables.')
  }
  
  try {
    const postRef = doc(db, BLOG_POSTS_COLLECTION, postId)
    await deleteDoc(postRef)
  } catch (error) {
    console.error('Error deleting blog post:', error)
    throw new Error('Failed to delete blog post')
  }
}

// Get blog post by document ID
export const getBlogPostById = async (postId: string) => {
  if (!db) {
    throw new Error('Firebase is not initialized. Please check your environment variables.')
  }
  
  try {
    const postRef = doc(db, BLOG_POSTS_COLLECTION, postId)
    const postSnap = await getDoc(postRef)
    
    if (postSnap.exists()) {
      return {
        id: postSnap.id,
        ...postSnap.data()
      }
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching blog post by ID:', error)
    throw new Error('Failed to fetch blog post')
  }
}

// Search posts
export const searchBlogPosts = async (searchTerm: string) => {
  if (!db) {
    throw new Error('Firebase is not initialized. Please check your environment variables.')
  }
  
  try {
    // Get all published posts first
    const q = query(
      collection(db, BLOG_POSTS_COLLECTION),
      orderBy('publishedAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    const posts = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter((post: any) => post.status === 'published')
    
    // Filter posts by search term (client-side filtering)
    const lowercaseSearchTerm = searchTerm.toLowerCase()
    return posts.filter((post: any) =>
      post.title.toLowerCase().includes(lowercaseSearchTerm) ||
      post.description.toLowerCase().includes(lowercaseSearchTerm) ||
      post.content.toLowerCase().includes(lowercaseSearchTerm) ||
      post.tags.some((tag: string) => tag.toLowerCase().includes(lowercaseSearchTerm)) ||
      post.category.toLowerCase().includes(lowercaseSearchTerm)
    )
  } catch (error) {
    console.error('Error searching blog posts:', error)
    throw new Error('Failed to search blog posts')
  }
}