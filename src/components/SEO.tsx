import Head from 'next/head'
import { SEOProps, generateArticleStructuredData, generateWebsiteStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo'
import { BlogPost } from '@/types/blog'

interface SEOComponentProps extends SEOProps {
  article?: BlogPost
  breadcrumbs?: Array<{ name: string; url: string }>
  noindex?: boolean
}

export default function SEO({ 
  title, 
  description, 
  canonical, 
  openGraph, 
  twitter, 
  additionalMetaTags,
  article,
  breadcrumbs,
  noindex = false
}: SEOComponentProps) {
  const fullTitle = title.includes('Gold Insights') ? title : `${title} | Gold Insights Blog`
  const fullDescription = description || 'Discover the latest gold market insights, price predictions, and investment strategies.'
  
  const structuredData = [
    generateWebsiteStructuredData(),
    ...(article ? [generateArticleStructuredData({
      title: article.title,
      description: article.description,
      author: article.author,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      image: article.featuredImage,
      url: `https://goldinsights.blog/blog/${article.slug}`,
    })] : []),
    ...(breadcrumbs ? [generateBreadcrumbStructuredData(breadcrumbs)] : []),
  ]

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={article?.keywords?.join(', ') || 'breaking news, financial news, viral stories, investment, crypto, bitcoin, gold, market analysis, finance, money'} />
      <meta name="author" content={article?.author || 'RichMan News Team'} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#f59e0b" />
{/*       
      Search Engine Verification
      <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
      <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" />
      
      {/* Additional SEO Meta Tags */}
      {/* <meta name="language" content="English" />
      <meta name="revisit-after" content="1 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      <meta name="geo.position" content="39.78373;-100.445882" />
      <meta name="ICBM" content="39.78373, -100.445882" />
       */} 
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={openGraph?.title || fullTitle} />
      <meta property="og:description" content={openGraph?.description || fullDescription} />
      <meta property="og:url" content={openGraph?.url || canonical || 'https://goldinsights.blog'} />
      <meta property="og:site_name" content="Financial Insights" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      
      {openGraph?.images?.map((image, index) => (
        <meta key={index} property="og:image" content={image.url} />
      ))}
      {openGraph?.images?.[0] && (
        <>
          <meta property="og:image:width" content={openGraph.images[0].width?.toString() || '1200'} />
          <meta property="og:image:height" content={openGraph.images[0].height?.toString() || '630'} />
          <meta property="og:image:alt" content={openGraph.images[0].alt || fullTitle} />
        </>
      )}
      
      {/* Article specific */}
      {article && (
        <>
          <meta property="article:author" content={article.author} />
          <meta property="article:published_time" content={article.publishedAt} />
          {article.updatedAt && (
            <meta property="article:modified_time" content={article.updatedAt} />
          )}
          <meta property="article:section" content={article.category} />
          {article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitter?.cardType || 'summary_large_image'} />
      <meta name="twitter:site" content={twitter?.site || '@richmannews'} />
      <meta name="twitter:creator" content={twitter?.handle || '@richmannews'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image:alt" content="RichMan News - Breaking Financial Stories" />
      {openGraph?.images?.[0] && (
        <meta name="twitter:image" content={openGraph.images[0].url} />
      )}
      
      {/* Additional Meta Tags */}
      {additionalMetaTags?.map((tag, index) => (
        <meta key={index} name={tag.name} content={tag.content} />
      ))}
      
      {/* Structured Data */}
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      
      {/* Favicon and Icons */}
      <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🥇</text></svg>" />
      <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🥇</text></svg>" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
    </Head>
  )
}
