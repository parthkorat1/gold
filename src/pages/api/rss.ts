import { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPosts().slice(0, 20) // Latest 20 posts
  const baseUrl = 'https://goldinsights.blog'

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Gold Insights Blog</title>
    <description>Latest gold market insights, price predictions, and investment strategies</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>editor@goldinsights.blog (Gold Insights Team)</managingEditor>
    <webMaster>webmaster@goldinsights.blog (Gold Insights Team)</webMaster>
    <generator>Next.js</generator>
    
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>editor@goldinsights.blog (${post.author})</author>
      <category><![CDATA[${post.category}]]></category>
      ${post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('')}
      ${post.featuredImage ? `<enclosure url="${post.featuredImage}" type="image/jpeg"/>` : ''}
    </item>`).join('')}
  </channel>
</rss>`

  res.setHeader('Content-Type', 'application/rss+xml')
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
  res.status(200).send(rss)
}
