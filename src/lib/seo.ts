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
  title: 'Gold Insights Blog - Latest Market Trends & Predictions',
  description: 'Discover the latest gold market insights, price predictions, and investment strategies. Expert analysis on gold trends for 2026 and beyond.',
  openGraph: {
    title: 'Gold Insights Blog - Latest Market Trends & Predictions',
    description: 'Discover the latest gold market insights, price predictions, and investment strategies. Expert analysis on gold trends for 2026 and beyond.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gold Insights Blog',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
    handle: '@goldinsights',
    site: '@goldinsights',
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
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gold Insights Blog',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
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
    name: 'Gold Insights Blog',
    description: 'Latest gold market insights, price predictions, and investment strategies',
    url: 'https://goldinsights.blog',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://goldinsights.blog/search?q={search_term_string}',
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
