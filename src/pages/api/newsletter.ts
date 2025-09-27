import { NextApiRequest, NextApiResponse } from 'next'

interface NewsletterRequest {
  email: string
  name?: string
  source?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email, name, source = 'website' }: NewsletterRequest = req.body

    // Validate email
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: 'Valid email is required' })
    }

    // Here you would integrate with your email service provider
    // Examples: Mailchimp, ConvertKit, SendGrid, etc.
    
    // For now, we'll simulate a successful subscription
    console.log('Newsletter subscription:', { email, name, source })
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In a real implementation, you would:
    // 1. Add the email to your email service provider
    // 2. Send a welcome email
    // 3. Track the subscription in your database
    // 4. Set up email sequences

    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data: {
        email,
        subscribedAt: new Date().toISOString(),
        source
      }
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    res.status(500).json({ 
      success: false,
      message: 'Failed to subscribe to newsletter. Please try again.' 
    })
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
