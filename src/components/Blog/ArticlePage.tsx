export default function ArticlePage({ opti }: { opti: any }) {
  const data = opti ?? {};
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const image = data.image ?? null;
  const heading = data.heading ?? '';
  const subheading = data.subheading ?? '';
  const author = data.author ?? '';
  const publishDate = data.publishDate ?? '';
  const estimatedReadTime = data.estimatedReadTime ?? null;
  const category = data.category ?? '';
  const body = data.body ?? '';
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const related = Array.isArray(data.relatedArticles) ? data.relatedArticles : [];

  return (
    <article>
      <header className="article-header">
        {image ? (
          <img src={image} alt={heading || 'Article'} className="featured-image" />
        ) : null}
        <div className="article-intro">
          <h1>{heading}</h1>
          {subheading && <p className="subtitle">{subheading}</p>}
          <div className="article-meta">
            {author ? <span className="author">By {author}</span> : null}
            {publishDate ? (
              <span className="publish-date">Published {formatDate(publishDate)}</span>
            ) : null}
            {estimatedReadTime ? (
              <span className="read-time">{estimatedReadTime} min read</span>
            ) : null}
            {category ? <span className="category">{category}</span> : null}
          </div>
        </div>
      </header>

      <main className="article-content">
        {body ? <div dangerouslySetInnerHTML={{ __html: body }} /> : null}
      </main>

      {tags.length > 0 ? (
        <section className="article-tags">
          <h3>Tags</h3>
          <ul>
            {tags.map((tag: string) => (
              <li key={tag}>
                <a href={`/blog?tag=${encodeURIComponent(tag)}`}>{tag}</a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="related-articles">
          <h2>Related Articles</h2>
          <ul>
            {related.map((article: any) => (
              <li key={article._id}>
                <a href={article._metadata?.url?.href ?? '#'}>{article.heading ?? ''}</a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
