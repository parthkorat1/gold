import { NextApiRequest, NextApiResponse } from 'next'
import { getAllBlogPosts } from '@/lib/firebase-storage'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Verify JWT token
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any
    if (!decoded || decoded.role !== 'admin') {
      return res.status(401).json({ message: 'Invalid token' })
    }

    // Get all posts from Firestore
    const allPosts = await getAllBlogPosts()
    
    // Get recent posts (limit to 10 for dashboard)
    const posts = allPosts.slice(0, 10).map(post => ({
      _id: post.id,
      title: post.title,
      status: post.status,
      views: post.views || 0,
      shares: post.shares || 0,
      likes: post.likes || 0,
      publishedAt: post.publishedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      category: post.category,
      featured: post.featured,
      trending: post.trending
    }))

    // Calculate stats
    const totalPosts = allPosts.length
    const publishedPosts = allPosts.filter(post => post.status === 'published').length
    const draftPosts = allPosts.filter(post => post.status === 'draft').length
    
    const totalViews = allPosts.reduce((sum, post) => sum + (post.views || 0), 0)
    const totalShares = allPosts.reduce((sum, post) => sum + (post.shares || 0), 0)
    const totalLikes = allPosts.reduce((sum, post) => sum + (post.likes || 0), 0)

    const stats = {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalViews,
      totalShares,
      totalLikes
    }

    return res.status(200).json({
      posts,
      stats
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}