import { NextApiRequest, NextApiResponse } from 'next'
import { deleteBlogPost, updateBlogPost, getBlogPostById } from '@/lib/firebase-storage'
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

    const { id } = req.query

    if (req.method === 'GET') {
      // Get single post by ID (Firestore document ID)
      const post = await getBlogPostById(id as string)
      if (!post) {
        return res.status(404).json({ message: 'Post not found' })
      }
      return res.status(200).json(post)
    }

    if (req.method === 'PUT') {
      // Update post
      const updateData = {
        ...req.body,
        updatedAt: new Date()
      }

      if (req.body.status === 'published' && !updateData.publishedAt) {
        updateData.publishedAt = new Date()
      }

      await updateBlogPost(id as string, updateData)

      return res.status(200).json({
        message: 'Post updated successfully'
      })
    }

    if (req.method === 'DELETE') {
      // Delete post
      await deleteBlogPost(id as string)

      return res.status(200).json({
        message: 'Post deleted successfully'
      })
    }

    return res.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('Post API error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
