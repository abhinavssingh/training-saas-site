export default function HomePage({ opti }: {opti: any }) {
  const data = opti ?? {};
  const image = data.image ?? null;
  const heading = data.heading ?? '';
  const subheading = data.subheading ?? '';
  const heroCTA = data.heroCallToAction ?? null;
  const body = data.body ?? '';
  const featuredSection = data.featuredSection ?? null;
  const showLatestPosts = !!data.showLatestPosts;

  return (
    <main>
      <section className="hero">
        {image ? <img src={image} alt={heading || 'Hero'} /> : null}
        <div className="hero-content">
          <h1>{heading}</h1>
          {subheading && <h2>{subheading}</h2>}
        </div>
        {heroCTA && heroCTA.href && heroCTA.text ? (
          <a href={heroCTA.href} className="btn btn-primary">
            {heroCTA.text}
          </a>
        ) : null}
      </section>

      {body ? (
        <section className="content">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </section>
      ) : null}

      {featuredSection ? (
        <section className="featured">{featuredSection}</section>
      ) : null}

      {showLatestPosts ? (
        <section className="latest-posts">
          <h2>Latest Blog Posts</h2>
        </section>
      ) : null}
    </main>
  );
}
