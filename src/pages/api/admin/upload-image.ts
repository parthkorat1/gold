import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
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

    const { imageUrl } = req.body

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' })
    }

    // Accept common image formats (png, jpg, jpeg, webp, gif, svg, avif) and data URLs
    const allowedMimeRegex = /^(data:image\/(png|jpeg|jpg|webp|gif|svg\+xml|avif);base64,)|(^https?:\/\/)/i
    if (!allowedMimeRegex.test(imageUrl)) {
      return res.status(400).json({ message: 'Unsupported image format or URL' })
    }

    return res.status(200).json({
      message: 'Image URL processed successfully',
      url: imageUrl
    })
  } catch (error) {
    console.error('Image upload error:', error)
    return res.status(500).json({ message: 'Failed to process image URL' })
  }
}