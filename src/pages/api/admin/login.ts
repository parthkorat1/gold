import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    await connectDB()

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // For demo purposes, we'll use a simple admin account
    // In production, you should hash passwords and use proper authentication
    if (email === 'admin123' && password === '123') {
      // Create or update admin user
      let user = await User.findOne({ email })
      
      if (!user) {
        user = new User({
          email,
          name: 'Admin User',
          role: 'admin',
          isActive: true
        })
        await user.save()
      } else {
        user.lastLogin = new Date()
        await user.save()
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user._id, 
          email: user.email, 
          role: user.role 
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      )

      return res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      })
    }

    return res.status(401).json({ message: 'Invalid credentials' })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
