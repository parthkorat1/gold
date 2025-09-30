import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true'
    if (darkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Web Vitals tracking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log)
        getFID(console.log)
        getFCP(console.log)
        getLCP(console.log)
        getTTFB(console.log)
      }).catch(() => {
        // web-vitals not available, skip tracking
      })
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f59e0b" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" type="application/rss+xml" title="RichMan News RSS" href="/rss.xml" />
        <meta name="apple-itunes-app" content="app-id=, app-argument=https://rechman.vercel.app" />
        <meta name="application-name" content="RichMan News" />
        <meta name="apple-mobile-web-app-title" content="RichMan News" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
      </Head>
      
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
      
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
