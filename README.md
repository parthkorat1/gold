# Gold Insights Blog

A modern, SEO-optimized blog website built with Next.js that focuses on gold market insights, price predictions, and investment strategies. This website is designed to rank high on Google and reach a large global audience.

## 🌟 Features

### SEO & Performance
- **Fully SEO-optimized** with meta tags, OpenGraph, Twitter Cards, and schema markup
- **Structured data (JSON-LD)** for articles, breadcrumbs, and website
- **Auto-generated sitemap** and RSS feed
- **Core Web Vitals optimization** for fast loading
- **Mobile-first responsive design**
- **AMP-like performance** with optimized images and lazy loading

### Content Management
- **Markdown/MDX support** for blog posts
- **Category system** with automatic categorization
- **Tag system** for better content organization
- **Related articles** functionality
- **Search functionality** with trending and recent searches
- **Featured and trending posts**

### User Experience
- **Dark mode toggle** with system preference detection
- **Apple-inspired clean design** with smooth animations
- **Newsletter subscription** with email capture
- **Social sharing** functionality
- **Breadcrumb navigation**
- **Reading time estimation**

### Technical Features
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Gray Matter** for frontmatter parsing
- **Date-fns** for date formatting
- **Lucide React** for icons

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gold-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
gold-blog/
├── content/
│   └── posts/           # Blog posts in MDX format
├── public/              # Static assets
│   ├── images/         # Blog images
│   ├── favicon.ico     # Favicon
│   └── robots.txt      # SEO robots file
├── src/
│   ├── components/     # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── BlogCard.tsx
│   │   ├── SearchModal.tsx
│   │   └── SEO.tsx
│   ├── lib/           # Utility functions
│   │   ├── blog.ts    # Blog data management
│   │   ├── seo.ts     # SEO utilities
│   │   └── utils.ts   # Helper functions
│   ├── pages/         # Next.js pages
│   │   ├── api/       # API routes
│   │   ├── blog/      # Blog pages
│   │   └── category/  # Category pages
│   ├── styles/        # Global styles
│   └── types/         # TypeScript types
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## 📝 Adding Blog Posts

1. **Create a new MDX file** in `content/posts/`
2. **Add frontmatter** with required fields:
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
3. **Write your content** in Markdown format
4. **The post will automatically appear** on the website

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
```javascript
colors: {
  gold: {
    50: '#fffbeb',
    100: '#fef3c7',
    // ... more shades
  }
}
```

### Fonts
Fonts are configured in `tailwind.config.js` and imported in `src/styles/globals.css`:
- **Inter** for body text
- **SF Pro Display** for headings

### SEO Settings
SEO configuration is in `src/lib/seo.ts`:
- Default meta tags
- OpenGraph settings
- Twitter Card configuration
- Schema markup generation

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect your repository** to Vercel
2. **Configure environment variables** if needed
3. **Deploy** - Vercel will automatically build and deploy

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Railway

## 📊 SEO Features

### Automatic SEO
- **Meta tags** for every page
- **OpenGraph** and Twitter Cards
- **Structured data** (JSON-LD)
- **Canonical URLs**
- **Breadcrumb navigation**
- **Sitemap generation**
- **RSS feed**

### Performance
- **Image optimization** with Next.js Image component
- **Code splitting** and lazy loading
- **Font optimization**
- **Bundle analysis**

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific settings:
```bash
NEXT_PUBLIC_SITE_URL=https://goldinsights.blog
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Analytics
Add Google Analytics by setting the `NEXT_PUBLIC_GA_ID` environment variable.

## 📈 Content Strategy

### SEO-Optimized Content
- **Long-tail keywords** in titles and content
- **Semantic HTML** with proper heading structure
- **Internal linking** between related articles
- **Meta descriptions** optimized for search results
- **Image alt tags** for accessibility and SEO

### Content Types
- **Market analysis** and predictions
- **Investment strategies** and tips
- **Technology trends** in precious metals
- **Economic insights** and news
- **Educational content** for beginners

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Email**: hello@goldinsights.blog
- **Issues**: Create an issue on GitHub
- **Documentation**: Check the README and code comments

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Unsplash** for high-quality stock images

---

**Built with ❤️ for the gold investment community**
