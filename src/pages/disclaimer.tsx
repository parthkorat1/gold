import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function Disclaimer() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <SEO
        title="Disclaimer - RichMan News"
        description="Important disclaimer and legal notice for RichMan News. Understand the limitations and risks associated with financial information and investment decisions."
        canonical="https://rechman.vercel.app/disclaimer"
        openGraph={{
          title: "Disclaimer - RichMan News",
          description: "Important disclaimer and legal notice for RichMan News. Understand the limitations and risks associated with financial information and investment decisions.",
          url: "https://rechman.vercel.app/disclaimer",
        }}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header onSearchClick={() => setIsSearchOpen(true)} />
        
        <main className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
                Disclaimer
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Important legal notice and risk disclosure.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-8 rounded-lg mb-8">
                  <h2 className="text-2xl font-semibold text-red-800 dark:text-red-200 mb-4">
                    ⚠️ IMPORTANT FINANCIAL DISCLAIMER
                  </h2>
                  <p className="text-red-700 dark:text-red-300 mb-4 text-lg">
                    <strong>The information provided on RichMan News is for educational and entertainment purposes only. It is NOT financial advice, investment recommendations, or professional guidance.</strong>
                  </p>
                  <p className="text-red-700 dark:text-red-300">
                    Always consult with qualified financial advisors before making any investment decisions.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  General Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  RichMan News is a financial news and information platform that provides content for educational and entertainment purposes. We are not licensed financial advisors, investment advisors, or financial planners.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  The content on this website is not intended to be a substitute for professional financial advice, diagnosis, or treatment.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Investment Risks
                </h2>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-6 rounded-lg mb-4">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                    High-Risk Investments
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    All investments carry risk of loss. You may lose some or all of your invested capital. Past performance does not guarantee future results.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                    <li>Cryptocurrency investments are highly volatile</li>
                    <li>Stock market investments can result in losses</li>
                    <li>Real estate investments carry market risks</li>
                    <li>Forex trading involves significant risk</li>
                    <li>Commodity trading can result in substantial losses</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Content Accuracy
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information on this website.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The information may contain errors, inaccuracies, or outdated data. We reserve the right to correct any errors or omissions at any time without notice.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Any reliance you place on such information is strictly at your own risk.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  No Professional Advice
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The content on RichMan News does not constitute:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li>Financial advice or recommendations</li>
                  <li>Investment advice or guidance</li>
                  <li>Tax advice or planning</li>
                  <li>Legal advice or counsel</li>
                  <li>Professional consultation of any kind</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400">
                  Always seek the advice of qualified professionals before making any financial, investment, or legal decisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Market Volatility
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Financial markets are inherently volatile and unpredictable. Market conditions can change rapidly, and past performance is not indicative of future results.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Factors that can affect market performance include:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li>Economic conditions and policies</li>
                  <li>Geopolitical events</li>
                  <li>Regulatory changes</li>
                  <li>Technological disruptions</li>
                  <li>Natural disasters</li>
                  <li>Market sentiment and psychology</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Limitation of Liability
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  In no event shall RichMan News, its owners, employees, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li>Financial losses from investments</li>
                  <li>Loss of profits or revenue</li>
                  <li>Business interruption</li>
                  <li>Data loss or corruption</li>
                  <li>Emotional distress</li>
                  <li>Any other damages arising from the use of this website</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400">
                  This limitation applies regardless of the legal theory and even if we have been advised of the possibility of such damages.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Third-Party Content
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Our website may contain links to third-party websites, services, or content. We are not responsible for the accuracy, completeness, or reliability of any third-party content.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  The inclusion of any third-party content does not imply endorsement or recommendation by RichMan News.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  User Responsibility
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  As a user of RichMan News, you acknowledge and agree that:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                  <li>You are solely responsible for your investment decisions</li>
                  <li>You understand the risks associated with investing</li>
                  <li>You will conduct your own research and due diligence</li>
                  <li>You will consult with qualified professionals when needed</li>
                  <li>You will not hold RichMan News liable for any losses</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Regulatory Compliance
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  RichMan News is not registered with any financial regulatory authority. We do not provide regulated financial services or advice.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Users are responsible for ensuring compliance with applicable laws and regulations in their jurisdiction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Updates to Disclaimer
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We reserve the right to update this disclaimer at any time without notice. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of any changes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  If you have any questions about this disclaimer, please contact us:
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
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-8 rounded-lg">
                  <h2 className="text-2xl font-semibold text-red-800 dark:text-red-200 mb-4">
                    Final Warning
                  </h2>
                  <p className="text-red-700 dark:text-red-300 mb-4 text-lg">
                    <strong>Investing involves risk of loss. Never invest more than you can afford to lose. Always do your own research and consult with qualified professionals.</strong>
                  </p>
                  <p className="text-red-700 dark:text-red-300">
                    RichMan News is not responsible for any financial losses or damages resulting from your use of the information provided on this website.
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
