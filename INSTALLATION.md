# Gold Insights Blog - Installation Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## What's Included

✅ **Complete Next.js Blog Website**
- Modern, SEO-optimized design
- Mobile-first responsive layout
- Dark mode toggle
- Newsletter subscription
- Search functionality
- Category and tag system

✅ **Sample Content**
- 5 SEO-optimized blog posts about gold market insights
- Featured articles and trending posts
- Professional content structure

✅ **SEO Features**
- Meta tags, OpenGraph, Twitter Cards
- Structured data (JSON-LD)
- Auto-generated sitemap and RSS feed
- Core Web Vitals optimization

## File Structure

```
gold-blog/
├── content/posts/          # Blog posts (MDX format)
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   ├── lib/               # Utility functions
│   ├── pages/             # Next.js pages
│   ├── styles/            # Global styles
│   └── types/             # TypeScript types
├── package.json           # Dependencies
├── next.config.js         # Next.js config
├── tailwind.config.js     # Tailwind CSS config
└── tsconfig.json          # TypeScript config
```

## Adding New Blog Posts

1. Create a new `.mdx` file in `content/posts/`
2. Add frontmatter with required fields:
   ```yaml
   ---
   title: "Your Post Title"
   description: "Post description for SEO"
   author: "Author Name"
   publishedAt: "2024-01-15T10:00:00Z"
   category: "Finance"
   tags: ["gold", "investment", "analysis"]
   featuredImage: "https://example.com/image.jpg"
   featured: true
   trending: false
   ---
   ```
3. Write your content in Markdown format
4. The post will automatically appear on the website

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  gold: {
    50: '#fffbeb',
    // ... customize colors
  }
}
```

### SEO Settings
Update `src/lib/seo.ts` for default SEO configuration.

### Content
- Add new posts to `content/posts/`
- Update categories in `src/lib/blog.ts`
- Modify homepage content in `src/pages/index.tsx`

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- AWS Amplify
- Digital Ocean App Platform

## Troubleshooting

### Common Issues

**Module not found errors:**
```bash
npm install
```

**Build errors:**
```bash
npm run build
```

**TypeScript errors:**
```bash
npm run lint
```

## Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify file paths and imports
4. Check the README.md for detailed documentation

## Next Steps

1. **Customize the design** to match your brand
2. **Add your content** by creating new blog posts
3. **Configure SEO** settings for your domain
4. **Set up analytics** (Google Analytics, etc.)
5. **Deploy to production** when ready

---

**Your Gold Insights Blog is ready to go! 🚀**
