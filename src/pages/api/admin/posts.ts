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

      // Trigger revalidation for key pages
      try {
        await res.revalidate('/')
        await res.revalidate('/blog')
        if (postData.category) {
          await res.revalidate(`/category/${postData.category.toLowerCase().replace(/\s+/g, '-')}`)
        }
        // Also revalidate dynamic blog page if slug provided
        if (postData.slug) {
          await res.revalidate(`/blog/${postData.slug}`)
        }
      } catch (revalidateError) {
        console.error('Revalidation error:', revalidateError)
        // Don't fail the request if revalidation fails
      }

      // Fire indexing pings (best-effort, non-blocking)
      try {
        const baseUrl = 'https://rechman.vercel.app'
        const slug = postData.slug
        if (slug) {
          const url = `${baseUrl}/blog/${slug}`
          // IndexNow (Bing, Yandex, Seznam)
          fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              host: 'rechman.vercel.app',
              key: process.env.INDEXNOW_KEY || 'demo',
              keyLocation: `${baseUrl}/indexnow.txt`,
              urlList: [url],
            }),
          }).catch(() => {})

          // WebSub ping for feed
          fetch('https://pubsubhubbub.appspot.com/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `hub.mode=publish&hub.url=${encodeURIComponent(`${baseUrl}/rss.xml`)}`,
          }).catch(() => {})
        }
      } catch (e) {
        // Swallow ping errors
      }

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