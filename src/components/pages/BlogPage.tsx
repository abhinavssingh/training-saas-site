import { ContentProps } from '@optimizely/cms-sdk'
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server'
import { BlogPageCT } from '@/content-types/BlogPage'
import { RichText } from '@optimizely/cms-sdk/react/richText'

type Props = {
  content: ContentProps<typeof BlogPageCT>
}

export default function BlogPage({ content }: Props) {
  const { pa, src } = getPreviewUtils(content)

  const image = (content?.image?.url?.default as unknown as string) ?? null
  const heading = content?.heading ?? ''
  const subheading = content?.subheading ?? ''
  const body = (content?.body as unknown as string) ?? ''
  const enableCategory = !!content?.enableCategory
  const enableSearch = !!content?.enableSearch

  const rawPerPage = (content as any)?.articlesPerPage
  const parsedPerPage = Number(rawPerPage)
  const articlesPerPage = Number.isFinite(parsedPerPage) ? parsedPerPage : undefined

  return (
    <main>
      {/* Header */}
      <section className="prose img:rounded-lg">
        {image && (
          <img
            src={image}
            alt={heading || 'Blog'}
            {...pa('image')}
          />
        )}

        <div className="header-content">
          <h1 {...pa('heading')}>{heading}</h1>
          {subheading && (
            <h2 {...pa('subheading')}>{subheading}</h2>
          )}
        </div>
      </section>

      {/* Intro */}
      {body && (
        <section className="blog-intro" {...pa('body')}>
          <RichText content={body.Json} />
        </section>
      )}

      {/* Filters */}
      <section className="blog-filters">
        {enableCategory && (
          <div className="category-filter" {...pa('enableCategory')}>
            <label>Filter by Category</label>
          </div>
        )}

        {enableSearch && (
          <div className="search-filter" {...pa('enableSearch')}>
            <input type="search" placeholder="Search articles..." />
          </div>
        )}
      </section>

      {/* Articles list (placeholder) */}
      <section className="articles-list" {...pa('articlesPerPage')}>
        <h2>Articles</h2>
        <p>Showing {articlesPerPage ?? 'all'} articles per page</p>
      </section>
    </main>
  )
}