export default function LandingPage({ opti }: { opti: any }) {
  const data = opti ?? {};
  const heroImage = data.heroImage ?? null;
  const heading = data.heading ?? '';
  const subheading = data.subheading ?? '';
  const heroContent = data.heroContent ?? null;
  const ctaLink = data.callToActionLink ?? null;
  const ctaText = data.callToActionText ?? '';
  const bodyContent = data.bodyContent ?? null;
  const enableFeatured = !!data.enableFeaturedSection;
  const featuredContent = data.featuredContent ?? null;
  const footerText = data.footerText ?? '';

  return (
    <main>
      <section>
        {heroImage ? <img src={heroImage} alt={heading || 'Hero'} /> : null}
        <h1>{heading}</h1>
        {subheading && <h2>{subheading}</h2>}
        {heroContent ? <div>{heroContent}</div> : null}
        {ctaLink && ctaLink.href && ctaText ? (
          <a href={ctaLink.href}>{ctaText}</a>
        ) : null}
      </section>
      {bodyContent ? <section>{bodyContent}</section> : null}
      {enableFeatured && featuredContent ? (
        <section>{featuredContent}</section>
      ) : null}
      {footerText ? <footer>{footerText}</footer> : null}
    </main>
  );
}
