import { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts } from '@/lib/blog'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const allPosts = await getAllPosts()
  const posts = allPosts.slice(0, 20) // Latest 20 posts
  const baseUrl = 'https://rechman.vercel.app'

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RichMan News - Breaking Financial News & Viral Money Stories</title>
    <description>Get the latest breaking financial news, viral money stories, and trending investment insights. Join millions reading RichMan for exclusive financial intelligence.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>editor@richman.news (RichMan News Team)</managingEditor>
    <webMaster>webmaster@richman.news (RichMan News Team)</webMaster>
    <generator>Next.js</generator>
    
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>editor@richman.news (${post.author})</author>
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
