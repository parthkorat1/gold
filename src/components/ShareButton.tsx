import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  url: string
  title: string
  description?: string
  className?: string
}

export default function ShareButton({ url, title, description, className = '' }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description || '',
          url: url,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url)
        // You could add a toast notification here
      } catch (err) {
        console.error('Failed to copy link:', err)
      }
    }
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleShare()
      }}
      className={`p-2 text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors ${className}`}
      aria-label="Share article"
    >
      <Share2 className="w-4 h-4" />
    </button>
  )
}
