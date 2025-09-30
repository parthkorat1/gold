export interface SEOProps {
  title: string
  description: string
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    url?: string
    type?: string
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
  }
  twitter?: {
    handle?: string
    site?: string
    cardType?: string
  }
  additionalMetaTags?: Array<{
    name: string
    content: string
  }>
}

export const defaultSEO: SEOProps = {
  title: 'RichMan News - Breaking Financial News & Viral Money Stories',
  description: 'Get the latest breaking financial news, viral money stories, and trending investment insights. Join millions reading RichMan News for exclusive financial intelligence.',
  openGraph: {
    title: 'RichMan News - Breaking Financial News & Viral Money Stories',
    description: 'Get the latest breaking financial news, viral money stories, and trending investment insights. Join millions reading RichMan News for exclusive financial intelligence.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RichMan News - Financial News',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
    handle: '@richmannews',
    site: '@richmannews',
  },
}

export function generateArticleStructuredData(article: {
  title: string
  description: string
  author: string
  publishedTime: string
  modifiedTime?: string
  image?: string
  url: string
  category?: string
  keywords?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RichMan News',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    articleSection: article.category,
    keywords: article.keywords,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    image: article.image || '/og-image.jpg',
    url: article.url,
  }
}

export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RichMan News',
    description: 'Breaking financial news, viral money stories, and trending investment insights',
    url: 'https://rechman.vercel.app',
    publisher: {
      '@type': 'Organization',
      name: 'RichMan News',
      url: 'https://rechman.vercel.app',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
      sameAs: [
        'https://twitter.com/richmannews',
        'https://www.facebook.com/',
        'https://www.linkedin.com/',
      ],
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://rechman.vercel.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  }
}
