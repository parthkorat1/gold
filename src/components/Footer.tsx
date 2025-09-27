import Link from 'next/link'
import { Mail, Twitter, Linkedin, Github, ExternalLink } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Blog': [
      { name: 'Latest Posts', href: '/blog' },
      { name: 'Categories', href: '/categories' },
      { name: 'Trending', href: '/trending' },
      { name: 'Featured', href: '/featured' },
    ],
    'Categories': [
      { name: 'Finance', href: '/category/finance' },
      { name: 'Technology', href: '/category/technology' },
      { name: 'Future Trends', href: '/category/future-trends' },
      { name: 'Investment', href: '/category/investment' },
    ],
    'Resources': [
      { name: 'About Us', href: '/about' },
      { name: 'Newsletter', href: '/newsletter' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
    'Legal': [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Disclaimer', href: '/disclaimer' },
      { name: 'Sitemap', href: '/sitemap.xml' },
    ],
  }

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/goldinsights', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/goldinsights', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com/goldinsights', icon: Github },
    { name: 'Email', href: 'mailto:hello@goldinsights.blog', icon: Mail },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-display font-bold gradient-text">
                RichMan
              </span>
            </Link>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              The viral financial news platform that reaches millions. Breaking news, trending stories, 
              and viral money insights that dominate social media and search engines.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Stay Updated
              </h3>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 input text-sm"
                />
                <button className="btn-primary text-sm whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Weekly insights delivered to your inbox
              </p>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors flex items-center group"
                    >
                      {link.name}
                      {link.href.startsWith('http') && (
                        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Gold Insights Blog. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
            <p>
              This website provides financial information for educational purposes only. 
              Always consult with a qualified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
