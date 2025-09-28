import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function PrivacyPolicy() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <SEO
        title="Privacy Policy - RichMan News"
        description="Learn how RichMan News collects, uses, and protects your personal information. Our commitment to your privacy and data security."
        canonical="https://rechman.vercel.app/privacy"
        openGraph={{
          title: "Privacy Policy - RichMan News",
          description: "Learn how RichMan News collects, uses, and protects your personal information. Our commitment to your privacy and data security.",
          url: "https://rechman.vercel.app/privacy",
        }}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header onSearchClick={() => setIsSearchOpen(true)} />
        
        <main className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Your privacy matters to us. Here's how we protect your information.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Introduction
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Welcome to RichMan News ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at <strong>rechman.vercel.app</strong>.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  By using our website, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Information We Collect
                </h2>
                
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Personal Information
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We may collect personal information that you voluntarily provide to us, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li>Email address (when subscribing to our newsletter)</li>
                  <li>Name (when contacting us)</li>
                  <li>Comments and feedback</li>
                  <li>Social media interactions</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Automatically Collected Information
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We automatically collect certain information when you visit our website:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referring website</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We use the collected information for various purposes:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li>To provide and maintain our website</li>
                  <li>To send you newsletters and updates (with your consent)</li>
                  <li>To respond to your comments and inquiries</li>
                  <li>To analyze website usage and improve user experience</li>
                  <li>To detect and prevent fraud and abuse</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Cookies and Tracking Technologies
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We use cookies and similar tracking technologies to enhance your browsing experience:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400">
                  You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Third-Party Services
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We may use third-party services that collect information:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li><strong>Google Analytics:</strong> Website traffic analysis</li>
                  <li><strong>Vercel:</strong> Website hosting and performance</li>
                  <li><strong>Social Media Platforms:</strong> For sharing and engagement</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400">
                  These services have their own privacy policies, which we encourage you to review.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Data Security
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure hosting infrastructure</li>
                  <li>Regular security updates and monitoring</li>
                  <li>Limited access to personal information</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400">
                  However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Your Rights
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400">
                  To exercise these rights, please contact us at the information provided below.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Children's Privacy
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Our website is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Contact Us
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
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
                  Financial Disclaimer
                </h2>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-6 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    <strong>Important:</strong> The information provided on RichMan News is for educational and entertainment purposes only. It is not intended as financial advice, investment recommendations, or professional guidance.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                    <li>Always consult with qualified financial advisors before making investment decisions</li>
                    <li>Past performance does not guarantee future results</li>
                    <li>Investments carry risk of loss</li>
                    <li>We are not responsible for any financial losses</li>
                  </ul>
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
