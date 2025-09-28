import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function CookiePolicy() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <SEO
        title="Cookie Policy - RichMan News"
        description="Learn about how RichMan News uses cookies and similar technologies to enhance your browsing experience and provide personalized content."
        canonical="https://rechman.vercel.app/cookies"
        openGraph={{
          title: "Cookie Policy - RichMan News",
          description: "Learn about how RichMan News uses cookies and similar technologies to enhance your browsing experience and provide personalized content.",
          url: "https://rechman.vercel.app/cookies",
        }}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header onSearchClick={() => setIsSearchOpen(true)} />
        
        <main className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
                Cookie Policy
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Understanding how we use cookies to improve your experience.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  What Are Cookies?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  RichMan News uses cookies and similar technologies to enhance your browsing experience, analyze website traffic, and provide personalized content.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Types of Cookies We Use
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                      Essential Cookies
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and remembering your preferences.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Session management</li>
                      <li>Security features</li>
                      <li>Load balancing</li>
                      <li>User interface preferences</li>
                    </ul>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-3">
                      <strong>Duration:</strong> Session or up to 1 year
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                      Analytics Cookies
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Google Analytics</li>
                      <li>Page views and user behavior</li>
                      <li>Traffic sources</li>
                      <li>Performance metrics</li>
                    </ul>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-3">
                      <strong>Duration:</strong> Up to 2 years
                    </p>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 p-6 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                      Marketing Cookies
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      These cookies are used to deliver advertisements that are relevant to you and your interests. They may also be used to limit the number of times you see an advertisement.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Social media advertising</li>
                      <li>Retargeting campaigns</li>
                      <li>Ad performance tracking</li>
                      <li>Audience insights</li>
                    </ul>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-3">
                      <strong>Duration:</strong> Up to 1 year
                    </p>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-6 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                      Functional Cookies
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Language preferences</li>
                      <li>Dark/light mode settings</li>
                      <li>Newsletter subscription status</li>
                      <li>User interface customizations</li>
                    </ul>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-3">
                      <strong>Duration:</strong> Up to 1 year
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Third-Party Cookies
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We may also use third-party cookies from trusted partners:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li><strong>Google Analytics:</strong> Website traffic analysis and user behavior insights</li>
                  <li><strong>Social Media Platforms:</strong> For sharing content and social login features</li>
                  <li><strong>Advertising Networks:</strong> To deliver relevant advertisements</li>
                  <li><strong>Content Delivery Networks:</strong> To improve website performance</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400">
                  These third-party services have their own cookie policies, which we encourage you to review.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Managing Your Cookie Preferences
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You have several options for managing cookies:
                </p>
                
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Browser Settings
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Most web browsers allow you to control cookies through their settings. You can:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li>Block all cookies</li>
                  <li>Allow only first-party cookies</li>
                  <li>Delete existing cookies</li>
                  <li>Set up notifications for new cookies</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Opt-Out Links
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                    <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Google Analytics Opt-out</a></li>
                    <li><a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Facebook Ad Preferences</a></li>
                    <li><a href="https://www.linkedin.com/psettings/guest-controls" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">LinkedIn Ad Settings</a></li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Impact of Disabling Cookies
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  If you choose to disable cookies, some features of our website may not function properly:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li>Personalized content and recommendations</li>
                  <li>Remembered preferences and settings</li>
                  <li>Social media sharing features</li>
                  <li>Newsletter subscription management</li>
                  <li>Performance optimization</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400">
                  Essential cookies are required for basic website functionality and cannot be disabled.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Updates to This Policy
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Contact Us
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Email:</strong> privacy@rechman.vercel.app
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Website:</strong> rechman.vercel.app
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Response Time:</strong> We aim to respond within 48 hours
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Cookie Consent
                </h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    By continuing to use our website, you consent to our use of cookies as described in this policy. You can withdraw your consent at any time by adjusting your browser settings or contacting us.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    For more information about cookies and how to manage them, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">All About Cookies</a>.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}
