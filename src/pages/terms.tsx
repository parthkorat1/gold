import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function TermsOfService() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <SEO
        title="Terms of Service - RichMan News"
        description="Read our terms of service and user agreement for using RichMan News. Understand your rights and responsibilities when using our platform."
        canonical="https://rechman.vercel.app/terms"
        openGraph={{
          title: "Terms of Service - RichMan News",
          description: "Read our terms of service and user agreement for using RichMan News. Understand your rights and responsibilities when using our platform.",
          url: "https://rechman.vercel.app/terms",
        }}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header onSearchClick={() => setIsSearchOpen(true)} />
        
        <main className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
                Terms of Service
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Please read these terms carefully before using our website.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Agreement to Terms
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  By accessing and using RichMan News ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  These Terms of Service ("Terms") govern your use of our website located at <strong>rechman.vercel.app</strong>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Use License
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Permission is granted to temporarily download one copy of the materials on RichMan News for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400">
                  This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  User Conduct
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Transmit any harmful, threatening, abusive, or harassing content</li>
                  <li>Impersonate any person or entity</li>
                  <li>Interfere with or disrupt the Service</li>
                  <li>Attempt to gain unauthorized access to any part of the Service</li>
                  <li>Use automated systems to access the Service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Content and Intellectual Property
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The content on RichMan News, including but not limited to text, graphics, logos, images, and software, is the property of RichMan News and is protected by copyright and other intellectual property laws.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You may not reproduce, distribute, modify, or create derivative works from our content without express written permission.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  User-generated content, such as comments, remains the property of the user but grants us a license to use, display, and distribute such content.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Financial Information Disclaimer
                </h2>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-lg mb-4">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    <strong>Important Notice:</strong> The information provided on RichMan News is for educational and entertainment purposes only. It is not intended as financial advice, investment recommendations, or professional guidance.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                    <li>We are not licensed financial advisors</li>
                    <li>All investment decisions are your responsibility</li>
                    <li>Past performance does not guarantee future results</li>
                    <li>Investments carry risk of loss</li>
                    <li>Always consult with qualified professionals</li>
                  </ul>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  By using our Service, you acknowledge and agree that you will not hold RichMan News liable for any financial losses or damages resulting from your use of the information provided.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Privacy Policy
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Service Availability
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We strive to provide continuous service availability, but we do not guarantee that the Service will be available at all times. The Service may be temporarily unavailable due to:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li>Scheduled maintenance</li>
                  <li>Technical difficulties</li>
                  <li>Force majeure events</li>
                  <li>Third-party service disruptions</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400">
                  We are not liable for any damages resulting from Service unavailability.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Limitation of Liability
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  In no event shall RichMan News, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Our total liability to you for any claim arising out of or relating to these Terms or the Service shall not exceed the amount you paid us, if any, for the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Indemnification
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  You agree to defend, indemnify, and hold harmless RichMan News and its affiliates from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including attorney's fees) resulting from your use of the Service or violation of these Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Termination
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Upon termination, your right to use the Service will cease immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Changes to Terms
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Governing Law
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  These Terms shall be interpreted and governed by the laws of the jurisdiction in which RichMan News operates, without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Email:</strong> legal@rechman.vercel.app
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
                  Severability
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                </p>
              </section>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}
