import { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { BlogPageCT } from '@/content-types/BlogPage';

type Props = {
  content: ContentProps<typeof BlogPageCT>;
};

export default function BlogPage({ content }: Props) {
  const { pa, src } = getPreviewUtils(content);
  const data = content ?? {};
  const image = data.image ?? null;
  const heading = data.heading ?? '';
  const subheading = data.subheading ?? '';
  const body = data.body ?? '';
  const enableCategory = !!data.enableCategory;
  const enableSearch = !!data.enableSearch;
  const articlesPerPage = Number.isFinite(Number(data.articlesPerPage))
    ? Number(data.articlesPerPage)
    : undefined;

  return (
    <main>
      <section className="blog-header">
        {image ? <img src={image} alt={heading || 'Blog'} /> : null}
        <div className="header-content">
          <h1>{heading}</h1>
          {subheading && <h2>{subheading}</h2>}
        </div>
      </section>

      {body ? (
        <section className="blog-intro">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </section>
      ) : null}

      <section className="blog-filters">
        {enableCategory ? (
          <div className="category-filter">
            <label>Filter by Category</label>
          </div>
        ) : null}
        {enableSearch ? (
          <div className="search-filter">
            <input type="search" placeholder="Search articles..." />
          </div>
        ) : null}
      </section>

      <section className="articles-list">
        <h2>Articles</h2>
        <p>Showing {articlesPerPage ?? 'all'} articles per page</p>
      </section>
    </main>
  );
}
