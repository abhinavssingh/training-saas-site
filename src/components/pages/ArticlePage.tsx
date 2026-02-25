import { ContentProps } from '@optimizely/cms-sdk'
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server'
import { ArticlePageCT } from '@/content-types/ArticlePage'
import Image from 'next/image'
import { RichText } from '@optimizely/cms-sdk/react/richText'

type Props = {
  content: ContentProps<typeof ArticlePageCT>
}

export default function ArticlePage({ content }: Props) {
  const { pa, src } = getPreviewUtils(content)

  const formatDate = (dateString?: string) =>
    dateString
      ? new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      : ''

  const imagePresent =
    !!content?.image && (content?.image?.url?.default || (content as any)?.image?.item?.Url)

  const heading = content?.heading ?? ''
  const subheading = content?.subheading ?? ''
  const author = content?.author ?? ''
  const publishDate = content?.publishDate ?? ''
  const estimatedReadTime = content?.estimatedReadTime ?? null
  const category = content?.category ?? ''
  const body = (content?.body as unknown as string) ?? ''

  const tags: string[] = Array.isArray(content?.tags) ? (content!.tags as string[]) : []
  const related: any[] = Array.isArray(content?.relatedArticles)
    ? (content!.relatedArticles as any[])
    : []

  return (
    <article className='prose lg:prose-xl mx-auto'>
      {/* Header */}
      <header className="article-header">
        {imagePresent && (
          <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
            <Image
              src={src(imagePresent)}
              alt={heading || 'Article'}
              fill
              className="object-cover"
              {...pa('image')}
            />
          </div>
        )}

        <div className="prose-h1:{utility}">
          <h1 {...pa('heading')}>{heading}</h1>
          {subheading && (
            <p className="prose-p:my-4" {...pa('subheading')}>
              {subheading}
            </p>
          )}

          <div className="article-meta">
            {author && (
              <span className="author" {...pa('author')}>
                By {author}
              </span>
            )}

            {publishDate && (
              <span className="publish-date" {...pa('publishDate')}>
                Published {formatDate(publishDate)}
              </span>
            )}

            {estimatedReadTime && (
              <span className="read-time" {...pa('estimatedReadTime')}>
                {estimatedReadTime} min read
              </span>
            )}

            {category && (
              <span className="category" {...pa('category')}>
                {category}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Body */}

      {body && (
        <main className="prose-p:my-4" {...pa('body')}>
          <div className="prose max-w-none">
            <RichText content={body.json} />
          </div>
        </main>)}


      {/* Tags */}
      {tags.length > 0 && (
        <section className="article-tags" {...pa('tags')}>
          <h3>Tags</h3>
          <ul>
            {tags.map((tag) => (
              <li key={tag}>
                <a href={`/blog?tag=${encodeURIComponent(tag)}`}>{tag}</a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="related-articles" {...pa('relatedArticles')}>
          <h2>Related Articles</h2>
          <ul>
            {related.map((article: any) => (
              <li key={article?._id}>
                <a href={article?._metadata?.url?.href ?? '#'}>
                  {article?.heading ?? ''}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}