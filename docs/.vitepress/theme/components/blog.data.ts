import { createContentLoader } from 'vitepress'

interface BlogPost {
  url: string
  title: string
  description: string
  author: string | string[]
  banner: string
  tags: string[]
  date: string
}

declare const data: BlogPost[]
export { data }

export default createContentLoader('blog/post/*.md', {
  excerpt: true,
  transform(raw): BlogPost[] {
    return raw
      .map(({ url, frontmatter }) => ({
        url,
        title: frontmatter.title,
        description: frontmatter.description,
        tags: frontmatter.tags,
        banner: frontmatter.banner,
        author: frontmatter.author,
        date: formatDate(frontmatter.date)
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }  
})

function formatDate(raw: string): string {
  const date = new Date(raw)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  })
}
