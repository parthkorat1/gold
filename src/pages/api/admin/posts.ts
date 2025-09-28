import { NextApiRequest, NextApiResponse } from 'next'
import { createBlogPost, getAllBlogPosts } from '@/lib/firebase-storage'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    if (req.method === 'POST') {
      // Create new post
      const postData = {
        ...req.body,
        author: 'RichMan News Team',
        publishedAt: req.body.status === 'published' ? new Date() : null,
        views: 0,
        shares: 0,
        likes: 0
      }

      const postId = await createBlogPost(postData)

      return res.status(201).json({
        message: 'Post created successfully',
        postId
      })
    }

    if (req.method === 'GET') {
      // Get all posts (for admin dashboard)
      const posts = await getAllBlogPosts()

      return res.status(200).json({
        posts: posts.slice(0, 10), // Limit to 10 for dashboard
        total: posts.length
      })
    }

    return res.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('Posts API error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}