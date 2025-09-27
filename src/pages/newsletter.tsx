import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, Users, TrendingUp, BookOpen } from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubscribed(true)
    setIsLoading(false)
    setEmail('')
  }

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Weekly analysis of gold market trends and price movements'
    },
    {
      icon: BookOpen,
      title: 'Expert Articles',
      description: 'Exclusive content from leading precious metals analysts'
    },
    {
      icon: Users,
      title: 'Community Access',
      description: 'Join discussions with fellow investors and experts'
    }
  ]

  if (isSubscribed) {
    return (
      <>
        <SEO
          title="Newsletter Subscription - Gold Insights Blog"
          description="Thank you for subscribing to our newsletter. Stay updated with the latest gold market insights and expert analysis."
          canonical="https://goldinsights.blog/newsletter"
        />
        
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Header />
          
          <main className="section-padding">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                
                <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Welcome to Our Community!
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                  Thank you for subscribing to our newsletter. You'll receive our first update within 24 hours.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    What to expect:
                  </h3>
                  <ul className="space-y-2 text-left">
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                      Weekly market analysis and insights
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                      Exclusive articles from expert contributors
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                      Investment strategies and tips
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                      Early access to new content
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link href="/" className="btn-primary">
                    Explore Articles
                  </Link>
                  <Link href="/blog" className="btn-secondary">
                    Read Latest Posts
                  </Link>
                </div>
              </motion.div>
            </div>
          </main>
          
          <Footer />
        </div>
      </>
    )
  }

  return (
    <>
      <SEO
        title="Newsletter Subscription - Gold Insights Blog"
        description="Subscribe to our newsletter for weekly gold market insights, expert analysis, and exclusive content from leading precious metals analysts."
        canonical="https://goldinsights.blog/newsletter"
        openGraph={{
          title: "Newsletter Subscription - Gold Insights Blog",
          description: "Subscribe to our newsletter for weekly gold market insights, expert analysis, and exclusive content from leading precious metals analysts.",
          url: "https://goldinsights.blog/newsletter",
        }}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="section-padding bg-gradient-to-br from-gold-50 to-white dark:from-gold-900 dark:to-gray-900">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="w-20 h-20 bg-gold-100 dark:bg-gold-900 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Mail className="w-10 h-10 text-gold-600 dark:text-gold-400" />
                </div>
                
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Stay Ahead of the Market
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                  Get weekly insights, market analysis, and exclusive content delivered to your inbox. 
                  Join thousands of investors who trust our expert analysis.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold-600 dark:text-gold-400 mb-2">10K+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Subscribers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold-600 dark:text-gold-400 mb-2">95%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold-600 dark:text-gold-400 mb-2">Weekly</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Updates</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="section-padding">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
                  What You'll Get
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Our newsletter delivers valuable insights directly to your inbox
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-gold-100 dark:bg-gold-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-gold-600 dark:text-gold-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="section-padding gradient-bg">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto text-center"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Join Our Community
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Get started with our free weekly newsletter
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 max-w-md input"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Subscribing...' : 'Subscribe Now'}
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>

                {/* Testimonials */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                      "The insights in this newsletter have helped me make better investment decisions. 
                      Highly recommended for anyone interested in precious metals."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">Sarah Johnson</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Investor</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                      "Excellent analysis and timely updates. The market predictions have been spot-on. 
                      This newsletter is a must-read for gold investors."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">Michael Chen</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Portfolio Manager</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
